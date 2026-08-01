"use client";

import { motion } from "framer-motion";

interface WarningWindowProps {
  onContinue: () => void;
  onCancel?: () => void;
}

export default function WarningWindow({
  onContinue,
  onCancel,
}: WarningWindowProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
        y: 18,
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
        duration: 0.4,
        ease: "easeOut",
      }}
      className="
        fixed
        left-1/2
        top-1/2
        z-[999]
        w-[560px]
        -translate-x-1/2
        -translate-y-1/2
        overflow-hidden
        border
        border-red-900/50
        bg-[#040404]
        shadow-[0_0_80px_rgba(255,0,0,0.08)]
      "
    >
      {/* ================= HEADER ================= */}

      <div className="border-b border-red-900/40 bg-[#090909] px-5 py-3">
        <p className="font-pixel text-[10px] uppercase tracking-[0.45em] text-red-500">
          Clearance Warning
        </p>
      </div>

      {/* ================= BODY ================= */}

      <div className="space-y-8 p-8">
        <div>
          <p className="font-pixel text-xs uppercase tracking-[0.35em] text-zinc-100">
            Restricted Psychological Archive
          </p>
        </div>

        <div className="space-y-5 font-mono text-sm leading-7 text-zinc-400">
          <p>
            You are about to access an automatically reconstructed
            psychological dossier generated from behavioural,
            musical and temporal archive data.
          </p>

          <p>
            The information presented is interpretive and may
            reveal behavioural patterns that differ from your
            own self-perception.
          </p>

          <p className="text-red-400">
            Continue only if you wish to reveal the complete
            classified record.
          </p>
        </div>

        <div className="border border-zinc-800 bg-black px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-zinc-500">
            Clearance Level:
            <span className="ml-2 text-red-400">
              ARCHIVE-01
            </span>
          </p>
        </div>
      </div>

      {/* ================= FOOTER ================= */}

      <div className="flex justify-between border-t border-zinc-800 bg-[#090909] p-5">
        <button
          onClick={onCancel}
          className="
            border
            border-zinc-700
            px-5
            py-2
            font-pixel
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-zinc-400
            transition
            hover:border-zinc-500
            hover:text-white
          "
        >
          Cancel
        </button>

        <button
          onClick={onContinue}
          className="
            border
            border-red-700
            px-5
            py-2
            font-pixel
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-red-300
            transition
            hover:border-red-500
            hover:bg-red-600
            hover:text-white
          "
        >
          Proceed
        </button>
      </div>
    </motion.div>
  );
}