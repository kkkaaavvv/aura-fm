import { AuraDataset, SpotifyTrack } from "@/lib/spotify/types";

/* ==========================================
   ALL TRACKS
========================================== */

export function getAllTracks(
  dataset: AuraDataset
): SpotifyTrack[] {
  return [
    ...dataset.topTracks,
    ...dataset.recentTracks.map((recent) => recent.track),
  ].filter(Boolean);
}

/* ==========================================
   UNIQUE TRACKS
========================================== */

export function getUniqueTracks(
  dataset: AuraDataset
): SpotifyTrack[] {
  const map = new Map<string, SpotifyTrack>();

  getAllTracks(dataset).forEach((track) => {
    if (!track?.id) return;

    if (!map.has(track.id)) {
      map.set(track.id, track);
    }
  });

  return [...map.values()];
}

/* ==========================================
   TRACK FREQUENCY MAP
========================================== */

export function getTrackFrequencyMap(
  dataset: AuraDataset
) {
  const frequencies = new Map<string, number>();

  getAllTracks(dataset).forEach((track) => {
    if (!track?.id) return;

    frequencies.set(
      track.id,
      (frequencies.get(track.id) ?? 0) + 1
    );
  });

  return frequencies;
}

/* ==========================================
   REPEATED TRACKS
========================================== */

export function getRepeatedTracks(
  dataset: AuraDataset
) {
  return [...getTrackFrequencyMap(dataset).values()].filter(
    (count) => count > 1
  ).length;
}

/* ==========================================
   AVERAGE TRACK POPULARITY
========================================== */

export function getAverageTrackPopularity(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return 0;

  return (
    tracks.reduce(
      (sum, track) => sum + track.popularity,
      0
    ) / tracks.length
  );
}

/* ==========================================
   AVERAGE DURATION
========================================== */

export function getAverageTrackDuration(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return 0;

  return (
    tracks.reduce(
      (sum, track) => sum + track.duration_ms,
      0
    ) / tracks.length
  );
}

/* ==========================================
   EXPLICIT RATIO
========================================== */

export function getExplicitRatio(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return 0;

  const explicitTracks = tracks.filter(
    (track) => track.explicit
  ).length;

  return (explicitTracks / tracks.length) * 100;
}

/* ==========================================
   AVERAGE RELEASE YEAR
========================================== */

export function getAverageReleaseYear(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return new Date().getFullYear();

  const years = tracks
    .map((track) =>
      Number(track.album.release_date.slice(0, 4))
    )
    .filter((year) => !Number.isNaN(year));

  if (!years.length) return new Date().getFullYear();

  return (
    years.reduce((sum, year) => sum + year, 0) /
    years.length
  );
}

/* ==========================================
   OLDEST TRACK YEAR
========================================== */

export function getOldestTrackYear(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  const years = tracks
    .map((track) =>
      Number(track.album.release_date.slice(0, 4))
    )
    .filter((year) => !Number.isNaN(year));

  if (!years.length) return new Date().getFullYear();

  return Math.min(...years);
}

/* ==========================================
   NEWEST TRACK YEAR
========================================== */

export function getNewestTrackYear(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  const years = tracks
    .map((track) =>
      Number(track.album.release_date.slice(0, 4))
    )
    .filter((year) => !Number.isNaN(year));

  if (!years.length) return new Date().getFullYear();

  return Math.max(...years);
}

/* ==========================================
   OLD TRACK RATIO
========================================== */

export function getOldTrackRatio(
  dataset: AuraDataset,
  threshold = 2015
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return 0;

  const oldTracks = tracks.filter((track) => {
    const year = Number(
      track.album.release_date.slice(0, 4)
    );

    return year <= threshold;
  }).length;

  return (oldTracks / tracks.length) * 100;
}

/* ==========================================
   NEW TRACK RATIO
========================================== */

export function getNewTrackRatio(
  dataset: AuraDataset,
  threshold = 2022
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return 0;

  const newTracks = tracks.filter((track) => {
    const year = Number(
      track.album.release_date.slice(0, 4)
    );

    return year >= threshold;
  }).length;

  return (newTracks / tracks.length) * 100;
}

/* ==========================================
   LONGEST TRACK
========================================== */

export function getLongestTrack(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return null;

  return [...tracks].sort(
    (a, b) => b.duration_ms - a.duration_ms
  )[0];
}

/* ==========================================
   SHORTEST TRACK
========================================== */

export function getShortestTrack(
  dataset: AuraDataset
) {
  const tracks = getUniqueTracks(dataset);

  if (!tracks.length) return null;

  return [...tracks].sort(
    (a, b) => a.duration_ms - b.duration_ms
  )[0];
}