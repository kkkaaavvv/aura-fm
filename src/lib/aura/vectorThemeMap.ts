/**
 * Maps a metric's id (from MetricResult.id, e.g. "internal-echo")
 * to the aura theme id it should classify toward when that
 * vector is dominant.
 *
 * NULL WHITE is intentionally NOT in this map. It's reserved as
 * the fallback for a flat/low-signal profile (see MIN_DOMINANCE_
 * SCORE in classifier.ts), not as any single vector's "true form."
 */
export const VECTOR_THEME_MAP: Record<string, string> = {
  "internal-echo": "obsidian-red",
  "anchor-mass": "pulse-amber",
  "integrity-index": "mercury-grey",
  "memory-drag": "void-blue",
  "nocturnal-offset": "phantom-black",
  "phase-displacement": "static-violet",
  "recursion-depth": "signal-green",
  "signal-dispersion": "terminal-orange",
  "signal-horizons": "echo-cyan",
  "spectral-fracture": "glitch-magenta",
  "static-bleed": "frequency-teal",
  "loop-residue": "residual-ash",
};