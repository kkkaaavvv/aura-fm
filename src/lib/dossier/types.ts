import { MetricResult } from "@/lib/analysis/types";
import { ReasoningResult } from "@/lib/aura/reasoning";
import {
  AuraTheme,
} from "@/lib/aura/types";

import {
  SpotifyArtist,
  SpotifyTrack,
} from "@/lib/spotify/types";

export interface SubjectProfile {
  id: string;

  name: string;

  country: string;

  product: string;

  followers: number;

  image: string | null;
}

export interface DossierData {
  profile: SubjectProfile;

  artists: SpotifyArtist[];

  tracks: SpotifyTrack[];

  recentTracks: SpotifyTrack[];

  genres: string[];

  metrics: MetricResult[];

  reasoning: ReasoningResult;

  theme: AuraTheme | null;

  birthDate: string;

  generatedAt: string;
}