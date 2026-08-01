import { IntelligenceProfile } from "@/lib/intelligence/types";

/* ==========================================
   AI CONTEXT
========================================== */

export interface AIContext {
  profile: IntelligenceProfile;

  generatedAt: string;

  version: string;
}

/* ==========================================
   ARCHIVE REPORT
========================================== */

export interface ArchiveReport {
  executiveSummary: string;

  psychologicalProfile: string;

  behaviourAnalysis: string;

  emotionalPatterns: string;

  musicIdentity: string;

  archiveAssessment: string;

  finalVerdict: string;

  recommendations: string[];

  confidence: number;
}

/* ==========================================
   AI RESPONSE
========================================== */

export interface AIResponse {
  report: ArchiveReport;

  raw: string;
}

/* ==========================================
   ANALYST OPTIONS
========================================== */

export interface AnalystOptions {
  model?: string;

  temperature?: number;

  maxTokens?: number;
}