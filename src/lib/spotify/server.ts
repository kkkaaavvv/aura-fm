import { cookies } from "next/headers";

const SPOTIFY_API = "https://api.spotify.com/v1";

export async function spotifyFetch(endpoint: string) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(
    "spotify_access_token"
  )?.value;

  if (!accessToken) {
    throw new Error("Spotify access token missing.");
  }

  const res = await fetch(
    `${SPOTIFY_API}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      `Spotify request failed: ${res.status}`
    );
  }

  return res.json();
}