import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(
      new URL("/?error=missing_code", req.url)
    );
  }

  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),

          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();

      console.error("========== SPOTIFY TOKEN ERROR ==========");
      console.error(error);
      console.error("=========================================");

      return NextResponse.redirect(
        new URL("/?error=spotify_auth_failed", req.url)
      );
    }

    const token = await tokenResponse.json();

console.log("========== SPOTIFY SUCCESS ==========");
console.log(token);
console.log("=====================================");

const response = NextResponse.redirect(
  new URL("/", process.env.NEXTAUTH_URL!)
);

response.cookies.set({
  name: "spotify_access_token",
  value: token.access_token,
  httpOnly: true,
  secure: false,          // we're on local development
  sameSite: "lax",
  path: "/",
  maxAge: token.expires_in,
});


return response;

  } catch (error) {
    console.error("========== CALLBACK ERROR ==========");
    console.error(error);
    console.error("====================================");

    return NextResponse.redirect(
      new URL("/?error=callback_exception", req.url)
    );
  }
}