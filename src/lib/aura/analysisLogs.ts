export interface AnalysisLog {
  text: string;
  delay: number;
  type?: "normal" | "success" | "warning";
}

export const analysisLogs: AnalysisLog[] = [
  {
    text: "> Initializing archive runtime...",
    delay: 900,
  },

  {
    text: "✓ Runtime initialized",
    delay: 800,
    type: "success",
  },

  {
    text: "> Reading birth record...",
    delay: 1800,
  },

  {
    text: "✓ Birth record verified",
    delay: 900,
    type: "success",
  },

  {
    text: "> Locating celestial registry...",
    delay: 2200,
  },

  {
    text: "✓ Celestial profile recovered",
    delay: 900,
    type: "success",
  },

  {
    text: "> Connecting Spotify archive...",
    delay: 2800,
  },

  {
    text: "✓ Listening history mounted",
    delay: 1000,
    type: "success",
  },

  {
    text: "> Recovering archived listening sessions...",
    delay: 2500,
  },

  {
    text: "> Extracting emotional frequencies...",
    delay: 2600,
  },

  {
    text: "> Computing behavioral vectors...",
    delay: 2200,
  },

  {
    text: "> Searching anomaly database...",
    delay: 2400,
  },

  {
    text: "> Calculating resonance...",
    delay: 3000,
  },

  {
    text: "⚠ UNKNOWN SIGNAL DETECTED",
    delay: 3500,
    type: "warning",
  },

  {
    text: "> Launching Classification.exe...",
    delay: 2000,
  },
];