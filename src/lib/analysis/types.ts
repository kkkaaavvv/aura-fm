export type MetricLevel =
  | "LOW"
  | "MODERATE"
  | "HIGH"
  | "CRITICAL";

export interface MetricResult {
  id: string;

  title: string;

  score: number;

  level: MetricLevel;

  archiveMessage: string;

  interpretation: string;

  ps: string;

  evidence: string[];
}

export interface ClassificationResult {
  id: string;

  title: string;

  confidence: number;

  aura: string;

  description: string;
}