export interface WeightedFeature {
  value: number;
  weight: number;
}

export function calculateScore(
  features: WeightedFeature[]
): number {
  if (!features.length) return 0;

  const totalWeight = features.reduce(
    (sum, feature) => sum + feature.weight,
    0
  );

  if (totalWeight === 0) return 0;

  const score = features.reduce(
    (sum, feature) =>
      sum + feature.value * feature.weight,
    0
  );

  return Math.round(score / totalWeight);
}