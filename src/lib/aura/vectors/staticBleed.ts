//Routine vs unpredictability.
//Not what you like.
//Not how much you explore.
//But how predictable your listening behavior is over time.

import { AuraDataset } from "@/lib/spotify/types";

import { createMetric } from "@/lib/engine/createMetric";
import { calculateScore } from "@/lib/engine/scorer";
import { normalize } from "@/lib/engine/normalize";

import {
  getReplayRate,
  getRecentOverlap,
  getRecentArtistRatio,
} from "@/lib/features/history";

import {
  getRepeatedArtists,
  getArtistLoyalty,
} from "@/lib/features/artists";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "your shuffle button is fighting for its life.",
  "predicting you? impossible.",
  "the archive gave up after three songs.",
  "organized chaos detected.",
];

const MODERATE_NOTES = [
  "routine with occasional surprises.",
  "comfortable... but not boring.",
  "the archive is beginning to understand you.",
  "stable behaviour observed.",
];

const HIGH_NOTES = [
  "Spotify could predict tomorrow's playlist.",
  "comfort loops detected.",
  "routine has become a personality trait.",
  "the algorithm loves you.",
];

const CRITICAL_NOTES = [
  "girl do you ever listen to anything else 😭",
  "the archive predicted tomorrow perfectly.",
  "your playlists have unionized.",
  "shuffle has officially resigned.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   STATIC BLEED
========================================== */

export function calculateStaticBleed(
  dataset: AuraDataset
) {
  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const replayRate = getReplayRate(dataset);

  const overlap = getRecentOverlap(dataset);

  const repeatedArtists = getRepeatedArtists(dataset);

  const loyalty = getArtistLoyalty(dataset);

  const recentVariety = getRecentArtistRatio(dataset);

  /* ----------------------------------------
     NORMALIZATION
  ---------------------------------------- */

  const repeatScore = normalize(
    repeatedArtists,
    0,
    25
  );

  const varietyScore = 100 - recentVariety;

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: replayRate,
      weight: 30,
    },
    {
      value: overlap,
      weight: 25,
    },
    {
      value: loyalty,
      weight: 20,
    },
    {
      value: repeatScore,
      weight: 15,
    },
    {
      value: varietyScore,
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
      "Behavioural prediction unsuccessful. Listening patterns remain highly dynamic.";

    interpretation =
      "Your listening routine changes frequently. The Archive struggles to predict what you'll play next.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {
    archiveMessage =
      "Partial routine formation detected. Behaviour remains moderately adaptable.";

    interpretation =
      "You balance familiar favourites with enough variation to keep your listening fresh.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {
    archiveMessage =
      "Stable behavioural loops confirmed. Listening routine exhibits strong repetition.";

    interpretation =
      "You naturally fall back into familiar listening habits. Music has become part of your daily rhythm.";

    ps = random(HIGH_NOTES);

  } else {
    archiveMessage =
      "Behavioural recursion exceeds predictive threshold. Archive successfully forecasts future listening behaviour.";

    interpretation =
      "Your music routine is remarkably consistent. Familiar artists and playlists form the backbone of your listening.";

    ps = random(CRITICAL_NOTES);
  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `Replay rate: ${replayRate.toFixed(1)}%.`,
    `Recent overlap: ${overlap.toFixed(1)}%.`,
    `${repeatedArtists} recurring artists detected.`,
    `Artist loyalty: ${loyalty.toFixed(1)}%.`,
  ];

  /* ----------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const confidence = Math.min(
    100,
    80 +
      (dataset.recentTracks.length / 50) * 20
  );

  /* ----------------------------------------
     RETURN
  ---------------------------------------- */

  return createMetric({
    id: "static-bleed",

    title: "Static Bleed",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}