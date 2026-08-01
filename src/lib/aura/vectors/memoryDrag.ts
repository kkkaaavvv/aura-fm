//How much your listening identity is anchored in the past instead of constantly evolving.
//It should consider:
//Average release year
//Old track ratio
//Replay rate
//Maybe a tiny influence from recent overlap

import { AuraDataset } from "@/lib/spotify/types";

import { normalize } from "@/lib/engine/normalize";
import { calculateScore } from "@/lib/engine/scorer";
import { createMetric } from "@/lib/engine/createMetric";

import {
  getAverageReleaseYear,
  getOldTrackRatio,
} from "@/lib/features/tracks";

import {
  getReplayRate,
  getRecentOverlap,
} from "@/lib/features/history";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "living in the present huh?",
  "the archive cannot catch you.",
  "today's playlist, today's personality.",
  "musical reincarnation every week.",
];

const MODERATE_NOTES = [
  "the past occasionally calls.",
  "old songs still have a seat at the table.",
  "healthy nostalgia detected.",
  "memory remains stable.",
];

const HIGH_NOTES = [
  "this playlist survived multiple life eras.",
  "the archive remembers everything.",
  "time travel through Spotify confirmed.",
  "your comfort songs never left.",
];

const CRITICAL_NOTES = [
  "girl you're emotionally archived 😭",
  "your 2018 playlist is still employed.",
  "Spotify Wrapped has given up.",
  "we found emotional fossils.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   MEMORY DRAG
========================================== */

export function calculateMemoryDrag(
  dataset: AuraDataset
) {
  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const averageReleaseYear =
    getAverageReleaseYear(dataset);

  const oldTrackRatio =
    getOldTrackRatio(dataset);

  const replayRate =
    getReplayRate(dataset);

  const recentOverlap =
    getRecentOverlap(dataset);

  /* ----------------------------------------
     NORMALIZATION
  ---------------------------------------- */

  const releaseScore = normalize(
    2026 - averageReleaseYear,
    0,
    30
  );

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: releaseScore,
      weight: 40,
    },

    {
      value: oldTrackRatio,
      weight: 30,
    },

    {
      value: replayRate,
      weight: 20,
    },

    {
      value: recentOverlap,
      weight: 10,
    },
  ]);

  /* ----------------------------------------
     MESSAGES
  ---------------------------------------- */

  let archiveMessage = "";
  let interpretation = "";
  let ps = "";

  if (score < 25) {
    archiveMessage =
      "Archive unable to establish temporal anchors. Subject continuously abandons previous listening identities.";

    interpretation =
      "You naturally move toward newer music and rarely let older listening habits define your identity.";

    ps = random(LOW_NOTES);
  } else if (score < 50) {
    archiveMessage =
      "Partial temporal attachment detected. Historical listening patterns remain intermittently active.";

    interpretation =
      "You revisit older music from time to time, but you're comfortable forming new musical identities.";

    ps = random(MODERATE_NOTES);
  } else if (score < 75) {
    archiveMessage =
      "Persistent temporal recursion detected. Historical listening behavior continues influencing present identity.";

    interpretation =
      "Music from different stages of your life continues to shape your current listening habits.";

    ps = random(HIGH_NOTES);
  } else {
    archiveMessage =
      "Severe temporal anchoring detected. Subject demonstrates exceptional resistance to abandoning historical emotional signatures.";

    interpretation =
      "Your older music isn't just nostalgic—it's become part of your emotional identity and continues to influence how you experience new music.";

    ps = random(CRITICAL_NOTES);
  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `Average release year: ${Math.round(
      averageReleaseYear
    )}.`,
    `${oldTrackRatio.toFixed(
      1
    )}% of analyzed tracks predate the nostalgia threshold.`,
    `Replay rate: ${replayRate.toFixed(1)}%.`,
    `Recent overlap: ${recentOverlap.toFixed(1)}%.`,
  ];

  /* ----------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const confidence = Math.min(
    100,
    75 +
      (dataset.topTracks.length / 50) * 15 +
      (dataset.recentTracks.length / 50) * 10
  );

  /* ----------------------------------------
     RETURN
  ---------------------------------------- */

  return createMetric({
    id: "memory-drag",

    title: "Memory Drag",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}