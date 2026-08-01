import { IntelligenceProfile } from "./types";

import { buildIdentityProfile } from "./identity";
import { buildBehaviourProfile } from "./behaviour";
import { buildMusicProfile } from "./music";
import { buildArchiveProfile } from "./archive";

import {
  getDataset,
  getMetrics,
} from "@/lib/aura/store";

import { buildReasoning } from "@/lib/aura/reasoning";

/* ==========================================
   INTELLIGENCE BUILDER
========================================== */

export function buildIntelligenceProfile(): IntelligenceProfile {

  const dataset = getDataset();

  if (!dataset) {
    throw new Error("Spotify dataset unavailable.");
  }

  const metrics = getMetrics();

  const reasoning = buildReasoning(metrics);

  return {

    identity: buildIdentityProfile(
      dataset,
      metrics,
      reasoning
    ),

    behaviour: buildBehaviourProfile(
      dataset
    ),

    music: buildMusicProfile(
      dataset
    ),

    archive: buildArchiveProfile(
      metrics,
      reasoning
    ),

    metrics,

    reasoning,

  };

}