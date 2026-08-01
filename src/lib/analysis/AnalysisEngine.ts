import {
  setMetrics,
  setDataset,
  setBirthDate,
} from "@/lib/aura/store";
 
import { getDataset } from "@/lib/analysis/store";
import { MetricResult } from "@/lib/analysis/types";
import { AuraDataset } from "@/lib/spotify/types";
 
import { calculateInternalEcho } from "@/lib/aura/vectors/internalEcho";
import { calculateMemoryDrag } from "@/lib/aura/vectors/memoryDrag";
import { calculateSignalDispersion } from "@/lib/aura/vectors/signalDispersion";
import { calculateSignalHorizons } from "@/lib/aura/vectors/signalHorizon";
import { calculateAnchorMass } from "@/lib/aura/vectors/anchorMass";
import { calculateStaticBleed } from "@/lib/aura/vectors/staticBleed";
import { calculateSpectralFracture } from "@/lib/aura/vectors/spectralFracture";
import { calculateIntegrityIndex } from "@/lib/aura/vectors/integrityIndex";
import { calculateRecursionDepth } from "@/lib/aura/vectors/recursionDepth";
import { calculateNocturnalOffset } from "@/lib/aura/vectors/nocturnalOffset";
import { calculatePhaseDisplacement } from "@/lib/aura/vectors/phaseDisplacement";
 
export interface AnalysisEngineCallbacks {
  /**
   * Called for every terminal line the analysis pipeline wants
   * printed, in order. This is the ONLY way runAnalysisEngine talks to
   * the outside world during a run — no other side-channel state,
   * no other callbacks. AnalysisWindow owns what happens with
   * these lines (rendering, pacing already baked into the awaited
   * sleeps below, scrolling, etc).
   */
  appendLog: (text: string) => void;
}
 
export interface AnalysisEngineResult {
  dataset: AuraDataset;
  metrics: MetricResult[];
}
 
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
 
/**
 * Runs the full behavioural-reconstruction pipeline:
 *
 *   1. Retrieves the previously-fetched Spotify dataset
 *   2. Computes all 11 behavioural vectors against it
 *   3. Persists metrics/dataset/birthDate to the Aura store
 *   4. Streams progress lines via `appendLog` throughout
 *
 * This function owns ONLY computation, store writes, and log
 * text. It has no knowledge of React, window lifecycle, terminal
 * rendering, or user interaction (Enter-to-confirm, launch
 * sequence, etc) — all of that remains AnalysisWindow's
 * responsibility.
 *
 * Failures are thrown, not swallowed. The caller decides how to
 * present a failure in the terminal — this keeps "what a failure
 * looks like on screen" as UI concern, not a computation concern.
 */
export async function runAnalysisEngine(
  birthDate: string,
  { appendLog }: AnalysisEngineCallbacks
): Promise<AnalysisEngineResult> {
  console.log("RUN STARTED");
 
  /* ================= CONNECTION ================= */
 
  appendLog("Establishing External Memory Link...");
  await sleep(900);
 
  appendLog("Authenticating Spotify Archive...");
  await sleep(900);
 
  const dataset = getDataset();
 
  if (!dataset) {
    throw new Error("Dataset not found.");
  }
 
  appendLog("Memory Channel Established.");
  await sleep(900);
 
  appendLog("Reading Identity Signature...");
  await sleep(900);
 
  appendLog(`Subject: ${dataset.profile.display_name}`);
  await sleep(700);
 
  appendLog(`Region: ${dataset.profile.country}`);
  await sleep(700);
 
  appendLog(
    `Subscription Tier: ${dataset.profile.product.toUpperCase()}`
  );
  await sleep(1000);
 
  appendLog("");
 
  appendLog("Initializing Behavioural Reconstruction...");
 
  await sleep(1500);
 
  /* ================= VECTORS ================= */
 
  const vectors = [
    calculateInternalEcho,
    calculateMemoryDrag,
    calculateSignalDispersion,
    calculateSignalHorizons,
    calculateAnchorMass,
    calculateStaticBleed,
    calculateSpectralFracture,
    calculateIntegrityIndex,
    calculateRecursionDepth,
    calculateNocturnalOffset,
    calculatePhaseDisplacement,
  ];
 
  const metrics: MetricResult[] = [];
 
  for (let i = 0; i < vectors.length; i++) {
    appendLog("");
    appendLog("────────────────────────────────");
    appendLog(`[VX-${String(i + 1).padStart(2, "0")}]`);
 
    await sleep(500);
 
    const metric = vectors[i](dataset);
 
    metrics.push(metric);
 
    appendLog("");
    appendLog(metric.title.toUpperCase());
 
    await sleep(700);
 
    appendLog("Computing Behaviour Signal...");
    await sleep(900);
 
    appendLog(`${metric.score}%`);
    await sleep(600);
 
    appendLog("ARCHIVED");
    await sleep(900);
  }
 
  /* ================= STORE ================= */
 
  setMetrics(metrics);
  setDataset(dataset);
  setBirthDate(birthDate);
 
  /* ================= FINALIZATION ================= */
 
  appendLog("");
  appendLog("────────────────────────────────");
 
  await sleep(800);
 
  appendLog("Cross Referencing Behavioural Signals...");
  await sleep(1200);
 
  appendLog("Generating Aura Signature...");
  await sleep(1200);
 
  appendLog("Encrypting Psychological Dossier...");
  await sleep(1500);
 
  appendLog("");
  appendLog("ANALYSIS COMPLETE");
 
  await sleep(700);
 
  console.log("RUN FINISHED");
 
  return { dataset, metrics };
}
 