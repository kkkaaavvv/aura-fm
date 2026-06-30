import { NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify/server";

export async function GET() {
  try {
    const tracks = await spotifyFetch(
      "/me/top/tracks?limit=50&time_range=medium_term"
    );

    return NextResponse.json(tracks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to fetch top tracks." },
      { status: 500 }
    );
  }
}