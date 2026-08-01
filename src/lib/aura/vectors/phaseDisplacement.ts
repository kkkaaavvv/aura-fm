//It measures how much the user's current listening identity drifts from their established listening identity using recents vs top artists/tracks.

import { AuraDataset } from "@/lib/spotify/types";

import { createMetric } from "@/lib/engine/createMetric";
import { calculateScore } from "@/lib/engine/scorer";
import { normalize } from "@/lib/engine/normalize";

import {
  getRecentOverlap,
  getRecentArtistRatio,
  getReplayRate,
} from "@/lib/features/history";

import {
  getArtistLoyalty,
  getRepeatedArtists,
} from "@/lib/features/artists";

import {
  getGenreEntropy,
  getGenreSpread,
} from "@/lib/features/genres";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "same software, new day.",
  "your musical identity is remarkably stable.",
  "the archive found very little drift.",
  "consistency level: impressive.",
];

const MODERATE_NOTES = [
  "small identity shifts detected.",
  "you're slowly evolving.",
  "the archive noticed a few new patterns.",
  "change arrives gradually.",
];

const HIGH_NOTES = [
  "identity drift accelerating.",
  "your playlists are becoming someone else.",
  "the archive is updating your profile.",
  "behaviour evolving rapidly.",
];

const CRITICAL_NOTES = [
  "girl who even are you this week 😭",
  "identity migration in progress.",
  "the archive almost made a second profile.",
  "behavioural mutation detected.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   PHASE DISPLACEMENT
========================================== */

export function calculatePhaseDisplacement(
  dataset: AuraDataset
) {

  //----------------------------------------
  // Features
  //----------------------------------------

  const overlap =
    getRecentOverlap(dataset);

  const artistRatio =
    getRecentArtistRatio(dataset);

  const replayRate =
    getReplayRate(dataset);

  const loyalty =
    getArtistLoyalty(dataset);

  const repeatedArtists =
    getRepeatedArtists(dataset);

  const entropy =
    getGenreEntropy(dataset);

  const spread =
    getGenreSpread(dataset);

  //----------------------------------------
  // Drift Scores
  //----------------------------------------

  const overlapDrift =
    100 - overlap;

  const loyaltyDrift =
    100 - loyalty;

  const replayDrift =
    100 - replayRate;

  const repeatScore =
    100 - normalize(
      repeatedArtists,
      0,
      25
    );

  const entropyScore =
    normalize(
      entropy,
      0,
      5
    );

  //----------------------------------------
  // Final Score
  //----------------------------------------

  const score = calculateScore([
    {
      value: overlapDrift,
      weight: 25,
    },

    {
      value: loyaltyDrift,
      weight: 20,
    },

    {
      value: artistRatio,
      weight: 20,
    },

    {
      value: replayDrift,
      weight: 15,
    },

    {
      value: entropyScore,
      weight: 10,
    },

    {
      value: spread,
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
      "Minimal phase displacement detected. Behaviour remains aligned with historical listening patterns.";

    interpretation =
      "Your musical identity changes very slowly. Long-term preferences continue to dominate your listening behaviour.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Moderate identity drift observed.";

    interpretation =
      "Your listening habits are evolving while still retaining recognizable behavioural anchors.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Significant behavioural displacement confirmed.";

    interpretation =
      "Your recent listening suggests an actively evolving musical identity with increasing divergence from past habits.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Extreme phase displacement detected. Archive considers current listening behaviour substantially different from established identity.";

    interpretation =
      "You appear to be entering a new musical phase. Recent behaviour differs enough that the Archive has reduced confidence in historical predictions.";

    ps = random(CRITICAL_NOTES);

  }

  //----------------------------------------
  // Evidence
  //----------------------------------------

  const evidence = [
    `Recent overlap: ${overlap.toFixed(1)}%.`,
    `Recent artist diversity: ${artistRatio.toFixed(1)}%.`,
    `Artist loyalty: ${loyalty.toFixed(1)}%.`,
    `Replay rate: ${replayRate.toFixed(1)}%.`,
    `Genre entropy: ${entropy.toFixed(2)}.`,
  ];

  //----------------------------------------
  // Confidence
  //----------------------------------------

  const confidence = Math.min(
    100,
    80 +
      (dataset.topArtists.length / 50) * 10 +
      (dataset.recentTracks.length / 50) * 10
  );

  //----------------------------------------

  return createMetric({

    id: "phase-displacement",

    title: "Phase Displacement",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,

  });

}