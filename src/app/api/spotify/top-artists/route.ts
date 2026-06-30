import { NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify/server";

export async function GET() {
  try {
    const artists = await spotifyFetch(
      "/me/top/artists?limit=50&time_range=medium_term"
    );

    return NextResponse.json(artists);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to fetch top artists." },
      { status: 500 }
    );
  }
}