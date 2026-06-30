export type SignalLayer =
  | "STRUCTURAL ANALYSIS"
  | "MEMORY ANALYSIS"
  | "SPECTRAL ANALYSIS";

export interface Signal {
  id: string;

  label: string;

  layer: SignalLayer;

  value: number;

  confidence: number;

  status: string;

  observation: string;

  interpretation: string;
}

export interface AuraSignals {
  staticBleed: Signal;

  integrityIndex: Signal;

  phaseDisplacement: Signal;

  signalDispersion: Signal;

  anchorMass: Signal;

  recursionDepth: Signal;

  loopResidue: Signal;

  backtrace: Signal;

  spectralFracture: Signal;

  nullOffset: Signal;

  nocturnalOffset: Signal;

  surfacePenetration: Signal;
}

export interface AuraTheme {
  id: string;

  name: string;

  description: string;

  auraColor: string;

  wallpaper: string;

  accent: string;

  glitch: number;

  particles: string;
}

export interface AuraResult {
  theme: AuraTheme;

  signals: AuraSignals;

  confidence: number;

  archiveLog: string[];

  summary: string;

  generatedAt: string;
}