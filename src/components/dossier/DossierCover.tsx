"use client";

import { motion } from "framer-motion";
import { getTheme } from "@/lib/aura/store";

interface DossierCoverProps {
  username: string;
  onOpen: () => void;
}

export default function DossierCover({
  username,
  onOpen,
}: DossierCoverProps) {
  const aura = getTheme();

  const generatedAt = new Date().toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        flex
        h-full
        w-full
        items-center
        justify-center
        bg-[#050505]
      "
    >
      <motion.div
        initial={{
          y: 25,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.25,
        }}
        style={{
          borderColor: aura?.color ?? "#ffffff",
        }}
        className="
          w-[720px]
          border
          px-14
          py-16
        "
      >
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.45em] text-zinc-500">
            ANALYSIS.EXE
          </p>

          <h1 className="mt-4 text-5xl font-light tracking-[0.35em]">
            DOSSIER
          </h1>

          <p className="mt-4 text-sm tracking-[0.35em] text-zinc-500">
            CLASSIFIED ARCHIVE
          </p>
        </div>

        <div className="my-12 border-t border-zinc-800" />

        <div className="space-y-7 font-mono text-sm">
          <Info
            label="SUBJECT"
            value={(username || "UNKNOWN").toUpperCase()}
          />

          <Info
            label="STATUS"
            value="ARCHIVE VERIFIED"
          />

          <Info
            label="CLASSIFICATION"
            value={(aura?.name ?? "UNKNOWN").toUpperCase()}
          />

          <Info
            label="GENERATED"
            value={generatedAt.toUpperCase()}
          />
        </div>

        <div className="my-12 border-t border-zinc-800" />

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={onOpen}
          className="
            w-full
            border
            border-zinc-700
            py-4
            font-mono
            tracking-[0.3em]
            transition
            hover:border-white
          "
        >
          OPEN DOSSIER
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

interface InfoProps {
  label: string;
  value: string;
}

function Info({
  label,
  value,
}: InfoProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="tracking-[0.25em] text-zinc-500">
        {label}
      </span>

      <span className="tracking-[0.18em]">
        {value}
      </span>
    </div>
  );
}