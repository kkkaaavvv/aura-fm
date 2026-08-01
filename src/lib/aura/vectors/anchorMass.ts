//"If I took away your Top 5 artists... how much of your musical identity would still remain?"

import { AuraDataset } from "@/lib/spotify/types";

import { normalize } from "@/lib/engine/normalize";
import { calculateScore } from "@/lib/engine/scorer";
import { createMetric } from "@/lib/engine/createMetric";

import {
  getArtistLoyalty,
  getStrongestAnchor,
  getAverageArtistFollowers,
  getAverageArtistPopularity,
} from "@/lib/features/artists";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "independent listener detected.",
  "no artist owns your soul... yet.",
  "the archive appreciates your freedom.",
  "musically self-sufficient.",
];

const MODERATE_NOTES = [
  "a few familiar faces keep returning.",
  "stable musical identity observed.",
  "your favorites have earned their spot.",
  "healthy attachment detected.",
];

const HIGH_NOTES = [
  "these artists practically raised you.",
  "the archive knows exactly who's staying.",
  "comfort artists have permanent residency.",
  "your identity has recognizable pillars.",
];

const CRITICAL_NOTES = [
  "girl they'd better know you personally 😭",
  "your top artist should start paying rent.",
  "identity collapse likely if playlist removed.",
  "archive recommends emotional backup artists.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   ANCHOR MASS
========================================== */

export function calculateAnchorMass(
  dataset: AuraDataset
) {

  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const loyalty = getArtistLoyalty(dataset);

  const strongestAnchor = getStrongestAnchor(dataset);

  const followers = getAverageArtistFollowers(dataset);

  const popularity = getAverageArtistPopularity(dataset);

  /* ----------------------------------------
     NORMALIZATION
  ---------------------------------------- */

  const anchorScore = normalize(
    strongestAnchor,
    1,
    10
  );

  const followerScore = normalize(
    followers,
    0,
    100000000
  );

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: loyalty,
      weight: 40,
    },
    {
      value: anchorScore,
      weight: 30,
    },
    {
      value: followerScore,
      weight: 15,
    },
    {
      value: popularity,
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
      "Identity anchors remain diffuse. No dominant auditory structures detected.";

    interpretation =
      "Your musical identity isn't tied to specific artists. You enjoy music more than musical identities.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Moderate identity anchors established. Subject demonstrates selective long-term attachment.";

    interpretation =
      "A handful of artists have become important parts of your listening history without defining all of it.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Strong identity anchors confirmed. Core listening behaviour consistently references dominant artists.";

    interpretation =
      "Certain artists have become deeply woven into how you experience music and emotion.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Anchor mass exceeds archive thresholds. Subject identity heavily centralized around dominant auditory figures.";

    interpretation =
      "Your favourite artists are more than favourites—they're pillars of your personal identity.";

    ps = random(CRITICAL_NOTES);

  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `Artist loyalty: ${loyalty.toFixed(1)}%.`,
    `Strongest anchor strength: ${strongestAnchor}.`,
    `Average artist popularity: ${popularity.toFixed(1)}.`,
    `Average followers: ${Math.round(followers).toLocaleString()}.`,
  ];

  /* ----------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const confidence = Math.min(
    100,
    82 +
      (dataset.topArtists.length / 50) * 18
  );

  /* ----------------------------------------
     RETURN
  ---------------------------------------- */

  return createMetric({
    id: "anchor-mass",

    title: "Anchor Mass",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}