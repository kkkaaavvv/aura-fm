import { AuraDataset } from "@/lib/spotify/types";

/* ==========================================
   ALL GENRES
========================================== */

export function getAllGenres(
  dataset: AuraDataset
): string[] {
  return dataset.topArtists.flatMap(
    (artist) => artist.genres
  );
}

/* ==========================================
   UNIQUE GENRES
========================================== */

export function getUniqueGenres(
  dataset: AuraDataset
): string[] {
  return [...new Set(getAllGenres(dataset))];
}

/* ==========================================
   GENRE FREQUENCY MAP
========================================== */

export function getGenreFrequencyMap(
  dataset: AuraDataset
) {
  const map = new Map<string, number>();

  getAllGenres(dataset).forEach((genre) => {
    map.set(
      genre,
      (map.get(genre) ?? 0) + 1
    );
  });

  return map;
}

/* ==========================================
   DOMINANT GENRE
========================================== */

export function getDominantGenre(
  dataset: AuraDataset
) {
  const map = getGenreFrequencyMap(dataset);

  let dominant = "";
  let count = 0;

  map.forEach((value, key) => {
    if (value > count) {
      dominant = key;
      count = value;
    }
  });

  return dominant;
}

/* ==========================================
   DOMINANT GENRE RATIO
========================================== */

export function getDominantGenreRatio(
  dataset: AuraDataset
) {
  const map = getGenreFrequencyMap(dataset);

  const values = [...map.values()];

  if (!values.length) return 0;

  const highest = Math.max(...values);

  return (
    (highest / getAllGenres(dataset).length) *
    100
  );
}

/* ==========================================
   AVERAGE GENRES PER ARTIST
========================================== */

export function getAverageGenresPerArtist(
  dataset: AuraDataset
) {
  if (!dataset.topArtists.length) return 0;

  return (
    dataset.topArtists.reduce(
      (sum, artist) =>
        sum + artist.genres.length,
      0
    ) / dataset.topArtists.length
  );
}

/* ==========================================
   GENRE SPREAD
========================================== */

export function getGenreSpread(
  dataset: AuraDataset
) {
  const total = getAllGenres(dataset).length;

  if (!total) return 0;

  return (
    (getUniqueGenres(dataset).length /
      total) *
    100
  );
}

/* ==========================================
   GENRE ENTROPY
========================================== */

export function getGenreEntropy(
  dataset: AuraDataset
) {
  const map = getGenreFrequencyMap(dataset);

  const total = [...map.values()].reduce(
    (sum, value) => sum + value,
    0
  );

  if (!total) return 0;

  let entropy = 0;

  map.forEach((count) => {
    const probability = count / total;

    entropy -=
      probability * Math.log2(probability);
  });

  return entropy;
}

/* ==========================================
   NICHE SCORE
========================================== */

export function getNicheScore(
  dataset: AuraDataset
) {
  const unique = getUniqueGenres(dataset).length;

  const artists =
    dataset.topArtists.length || 1;

  return (unique / artists) * 100;
}

/* ==========================================
   MAINSTREAM SCORE
========================================== */

export function getMainstreamScore(
  dataset: AuraDataset
) {
  const popularity =
    dataset.topArtists.reduce(
      (sum, artist) =>
        sum + artist.popularity,
      0
    ) /
    Math.max(dataset.topArtists.length, 1);

  return popularity;
}

/* ==========================================
   GENRE BALANCE
========================================== */

export function getGenreBalance(
  dataset: AuraDataset
) {
  const values = [
    ...getGenreFrequencyMap(dataset).values(),
  ];

  if (!values.length) return 0;

  const average =
    values.reduce((sum, value) => sum + value, 0) /
    values.length;

  const variance =
    values.reduce(
      (sum, value) =>
        sum +
        Math.pow(value - average, 2),
      0
    ) / values.length;

  return 100 / (1 + variance);
}