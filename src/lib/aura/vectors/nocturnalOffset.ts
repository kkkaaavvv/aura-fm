//"Does a different version of you emerge after dark?"

import { AuraDataset } from "@/lib/spotify/types";

import { createMetric } from "@/lib/engine/createMetric";
import { calculateScore } from "@/lib/engine/scorer";
import { normalize } from "@/lib/engine/normalize";

import {
  getListeningProfile,
  compareProfiles,
  getNightListeningRatio,
  getMostActiveHour,
} from "@/lib/features/history";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "same person. different lighting.",
  "the archive detected no alter ego.",
  "night behaves much like day.",
  "stable circadian identity.",
];

const MODERATE_NOTES = [
  "small personality drift detected.",
  "late-night thoughts remain contained.",
  "slight behavioural shift observed.",
  "nothing too mysterious.",
];

const HIGH_NOTES = [
  "the night version of you has opinions.",
  "after-hours identity emerging.",
  "circadian divergence confirmed.",
  "the archive prefers not to interrupt.",
];

const CRITICAL_NOTES = [
  "WHO ARE YOU AFTER MIDNIGHT 😭",
  "secondary identity detected.",
  "night archive unlocked.",
  "the 2 AM playlist knows secrets.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   NOCTURNAL OFFSET
========================================== */

export function calculateNocturnalOffset(
  dataset: AuraDataset
) {

  //----------------------------------------
  // Profiles
  //----------------------------------------

  const day =
    getListeningProfile(dataset, "day");

  const night =
    getListeningProfile(dataset, "night");

  const comparison =
    compareProfiles(day, night);

  const nightRatio =
    getNightListeningRatio(dataset);

  const activeHour =
    getMostActiveHour(dataset);

  //----------------------------------------
  // Normalize
  //----------------------------------------

  const artistShift =
    normalize(
      comparison.artistDifference,
      0,
      20
    );

  const genreShift =
    normalize(
      comparison.genreDifference,
      0,
      20
    );

  const durationShift =
    normalize(
      comparison.durationDifference,
      0,
      6
    );

  //----------------------------------------
  // Score
  //----------------------------------------

  const score = calculateScore([
    {
      value: artistShift,
      weight: 25,
    },

    {
      value: genreShift,
      weight: 25,
    },

    {
      value: comparison.popularityDifference,
      weight: 15,
    },

    {
      value: durationShift,
      weight: 15,
    },

    {
      value: comparison.explicitDifference,
      weight: 10,
    },

    {
      value: nightRatio,
      weight: 10,
    },
  ]);

  //----------------------------------------
  // Messages
  //----------------------------------------

  let archiveMessage = "";
  let interpretation = "";
  let ps = "";

  if (score < 25) {

    archiveMessage =
      "Minimal circadian deviation detected. Subject maintains a consistent auditory identity throughout the day.";

    interpretation =
      "Your nighttime listening closely mirrors your daytime habits, suggesting a stable musical identity.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Moderate behavioural drift observed after sunset.";

    interpretation =
      "Your music changes slightly as the day progresses, reflecting subtle shifts in mood and energy.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Persistent nocturnal behavioural divergence confirmed.";

    interpretation =
      "Nighttime unlocks a noticeably different side of your listening personality.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Significant circadian identity displacement detected. Archive classifies daytime and nighttime behaviour as distinct listening profiles.";

    interpretation =
      "The person who listens after midnight appears to have very different emotional and musical preferences from your daytime self.";

    ps = random(CRITICAL_NOTES);

  }

  //----------------------------------------
  // Evidence
  //----------------------------------------

  const evidence = [
    `Night listening ratio: ${nightRatio.toFixed(1)}%.`,
    `Artist shift: ${comparison.artistDifference}.`,
    `Genre shift: ${comparison.genreDifference}.`,
    `Profile similarity: ${comparison.similarity.toFixed(1)}%.`,
    `Most active hour: ${activeHour ?? "Unknown"}:00.`,
  ];

  //----------------------------------------
  // Confidence
  //----------------------------------------

  const confidence = Math.min(
    100,
    82 +
      (dataset.recentTracks.length / 50) * 18
  );

  //----------------------------------------

  return createMetric({

    id: "nocturnal-offset",

    title: "Nocturnal Offset",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,

  });

}