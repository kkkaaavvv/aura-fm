export function clamp(
  value: number,
  min = 0,
  max = 100
): number {
  return Math.max(min, Math.min(max, value));
}

export function normalize(
  value: number,
  min: number,
  max: number
): number {
  if (max <= min) return 0;

  return clamp(
    ((value - min) / (max - min)) * 100
  );
}

export function invert(
  value: number,
  min: number,
  max: number
): number {
  return 100 - normalize(value, min, max);
}