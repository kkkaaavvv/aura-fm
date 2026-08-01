import { auraThemes } from "./themes";
import { AuraTheme, AuraResult } from "./types";
import { VECTOR_THEME_MAP } from "./vectorThemeMap";
import { MetricResult } from "@/lib/analysis/types";

/**
 * If a metric's score is within this many points of the top
 * score, it counts as a second (or third...) dominant vector and
 * gets folded into a blended theme rather than losing outright.
 */
const DOMINANCE_MARGIN = 5;

/**
 * If even the single highest-scoring vector doesn't clear this,
 * the whole profile is treated as too flat/low-signal to point
 * toward any specific theme, and classifies as NULL WHITE instead.
 *
 * This is a starting value, not a measured cutoff — revisit once
 * there's real score-distribution data to check it against.
 */
const MIN_DOMINANCE_SCORE = 40;

const FALLBACK_THEME_ID = "null-white";

function findTheme(id: string): AuraTheme {
  const theme = auraThemes.find((t) => t.id === id);

  if (!theme) {
    throw new Error(`Unknown aura theme id: ${id}`);
  }

  return theme;
}

/* ==========================================
   HEX COLOR BLENDING
========================================== */

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) =>
    Math.round(Math.min(255, Math.max(0, n)))
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Weighted blend of N hex colors. Weights don't need to sum to 1
 * — they're normalized here.
 */
function blendHexColors(
  colors: string[],
  weights: number[]
): string {
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  const blended = colors.reduce(
    (acc, hex, i) => {
      const rgb = hexToRgb(hex);
      const weight = weights[i] / totalWeight;

      return {
        r: acc.r + rgb.r * weight,
        g: acc.g + rgb.g * weight,
        b: acc.b + rgb.b * weight,
      };
    },
    { r: 0, g: 0, b: 0 }
  );

  return rgbToHex(blended.r, blended.g, blended.b);
}

/**
 * Builds an rgba() glow string from a hex accent color, reusing
 * the alpha value from a reference glow string (so blended themes
 * keep roughly the same glow intensity as their source themes).
 */
function glowFromAccent(accentHex: string, referenceGlow: string): string {
  const alphaMatch = referenceGlow.match(/[\d.]+\)$/);
  const alpha = alphaMatch ? alphaMatch[0].replace(")", "") : ".20";

  const { r, g, b } = hexToRgb(accentHex);

  return `rgba(${r},${g},${b},${alpha})`;
}

/* ==========================================
   CLASSIFICATION
========================================== */

export function classifyAura(
  metrics: MetricResult[]
): AuraResult {
  const generatedAt = new Date().toISOString();

  if (!metrics.length) {
    const fallback = findTheme(FALLBACK_THEME_ID);

    return {
      theme: fallback,
      metrics,
      confidence: 0,
      archiveLog: [
        "No behavioural metrics available for classification.",
      ],
      summary:
        "Archive unable to establish a classification. No behavioural data was provided.",
      generatedAt,
    };
  }

  const sorted = [...metrics].sort((a, b) => b.score - a.score);
  const topScore = sorted[0].score;

  /* ---------------------------------------
     FALLBACK: profile too flat/low-signal
  --------------------------------------- */

  if (topScore < MIN_DOMINANCE_SCORE) {
    const fallback = findTheme(FALLBACK_THEME_ID);

    const averageConfidence =
      metrics.reduce((sum, m) => sum + m.confidence, 0) /
      metrics.length;

    return {
      theme: fallback,
      metrics,
      confidence: Math.round(averageConfidence),
      archiveLog: [
        `Highest observed vector score (${topScore}%) did not clear the dominance threshold (${MIN_DOMINANCE_SCORE}%).`,
        "No single behavioural signature dominates the archive.",
        "Classification defaulted to NULL WHITE.",
      ],
      summary:
        "The archive could not identify a dominant behavioural signature. Classification defaulted to a neutral baseline.",
      generatedAt,
    };
  }

  /* ---------------------------------------
     DOMINANT SET: everyone within margin of top score
  --------------------------------------- */

  const dominantSet = sorted.filter(
    (m) => topScore - m.score <= DOMINANCE_MARGIN
  );

  const dominantThemes = dominantSet.map((m) => {
    const themeId = VECTOR_THEME_MAP[m.id];

    if (!themeId) {
      throw new Error(
        `No theme mapping found for vector id: ${m.id}`
      );
    }

    return findTheme(themeId);
  });

  const weightedConfidence = Math.round(
    dominantSet.reduce(
      (sum, m) => sum + m.confidence * m.score,
      0
    ) /
      dominantSet.reduce((sum, m) => sum + m.score, 0)
  );

  /* ---------------------------------------
     SINGLE DOMINANT VECTOR — no blend needed
  --------------------------------------- */

  if (dominantSet.length === 1) {
    const theme = dominantThemes[0];

    return {
      theme,
      metrics,
      confidence: dominantSet[0].confidence,
      archiveLog: [
        `Dominant vector: ${dominantSet[0].title} (${dominantSet[0].score}%).`,
        `Classified as ${theme.name}.`,
      ],
      summary: `Behavioural reconstruction identified ${dominantSet[0].title} as the dominant signature. Archive classified the subject as ${theme.name}.`,
      generatedAt,
    };
  }

  /* ---------------------------------------
     MULTIPLE DOMINANT VECTORS — blend
  --------------------------------------- */

  const weights = dominantSet.map((m) => m.score);

  const blendedAccent = blendHexColors(
    dominantThemes.map((t) => t.accent),
    weights
  );

  const blendedBorder = blendHexColors(
    dominantThemes.map((t) => t.border),
    weights
  );

  const blendedGlow = glowFromAccent(
    blendedAccent,
    dominantThemes[0].glow
  );

  // Background/text stay pinned to the single highest-scoring
  // theme rather than also being blended — averaging near-black
  // backgrounds together risks a muddy, low-contrast result that
  // reads as worse design rather than "more dramatic."
  const primaryTheme = dominantThemes[0];

  const blendedTheme: AuraTheme = {
    id: dominantThemes.map((t) => t.id).join("+"),
    name: dominantThemes.map((t) => t.name).join(" / "),
    code: primaryTheme.code,
    status: dominantThemes.map((t) => t.status).join(" / "),
    frequency: primaryTheme.frequency,
    accent: blendedAccent,
    border: blendedBorder,
    glow: blendedGlow,
    background: primaryTheme.background,
    text: primaryTheme.text,
    note:
      "Multiple competing behavioural signatures were detected at comparable strength; this classification reflects a blend rather than a single dominant identity.",
    wallpaper: primaryTheme.wallpaper,
    glitch: Math.max(...dominantThemes.map((t) => t.glitch)),
  };

  const archiveLog = dominantSet.map(
    (m, i) =>
      `${i === 0 ? "Dominant" : "Co-dominant"} vector: ${m.title} (${m.score}%).`
  );

  archiveLog.push(
    `Multiple vectors within ${DOMINANCE_MARGIN} points of the top score — classification blended across ${dominantSet.length} themes.`
  );

  archiveLog.push(`Classified as ${blendedTheme.name}.`);

  return {
    theme: blendedTheme,
    metrics,
    confidence: weightedConfidence,
    archiveLog,
    summary: `Behavioural reconstruction identified ${dominantSet
      .map((m) => m.title)
      .join(" and ")} as comparably dominant signatures. Archive classified the subject as a blend: ${blendedTheme.name}.`,
    generatedAt,
  };
}