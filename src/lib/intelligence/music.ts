import { AuraDataset } from "@/lib/spotify/types";

import { MusicProfile } from "./types";

import {
  getDominantGenre,
  getGenreSpread,
  getMainstreamScore,
  getNicheScore,
} from "@/lib/features/genres";

import {
  getExplicitRatio,
  getAverageTrackPopularity,
} from "@/lib/features/tracks";

/* ==========================================
   MUSIC PROFILE
========================================== */

export function buildMusicProfile(
  dataset: AuraDataset
): MusicProfile {

  return {

    /* -------------------------------------- */
    /* Primary musical identity               */
    /* -------------------------------------- */

    dominantGenre:
      getDominantGenre(dataset),

    /* -------------------------------------- */
    /* Musical diversity                      */
    /* -------------------------------------- */

    diversity:
      getGenreSpread(dataset),

    /* -------------------------------------- */
    /* Preference toward popular music        */
    /* -------------------------------------- */

    mainstreamAffinity:
      getMainstreamScore(dataset),

    /* -------------------------------------- */
    /* Preference toward niche music          */
    /* -------------------------------------- */

    nicheAffinity:
      getNicheScore(dataset),

    /* -------------------------------------- */
    /* Explicit content                       */
    /* -------------------------------------- */

    explicitRatio:
      getExplicitRatio(dataset),

    /* -------------------------------------- */
    /* Average popularity                     */
    /* -------------------------------------- */

    averagePopularity:
      getAverageTrackPopularity(dataset),

  };

}