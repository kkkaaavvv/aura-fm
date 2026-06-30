import {
  AuraDataset,
  SpotifyArtist,
  SpotifyProfile,
  SpotifyRecentTrack,
  SpotifyTrack,
} from "./types";

export type LoadingStage =
  | "CONNECTING"
  | "IDENTITY"
  | "ARTISTS"
  | "TRACKS"
  | "RECENT"
  | "CACHING"
  | "COMPLETE";

async function request<T>(endpoint: string): Promise<T> {
  const res = await fetch(endpoint, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }

  return (await res.json()) as T;
}

async function retry<T>(
  fn: () => Promise<T>,
  retries = 1,
  delay = 500
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));

    return retry(fn, retries - 1, delay);
  }
}

export async function getProfile(): Promise<SpotifyProfile> {
  return request<SpotifyProfile>("/api/spotify/me");
}

export async function getTopArtists(): Promise<SpotifyArtist[]> {
  const data = await request<{ items: SpotifyArtist[] }>(
    "/api/spotify/top-artists"
  );

  return data.items;
}

export async function getTopTracks(): Promise<SpotifyTrack[]> {
  const data = await request<{ items: SpotifyTrack[] }>(
    "/api/spotify/top-tracks"
  );

  return data.items;
}

export async function getRecentTracks(): Promise<SpotifyRecentTrack[]> {
  const data = await request<{ items: SpotifyRecentTrack[] }>(
    "/api/spotify/recent"
  );

  return data.items;
}

export async function buildDataset(
  birthDate: Date,
  onProgress?: (stage: LoadingStage) => void
): Promise<AuraDataset> {
  onProgress?.("CONNECTING");

  const profile = await retry(getProfile);

  onProgress?.("IDENTITY");

  const topArtists = await retry(getTopArtists);

  onProgress?.("ARTISTS");

  const topTracks = await retry(getTopTracks);

  onProgress?.("TRACKS");

  const recentTracks = await retry(getRecentTracks);

  onProgress?.("RECENT");

  onProgress?.("CACHING");

  const dataset: AuraDataset = {
    profile,
    topArtists,
    topTracks,
    recentTracks,
    birthDate,
  };

  onProgress?.("COMPLETE");

  return dataset;
}