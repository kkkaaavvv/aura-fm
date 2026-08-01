import { buildReasoning } from "@/lib/aura/reasoning";
import {
  getMetrics,
  getDataset,
  getTheme,
  getBirthDate,
} from "@/lib/aura/store";

import { DossierData } from "./types";

export function buildDossier(): DossierData {
  const metrics = getMetrics();
  const dataset = getDataset();
  const theme = getTheme();
  const birthDate = getBirthDate();

  if (!dataset) {
    throw new Error("Spotify dataset unavailable.");
  }

  const reasoning = buildReasoning(metrics);

  return {
    profile: {
      id: dataset.profile.id,
      name: dataset.profile.display_name,
      country: dataset.profile.country,
      product: dataset.profile.product,
      followers: dataset.profile.followers.total,
      image:
        dataset.profile.images?.[0]?.url ?? null,
    },

    artists: dataset.topArtists,

    tracks: dataset.topTracks,

    recentTracks: dataset.recentTracks,

    genres: dataset.topGenres,

    metrics,

    reasoning,

    theme,

    birthDate,

    generatedAt: new Date().toISOString(),
  };
}