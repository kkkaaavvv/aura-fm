import { AuraDataset } from "@/lib/spotify/types";

import { BehaviourProfile } from "./types";

import {
  getListeningConsistency,
  getReplayDensity,
  getCircadianProfile,
  getArchiveConfidence,
} from "@/lib/features/behaviour";

/* ==========================================
   BEHAVIOUR PROFILE
========================================== */

export function buildBehaviourProfile(
  dataset: AuraDataset
): BehaviourProfile {

  const circadian = getCircadianProfile(dataset);

  let bias: "DAY" | "BALANCED" | "NIGHT" =
    "BALANCED";

  if (circadian.nightRatio >= 60) {
    bias = "NIGHT";
  } else if (circadian.nightRatio <= 40) {
    bias = "DAY";
  }

  let dominantBehaviour = "Balanced Listener";

  const consistency =
    getListeningConsistency(dataset);

  const replay =
    getReplayDensity(dataset);

  if (replay >= 75) {
    dominantBehaviour =
      "Emotional Revisitor";
  } else if (consistency >= 75) {
    dominantBehaviour =
      "Habitual Listener";
  } else if (consistency <= 40) {
    dominantBehaviour =
      "Exploratory Listener";
  }

  return {

    consistency,

    replayDensity: replay,

    circadianBias: bias,

    archiveConfidence:
      getArchiveConfidence(dataset),

    dominantBehaviour,

  };

}
