import { MetricLevel } from "../types";

export function levelFromScore(score: number): MetricLevel {
  if (score < 25) return "LOW";

  if (score < 50) return "MODERATE";

  if (score < 75) return "HIGH";

  return "CRITICAL";
}

export function confidenceFromFeatures(
  featureCount: number
): number {
  return Math.min(100, 60 + featureCount * 10);
}