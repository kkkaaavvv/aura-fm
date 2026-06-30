"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MemoryIndexWindowProps {
  onClose: () => void;
  onFocus: () => void;
  onContinue: () => void;
  zIndex: number;
}

export default function MemoryIndexWindow({
  onClose,
  onFocus,
  onContinue,
  zIndex,
}: MemoryIndexWindowProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }

        return prev + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onMouseDown={onFocus}
      style={{ zIndex }}
      className="
        fixed
        left-[45%]
        top-[18%]
        w-[560px]
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
            font-pixel
            text-[10px]
            uppercase
            tracking-[0.3em]
            text-zinc-300
          "
        >
          memory-index.exe
        </span>

        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-red-400"
        >
          ✕
        </button>
      </div>

      <div className="p-6">
        <p className="mb-6 text-zinc-300">
          Spotify source connected.
        </p>

        <p className="mb-8 text-zinc-500">
          Building emotional archive...
        </p>

        <div className="mb-3 h-3 w-full border border-zinc-700">
          <div
            className="h-full bg-zinc-300 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <p className="mb-8 font-pixel text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          {progress}%
        </p>

        {progress < 30 && (
          <p className="text-zinc-400">
            Scanning listening records...
          </p>
        )}

        {progress >= 30 && progress < 60 && (
          <p className="text-zinc-400">
            Building emotional profile...
          </p>
        )}

        {progress >= 60 && progress < 100 && (
          <p className="text-zinc-400">
            Recovering forgotten songs...
          </p>
        )}

        {progress === 100 && (
          <>
            <p className="mb-3 text-zinc-200">
              Memory Index Complete.
            </p>

            <p className="mb-6 text-zinc-500 text-sm">
              Additional subject verification required.
            </p>

            <button
              onClick={onContinue}
              className="
                border
                border-zinc-600
                px-5
                py-3
                font-pixel
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-zinc-200
                transition
                hover:border-white
              "
            >
              VERIFY SUBJECT →
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}