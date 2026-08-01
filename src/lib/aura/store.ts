import { MetricResult } from "@/lib/analysis/types";
import { AuraTheme } from "./types";
import { AuraDataset } from "@/lib/spotify/types";
import { ArchiveReport } from "@/lib/ai/types";

let archiveReport: ArchiveReport | null = null;
/* ==========================================
   ARCHIVE REPORT
========================================== */

export function setArchiveReport(
  report: ArchiveReport
) {
  archiveReport = report;
}

export function getArchiveReport() {
  return archiveReport;
}

let latestMetrics: MetricResult[] = [];

let latestDataset: AuraDataset | null = null;

let latestTheme: AuraTheme | null = null;

let latestBirthDate = "";

/* ==========================================
   METRICS
========================================== */

export function setMetrics(
  metrics: MetricResult[]
) {
  latestMetrics = metrics;
}

export function getMetrics() {
  return latestMetrics;
}

/* ==========================================
   DATASET
========================================== */

export function setDataset(
  dataset: AuraDataset
) {
  latestDataset = dataset;
}

export function getDataset() {
  return latestDataset;
}

/* ==========================================
   AURA THEME
========================================== */

export function setTheme(
  theme: AuraTheme
) {
  latestTheme = theme;
}

export function getTheme() {
  return latestTheme;
}

/* ==========================================
   BIRTH DATE
========================================== */

export function setBirthDate(
  birthDate: string
) {
  latestBirthDate = birthDate;
}

export function getBirthDate() {
  return latestBirthDate;
}

/* ==========================================
   RESET
========================================== */

export function clearAuraStore() {
  latestMetrics = [];
  latestDataset = null;
  latestTheme = null;
  latestBirthDate = "";
}