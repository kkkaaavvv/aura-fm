//Measures how deeply your listening falls into repetitive comfort loops, revealing whether you repeatedly return to the same songs and artists instead of moving on.

import { AuraDataset } from "@/lib/spotify/types";

import { createMetric } from "@/lib/engine/createMetric";
import { calculateScore } from "@/lib/engine/scorer";
import { normalize } from "@/lib/engine/normalize";

import {
  buildReplayGraph,
  getLongestReplayChain,
  getReplayRate,
  getRecentOverlap,
} from "@/lib/features/history";

import {
  getArtistLoyalty,
  getRepeatedArtists,
  getStrongestAnchor,
} from "@/lib/features/artists";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "one play and you're gone.",
  "the archive cannot establish loops.",
  "attention span detected.",
  "your shuffle button deserves a raise.",
];

const MODERATE_NOTES = [
  "some comfort loops detected.",
  "patterns are beginning to emerge.",
  "the archive remembers a few favourites.",
  "recursion remains manageable.",
];

const HIGH_NOTES = [
  "comfort loop confirmed.",
  "your brain found its safe space.",
  "archive entering recursive state.",
  "history repeats itself.",
];

const CRITICAL_NOTES = [
  "girl blink twice 😭",
  "Spotify stopped recommending music.",
  "loop successfully escaped reality.",
  "this playlist has become sentient.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   RECURSION DEPTH
========================================== */

export function calculateRecursionDepth(
  dataset: AuraDataset
) {

  //----------------------------------------
  // Features
  //----------------------------------------

  const replayRate =
    getReplayRate(dataset);

  const overlap =
    getRecentOverlap(dataset);

  const loyalty =
    getArtistLoyalty(dataset);

  const repeatedArtists =
    getRepeatedArtists(dataset);

  const strongestAnchor =
    getStrongestAnchor(dataset);

  const graph =
    buildReplayGraph(dataset);

  const longestChain =
    getLongestReplayChain(graph);

  //----------------------------------------
  // Normalize
  //----------------------------------------

  const repeatScore =
    normalize(repeatedArtists, 0, 25);

  const chainScore =
    normalize(longestChain, 1, 10);

  const anchorScore =
    normalize(strongestAnchor, 1, 10);

  //----------------------------------------
  // Score
  //----------------------------------------

  const score = calculateScore([
    {
      value: replayRate,
      weight: 25,
    },

    {
      value: overlap,
      weight: 20,
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
      value: chainScore,
      weight: 10,
    },

    {
      value: anchorScore,
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
      "Minimal recursive behaviour detected. Listening patterns remain transient.";

    interpretation =
      "You rarely become trapped in listening loops. Your musical attention constantly shifts.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Moderate recursive tendencies observed.";

    interpretation =
      "Certain songs and artists repeatedly return, but exploration still interrupts the cycle.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Persistent recursive behaviour confirmed.";

    interpretation =
      "Comfort listening forms a major part of your musical behaviour.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Recursive depth exceeds archive threshold. Behavioural loops now dominate listening patterns.";

    interpretation =
      "Your listening repeatedly collapses into familiar artists and tracks, creating exceptionally stable behavioural cycles.";

    ps = random(CRITICAL_NOTES);

  }

  //----------------------------------------
  // Evidence
  //----------------------------------------

  const evidence = [
    `Replay rate: ${replayRate.toFixed(1)}%.`,
    `${repeatedArtists} recurring artists detected.`,
    `Longest replay chain: ${longestChain}.`,
    `Strongest anchor: ${strongestAnchor}.`,
    `Recent overlap: ${overlap.toFixed(1)}%.`,
  ];

  //----------------------------------------
  // Confidence
  //----------------------------------------

  const confidence = Math.min(
    100,
    82 +
      (graph.length / 50) * 18
  );

  //----------------------------------------

  return createMetric({
    id: "recursion-depth",

    title: "Recursion Depth",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });

}