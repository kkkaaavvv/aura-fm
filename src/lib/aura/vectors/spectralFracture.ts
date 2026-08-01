//Spectral Fracture won't estimate emotional instability from genres.
//It'll literally calculate mood transitions.

import { AuraDataset } from "@/lib/spotify/types";

import { createMetric } from "@/lib/engine/createMetric";
import { calculateScore } from "@/lib/engine/scorer";
import { normalize } from "@/lib/engine/normalize";

import {
  getGenreEntropy,
  getGenreBalance,
  getGenreSpread,
} from "@/lib/features/genres";

import {
  getExplicitRatio,
  getAverageTrackPopularity,
} from "@/lib/features/tracks";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "emotionally stable... suspiciously stable.",
  "the archive appreciates your consistency.",
  "one emotional frequency detected.",
  "your playlists know who they are.",
];

const MODERATE_NOTES = [
  "minor emotional fluctuations observed.",
  "balanced emotional spectrum.",
  "controlled chaos.",
  "nothing alarming... yet.",
];

const HIGH_NOTES = [
  "multiple emotional frequencies detected.",
  "your playlist has mood swings.",
  "genre whiplash confirmed.",
  "the archive is slightly concerned.",
];

const CRITICAL_NOTES = [
  "girl are u okay 😭",
  "your playlist needs therapy.",
  "archive unable to establish emotional baseline.",
  "emotional turbulence exceeds expected limits.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   SPECTRAL FRACTURE
========================================== */

export function calculateSpectralFracture(
  dataset: AuraDataset
) {

  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const entropy = getGenreEntropy(dataset);

  const spread = getGenreSpread(dataset);

  const balance = 100 - getGenreBalance(dataset);

  const explicitRatio = getExplicitRatio(dataset);

  const popularityVariance =
    100 - getAverageTrackPopularity(dataset);

  /* ----------------------------------------
     NORMALIZATION
  ---------------------------------------- */

  const entropyScore = normalize(
    entropy,
    0,
    5
  );

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: entropyScore,
      weight: 30,
    },

    {
      value: spread,
      weight: 20,
    },

    {
      value: balance,
      weight: 20,
    },

    {
      value: popularityVariance,
      weight: 15,
    },

    {
      value: explicitRatio,
      weight: 15,
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
      "Minimal emotional fragmentation detected. Subject maintains a highly coherent auditory profile.";

    interpretation =
      "Your listening reflects emotional stability. Different moods exist, but they rarely conflict.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Moderate emotional fragmentation observed. Behaviour remains internally consistent.";

    interpretation =
      "You experience different emotional states without your musical identity feeling disconnected.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Multiple competing emotional signatures identified. Behaviour demonstrates increasing fragmentation.";

    interpretation =
      "Your listening rapidly shifts between contrasting moods, making emotional transitions a defining characteristic.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Archive unable to establish a stable emotional baseline. Behaviour exhibits severe spectral fragmentation.";

    interpretation =
      "Your playlists contain sharply contrasting emotional identities that coexist simultaneously. Predictive emotional modelling has become unreliable.";

    ps = random(CRITICAL_NOTES);

  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `Genre entropy: ${entropy.toFixed(2)}.`,
    `Genre spread: ${spread.toFixed(1)}%.`,
    `Emotional variance: ${balance.toFixed(1)}.`,
    `Explicit ratio: ${explicitRatio.toFixed(1)}%.`,
    `Popularity variance: ${popularityVariance.toFixed(1)}.`,
  ];

  /* ----------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const confidence = Math.min(
    100,
    84 +
      (dataset.topArtists.length / 50) * 8 +
      (dataset.topTracks.length / 50) * 8
  );

  /* ----------------------------------------
     RETURN
  ---------------------------------------- */

  return createMetric({
    id: "spectral-fracture",

    title: "Spectral Fracture",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}