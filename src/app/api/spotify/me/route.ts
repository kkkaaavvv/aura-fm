import { NextResponse } from "next/server";
import { spotifyFetch } from "@/lib/spotify/server";

export async function GET() {
  try {
    const profile = await spotifyFetch("/me");

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}