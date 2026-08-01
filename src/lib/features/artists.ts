import { AuraDataset } from "@/lib/spotify/types";

/* ==========================================
   ALL ARTISTS
========================================== */

export function getAllArtists(dataset: AuraDataset) {
 const artists = [
  ...dataset.topArtists,
  ...dataset.topTracks.flatMap((track) => track.artists),
  ...dataset.recentTracks.flatMap(
    (recent) => recent.track?.artists ?? []
  ),
];

return artists.filter(Boolean);
}

/* ==========================================
   UNIQUE ARTISTS
========================================== */

export function getUniqueArtists(dataset: AuraDataset) {
  const map = new Map<string, (typeof dataset.topArtists)[0]>();

  getAllArtists(dataset).forEach((artist) => {
    if (!artist?.id) return;

    if (!map.has(artist.id)) {
      map.set(artist.id, artist);
    }
  });

  return [...map.values()];
}

/* ==========================================
   ARTIST FREQUENCY MAP
========================================== */

export function getArtistFrequencyMap(
  dataset: AuraDataset
) {
  const frequencies = new Map<string, number>();

  getAllArtists(dataset).forEach((artist) => {
    if (!artist?.id) return;

    frequencies.set(
      artist.id,
      (frequencies.get(artist.id) ?? 0) + 1
    );
  });

  return frequencies;
}

/* ==========================================
   REPEATED ARTISTS
========================================== */

export function getRepeatedArtists(
  dataset: AuraDataset
) {
  return [...getArtistFrequencyMap(dataset).values()].filter(
    (count) => count > 1
  ).length;
}

/* ==========================================
   STRONGEST ANCHOR
========================================== */

export function getStrongestAnchor(
  dataset: AuraDataset
) {
  const values = [
    ...getArtistFrequencyMap(dataset).values(),
  ];

  if (!values.length) return 0;

  return Math.max(...values);
}

/* ==========================================
   RECURRENCE FACTOR
========================================== */

export function getArtistRecurrence(
  dataset: AuraDataset
) {
  const values = [
    ...getArtistFrequencyMap(dataset).values(),
  ];

  if (!values.length) return 0;

  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}

/* ==========================================
   AVERAGE POPULARITY
========================================== */

export function getAverageArtistPopularity(
  dataset: AuraDataset
) {
  if (!dataset.topArtists.length) return 0;

  return (
    dataset.topArtists.reduce(
      (sum, artist) => sum + artist.popularity,
      0
    ) / dataset.topArtists.length
  );
}

/* ==========================================
   AVERAGE FOLLOWERS
========================================== */

export function getAverageArtistFollowers(
  dataset: AuraDataset
) {
  if (!dataset.topArtists.length) return 0;

  return (
    dataset.topArtists.reduce(
      (sum, artist) =>
        sum + (artist.followers?.total ?? 0),
      0
    ) / dataset.topArtists.length
  );
}

/* ==========================================
   MOST POPULAR ARTIST
========================================== */

export function getMostPopularArtist(
  dataset: AuraDataset
) {
  if (!dataset.topArtists.length) return null;

  return [...dataset.topArtists].sort(
    (a, b) => b.popularity - a.popularity
  )[0];
}

/* ==========================================
   MOST FOLLOWED ARTIST
========================================== */

export function getMostFollowedArtist(
  dataset: AuraDataset
) {
  if (!dataset.topArtists.length) return null;

  return [...dataset.topArtists].sort(
    (a, b) =>
      (b.followers?.total ?? 0) -
      (a.followers?.total ?? 0)
  )[0];
}

/* ==========================================
   ARTIST LOYALTY SCORE
========================================== */

export function getArtistLoyalty(
  dataset: AuraDataset
) {
  const repeated = getRepeatedArtists(dataset);

  const unique = getUniqueArtists(dataset).length;

  if (!unique) return 0;

  return (repeated / unique) * 100;
}