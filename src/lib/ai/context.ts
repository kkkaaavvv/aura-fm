import { IntelligenceProfile } from "@/lib/intelligence/types";

import { AIContext } from "./types";

/* ==========================================
   AI CONTEXT
========================================== */

export function buildAIContext(
  profile: IntelligenceProfile
): AIContext {

  return {

    profile,

    generatedAt: new Date().toISOString(),

    version: "Aura.fm v1.0",

  };

}