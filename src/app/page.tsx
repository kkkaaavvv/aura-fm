"use client";

import { useEffect, useState } from "react";
import { useWindow } from "@/components/system/WindowContext";
import BootFlow from "@/components/system/BootFlow";
import WindowManager from "@/components/system/WindowManager";

import DesktopBrand from "@/components/system/DesktopBrand";
import DesktopStatus from "@/components/system/DesktopStatus";
import DesktopViewport from "@/components/system/DesktopViewport";

import { DesktopProvider } from "@/components/system/DesktopContext";
import { WindowProvider } from "@/components/system/WindowContext";

type BootState =
  | "intro"
  | "welcome"
  | "initialize"
  | "login"
  | "desktop";

export default function Home() {
  const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
  ];

  const [currentAvatar, setCurrentAvatar] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [bootState, setBootState] =
    useState<BootState>("intro");

  const [checkingSession, setCheckingSession] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkSpotifySession() {
      try {
        const res = await fetch("/api/spotify/me", {
          cache: "no-store",
        });

        if (cancelled) return;

        if (res.ok) {
          const profile = await res.json();

          console.log(
            "Spotify Connected:",
            profile.display_name
          );

          setBootState("desktop");
        } else {
          setBootState("intro");
        }
      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setBootState("intro");
        }
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    }

    checkSpotifySession();

    return () => {
      cancelled = true;
    };
  }, []);

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="font-pixel text-center text-[10px] uppercase tracking-[0.35em] text-zinc-500">
          <p>Initializing Archive...</p>

          <p className="mt-4 animate-pulse">
            Checking External Memory...
          </p>
        </div>
      </main>
    );
  }

  return (
    <DesktopProvider>
      <WindowProvider>
        <DesktopViewport>
          <main className="relative min-h-screen overflow-hidden bg-black text-white">

            {bootState === "desktop" && (
              <>
                <DesktopBrand />
                <DesktopStatus />
              </>
            )}

            <BootFlow
              bootState={bootState}
              setBootState={setBootState}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              avatars={avatars}
              currentAvatar={currentAvatar}
              setCurrentAvatar={setCurrentAvatar}
            />

            <WindowManager
              username={username}
            />

          </main>
        </DesktopViewport>
      </WindowProvider>
    </DesktopProvider>
  );
}