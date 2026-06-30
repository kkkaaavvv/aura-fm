"use client";

import { motion } from "framer-motion";

interface ArchiveWindowProps {
  username: string;
  onContinue: () => void;
  onClose: () => void;
  onFocus: () => void;
  zIndex: number;
}

export default function ArchiveWindow({
  username,
  onContinue,
  onClose,
  onFocus,
  zIndex,
}: ArchiveWindowProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onMouseDown={onFocus}
      style={{ zIndex }}
      className="
        fixed
        left-[20%]
        top-[22%]
        w-[520px]
        border
        border-zinc-700
        bg-black
        shadow-[0_0_30px_rgba(255,255,255,0.05)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-zinc-700
          bg-zinc-900
          px-3
          py-2
          cursor-move
        "
      >
        <span
          className="
            text-[11px]
            uppercase
            tracking-[0.25em]
            text-zinc-300
          "
        >
          archive.log
        </span>

        <div className="flex items-center gap-3 text-zinc-500">
          <button className="hover:text-white">
            ─
          </button>

          <button className="hover:text-white">
            □
          </button>

          <button
            onClick={onClose}
            className="hover:text-red-400"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6">

        <div className="space-y-5 text-zinc-100">

          <p>
            Hello,{" "}
            <span className="text-violet-300 font-medium">
              {username}
            </span>.
          </p>

          <p>
            The archive remembers.
          </p>

          <p>
            We've been expecting you.
          </p>

          <p className="text-zinc-500">
            P.S. Some listening habits are hard
            to forget.
          </p>

        </div>

        <button
          onClick={onContinue}
          className="
            mt-8
            border
            border-zinc-700
            px-4
            py-2
            text-xs
            uppercase
            tracking-[0.25em]
            transition
            hover:border-white
          "
        >
          Continue
        </button>

      </div>

    </motion.div>
  );
}