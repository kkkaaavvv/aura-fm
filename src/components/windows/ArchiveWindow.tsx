"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const messages = [
    `Hello, ${username}.`,
    "The archive remembers.",
    "We've been expecting you.",
    "P.S. Some listening habits are hard to forget.",
  ];

  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let index = 0;

    setVisibleLines(0);

    const timer = setInterval(() => {
      index++;

      setVisibleLines(index);

      if (index >= messages.length) {
        clearInterval(timer);
      }
    }, 900);

    return () => {
      clearInterval(timer);
    };
  }, [messages.length]);

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
          ARCHIVE.LOG
        </span>

        <div className="flex items-center gap-3 text-zinc-500">
          <button className="hover:text-white">─</button>

          <button className="hover:text-white">□</button>

          <button
            onClick={onClose}
            className="hover:text-red-400"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="min-h-[170px] space-y-5 text-zinc-100">
          {messages
            .slice(0, visibleLines)
            .map((message, index) => (
              <motion.p
                key={index}
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className={
                  index === 3
                    ? "text-zinc-500"
                    : ""
                }
              >
                {message}
              </motion.p>
            ))}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              visibleLines === messages.length
                ? 1
                : 0,
          }}
          transition={{ duration: 0.4 }}
          disabled={
            visibleLines !== messages.length
          }
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
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-30
          "
        >
          Continue
        </motion.button>
      </div>
    </motion.div>
  );
}