import { buildIntelligenceProfile } from "@/lib/intelligence/builder";

import { generateArchiveReport } from "@/lib/ai";

import {
  setArchiveReport,
} from "@/lib/aura/store";

/* ==========================================
   ANALYSIS PIPELINE
========================================== */

export async function runAnalysisPipeline() {

  /* -------------------------------------- */
  /* Intelligence                          */
  /* -------------------------------------- */

  const intelligence =
    buildIntelligenceProfile();

  /* -------------------------------------- */
  /* AI Analysis                           */
  /* -------------------------------------- */

  const response =
    await generateArchiveReport(
      intelligence
    );

  /* -------------------------------------- */
  /* Store                                 */
  /* -------------------------------------- */

  setArchiveReport(
    response.report
  );

  return response.report;

}