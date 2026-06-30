"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProfileWindowProps {
  onClose: () => void;
  onFocus: () => void;
  onAnalyze: (birthDate: string) => void;
  zIndex: number;
}

export default function ProfileWindow({
  onClose,
  onFocus,
  onAnalyze,
  zIndex,
}: ProfileWindowProps) {
  const [birthDate, setBirthDate] = useState("");

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onMouseDown={onFocus}
      style={{ zIndex }}
      className="
        fixed
        left-[52%]
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
          px-4
          py-3
          cursor-move
        "
      >
        <span
          className="
            font-pixel
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-zinc-300
          "
        >
          profile.exe
        </span>

        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-red-400"
        >
          ✕
        </button>
      </div>

      <div className="p-6">

        <p
          className="
            mb-6
            font-pixel
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-zinc-400
          "
        >
          SUBJECT ANALYSIS REQUIRED
        </p>

        <p
  className="
    mb-3
    font-pixel
    text-[10px]
    uppercase
    tracking-[0.25em]
    text-zinc-400
  "
>
  Archive Birth Record
</p>

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="
            w-full
            border
            border-zinc-700
            bg-black
            p-3
            text-zinc-200
            outline-none
            focus:border-zinc-400
            [color-scheme:dark]
          "
        />

        <button
          onClick={() => {
            if (!birthDate) {
              alert("Birth record missing.");
              return;
            }

            onAnalyze(birthDate);
          }}
          className="
            mt-6
            border
            border-zinc-600
            px-5
            py-3
            text-xs
            uppercase
            tracking-[0.25em]
            text-zinc-200
            transition
            hover:border-white
          "
        >
          ANALYZE SUBJECT
        </button>

      </div>
    </motion.div>
  );
}