"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";

import TerminalEngine from "@/components/analysis/TerminalEngine";
import { runAnalysisEngine } from "@/lib/analysis/AnalysisEngine";

interface AnalysisWindowProps {
  birthDate: string;
  zIndex: number;
  onClose: () => void;
  onFocus: () => void;
  onComplete: () => void;
}

type TerminalState =
  | "running"
  | "awaitingConfirmation"
  | "launching";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function AnalysisWindow({
  birthDate,
  zIndex,
  onClose,
  onFocus,
  onComplete,
}: AnalysisWindowProps) {
  const [logs, setLogs] = useState<string[]>([]);

  const [terminalState, setTerminalState] =
    useState<TerminalState>("running");

  const appendLog = useCallback((text: string) => {
    setLogs((prev) => [...prev, text]);
  }, []);

  // Same one-shot guard AnalysisEngine used to use internally.
  // Now that the analysis run lives directly in this component,
  // the guard lives here instead — there's no longer a second
  // component/effect pair for it to be duplicated across.
  const hasStarted = useRef(false);

  // Tracks whether the CURRENT effect invocation considers itself
  // mounted. This is deliberately a ref that gets reset to `true`
  // every time the effect (re)fires, not a plain variable scoped
  // to a single invocation's closure.
  //
  // Why this matters: React (in dev, under Strict Mode) invokes
  // every effect twice on mount — setup, cleanup, setup again.
  // hasStarted survives that because it's a ref, so the *second*
  // invocation correctly skips starting a duplicate run. But the
  // analysis kicked off by the *first* invocation keeps running in
  // the background regardless, and it was the only run that ever
  // happened. If "am I still mounted?" were tracked by a plain
  // variable captured in the first invocation's closure, that
  // variable would already have been flipped by the first
  // invocation's cleanup by the time the background run finishes
  // — causing the real completion (setTerminalState) to be
  // silently skipped, even though nothing was ever actually wrong.
  //
  // Using a shared ref that gets reset true on every (re)mount
  // means the check reflects the CURRENT mount status by the time
  // the async work resolves, not a stale snapshot from an
  // invocation that was immediately thrown away.
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    if (!hasStarted.current) {
      hasStarted.current = true;

      (async function start() {
        try {
          const { dataset } = await runAnalysisEngine(birthDate, {
            appendLog,
          });

          if (!isMountedRef.current) return;

          console.log("========== DATASET READY ==========");
          console.log(dataset);

          console.log("SETTING TERMINAL STATE");

          setTerminalState("awaitingConfirmation");
        } catch (error) {
          console.error(error);

          if (!isMountedRef.current) return;

          appendLog("");
          appendLog("Memory Synchronization Failed.");

          await sleep(1000);

          appendLog("Archive Reconstruction Aborted.");

          appendLog(
            error instanceof Error
              ? error.message
              : "Unable to establish connection with external memory."
          );
        }
      })();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [birthDate, appendLog]);

  useEffect(() => {

  console.log("CURRENT STATE:", terminalState);

  if (terminalState !== "awaitingConfirmation") return;

    let cancelled = false;

    const run = async () => {
      await sleep(500);
      if (cancelled) return;

      appendLog("");

      await sleep(300);
      if (cancelled) return;

      appendLog("DOSSIER SEALED");

      await sleep(800);
      if (cancelled) return;

      appendLog("");

      await sleep(300);
      if (cancelled) return;

      appendLog("Awaiting Subject Confirmation...");

      await sleep(800);
      if (cancelled) return;

      appendLog("");

      await sleep(300);
      if (cancelled) return;

      appendLog("Press ENTER to authorize archive access.");
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [terminalState, appendLog]);

  useEffect(() => {
    if (terminalState !== "awaitingConfirmation") return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;

      window.removeEventListener("keydown", handleKeyDown);

      setTerminalState("launching");

      appendLog("");
      appendLog("> ENTER");

      await sleep(400);

      appendLog("");
      appendLog("Confirmation received.");

      await sleep(700);

      appendLog("Authorization accepted.");

      await sleep(900);

      appendLog("");

      appendLog("Launching ARCHIVE.EXE...");

      await sleep(1400);

      onComplete();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [terminalState, appendLog, onComplete]);
    return (
    <>
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0}
        onMouseDown={onFocus}
        style={{ zIndex }}
        className="
          fixed
          left-1/2
          top-10
          -translate-x-1/2

          w-[880px]
          min-h-[560px]
          max-h-[82vh]

          overflow-hidden

          border
          border-zinc-800

          bg-[#050505]

          shadow-[0_0_70px_rgba(255,255,255,0.05)]
        "
      >
        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between border-b border-zinc-800 bg-[#090909] px-5 py-3">
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />

            <span className="font-pixel text-[10px] uppercase tracking-[0.35em] text-zinc-200">
              Analysis.exe
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              ARCHIVE ACTIVE
            </span>

            <button
              onClick={onClose}
              className="
                text-zinc-500
                transition
                hover:text-red-400
              "
            >
              ✕
            </button>
          </div>
        </div>

        {/* ================= BODY ================= */}

        <div className="relative bg-[#050505]">
          {/* CRT Scanlines */}

          <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
            <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_0%,transparent_97%,white_100%)] bg-[length:100%_4px]" />
          </div>

          {/* Noise */}

          <div className="pointer-events-none absolute inset-0 opacity-[0.015] bg-[radial-gradient(circle_at_center,white_0px,transparent_1px)] bg-[length:4px_4px]" />

          {/* Terminal */}

          <div className="relative max-h-[68vh] overflow-y-auto p-7">
            <TerminalEngine logs={logs} />
          </div>
        </div>

        {/* ================= FOOTER ================= */}

        <div className="flex items-center justify-between border-t border-zinc-800 bg-[#080808] px-5 py-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
            Behavioural Reconstruction
          </span>

          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />

            <span className="font-mono text-[10px] uppercase text-zinc-500">
              {terminalState === "running" && "LIVE"}

              {terminalState === "awaitingConfirmation" &&
                "AWAITING AUTHORIZATION"}

              {terminalState === "launching" && "LAUNCHING"}
            </span>
          </div>
        </div>
      </motion.div>
    </>
      );
}
