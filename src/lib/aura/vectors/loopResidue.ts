//Measures replay residue—the lingering repetition left after removing obvious repeats.
//Distinct from Recursion Depth: that vector measures OBVIOUS loops (consecutive
//back-to-back replays). This one measures what's left over once those are excluded —
//tracks that quietly resurface later in your history without you immediately looping them.

import { AuraDataset } from "@/lib/spotify/types";

import { normalize } from "@/lib/engine/normalize";
import { calculateScore } from "@/lib/engine/scorer";
import { createMetric } from "@/lib/engine/createMetric";

import {
  buildReplayGraph,
  getLongestReplayChain,
  getReplayRate,
} from "@/lib/features/history";

/* ==========================================
   PS NOTES
========================================== */

const LOW_NOTES = [
  "once played, rarely revisited.",
  "the archive found no ghosts here.",
  "clean listening history detected.",
  "nothing lingers.",
];

const MODERATE_NOTES = [
  "a few songs keep quietly returning.",
  "faint echoes detected.",
  "the archive noticed some residue.",
  "nothing haunting... yet.",
];

const HIGH_NOTES = [
  "these songs keep finding their way back.",
  "residual attachment confirmed.",
  "the archive keeps tripping over the same tracks.",
  "some songs never really left.",
];

const CRITICAL_NOTES = [
  "girl this song is basically squatting in your history 😭",
  "residue this deep isn't a coincidence.",
  "the archive suspects unfinished business.",
  "these tracks refuse to be forgotten.",
];

function random<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

/* ==========================================
   LOOP RESIDUE
========================================== */

export function calculateLoopResidue(
  dataset: AuraDataset
) {

  /* ----------------------------------------
     FEATURES
  ---------------------------------------- */

  const graph = buildReplayGraph(dataset);

  const longestChain = getLongestReplayChain(graph);

  const replayRate = getReplayRate(dataset);

  /* ----------------------------------------
     FREQUENCY MAP (recent play sequence only)
  ---------------------------------------- */

  const frequency = new Map<string, number>();

  graph.forEach((id) => {
    frequency.set(id, (frequency.get(id) ?? 0) + 1);
  });

  /* ----------------------------------------
     ADJACENT (OBVIOUS) REPEATS
  ---------------------------------------- */

  let adjacentRepeats = 0;

  for (let i = 1; i < graph.length; i++) {
    if (graph[i] === graph[i - 1]) {
      adjacentRepeats++;
    }
  }

  /* ----------------------------------------
     TOTAL REPEAT EVENTS
  ---------------------------------------- */

  let totalRepeatEvents = 0;

  frequency.forEach((count) => {
    if (count > 1) {
      totalRepeatEvents += count - 1;
    }
  });

  /* ----------------------------------------
     RESIDUE (repeats NOT explained by adjacency)
  ---------------------------------------- */

  const residueEvents = Math.max(
    0,
    totalRepeatEvents - adjacentRepeats
  );

  const residueRatio = graph.length
    ? (residueEvents / graph.length) * 100
    : 0;

  /* ----------------------------------------
     NORMALIZATION
  ---------------------------------------- */

  const residueEventScore = normalize(
    residueEvents,
    0,
    15
  );

  /* ----------------------------------------
     SCORE
  ---------------------------------------- */

  const score = calculateScore([
    {
      value: residueRatio,
      weight: 50,
    },

    {
      value: residueEventScore,
      weight: 30,
    },

    {
      value: replayRate,
      weight: 20,
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
      "Minimal replay residue detected. Repetition, where present, remains fully explained by immediate replays.";

    interpretation =
      "Once you move on from a song, it tends to stay in the past. Very little quietly resurfaces later.";

    ps = random(LOW_NOTES);

  } else if (score < 50) {

    archiveMessage =
      "Moderate replay residue observed. Some tracks resurface outside of obvious replay chains.";

    interpretation =
      "A handful of songs quietly reappear in your history well after you'd seemingly moved on.";

    ps = random(MODERATE_NOTES);

  } else if (score < 75) {

    archiveMessage =
      "Persistent replay residue confirmed. Behaviour extends well beyond immediate repetition.";

    interpretation =
      "Certain songs keep resurfacing in your listening long after the obvious repeats have ended.";

    ps = random(HIGH_NOTES);

  } else {

    archiveMessage =
      "Replay residue exceeds archive thresholds. Repetition is not confined to obvious replay behaviour.";

    interpretation =
      "Songs in your history don't just get replayed—they linger, resurfacing again and again well outside any obvious loop.";

    ps = random(CRITICAL_NOTES);

  }

  /* ----------------------------------------
     EVIDENCE
  ---------------------------------------- */

  const evidence = [
    `${residueEvents} replay residue event(s) detected.`,
    `${adjacentRepeats} immediate repeat(s) excluded as obvious repetition.`,
    `Residue ratio: ${residueRatio.toFixed(1)}%.`,
    `Longest immediate replay chain: ${longestChain}.`,
  ];

  /* ----------------------------------------
     CONFIDENCE
  ---------------------------------------- */

  const confidence = Math.min(
    100,
    78 +
      (dataset.recentTracks.length / 50) * 22
  );

  /* ----------------------------------------
     RETURN
  ---------------------------------------- */

  return createMetric({
    id: "loop-residue",

    title: "Loop Residue",

    score,

    confidence,

    archiveMessage,

    interpretation,

    ps,

    evidence,
  });
}