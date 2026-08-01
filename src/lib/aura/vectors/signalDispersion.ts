//It's measuring exploration vs concentration.

import { AuraDataset } from "@/lib/spotify/types";

import { normalize, invert } from "@/lib/engine/normalize";
import { calculateScore } from "@/lib/engine/scorer";
import { createMetric } from "@/lib/engine/createMetric";

import {
  getGenreEntropy,
  getGenreSpread,
  getGenreBalance,
  getUniqueGenres,
  getMainstreamScore,
} from "@/lib/features/genres";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "you found one lane and stayed there.",
  "Spotify's algorithm knows you too well.",
  "comfort zone detected.",
  "genre loyalty is impressive.",
];

const MODERATE_NOTES = [
  "the archive approves of your curiosity.",
  "healthy musical balance detected.",
  "you occasionally surprise yourself.",
  "comfort and curiosity coexist.",
];

const HIGH_NOTES = [
  "musical passport fully stamped.",
  "genre boundaries no longer apply.",
  "the archive lost count.",
  "curiosity drives your listening.",
];

const CRITICAL_NOTES = [
  "girl do you listen to EVERYTHING 😭",
  "Spotify's recommendation AI fears you.",
  "genre classification unsuccessful.",
  "archive unable to contain diversity.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   SIGNAL DISPERSION
========================================== */

export function calculateSignalDispersion(
  dataset: AuraDataset
) {
  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const entropy = getGenreEntropy(dataset);

  const spread = getGenreSpread(dataset);

  const balance = getGenreBalance(dataset);

  const uniqueGenres =
    getUniqueGenres(dataset).length;

  const mainstream =
    getMainstreamScore(dataset);

  /* ----------------------------------------
     NORMALIZATION
  ---------------------------------------- */

  const entropyScore = normalize(
    entropy,
    0,
    5
  );

  const uniqueGenreScore = normalize(
    uniqueGenres,
    1,
    40
  );

  const mainstreamScore = invert(
    mainstream,
    0,
    100
  );

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: entropyScore,
      weight: 35,
    },

    {
      value: spread,
      weight: 25,
    },

    {
      value: balance,
      weight: 20,
    },

    {
      value: uniqueGenreScore,
      weight: 10,
    },

    {
      value: mainstreamScore,
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
      "Auditory spectrum remains highly concentrated. Subject demonstrates consistent preference toward a limited range of musical identities.";

    interpretation =
      "You know exactly what you like and rarely feel the need to explore beyond it.";

    ps = random(LOW_NOTES);
  } else if (score < 50) {
    archiveMessage =
      "Moderate signal dispersion observed. Subject balances familiarity with occasional exploration.";

    interpretation =
      "You enjoy discovering new music, but your listening still revolves around familiar territory.";

    ps = random(MODERATE_NOTES);
  } else if (score < 75) {
    archiveMessage =
      "High auditory dispersion confirmed. Subject comfortably navigates multiple musical identities.";

    interpretation =
      "Your music taste spans a wide range of genres and styles, making variety a core part of your listening.";

    ps = random(HIGH_NOTES);
  } else {
    archiveMessage =
      "Extreme signal dispersion detected. Archive unable to identify stable genre boundaries within subject profile.";

    interpretation =
      "You explore music with exceptional openness. Variety isn't occasional—it's part of how you experience the world.";

    ps = random(CRITICAL_NOTES);
  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `Genre entropy: ${entropy.toFixed(2)}.`,
    `Genre spread: ${spread.toFixed(1)}%.`,
    `Genre balance: ${balance.toFixed(1)}.`,
    `${uniqueGenres} unique genres detected.`,
    `Mainstream affinity: ${mainstream.toFixed(1)}%.`,
  ];

  /* ----------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const confidence = Math.min(
    100,
    80 +
      (uniqueGenres / 40) * 10 +
      (dataset.topArtists.length / 50) * 10
  );

  /* ----------------------------------------
     RETURN
  ---------------------------------------- */

  return createMetric({
    id: "signal-dispersion",

    title: "Signal Dispersion",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}