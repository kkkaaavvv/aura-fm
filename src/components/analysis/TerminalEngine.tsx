"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import TypingCursor from "./TerminalCursor";

interface TerminalEngineProps {
  logs: string[];
}

export default function TerminalEngine({
  logs,
}: TerminalEngineProps) {

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });

  }, [logs]);

  const isDivider = (text: string) =>
    text.includes("────────────────");

  const isVector = (text: string) =>
    /^\[\d+\/\d+\]/.test(text);

  const isSection = (text: string) =>
    [
      "Evidence",
      "Archive Observation",
      "Hidden Traits",
      "Behaviour Summary",
      "Archive Notes",
      "Final Verdict",
      "Psychological Reconstruction",
      "Dominant Behaviour",
    ].includes(text);

  const isStatus = (text: string) =>
    text.includes("COMPLETE") ||
    text.includes("ARCHIVED");

  return (

    <div className="font-mono text-[14px] leading-7 text-zinc-300">

      {/* ================= HEADER ================= */}

      <div className="mb-8 border-b border-zinc-800 pb-5">

        <p className="font-pixel text-[10px] uppercase tracking-[0.45em] text-zinc-500">

          AURA ARCHIVE

        </p>

        <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-zinc-600">

          Behaviour Reconstruction Engine

        </p>

        <p className="mt-3 text-[11px] text-zinc-700">

          Runtime v4.0.0

        </p>

      </div>

      {/* ================= LOGS ================= */}

      <div className="space-y-1">

        <AnimatePresence>

          {logs.map((log, index) => (

            <motion.div
              key={`${log}-${index}`}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
            >

              {/* Divider */}

              {isDivider(log) ? (

                <div className="my-6 border-t border-zinc-800" />

              ) :

              /* Vector */

              isVector(log) ? (

                <div className="mt-7 mb-2 font-pixel text-[10px] uppercase tracking-[0.4em] text-zinc-500">

                  {log}

                </div>

              ) :

              /* Section */

              isSection(log) ? (

                <div className="mt-5 mb-1 uppercase tracking-[0.25em] text-zinc-500">

                  {log}

                </div>

              ) :

              /* Status */

              isStatus(log) ? (

                <div className="font-semibold tracking-[0.25em] text-green-400">

                  {log}

                </div>

              ) :

              /* Evidence */

              log.startsWith("•") ? (

                <div className="pl-5 text-zinc-400">

                  {log}

                </div>

              ) :

              /* Default */

              (

                <div className="text-zinc-300">

                  {log}

                </div>

              )}

            </motion.div>

          ))}

        </AnimatePresence>

        <TypingCursor />

        <div ref={bottomRef} />

      </div>

    </div>

  );

}