/* ===========================================
   SPOTIFY PROFILE
=========================================== */

export interface SpotifyProfile {
  id: string;
  display_name: string;
  email: string;
  country: string;
  product: string;

  followers: {
    total: number;
  };

  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

/* ===========================================
   SPOTIFY ARTIST
=========================================== */

export interface SpotifyArtist {
  id: string;

  name: string;

  popularity: number;

  genres: string[];

  images: {
    url: string;
    width: number;
    height: number;
  }[];

  followers: {
    total: number;
  };
}

/* ===========================================
   SPOTIFY ALBUM
=========================================== */

export interface SpotifyAlbum {
  id: string;

  name: string;

  release_date: string;

  images: {
    url: string;
    width: number;
    height: number;
  }[];
}

/* ===========================================
   SPOTIFY TRACK
=========================================== */

export interface SpotifyTrack {
  id: string;

  name: string;

  popularity: number;

  duration_ms: number;

  explicit: boolean;

  album: SpotifyAlbum;

  artists: SpotifyArtist[];
}

/* ===========================================
   RECENTLY PLAYED
=========================================== */

export interface SpotifyRecentTrack {
  track: SpotifyTrack;

  played_at: string;
}

/* ===========================================
   COMPLETE DATASET
=========================================== */

export interface AuraDataset {
  profile: SpotifyProfile;

  topArtists: SpotifyArtist[];

  topTracks: SpotifyTrack[];

  recentTracks: SpotifyRecentTrack[];

  birthDate: Date;
}