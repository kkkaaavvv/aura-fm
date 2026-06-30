"use client";

import { motion } from "framer-motion";

export default function TypingCursor() {
  return (
    <motion.span
      animate={{
        opacity: [1, 0, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "linear",
      }}
      className="inline-block text-zinc-500"
    >
      █
    </motion.span>
  );
}