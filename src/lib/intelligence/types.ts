import { ReasoningResult } from "@/lib/aura/reasoning";
import { MetricResult } from "@/lib/analysis/types";

export interface IdentityProfile {
  stability: number;
  exploration: number;
  emotionalAnchoring: number;
  adaptability: number;

  dominantTraits: string[];
}

export interface BehaviourProfile {
  consistency: number;
  replayDensity: number;
  circadianBias: "DAY" | "BALANCED" | "NIGHT";
  archiveConfidence: number;

  dominantBehaviour: string;
}

export interface MusicProfile {
  dominantGenre: string;

  diversity: number;

  mainstreamAffinity: number;

  nicheAffinity: number;

  explicitRatio: number;

  averagePopularity: number;
}

export interface ArchiveProfile {
  status: string;

  confidence: number;

  dominantDimension: string;

  weakestDimension: string;

  contradictions: string[];

  hiddenTraits: string[];
}

export interface IntelligenceProfile {
  identity: IdentityProfile;

  behaviour: BehaviourProfile;

  music: MusicProfile;

  archive: ArchiveProfile;

  metrics: MetricResult[];

  reasoning: ReasoningResult;
}