//How internally consistent is your musical identity?

import { AuraDataset } from "@/lib/spotify/types";

import { createMetric } from "@/lib/engine/createMetric";
import { calculateScore } from "@/lib/engine/scorer";
import { invert } from "@/lib/engine/normalize";

import {
  getArtistLoyalty,
} from "@/lib/features/artists";

import {
  getGenreBalance,
  getGenreEntropy,
} from "@/lib/features/genres";

import {
  getReplayRate,
} from "@/lib/features/history";

import {
  getAverageTrackPopularity,
} from "@/lib/features/tracks";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "respectfully... what is going on 😭",
  "the archive is confused.",
  "your playlists have identity crises.",
  "multiple personalities detected.",
];

const MODERATE_NOTES = [
  "minor contradictions observed.",
  "identity remains mostly stable.",
  "the archive can follow... mostly.",
  "controlled inconsistency.",
];

const HIGH_NOTES = [
  "strong behavioural consistency.",
  "your music knows exactly who it is.",
  "archive classification stabilized.",
  "cohesive listening identity.",
];

const CRITICAL_NOTES = [
  "the archive could profile you blindfolded.",
  "identity remarkably coherent.",
  "musical DNA successfully reconstructed.",
  "behavioural consistency exceeds expectations.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   INTEGRITY INDEX
========================================== */

export function calculateIntegrityIndex(
  dataset: AuraDataset
) {

  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const loyalty = getArtistLoyalty(dataset);

  const replay = getReplayRate(dataset);

  const balance = getGenreBalance(dataset);

  const entropy = getGenreEntropy(dataset);

  const popularity =
    getAverageTrackPopularity(dataset);

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: loyalty,
      weight: 25,
    },

    {
      value: replay,
      weight: 25,
    },

    {
      value: balance,
      weight: 25,
    },

    {
      value: invert(entropy, 0, 5),
      weight: 15,
    },

    {
      value: popularity,
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
      "Archive unable to establish behavioural consistency.";

    interpretation =
      "Your listening constantly shifts between different identities, making long-term behavioural prediction difficult.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Partial consistency observed across behavioural vectors.";

    interpretation =
      "Some aspects of your listening remain stable while others change frequently.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Stable behavioural framework detected.";

    interpretation =
      "Your listening habits consistently reinforce the same musical identity.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Behavioural integrity exceeds expected archive thresholds.";

    interpretation =
      "Your musical preferences form an unusually coherent identity, making future behaviour highly predictable.";

    ps = random(CRITICAL_NOTES);

  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `Artist loyalty: ${loyalty.toFixed(1)}%.`,
    `Replay rate: ${replay.toFixed(1)}%.`,
    `Genre balance: ${balance.toFixed(1)}.`,
    `Genre entropy: ${entropy.toFixed(2)}.`,
    `Average popularity: ${popularity.toFixed(1)}.`,
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
    id: "integrity-index",

    title: "Integrity Index",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}