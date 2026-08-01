import { ArchiveProfile } from "./types";

import { MetricResult } from "@/lib/analysis/types";

import { ReasoningResult } from "@/lib/aura/reasoning";

/* ==========================================
   HELPERS
========================================== */

function average(...values: number[]) {
  if (!values.length) return 0;

  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}

/* ==========================================
   ARCHIVE PROFILE
========================================== */

export function buildArchiveProfile(
  metrics: MetricResult[],
  reasoning: ReasoningResult
): ArchiveProfile {

  const confidence = average(
    ...metrics.map((metric) => metric.confidence)
  );

  return {

    /* -------------------------------------- */
    /* Classification Status                  */
    /* -------------------------------------- */

    status: reasoning.archiveStatus,

    /* -------------------------------------- */
    /* Overall confidence                     */
    /* -------------------------------------- */

    confidence,

    /* -------------------------------------- */
    /* Strongest psychological dimension      */
    /* -------------------------------------- */

    dominantDimension:
      reasoning.dominantDimension.title,

    /* -------------------------------------- */
    /* Weakest psychological dimension        */
    /* -------------------------------------- */

    weakestDimension:
      reasoning.weakestDimension.title,

    /* -------------------------------------- */
    /* Internal contradictions                */
    /* -------------------------------------- */

    contradictions:
      reasoning.contradictions.map(
        (item) => item.title
      ),

    /* -------------------------------------- */
    /* Hidden personality traits              */
    /* -------------------------------------- */

    hiddenTraits:
      reasoning.hiddenTraits.map(
        (item) => item.title
      ),

  };

}