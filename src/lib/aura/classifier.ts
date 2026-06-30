import { auraThemes } from "./themes";
import { AuraResult } from "./types";

export function classifyAura(): AuraResult {
  const randomTheme =
    auraThemes[Math.floor(Math.random() * auraThemes.length)];

  return {
    theme: randomTheme,

    confidence: Math.floor(Math.random() * 8) + 92,

    sunSign: "Unknown",

    archiveMessage:
      "Emotional frequency synchronized successfully.",
  };
}