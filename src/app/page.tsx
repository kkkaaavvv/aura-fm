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

  const introClass =
    "font-digital text-2xl tracking-[0.25em] text-zinc-300";

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {stage === 3 && (
        <div className="absolute right-8 top-8 text-xs tracking-[0.3em] text-zinc-600">
          aura.fm
        </div>
      )}

      <AnimatePresence mode="wait">

        {stage === 0 && (
          <motion.div
            key="hello"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
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
            transition={{ duration: 1 }}
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
            transition={{ duration: 1 }}
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
                    className="
                      w-full
                      border-b
                      border-zinc-800
                      bg-transparent
                      py-2
                      text-zinc-200
                      outline-none
                    "
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
                    className="
                      w-full
                      border-b
                      border-zinc-800
                      bg-transparent
                      py-2
                      text-zinc-200
                      outline-none
                    "
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
                      className="text-zinc-500 transition hover:text-white"
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
                      className="text-zinc-500 transition hover:text-white"
                    >
                      →
                    </button>

                  </div>
                </div>

                <button
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

    </main>
  );
}