import { AuraDataset } from "@/lib/spotify/types";
import type {
  MetricLevel,
  MetricResult,
} from "@/lib/analysis/types";

const LOW_NOTES = [
  "commitment issues much?",
  "musical butterfly detected.",
  "archive cannot establish favorites.",
  "girl pick one 😭",
];

const MODERATE_NOTES = [
  "the archive is noticing a pattern...",
  "a few familiar faces keep showing up.",
  "nothing unusual... yet.",
  "comfort is beginning to form.",
];

const HIGH_NOTES = [
  "comfort artists deserve employee benefits.",
  "Spotify should probably put them on payroll.",
  "breaking news: still obsessed.",
  "okay we get it 😭",
];

const CRITICAL_NOTES = [
  "who broke u bro? T^T",
  "this artist pays rent inside your head.",
  "archive concerned.",
  "we stopped counting.",
  "emotional dependency detected.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function levelFromScore(score: number): MetricLevel {
  if (score < 25) return "LOW";
  if (score < 50) return "MODERATE";
  if (score < 75) return "HIGH";
  return "CRITICAL";
}

export function calculateInternalEcho(
  dataset: AuraDataset
): MetricResult {
  // ==============================
  // TOP ARTISTS
  // ==============================

  const topArtistIds = dataset.topArtists
    .filter((artist) => artist?.id)
    .map((artist) => artist.id);

  // ==============================
  // TOP TRACKS
  // ==============================

  const trackArtistIds = dataset.topTracks.flatMap((track) => {
    if (!track?.artists) return [];

    return track.artists
      .filter((artist) => artist?.id)
      .map((artist) => artist.id);
  });

  // ==============================
  // RECENT TRACKS
  // ==============================

  const recentArtistIds = dataset.recentTracks.flatMap((recent) => {
    if (!recent?.track) return [];

    if (!recent.track.artists) return [];

    return recent.track.artists
      .filter((artist) => artist?.id)
      .map((artist) => artist.id);
  });

  // ==============================
  // OCCURRENCES
  // ==============================

  const occurrences = new Map<string, number>();

  [...topArtistIds, ...trackArtistIds, ...recentArtistIds].forEach(
    (id) => {
      occurrences.set(id, (occurrences.get(id) ?? 0) + 1);
    }
  );

  const values = [...occurrences.values()];

  const repeatedArtists = values.filter((v) => v > 1).length;

  const strongestAnchor =
    values.length > 0 ? Math.max(...values) : 0;

  const recurrence =
    values.length > 0
      ? values.reduce((sum, value) => sum + value, 0) /
        values.length
      : 0;

  // ==============================
  // SCORE
  // ==============================

  let score =
    repeatedArtists * 8 +
    strongestAnchor * 7 +
    recurrence * 12;

  score = Math.round(Math.min(score, 100));

  const level = levelFromScore(score);

  // ==============================
  // OUTPUT
  // ==============================

  let archiveMessage = "";
  let interpretation = "";
  let ps = "";

  switch (level) {
    case "LOW":
      archiveMessage =
        "Minimal auditory recursion detected. Subject frequently abandons established identity anchors.";

      interpretation =
        "You rarely stay attached to the same artists for long. Your listening habits constantly evolve.";

      ps = random(LOW_NOTES);
      break;

    case "MODERATE":
      archiveMessage =
        "Recurring auditory signatures observed. Partial behavioral anchors remain active.";

      interpretation =
        "You revisit familiar artists occasionally, but you're still open to exploring new music.";

      ps = random(MODERATE_NOTES);
      break;

    case "HIGH":
      archiveMessage =
        "Repeated auditory recursion confirmed. Stable emotional anchors detected throughout the archive.";

      interpretation =
        "Certain artists consistently ground your listening habits. They represent emotional familiarity.";

      ps = random(HIGH_NOTES);
      break;

    case "CRITICAL":
      archiveMessage =
        "Persistent recursive identity anchors detected. Archive unable to fully separate subject from primary auditory dependencies.";

      interpretation =
        "Some artists have become deeply woven into your listening identity. They aren't just favorites—they're emotional constants.";

      ps = random(CRITICAL_NOTES);
      break;
  }

  return {
    id: "internal-echo",

    title: "Internal Echo",

    score,

    level,

    archiveMessage,

    interpretation,

    ps,

    evidence: [
      `${repeatedArtists} recurring artists detected.`,
      `Strongest artist appeared ${strongestAnchor} times.`,
      `Average recurrence factor ${recurrence.toFixed(2)}.`,
    ],
  };
}