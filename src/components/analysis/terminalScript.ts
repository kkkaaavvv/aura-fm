export type TerminalInstruction =
  | {
      action: "type";
      text: string;
      speed?: number;
    }
  | {
      action: "success";
      text: string;
    }
  | {
      action: "warning";
      text: string;
    }
  | {
      action: "pause";
      duration: number;
    };

export const terminalScript: TerminalInstruction[] = [
  {
    action: "type",
    text: "Initializing archive runtime...",
  },

  {
    action: "pause",
    duration: 900,
  },

  {
    action: "success",
    text: "Runtime initialized",
  },

  {
    action: "pause",
    duration: 900,
  },

  {
    action: "type",
    text: "Reading birth record...",
  },

  {
    action: "pause",
    duration: 1800,
  },

  {
    action: "success",
    text: "Birth record verified",
  },

  {
    action: "pause",
    duration: 1200,
  },

  {
    action: "type",
    text: "Cross-referencing celestial registry...",
  },

  {
    action: "pause",
    duration: 2200,
  },

  {
    action: "success",
    text: "Celestial profile synchronized",
  },

  {
    action: "pause",
    duration: 1400,
  },

  {
    action: "type",
    text: "Connecting Spotify archive...",
  },

  {
    action: "pause",
    duration: 2600,
  },

  {
    action: "success",
    text: "Listening archive mounted",
  },

  {
    action: "pause",
    duration: 1000,
  },

  {
    action: "type",
    text: "Recovering archived listening sessions...",
  },

  {
    action: "pause",
    duration: 2600,
  },

  {
    action: "type",
    text: "Extracting emotional frequencies...",
  },

  {
    action: "pause",
    duration: 2400,
  },

  {
    action: "type",
    text: "Measuring emotional resonance...",
  },

  {
    action: "pause",
    duration: 3000,
  },

  {
    action: "warning",
    text: "UNKNOWN SIGNAL DETECTED",
  },

  {
    action: "pause",
    duration: 3000,
  },

  {
    action: "type",
    text: "Launching Classification.exe...",
  },
];