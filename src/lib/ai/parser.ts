import {
  ArchiveReport,
  AIResponse,
} from "./types";

/* ==========================================
   DEFAULT REPORT
========================================== */

const EMPTY_REPORT: ArchiveReport = {
  executiveSummary: "No summary generated.",

  psychologicalProfile:
    "No psychological profile available.",

  behaviourAnalysis:
    "No behaviour analysis available.",

  emotionalPatterns:
    "No emotional pattern analysis available.",

  musicIdentity:
    "No music identity analysis available.",

  archiveAssessment:
    "Archive assessment unavailable.",

  finalVerdict:
    "No verdict generated.",

  recommendations: [],

  confidence: 0,
};

/* ==========================================
   PARSER
========================================== */

export function parseReport(
  raw: string
): AIResponse {

  try {

    const json = JSON.parse(raw);

    const report: ArchiveReport = {
      ...EMPTY_REPORT,

      ...json,
    };

    return {
      report,
      raw,
    };

  } catch {

    return {
      report: EMPTY_REPORT,
      raw,
    };

  }

}