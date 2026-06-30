import { SignalLayer } from "./types";

export interface SignalDefinition {
  id: string;

  label: string;

  layer: SignalLayer;

  low: string;

  medium: string;

  high: string;
}

export const SIGNAL_LEXICON: Record<
  string,
  SignalDefinition
> = {
  staticBleed: {
    id: "SIG-001",

    label: "STATIC BLEED",

    layer: "STRUCTURAL ANALYSIS",

    low:
      "Archive integrity preserved.",

    medium:
      "Minor signal corruption detected.",

    high:
      "Archive corruption increasing.",
  },

  integrityIndex: {
    id: "SIG-002",

    label: "INTEGRITY INDEX",

    layer: "STRUCTURAL ANALYSIS",

    low:
      "Structural instability detected.",

    medium:
      "Integrity fluctuating.",

    high:
      "Archive structure verified.",
  },

  phaseDisplacement: {
    id: "SIG-003",

    label: "PHASE DISPLACEMENT",

    layer: "STRUCTURAL ANALYSIS",

    low:
      "Listening architecture remains stable.",

    medium:
      "Minor phase displacement observed.",

    high:
      "Significant archive transition detected.",
  },

  signalDispersion: {
    id: "SIG-004",

    label: "SIGNAL DISPERSION",

    layer: "STRUCTURAL ANALYSIS",

    low:
      "Archive remains tightly clustered.",

    medium:
      "Moderate signal divergence observed.",

    high:
      "Archive trajectory increasingly unpredictable.",
  },

  anchorMass: {
    id: "SIG-005",

    label: "ANCHOR MASS",

    layer: "MEMORY ANALYSIS",

    low:
      "No dominant emotional anchors detected.",

    medium:
      "Stable anchor formation observed.",

    high:
      "Recurring entities have reached critical mass.",
  },

  recursionDepth: {
    id: "SIG-006",

    label: "RECURSION DEPTH",

    layer: "MEMORY ANALYSIS",

    low:
      "Signal progression remains linear.",

    medium:
      "Archive revisits previous states.",

    high:
      "Repeated memory loops detected.",
  },

  loopResidue: {
    id: "SIG-007",

    label: "LOOP RESIDUE",

    layer: "MEMORY ANALYSIS",

    low:
      "Minimal replay residue detected.",

    medium:
      "Replay signatures present.",

    high:
      "Persistent replay residue accumulating.",
  },

  backtrace: {
    id: "SIG-008",

    label: "BACKTRACE",

    layer: "MEMORY ANALYSIS",

    low:
      "Historical retrieval minimal.",

    medium:
      "Historical clusters remain active.",

    high:
      "Legacy archive strongly influencing current state.",
  },

  spectralFracture: {
    id: "SIG-009",

    label: "SPECTRAL FRACTURE",

    layer: "SPECTRAL ANALYSIS",

    low:
      "Signal frequency remains narrow.",

    medium:
      "Moderate spectral spread observed.",

    high:
      "Wide frequency occupation detected.",
  },

  nullOffset: {
    id: "SIG-010",

    label: "NULL OFFSET",

    layer: "SPECTRAL ANALYSIS",

    low:
      "External signal dominance detected.",

    medium:
      "Balanced inward processing.",

    high:
      "Signal repeatedly folds inward.",
  },

  nocturnalOffset: {
    id: "SIG-011",

    label: "NOCTURNAL OFFSET",

    layer: "SPECTRAL ANALYSIS",

    low:
      "Day-cycle dominant.",

    medium:
      "Balanced temporal activity.",

    high:
      "Archive activity concentrated after dark.",
  },

  surfacePenetration: {
    id: "SIG-012",

    label: "SURFACE PENETRATION",

    layer: "SPECTRAL ANALYSIS",

    low:
      "Preference remains near mainstream frequencies.",

    medium:
      "Balanced discovery profile.",

    high:
      "Archive consistently penetrates obscure frequencies.",
  },
};