import { MetricResult } from "@/lib/analysis/types";

export interface AuraTheme {
  id: string;

  name: string;

  code: string;

  status: string;

  frequency: number;

  accent: string;

  border: string;

  glow: string;

  background: string;

  text: string;

  note: string;

  /**
   * Path to the curated wallpaper image for this theme, e.g.
   * "/wallpapers/obsidian-red.png". Populate once real assets
   * exist — safe to leave as an empty string until then.
   */
  wallpaper: string;

  /**
   * Glitch intensity for the Aura Reveal, roughly 0–1.
   * Not yet wired into AuraReveal.tsx — reserved for when we
   * build out the more dramatic reveal.
   */
  glitch: number;
}

export interface AuraResult {
  theme: AuraTheme;

  /**
   * The raw metric results this classification was derived from —
   * the real, deterministic data (scores/confidence/evidence),
   * not a separate derived shape that could drift out of sync
   * with the actual vector files.
   */
  metrics: MetricResult[];

  confidence: number;

  archiveLog: string[];

  summary: string;

  generatedAt: string;
}