//How willing are you to discover unfamiliar music?

import { AuraDataset } from "@/lib/spotify/types";

import { normalize, invert } from "@/lib/engine/normalize";
import { calculateScore } from "@/lib/engine/scorer";
import { createMetric } from "@/lib/engine/createMetric";

import {
  getUniqueArtists,
  getAverageArtistPopularity,
} from "@/lib/features/artists";

import {
  getUniqueGenres,
} from "@/lib/features/genres";

import {
  getRecentArtistRatio,
} from "@/lib/features/history";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "Spotify's algorithm retired years ago.",
  "comfort zone successfully maintained.",
  "your playlists rarely surprise you.",
  "consistency over curiosity.",
];

const MODERATE_NOTES = [
  "occasional rabbit holes detected.",
  "you explore... when the mood is right.",
  "curiosity remains stable.",
  "the archive noticed a few detours.",
];

const HIGH_NOTES = [
  "genre tourism confirmed.",
  "Spotify recommendations work overtime.",
  "new music friday never ends.",
  "you collect artists like Pokémon.",
];

const CRITICAL_NOTES = [
  "girl there are only so many artists 😭",
  "archive unable to predict next obsession.",
  "recommendation engine overwhelmed.",
  "your Discover Weekly needs therapy.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   SIGNAL HORIZONS
========================================== */

export function calculateSignalHorizons(
  dataset: AuraDataset
) {

  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const uniqueArtists =
    getUniqueArtists(dataset).length;

  const recentArtistRatio =
    getRecentArtistRatio(dataset);

  const uniqueGenres =
    getUniqueGenres(dataset).length;

  const averagePopularity =
    getAverageArtistPopularity(dataset);

  /* ----------------------------------------
     NORMALIZATION
  ---------------------------------------- */

  const artistScore = normalize(
    uniqueArtists,
    1,
    120
  );

  const genreScore = normalize(
    uniqueGenres,
    1,
    40
  );

  const popularityScore = invert(
    averagePopularity,
    0,
    100
  );

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: artistScore,
      weight: 35,
    },

    {
      value: recentArtistRatio,
      weight: 30,
    },

    {
      value: genreScore,
      weight: 20,
    },

    {
      value: popularityScore,
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
      "Exploratory behaviour remains minimal. Subject consistently favours established auditory environments.";

    interpretation =
      "You value familiarity over discovery. Once you find music you love, you're happy staying with it.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Periodic exploratory behaviour detected. Subject occasionally exits established listening patterns.";

    interpretation =
      "You enjoy discovering new artists, but your listening still revolves around familiar favourites.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Sustained exploratory behaviour confirmed. Subject demonstrates above-average musical curiosity.";

    interpretation =
      "Exploring new artists and sounds is part of your musical identity rather than an occasional event.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Exploration thresholds exceeded. Archive unable to establish stable predictive listening boundaries.";

    interpretation =
      "Curiosity is one of your strongest listening traits. You're constantly searching for new sounds and rarely remain confined to one musical space.";

    ps = random(CRITICAL_NOTES);

  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `${uniqueArtists} unique artists identified.`,
    `${uniqueGenres} unique genres catalogued.`,
    `Recent artist diversity: ${recentArtistRatio.toFixed(
      1
    )}%.`,
    `Average artist popularity: ${averagePopularity.toFixed(
      1
    )}.`,
  ];

  /* ----------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const confidence = Math.min(
    100,
    80 +
      (dataset.topArtists.length / 50) * 10 +
      (dataset.topTracks.length / 50) * 10
  );

  /* ----------------------------------------
     RETURN
  ---------------------------------------- */

  return createMetric({
    id: "signal-horizons",

    title: "Signal Horizons",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}