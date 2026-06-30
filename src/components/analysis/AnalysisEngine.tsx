"use client";

import { useEffect, useRef } from "react";

import { getDataset } from "@/lib/analysis/store";
import { calculateInternalEcho } from "@/lib/aura/calculations/internalEcho";

interface AnalysisEngineProps {
  birthDate: string;
  appendLog: (text: string) => void;
  onDatasetReady: (dataset: any) => void;
  onError: (message: string) => void;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function AnalysisEngine({
  birthDate,
  appendLog,
  onDatasetReady,
  onError,
}: AnalysisEngineProps) {
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let cancelled = false;

    async function run() {
      try {
        appendLog("Establishing External Memory Link...");
        await sleep(900);

        appendLog("Authenticating Spotify Archive...");
        await sleep(850);

        const dataset = getDataset();

        if (!dataset) {
          throw new Error("Dataset not found.");
        }

        appendLog("Memory Channel Established.");
        await sleep(700);

        appendLog("Reading Identity Signature...");
        await sleep(700);

        appendLog(`Subject: ${dataset.profile.display_name}`);
        await sleep(600);

        appendLog(`Region: ${dataset.profile.country}`);
        await sleep(600);

        appendLog(
          `Subscription Tier: ${dataset.profile.product.toUpperCase()}`
        );
        await sleep(800);

        // ============================
        // INTERNAL ECHO
        // ============================

        appendLog("Initializing Internal Echo Engine...");
        await sleep(900);

        const internalEcho = calculateInternalEcho(dataset);

        appendLog(
          `Internal Echo: ${internalEcho.score}% (${internalEcho.level})`
        );
        await sleep(900);

        appendLog(internalEcho.archiveMessage);
        await sleep(1200);

        appendLog(internalEcho.interpretation);
        await sleep(1200);

        appendLog(`PS: ${internalEcho.ps}`);
        await sleep(1200);

        appendLog("Analysis Complete.");

        if (!cancelled) {
          onDatasetReady(dataset);
        }
      } catch (error) {
        console.error(error);

        if (cancelled) return;

        appendLog("Memory Synchronization Failed.");
        await sleep(600);

        appendLog("Archive Reconstruction Aborted.");

        onError(
          error instanceof Error
            ? error.message
            : "Unable to establish connection with external memory."
        );
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [birthDate, appendLog, onDatasetReady, onError]);

  return null;
}