 "use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";

import AnalysisEngine from "@/components/analysis/AnalysisEngine";
import TerminalEngine from "@/components/analysis/TerminalEngine";

interface AnalysisWindowProps {
  birthDate: string;

  zIndex: number;

  onClose: () => void;

  onFocus: () => void;

  onComplete: () => void;
}

export default function AnalysisWindow({
  birthDate,
  zIndex,
  onClose,
  onFocus,
  onComplete,
}: AnalysisWindowProps) {
  const [logs, setLogs] = useState<string[]>([]);

  const appendLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  const handleDatasetReady = useCallback(
    (dataset: any) => {
      console.log("DATASET", dataset);
      onComplete();
    },
    [onComplete]
  );

  const handleError = useCallback(
    (message: string) => {
      appendLog(message);
    },
    [appendLog]
  );

  return (
    <>
      <AnalysisEngine
        birthDate={birthDate}
        appendLog={appendLog}
        onDatasetReady={handleDatasetReady}
        onError={handleError}
      />

      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onMouseDown={onFocus}
        style={{ zIndex }}
        className="
          fixed
          left-[34%]
          top-[12%]
          w-[720px]
          overflow-hidden
          border
          border-zinc-700
          bg-black
          shadow-[0_0_40px_rgba(255,255,255,.05)]
        "
      >
        {/* Header */}

        <div className="flex cursor-move items-center justify-between border-b border-zinc-700 bg-zinc-900 px-4 py-3">
          <span className="font-pixel text-[10px] uppercase tracking-[0.35em] text-zinc-300">
            Analysis.exe
          </span>

          <button
            onClick={onClose}
            className="text-zinc-500 transition hover:text-red-400"
          >
            ✕
          </button>
        </div>

        {/* Body */}

        <div className="bg-[#050505] p-6">
          <TerminalEngine logs={logs} />
        </div>
      </motion.div>
    </>
  );
}