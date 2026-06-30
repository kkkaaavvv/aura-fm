"use client";

import { motion, AnimatePresence } from "framer-motion";
import TypingCursor from "./TerminalCursor";

interface TerminalEngineProps {
  logs: string[];
}

export default function TerminalEngine({
  logs,
}: TerminalEngineProps) {
  return (
    <div className="font-mono text-[14px] leading-7 text-zinc-300">

      <div className="mb-6 border-b border-zinc-800 pb-4">

        <p className="font-pixel text-[10px] uppercase tracking-[0.35em] text-zinc-500">
          ARCHIVE ANALYSIS ENGINE
        </p>

        <p className="mt-2 text-zinc-600">
          Runtime Version 3.2.91
        </p>

      </div>

      <div className="space-y-2">

        <AnimatePresence>
          {logs.map((log, index) => (
            <motion.div
              key={`${log}-${index}`}
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {log}
            </motion.div>
          ))}
        </AnimatePresence>

        <TypingCursor />

      </div>

    </div>
  );
}