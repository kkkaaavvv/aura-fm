import { MetricResult } from "@/lib/analysis/types";

export interface BehaviourDimension {
  id: string;

  title: string;

  score: number;

  confidence: number;

  evidence: string[];
}

export interface HiddenTrait {
  title: string;

  description: string;

  confidence: number;
}

export interface ArchiveContradiction {
  title: string;

  description: string;

  severity: "LOW" | "MODERATE" | "HIGH";
}

 export interface ReasoningResult {
  dominantDimension: BehaviourDimension;

  weakestDimension: BehaviourDimension;

  dimensions: BehaviourDimension[];

  hiddenTraits: HiddenTrait[];

  contradictions: ArchiveContradiction[];

  archiveNotes: string[];

  psychologicalProfile: string[];

  behaviourSummary: string;

  verdict: string;

  observations: string[];

  narrative: string[];

  warnings: string[];

  archiveStatus: string;

  dominantBehaviours: string[];
}

function average(
  metrics: MetricResult[]
) {
  if (!metrics.length) return 0;

  return (
    metrics.reduce(
      (sum, metric) => sum + metric.score,
      0
    ) / metrics.length
  );
}
function buildDimensions(
  metrics: MetricResult[]
): BehaviourDimension[] {

  return metrics.map(metric => ({

    id: metric.id,

    title: metric.title,

    score: metric.score,

    confidence: metric.confidence,

    evidence: metric.evidence,

  }));

}
function buildHiddenTraits(
  metrics: MetricResult[]
): HiddenTrait[] {

  const traits: HiddenTrait[] = [];

  const find = (id: string) =>
    metrics.find(m => m.id === id);

  const echo = find("internal-echo");
  const anchor = find("anchor-mass");
  const recursion = find("recursion-depth");
  const horizons = find("signal-horizons");
  const dispersion = find("signal-dispersion");
  const fracture = find("spectral-fracture");
  const integrity = find("integrity-index");

  //--------------------------------

  if (
    echo &&
    anchor &&
    recursion &&
    average([
      echo,
      anchor,
      recursion,
    ]) > 75
  ) {

    traits.push({

      title: "Emotional Dependence",

      confidence: Math.round(
        average([
          echo,
          anchor,
          recursion,
        ])
      ),

      description:
        "The Archive detected exceptionally persistent emotional attachment to familiar auditory anchors.",

    });

  }

  //--------------------------------

  if (
    horizons &&
    dispersion &&
    average([
      horizons,
      dispersion,
    ]) > 75
  ) {

    traits.push({

      title: "Novelty Seeking",

      confidence: Math.round(
        average([
          horizons,
          dispersion,
        ])
      ),

      description:
        "Behaviour indicates a strong tendency to pursue unfamiliar artists, genres and listening experiences.",

    });

  }

  //--------------------------------

  if (
    integrity &&
    integrity.score > 80 &&
    fracture &&
    fracture.score < 35
  ) {

    traits.push({

      title: "Behavioural Stability",

      confidence: integrity.confidence,

      description:
        "Listening behaviour remains highly consistent across multiple behavioural dimensions.",

    });

  }

  //--------------------------------

  return traits;

}
function buildContradictions(
  metrics: MetricResult[]
): ArchiveContradiction[] {

  const contradictions: ArchiveContradiction[] = [];

  const find = (id: string) =>
    metrics.find(m => m.id === id);

  const horizons = find("signal-horizons");
  const staticBleed = find("static-bleed");
  const integrity = find("integrity-index");
  const fracture = find("spectral-fracture");
  const echo = find("internal-echo");
  const dispersion = find("signal-dispersion");

  //--------------------------------

  if (
    horizons &&
    staticBleed &&
    horizons.score > 75 &&
    staticBleed.score > 75
  ) {

    contradictions.push({

      title:
        "Explorer's Paradox",

      severity: "HIGH",

      description:
        "Subject actively explores unfamiliar music while repeatedly returning to established comfort loops.",

    });

  }

  //--------------------------------

  if (
    integrity &&
    fracture &&
    integrity.score > 75 &&
    fracture.score > 75
  ) {

    contradictions.push({

      title:
        "Stable Chaos",

      severity: "MODERATE",

      description:
        "Behaviour remains internally consistent despite frequent emotional fluctuations.",

    });

  }

  //--------------------------------

  if (
    echo &&
    dispersion &&
    echo.score > 80 &&
    dispersion.score > 80
  ) {

    contradictions.push({

      title:
        "Attachment Conflict",

      severity: "HIGH",

      description:
        "Subject forms deep emotional bonds with artists while simultaneously pursuing constant musical exploration.",

    });

  }

  //--------------------------------

  return contradictions;

}
function buildArchiveNotes(
  metrics: MetricResult[]
): string[] {

  const notes: string[] = [];

  metrics
    .filter(metric => metric.score >= 80)
    .forEach(metric => {

      notes.push(
        `${metric.title} exceeded Archive threshold.`
      );

    });

  metrics
    .filter(metric => metric.score <= 20)
    .forEach(metric => {

      notes.push(
        `${metric.title} exhibited unusually low behavioural activity.`
      );

    });

  return notes;

}

export function buildReasoning(
  metrics: MetricResult[]
): ReasoningResult {

  const dimensions = buildDimensions(metrics);

  const sorted = [...dimensions].sort(
    (a, b) => b.score - a.score
  );

  const dominantDimension = sorted[0];

  const weakestDimension =
    sorted[sorted.length - 1];

  const contradictions =
    buildContradictions(metrics);

  return {

    dominantDimension,

    weakestDimension,

    dimensions,

    hiddenTraits:
      buildHiddenTraits(metrics),

    contradictions,

    archiveNotes:
      buildArchiveNotes(metrics),

    psychologicalProfile:
      buildPsychologicalProfile(metrics),

    behaviourSummary:
      buildBehaviourSummary(metrics),

    verdict:
      buildVerdict(metrics),

    observations:
      buildObservations(metrics),

    narrative:
      buildNarrative(metrics),

    warnings:
      buildWarnings(
        contradictions
      ),

    archiveStatus:
      buildArchiveStatus(metrics),

    dominantBehaviours:
      buildDominantBehaviour(metrics),

  };

}

/* ==========================================
   PSYCHOLOGICAL PROFILE
========================================== */

function buildPsychologicalProfile(
  metrics: MetricResult[]
): string[] {

  const profile: string[] = [];

  const find = (id: string) =>
    metrics.find(m => m.id === id);

  const echo = find("internal-echo");
  const memory = find("memory-drag");
  const dispersion = find("signal-dispersion");
  const horizons = find("signal-horizons");
  const anchor = find("anchor-mass");
  const fracture = find("spectral-fracture");
  const integrity = find("integrity-index");
  const recursion = find("recursion-depth");
  const nocturnal = find("nocturnal-offset");
  const phase = find("phase-displacement");

  /* --------------------------------------- */

  if (
    echo &&
    anchor &&
    echo.score > 75 &&
    anchor.score > 75
  ) {

    profile.push(
      "The Archive observed exceptionally persistent emotional attachment toward familiar auditory identities. The subject rarely abandons established emotional anchors once they have formed."
    );

  }

  /* --------------------------------------- */

  if (
    horizons &&
    dispersion &&
    horizons.score > 70 &&
    dispersion.score > 70
  ) {

    profile.push(
      "Exploratory behaviour consistently exceeds archive averages. Curiosity appears to reinforce the subject's identity rather than destabilize it."
    );

  }

  /* --------------------------------------- */

  if (
    fracture &&
    fracture.score > 75
  ) {

    profile.push(
      "Rapid emotional transitions were reconstructed throughout the listening archive. Behaviour demonstrates unusually high psychological flexibility."
    );

  }

  /* --------------------------------------- */

  if (
    recursion &&
    recursion.score > 75
  ) {

    profile.push(
      "Repeated behavioural loops suggest the subject frequently revisits emotionally significant auditory memories instead of continuously seeking replacement experiences."
    );

  }

  /* --------------------------------------- */

  if (
    nocturnal &&
    nocturnal.score > 75
  ) {

    profile.push(
      "Listening behaviour changes substantially during late-night hours. The Archive reconstructed a secondary behavioural profile that differs noticeably from daytime activity."
    );

  }

  /* --------------------------------------- */

  if (
    integrity &&
    integrity.score > 75
  ) {

    profile.push(
      "Despite natural variation, the overall behavioural structure remains remarkably coherent. Multiple vectors reinforce the same identity framework."
    );

  }

  /* --------------------------------------- */

  if (
    phase &&
    phase.score > 75
  ) {

    profile.push(
      "Recent listening behaviour diverges from long-standing patterns, suggesting the subject is actively transitioning into a new musical identity."
    );

  }

  /* --------------------------------------- */

  if (
    memory &&
    memory.score > 75
  ) {

    profile.push(
      "Older listening patterns continue influencing present behaviour. The Archive detected strong persistence of long-term auditory memory."
    );

  }

  return profile;

}
/* ==========================================
   BEHAVIOURAL SUMMARY
========================================== */

function buildBehaviourSummary(
  metrics: MetricResult[]
) {

  const highest =
    [...metrics].sort(
      (a, b) => b.score - a.score
    )[0];

  const lowest =
    [...metrics].sort(
      (a, b) => a.score - b.score
    )[0];

  return `Behavioural reconstruction identified "${highest.title}" as the dominant characteristic while "${lowest.title}" exhibited comparatively weak activity. Overall personality reconstruction remains internally consistent across the analysed archive.`;

}
/* ==========================================
   FINAL VERDICT
========================================== */

function buildVerdict(
  metrics: MetricResult[]
) {

  const averageScore =
    metrics.reduce(
      (sum, metric) =>
        sum + metric.score,
      0
    ) / metrics.length;

  if (averageScore >= 80) {

    return "Archive confidence is exceptionally high. Behavioural reconstruction is considered highly reliable.";

  }

  if (averageScore >= 60) {

    return "Archive confidence is stable. Behavioural reconstruction is supported by sufficient evidence.";

  }

  if (averageScore >= 40) {

    return "Archive confidence is moderate. Additional listening history may improve reconstruction accuracy.";

  }

  return "Archive confidence remains limited. Behavioural evidence is currently insufficient for complete reconstruction.";

}
/* ==========================================
   OBSERVATIONS
========================================== */

function buildObservations(
  metrics: MetricResult[]
) {

  const observations: string[] = [];

  metrics
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .forEach(metric => {

      observations.push(
        `Observed unusually high ${metric.title.toLowerCase()} activity (${metric.score}%).`
      );

    });

  metrics
    .filter(metric => metric.level === "CRITICAL")
    .forEach(metric => {

      observations.push(
        `${metric.title} exceeded expected archive thresholds.`
      );

    });

  return observations;

}

/* ==========================================
   DYNAMIC NARRATIVE
========================================== */

function buildNarrative(
  metrics: MetricResult[]
): string[] {

  const narrative: string[] = [];

  const sorted = [...metrics].sort(
    (a, b) => b.score - a.score
  );

  const dominant = sorted[0];
  const secondary = sorted[1];
  const weakest = sorted[sorted.length - 1];

  narrative.push(
    `Behavioural reconstruction identified ${dominant.title} as the dominant behavioural signature throughout the archive.`
  );

  narrative.push(
    `${secondary.title} consistently reinforced the observed behavioural model, increasing overall reconstruction confidence.`
  );

  if (weakest.score < 35) {
    narrative.push(
      `${weakest.title} remained comparatively inactive, suggesting that this behavioural dimension contributes minimally to the subject's listening identity.`
    );
  }

  return narrative;
}

/* ==========================================
   ARCHIVE WARNINGS
========================================== */

function buildWarnings(
  contradictions: ArchiveContradiction[]
): string[] {

  const warnings: string[] = [];

  contradictions.forEach(c => {

    if (c.severity === "HIGH") {

      warnings.push(
        `Behavioural anomaly detected: ${c.title}. Further observation recommended.`
      );

    }

  });

  return warnings;
}
/* ==========================================
   ARCHIVE STATUS
========================================== */

function buildArchiveStatus(
  metrics: MetricResult[]
) {

  const average =
    metrics.reduce(
      (sum, metric) =>
        sum + metric.confidence,
      0
    ) / metrics.length;

  if (average >= 90)
    return "ARCHIVE VERIFIED";

  if (average >= 75)
    return "ARCHIVE STABLE";

  if (average >= 60)
    return "PARTIAL RECONSTRUCTION";

  return "INSUFFICIENT EVIDENCE";

}

/* ==========================================
   DOMINANT BEHAVIOUR
========================================== */

function buildDominantBehaviour(
  metrics: MetricResult[]
) {

  const sorted = [...metrics].sort(
    (a, b) => b.score - a.score
  );

  return sorted.slice(0, 3).map(metric => metric.title);

}

