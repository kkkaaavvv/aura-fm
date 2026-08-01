"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface AuraRevealProps {
  auraName: string;
  auraColor: string;
  onComplete: () => void;
}

export default function AuraReveal({
  auraName,
  auraColor,
  onComplete,
}: AuraRevealProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.15, 0.35, 0.2],
          scale: [0.95, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute inset-0 blur-3xl"
        style={{
          background: auraColor,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center font-mono">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-xs tracking-[0.45em] text-zinc-500 uppercase"
        >
          AURA SIGNATURE DETECTED
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 10,
            letterSpacing: "0.2em",
          }}
          animate={{
            opacity: 1,
            y: 0,
            letterSpacing: "0.45em",
          }}
          transition={{
            duration: 1,
          }}
          style={{
            color: auraColor,
          }}
          className="text-5xl font-bold uppercase"
        >
          {auraName}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 260 }}
          transition={{
            delay: 0.8,
            duration: 1,
          }}
          className="mx-auto mt-8 h-px"
          style={{
            background: auraColor,
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{
            delay: 1.5,
          }}
          className="mt-6 text-xs tracking-[0.35em] text-zinc-500 uppercase"
        >
          ARCHIVE CLASSIFICATION COMPLETE
        </motion.p>
      </div>
    </motion.div>
  );
}