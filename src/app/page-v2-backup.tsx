"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Typewriter from "@/components/Typewriter";

export default function Home() {
  const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
  ];

  const [currentAvatar, setCurrentAvatar] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [stage, setStage] = useState(0);

  const [screen, setScreen] = useState<
    "terminal" | "archive" | "record"
  >("terminal");

    const introClass =
  "font-digital text-2xl tracking-[0.25em] text-zinc-100";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {stage === 3 && (
        <>
          <div className="absolute right-8 top-8 text-xs tracking-[0.3em] text-zinc-600">
            aura.fm
          </div>

          <div className="absolute left-8 top-8 border border-zinc-800 bg-black/60 p-3 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            <p>● Connected</p>
            <p>Archive Active</p>
            <p>Memory Index Ready</p>
          </div>
        </>
      )}

      <AnimatePresence mode="wait">

        {stage === 0 && (
          <motion.div
            key="hello"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen items-center justify-center"
          >
            <div className={introClass}>
              <Typewriter
                text="Hello..."
                onComplete={() => setStage(1)}
              />
            </div>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen items-center justify-center"
          >
            <div className={introClass}>
              <Typewriter
                text="Welcome to Aura.fm..."
                onComplete={() => setStage(2)}
              />
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="init"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-screen items-center justify-center"
          >
            <div className={introClass}>
              <Typewriter
                text="Initializing archive..."
                onComplete={() => setStage(3)}
              />
            </div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="terminal"
            initial={{
              opacity: 0,
              scale: 0.97,
              y: 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
            }}
            className="flex min-h-screen items-center justify-center"
          >
            <div className="w-[420px]">

              <div className="border border-zinc-800 bg-black p-8 shadow-[0_0_30px_rgba(255,255,255,0.03)]">

                <p className="font-pixel mb-10 text-[10px] uppercase tracking-[0.35em] text-zinc-500">
                  emotional archive v0.98
                </p>

                <div className="mb-8">
                  <p className="font-pixel mb-2 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                    &gt; username
                  </p>

                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border-b border-zinc-800 bg-transparent py-2 text-zinc-200 outline-none"
                  />
                </div>

                <div className="mb-8">
                  <p className="font-pixel mb-2 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                    &gt; password
                  </p>

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border-b border-zinc-800 bg-transparent py-2 text-zinc-200 outline-none"
                  />
                </div>

                <div className="mb-10">
                  <p className="font-pixel mb-4 text-[10px] uppercase tracking-[0.25em] text-zinc-400">
                    archive identity
                  </p>

                  <div className="flex items-center justify-between border border-zinc-800 p-4">

                    <button
                      onClick={() =>
                        setCurrentAvatar(
                          currentAvatar === 0
                            ? avatars.length - 1
                            : currentAvatar - 1
                        )
                      }
                      className="text-zinc-500 hover:text-white"
                    >
                      ←
                    </button>

                    <div className="relative h-[140px] w-[140px] overflow-hidden border border-zinc-800">
                      <Image
                        src={avatars[currentAvatar]}
                        alt="archive identity"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <button
                      onClick={() =>
                        setCurrentAvatar(
                          currentAvatar === avatars.length - 1
                            ? 0
                            : currentAvatar + 1
                        )
                      }
                      className="text-zinc-500 hover:text-white"
                    >
                      →
                    </button>

                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!username.trim() || !password.trim()) {
                      alert("Archive identity incomplete.");
                      return;
                    }

                    setScreen("archive");
                  }}
                  className="
                    font-pixel
                    border
                    border-zinc-700
                    px-5
                    py-3
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    transition
                    hover:border-white
                  "
                >
                  enter archive
                </button>

              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {screen === "archive" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">

          <div className="w-[500px] border border-zinc-700 bg-black p-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">

            <div className="mb-6 border-b border-zinc-800 pb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              archive.log
            </div>

            <div className="space-y-4 text-zinc-300">
              <p>Hello, {username}.</p>

              <p>The archive remembers.</p>

              <p>We've been expecting you.</p>

              <p className="text-zinc-500">
                P.S. Some listening habits are hard to forget.
              </p>
            </div>

            <button
              onClick={() => setScreen("record")}
              className="mt-8 border border-zinc-700 px-4 py-2 text-xs uppercase tracking-[0.25em] hover:border-white"
            >
              Continue
            </button>

          </div>

        </div>
      )}

      {screen === "record" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">

          <div className="w-[520px] border border-zinc-700 bg-black p-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">

            <div className="mb-6 border-b border-zinc-800 pb-2 text-xs uppercase tracking-[0.3em] text-zinc-500">
              record-access.exe
            </div>

            <p className="mb-6 text-zinc-300">
              Spotify access required.
            </p>

            <p className="mb-8 text-zinc-500">
              Authorize access to retrieve archived listening records.
            </p>

            <button
              className="
                border
                border-zinc-700
                px-5
                py-3
                text-xs
                uppercase
                tracking-[0.25em]
                hover:border-white
              "
            >
              AUTHORIZE ACCESS
            </button>

          </div>

        </div>
      )}

    </main>
  );
}