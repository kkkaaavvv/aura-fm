"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { setDataset as saveDataset } from "@/lib/analysis/store";
import { buildDataset } from "@/lib/spotify/api";
import {
  AuraDataset,
  SpotifyProfile,
} from "@/lib/spotify/types";

interface RecordWindowProps {
  onClose: () => void;
  onFocus: () => void;
  onContinue: () => void;
  zIndex: number;
}

type ConnectionState =
  | "checking"
  | "offline"
  | "connected";

export default function RecordWindow({
  onClose,
  onFocus,
  onContinue,
  zIndex,
}: RecordWindowProps) {
  const [connection, setConnection] =
    useState<ConnectionState>("checking");

  const [profile, setProfile] =
    useState<SpotifyProfile | null>(null);

  const [dataset, setLocalDataset] =
  useState<AuraDataset | null>(null);

  const [statusText, setStatusText] =
    useState(
      "Locating External Memory..."
    );

  const [loadingDataset, setLoadingDataset] =
    useState(false);

  useEffect(() => {
    async function initializeArchive() {
      setStatusText(
        "Locating External Memory..."
      );

      try {
        const res = await fetch(
          "/api/spotify/me",
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          setConnection("offline");

          setStatusText(
            "Signal Lost."
          );

          return;
        }

        const profile =
          (await res.json()) as SpotifyProfile;

        setProfile(profile);

        setStatusText(
          "Signal Acquired."
        );

         setLoadingDataset(true);

const auraDataset = await buildDataset(
  new Date(),
  (stage) => {
    switch (stage) {
      case "CONNECTING":
        setStatusText("Establishing Secure Handshake...");
        break;

      case "IDENTITY":
        setStatusText("Identity Verified.");
        break;

      case "ARTISTS":
        setStatusText("Reading Top Artists...");
        break;

      case "TRACKS":
        setStatusText("Reading Top Tracks...");
        break;

      case "RECENT":
        setStatusText("Reading Recent Memory...");
        break;

      case "CACHING":
        setStatusText("Caching Memory Archive...");
        break;

      case "COMPLETE":
        setStatusText("External Memory Synchronized.");
        break;
    }
  }
);

// Keep it for this window
setLocalDataset(auraDataset);

// Save globally for the rest of Aura
saveDataset(auraDataset);

setLoadingDataset(false);
setConnection("connected");

      } catch (err) {
        console.error(err);

        setConnection("offline");

        setStatusText(
          "Handshake Failed."
        );
      }
    }

    initializeArchive();
  }, []);
    return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onMouseDown={onFocus}
      style={{ zIndex }}
      className="
        fixed
        left-[36%]
        top-[16%]
        w-[760px]
        overflow-hidden
        border
        border-zinc-800
        bg-black
        shadow-[0_0_40px_rgba(255,255,255,.05)]
      "
    >
      {/* CRT Noise */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,.08)_50%)] bg-[length:100%_4px]" />
      </div>

      {/* Header */}

      <div className="flex cursor-move items-center justify-between border-b border-zinc-800 bg-zinc-950 px-5 py-4">

        <span className="font-pixel text-[10px] uppercase tracking-[0.35em] text-zinc-400">
          record-access.exe
        </span>

        <button
          onClick={onClose}
          className="text-zinc-600 transition hover:text-red-400"
        >
          ✕
        </button>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Signal */}

        <div className="border border-zinc-800 bg-[#040404] p-5">

          <p className="font-pixel text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            SIGNAL STATUS
          </p>

          <div className="mt-5 flex items-center justify-between">

            <span className="text-sm text-zinc-400">

              {statusText}

            </span>

            <span
              className={`font-pixel text-[10px] uppercase tracking-[0.25em]
              ${
                connection === "connected"
                  ? "text-white"
                  : connection === "checking"
                  ? "text-zinc-500"
                  : "text-red-400"
              }`}
            >
              {connection === "connected"
                ? "SIGNAL ACQUIRED"
                : connection === "checking"
                ? "SCANNING..."
                : "SIGNAL LOST"}
            </span>

          </div>

        </div>

        {/* Memory Source */}

        <div className="border border-zinc-800 p-6">

          <p className="mb-5 font-pixel text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            EXTERNAL MEMORY
          </p>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Source
              </span>

              <span className="text-zinc-200">
                Spotify Archive
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Subject
              </span>

              <span className="text-zinc-200">

                {profile?.display_name ?? "--"}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Region
              </span>

              <span className="text-zinc-200">

                {profile?.country ?? "--"}

              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-zinc-500">
                Archive Tier
              </span>

              <span className="text-zinc-200 uppercase">

                {profile?.product ?? "--"}

              </span>

            </div>

          </div>

        </div>

        {/* Memory Buffers */}

        <div className="border border-zinc-800 p-6">

          <p className="mb-5 font-pixel text-[10px] uppercase tracking-[0.3em] text-zinc-500">
            MEMORY BUFFERS
          </p>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">

              <span>
                Listening History
              </span>

              <span>

                {dataset ? "✓" : "--"}

              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Top Artists
              </span>

              <span>

                {dataset ? "✓" : "--"}

              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Top Tracks
              </span>

              <span>

                {dataset ? "✓" : "--"}

              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Behavioral Vectors
              </span>

              <span>

                {dataset ? "✓" : "--"}

              </span>

            </div>

          </div>

        </div>
                {/* Footer */}

        <div className="border border-zinc-800 bg-[#040404] p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="font-pixel text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                ARCHIVE STATUS
              </p>

              <p className="mt-3 text-sm text-zinc-500">

                {loadingDataset
                  ? "Synchronizing external memory..."
                  : connection === "connected"
                  ? "External memory synchronized."
                  : "Archive requires an external memory source."}

              </p>

            </div>

            {connection === "offline" && (
              <button
                onClick={() => {
                  window.location.href =
                    "/api/spotify/login";
                }}
                className="
                  border
                  border-zinc-700
                  px-6
                  py-3
                  font-pixel
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  transition
                  hover:border-white
                "
              >
                ESTABLISH LINK
              </button>
            )}

            {connection === "checking" && (
              <div className="font-pixel text-[10px] uppercase tracking-[0.3em] text-zinc-600 animate-pulse">
                HANDSHAKE...
              </div>
            )}

            {connection === "connected" && (
              <button
                disabled={loadingDataset}
                onClick={onContinue}
                className="
                  border
                  border-zinc-700
                  px-6
                  py-3
                  font-pixel
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  transition
                  hover:border-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                {loadingDataset
                  ? "INDEXING..."
                  : "INDEX MEMORY"}
              </button>
            )}

          </div>

        </div>

        <div className="text-center">

          <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-zinc-700">
            aura.fm archive subsystem
          </p>

        </div>

      </div>

    </motion.div>
  );
}