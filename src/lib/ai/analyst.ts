import { IntelligenceProfile } from "@/lib/intelligence/types";

import { buildAIContext } from "./context";

import { buildPrompt } from "./prompt";

import { generateReport } from "./client";

import { parseReport } from "./parser";

import {
  AIResponse,
  AnalystOptions,
} from "./types";

/* ==========================================
   ANALYSIS.EXE
========================================== */

export async function generateArchiveReport(
  profile: IntelligenceProfile,
  options?: AnalystOptions
): Promise<AIResponse> {

  /* -------------------------------------- */
  /* Build AI Context                       */
  /* -------------------------------------- */

  const context =
    buildAIContext(profile);

  /* -------------------------------------- */
  /* Build Prompt                           */
  /* -------------------------------------- */

  const prompt =
    buildPrompt(context);

  /* -------------------------------------- */
  /* Generate Report                        */
  /* -------------------------------------- */

  const raw =
    await generateReport(
      prompt.system,
      prompt.user,
      options
    );

  /* -------------------------------------- */
  /* Parse Report                           */
  /* -------------------------------------- */

  return parseReport(raw);

}