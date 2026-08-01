import {
  AuraDataset,
  SpotifyRecentTrack,
} from "@/lib/spotify/types";

/* ==========================================
   RECENT TRACKS
========================================== */

export function getRecentTracks(
  dataset: AuraDataset
): SpotifyRecentTrack[] {
  return dataset.recentTracks;
}

/* ==========================================
   UNIQUE RECENT TRACKS
========================================== */

export function getUniqueRecentTracks(
  dataset: AuraDataset
) {
  const map = new Map<string, SpotifyRecentTrack>();

  dataset.recentTracks.forEach((recent) => {
    const id = recent.track?.id;

    if (!id) return;

    if (!map.has(id)) {
      map.set(id, recent);
    }
  });

  return [...map.values()];
}

/* ==========================================
   RECENT ARTISTS
========================================== */

export function getRecentArtists(
  dataset: AuraDataset
) {
  return dataset.recentTracks.flatMap((recent) =>
    recent.track?.artists ?? []
  );
}

/* ==========================================
   UNIQUE RECENT ARTISTS
========================================== */

export function getUniqueRecentArtists(
  dataset: AuraDataset
) {
  const map = new Map<string, (typeof dataset.topArtists)[0]>();

  getRecentArtists(dataset).forEach((artist) => {
    if (!artist?.id) return;

    if (!map.has(artist.id)) {
      map.set(artist.id, artist);
    }
  });

  return [...map.values()];
}

/* ==========================================
   RECENT OVERLAP
========================================== */

export function getRecentOverlap(
  dataset: AuraDataset
) {
  const topArtistIds = new Set(
    dataset.topArtists.map((artist) => artist.id)
  );

  const overlap = getRecentArtists(dataset).filter(
    (artist) => topArtistIds.has(artist.id)
  ).length;

  const total = getRecentArtists(dataset).length;

  if (!total) return 0;

  return (overlap / total) * 100;
}

/* ==========================================
   RECENT ARTIST RATIO
========================================== */

export function getRecentArtistRatio(
  dataset: AuraDataset
) {
  const unique = getUniqueRecentArtists(dataset).length;

  const total = getRecentArtists(dataset).length;

  if (!total) return 0;

  return (unique / total) * 100;
}

/* ==========================================
   REPLAY RATE
========================================== */

export function getReplayRate(
  dataset: AuraDataset
) {
  const map = new Map<string, number>();

  dataset.recentTracks.forEach((recent) => {
    const id = recent.track?.id;

    if (!id) return;

    map.set(id, (map.get(id) ?? 0) + 1);
  });

  const repeated = [...map.values()].filter(
    (count) => count > 1
  ).length;

  if (!map.size) return 0;

  return (repeated / map.size) * 100;
}

/* ==========================================
   LISTENING HOURS
========================================== */

export function getListeningHours(
  dataset: AuraDataset
) {
  const hours = dataset.recentTracks
    .map((recent) => {
      if (!recent.played_at) return null;

      return new Date(recent.played_at).getHours();
    })
    .filter(
      (hour): hour is number => hour !== null
    );

  return hours;
}

/* ==========================================
   NIGHT LISTENING RATIO
========================================== */

export function getNightListeningRatio(
  dataset: AuraDataset
) {
  const hours = getListeningHours(dataset);

  if (!hours.length) return 0;

  const night = hours.filter(
    (hour) => hour >= 22 || hour <= 5
  ).length;

  return (night / hours.length) * 100;
}

/* ==========================================
   DAY LISTENING RATIO
========================================== */

export function getDayListeningRatio(
  dataset: AuraDataset
) {
  const hours = getListeningHours(dataset);

  if (!hours.length) return 0;

  const day = hours.filter(
    (hour) => hour >= 6 && hour < 22
  ).length;

  return (day / hours.length) * 100;
}

/* ==========================================
   MOST ACTIVE HOUR
========================================== */

export function getMostActiveHour(
  dataset: AuraDataset
) {
  const hours = getListeningHours(dataset);

  if (!hours.length) return null;

  const map = new Map<number, number>();

  hours.forEach((hour) => {
    map.set(hour, (map.get(hour) ?? 0) + 1);
  });

  let bestHour = 0;
  let highest = 0;

  map.forEach((count, hour) => {
    if (count > highest) {
      highest = count;
      bestHour = hour;
    }
  });

  return bestHour;
}

/* ==========================================
   LISTENING PROFILE
========================================== */

export interface ListeningProfile {
  tracks: number;

  uniqueTracks: number;

  uniqueArtists: number;

  uniqueGenres: number;

  averagePopularity: number;

  averageDuration: number;

  explicitRatio: number;
}

export function getListeningProfile(
  dataset: AuraDataset,
  period: "day" | "night"
): ListeningProfile {
  const filtered = dataset.recentTracks.filter((recent) => {
    if (!recent.played_at) return false;

    const hour = new Date(recent.played_at).getHours();

    if (period === "day") {
      return hour >= 6 && hour < 22;
    }

    return hour >= 22 || hour < 6;
  });

  const uniqueTracks = new Set<string>();
  const uniqueArtists = new Set<string>();
  const uniqueGenres = new Set<string>();

  let popularity = 0;
  let duration = 0;
  let explicit = 0;

  filtered.forEach((recent) => {
    const track = recent.track;

    if (!track) return;

    uniqueTracks.add(track.id);

    popularity += track.popularity;

    duration += track.duration_ms;

    if (track.explicit) {
      explicit++;
    }

    track.artists.forEach((artist) => {
      uniqueArtists.add(artist.id);

      artist.genres.forEach((genre) =>
        uniqueGenres.add(genre)
      );
    });
  });

  const total = filtered.length || 1;

  return {
    tracks: filtered.length,

    uniqueTracks: uniqueTracks.size,

    uniqueArtists: uniqueArtists.size,

    uniqueGenres: uniqueGenres.size,

    averagePopularity: popularity / total,

    averageDuration: duration / total,

    explicitRatio: (explicit / total) * 100,
  };
}

/* ==========================================
   PROFILE COMPARISON
========================================== */

export interface ProfileComparison {
  artistDifference: number;

  genreDifference: number;

  popularityDifference: number;

  durationDifference: number;

  explicitDifference: number;

  similarity: number;
}

export function compareProfiles(
  day: ListeningProfile,
  night: ListeningProfile
): ProfileComparison {

  const artistDifference =
    Math.abs(
      day.uniqueArtists -
        night.uniqueArtists
    );

  const genreDifference =
    Math.abs(
      day.uniqueGenres -
        night.uniqueGenres
    );

  const popularityDifference =
    Math.abs(
      day.averagePopularity -
        night.averagePopularity
    );

  const durationDifference =
    Math.abs(
      day.averageDuration -
        night.averageDuration
    ) / 60000;

  const explicitDifference =
    Math.abs(
      day.explicitRatio -
        night.explicitRatio
    );

  const similarity =
    Math.max(
      0,
      100 -
        (
          artistDifference * 5 +
          genreDifference * 4 +
          popularityDifference * 0.5 +
          durationDifference * 2 +
          explicitDifference * 0.5
        )
    );

  return {
    artistDifference,

    genreDifference,

    popularityDifference,

    durationDifference,

    explicitDifference,

    similarity,
  };
}

/* ==========================================
   REPLAY GRAPH
========================================== */

export function buildReplayGraph(
  dataset: AuraDataset
) {

  const chain: string[] = [];

  dataset.recentTracks.forEach((recent) => {
    if (recent.track?.id) {
      chain.push(recent.track.id);
    }
  });

  return chain;
}

/* ==========================================
   LONGEST REPLAY CHAIN
========================================== */

export function getLongestReplayChain(
  graph: string[]
) {

  if (!graph.length) return 0;

  let current = 1;

  let longest = 1;

  for (let i = 1; i < graph.length; i++) {

    if (graph[i] === graph[i - 1]) {

      current++;

      longest = Math.max(
        longest,
        current
      );

    } else {

      current = 1;

    }
  }

  return longest;
}