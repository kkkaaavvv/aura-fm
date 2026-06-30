"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Typewriter from "@/components/ui/Typewriter";
import { useWindow } from "@/components/system/WindowContext";

type BootState =
  | "intro"
  | "welcome"
  | "initialize"
  | "login"
  | "desktop";

interface BootFlowProps {
  bootState: BootState;
  setBootState: React.Dispatch<React.SetStateAction<BootState>>;

  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;

  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;

  avatars: string[];
  currentAvatar: number;
  setCurrentAvatar: React.Dispatch<React.SetStateAction<number>>;
}

export default function BootFlow({
  bootState,
  setBootState,

  username,
  setUsername,

  password,
  setPassword,

  avatars,
  currentAvatar,
  setCurrentAvatar,
}: BootFlowProps) {
  const { setArchiveOpen } = useWindow();

  const introClass =
    "font-digital text-2xl tracking-[0.25em] text-zinc-100";

  return (
    <AnimatePresence mode="wait">
      {bootState === "intro" && (
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
              onComplete={() => setBootState("welcome")}
            />
          </div>
        </motion.div>
      )}

      {bootState === "welcome" && (
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
              onComplete={() => setBootState("initialize")}
            />
          </div>
        </motion.div>
      )}

      {bootState === "initialize" && (
        <motion.div
          key="initialize"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-screen items-center justify-center"
        >
          <div className={introClass}>
            <Typewriter
              text="Initializing archive..."
              onComplete={() => setBootState("login")}
            />
          </div>
        </motion.div>
      )}

      {bootState === "login" && (
        <motion.div
          key="login"
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
                onClick={() => {
                  if (!username.trim() || !password.trim()) {
                    alert("Archive identity incomplete.");
                    return;
                  }

                  setBootState("desktop");
                  setArchiveOpen(true);
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
  );
}