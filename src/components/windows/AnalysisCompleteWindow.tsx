"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TransitionManager from "../Transitions/TransitionManager";

interface AnalysisCompleteWindowProps {
  onContinue: () => void;
}

export default function AnalysisCompleteWindow({
  onContinue,
}: AnalysisCompleteWindowProps) {
  const [startingTransition, setStartingTransition] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!startingTransition && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.98,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className="
              fixed
              left-1/2
              top-1/2
              z-[999]
              w-[540px]
              -translate-x-1/2
              -translate-y-1/2
              overflow-hidden
              border
              border-zinc-800
              bg-[#050505]
              shadow-[0_0_70px_rgba(255,255,255,0.06)]
            "
          >
            {/* Header */}

            <div className="border-b border-zinc-800 bg-[#090909] px-5 py-3">
              <p className="font-pixel text-[10px] uppercase tracking-[0.45em] text-red-400">
                Archive Notification
              </p>
            </div>

            {/* Body */}

            <div className="space-y-6 p-8">
              <div>
                <p className="font-pixel text-xs uppercase tracking-[0.35em] text-zinc-100">
                  Analysis Complete
                </p>
              </div>

              <div className="space-y-3 font-mono text-sm leading-7 text-zinc-400">
                <p>Behavioural reconstruction complete.</p>

                <p>11 behavioural vectors archived.</p>

                <p>Psychological dossier successfully sealed.</p>

                <p className="text-zinc-500">
                  The archive is prepared to reveal its findings.
                </p>
              </div>
            </div>

            {/* Footer */}

            <div className="flex justify-end border-t border-zinc-800 bg-[#090909] p-5">
              <button
                onClick={() => setStartingTransition(true)}
                className="
                  border
                  border-zinc-700
                  px-5
                  py-2
                  font-pixel
                  text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-zinc-200
                  transition
                  hover:border-white
                  hover:bg-white
                  hover:text-black
                "
              >
                Obtain Dossier
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {startingTransition && (
        <TransitionManager
          active={true}
          onComplete={onContinue}
        />
      )}
    </>
  );
}