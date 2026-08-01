import { AuraDataset } from "@/lib/spotify/types";

import {
  getReplayRate,
  getNightListeningRatio,
  getMostActiveHour,
  getRecentArtistRatio,
} from "./history";

import {
  getArtistOverlap,
} from "./artists";

import {
  getGenreOverlap,
} from "./genres";

/* ==========================================
   REPLAY DENSITY
========================================== */

export function getReplayDensity(
  dataset: AuraDataset
) {
  return getReplayRate(dataset);
}

/* ==========================================
   ARTIST RECURRENCE
========================================== */

export function getArtistRecurrence(
  dataset: AuraDataset
) {
  return getArtistOverlap(dataset);
}

/* ==========================================
   GENRE RECURRENCE
========================================== */

export function getGenreRecurrence(
  dataset: AuraDataset
) {
  return getGenreOverlap(dataset);
}

/* ==========================================
   LISTENING CONSISTENCY
========================================== */

export function getListeningConsistency(
  dataset: AuraDataset
) {
  const replay = getReplayRate(dataset);
  const artist = getArtistOverlap(dataset);
  const genre = getGenreOverlap(dataset);

  return (replay + artist + genre) / 3;
}

/* ==========================================
   CIRCADIAN PROFILE
========================================== */

export function getCircadianProfile(
  dataset: AuraDataset
) {
  return {
    nightRatio: getNightListeningRatio(dataset),

    activeHour: getMostActiveHour(dataset),
  };
}

/* ==========================================
   IDENTITY STABILITY
========================================== */

export function getIdentityStability(
  dataset: AuraDataset
) {
  const artist = getArtistOverlap(dataset);

  const genre = getGenreOverlap(dataset);

  const consistency =
    getListeningConsistency(dataset);

  return (
    artist * 0.4 +
    genre * 0.3 +
    consistency * 0.3
  );
}

/* ==========================================
   RECENT DIVERSITY
========================================== */

export function getRecentDiversity(
  dataset: AuraDataset
) {
  return getRecentArtistRatio(dataset);
}

/* ==========================================
   ARCHIVE CONFIDENCE
========================================== */

export function getArchiveConfidence(
  dataset: AuraDataset
) {
  let confidence = 100;

  if (!dataset.recentTracks.length)
    confidence -= 40;

  if (!dataset.topArtists.length)
    confidence -= 25;

  if (!dataset.topTracks.length)
    confidence -= 25;

  return Math.max(confidence, 0);
}