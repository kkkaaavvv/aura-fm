import { MetricResult } from "../types";
import { levelFromScore } from "./interpreter";

interface MetricInput {
  id: string;

  title: string;

  score: number;

  confidence?: number;

  archiveMessage: string;

  interpretation: string;

  ps: string;

  evidence: string[];
}

export function createMetric(
  metric: MetricInput
): MetricResult {
  return {
    id: metric.id,

    title: metric.title,

    score: metric.score,

    confidence: metric.confidence ?? 90,

    level: levelFromScore(metric.score),

    archiveMessage: metric.archiveMessage,

    interpretation: metric.interpretation,

    ps: metric.ps,

    evidence: metric.evidence,
  };
}