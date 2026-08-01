"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SignalTransitionProps {
  onComplete: () => void;
}

export default function SignalTransition({
  onComplete,
}: SignalTransitionProps) {
  const [stage, setStage] = useState<
    "verify" | "glitch" | "lost"
  >("verify");

  useEffect(() => {
    const timers = [
      setTimeout(() => {
        setStage("glitch");
      }, 1200),

      setTimeout(() => {
        setStage("lost");
      }, 2800),

      setTimeout(() => {
        onComplete();
      }, 4500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(255,255,255,0.05) 3px)",
        }}
      />

      {/* Horizontal glitch bars */}
      <AnimatePresence>
        {stage === "glitch" && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: "-100%",
                  opacity: 0,
                }}
                animate={{
                  x: "100%",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.25,
                  delay: i * 0.08,
                }}
                className="absolute left-0 h-[2px] bg-white/60 w-full"
                style={{
                  top: `${10 + i * 10}%`,
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Text */}
      <motion.div
        key={stage}
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
        className="text-center font-mono tracking-[0.35em]"
      >
        {stage === "verify" && (
          <>
            <p className="text-zinc-500 text-sm mb-4">
              VERIFYING CLEARANCE
            </p>

            <motion.div
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
              }}
              className="text-white"
            >
              ████████████
            </motion.div>
          </>
        )}

        {stage === "glitch" && (
          <motion.h1
            animate={{
              x: [-4, 5, -3, 2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 0.12,
            }}
            className="text-white text-2xl"
          >
            SIGNAL INSTABILITY
          </motion.h1>
        )}

        {stage === "lost" && (
          <>
            <motion.h1
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8,
              }}
              className="text-white text-3xl"
            >
              SIGNAL LOST
            </motion.h1>

            <p className="mt-6 text-zinc-500 text-xs tracking-[0.4em]">
              RECONNECTING...
            </p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}