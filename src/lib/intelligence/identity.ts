import { AuraDataset } from "@/lib/spotify/types";

import { MetricResult } from "@/lib/analysis/types";

import { ReasoningResult } from "@/lib/aura/reasoning";

import { IdentityProfile } from "./types";

import {
  getIdentityStability,
} from "@/lib/features/behaviour";

import {
  getArtistLoyalty,
} from "@/lib/features/artists";

/* ==========================================
   HELPERS
========================================== */

function metric(
  metrics: MetricResult[],
  id: string
) {
  return metrics.find((m) => m.id === id);
}

function average(...values: number[]) {
  if (!values.length) return 0;

  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}

/* ==========================================
   IDENTITY PROFILE
========================================== */

export function buildIdentityProfile(
  dataset: AuraDataset,
  metrics: MetricResult[],
  reasoning: ReasoningResult
): IdentityProfile {

  const echo =
    metric(metrics, "internal-echo")?.score ?? 0;

  const anchor =
    metric(metrics, "anchor-mass")?.score ?? 0;

  const dispersion =
    metric(metrics, "signal-dispersion")?.score ?? 0;

  const fracture =
    metric(metrics, "spectral-fracture")?.score ?? 0;

  return {

    /* -------------------------------------- */
    /* Overall identity stability             */
    /* -------------------------------------- */

    stability:
      getIdentityStability(dataset),

    /* -------------------------------------- */
    /* Musical exploration                    */
    /* -------------------------------------- */

    exploration:
      dispersion,

    /* -------------------------------------- */
    /* Emotional attachment                   */
    /* -------------------------------------- */

    emotionalAnchoring:
      average(
        echo,
        anchor,
        getArtistLoyalty(dataset)
      ),

    /* -------------------------------------- */
    /* Adaptability                           */
    /* -------------------------------------- */

    adaptability:
      100 - fracture,

    /* -------------------------------------- */
    /* Dominant behavioural traits            */
    /* -------------------------------------- */

    dominantTraits: [

      ...reasoning.dominantBehaviours,

      ...reasoning.hiddenTraits.map(
        (trait) => trait.title
      ),

    ],

  };

}