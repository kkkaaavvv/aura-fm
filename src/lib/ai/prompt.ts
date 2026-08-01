import { AIContext } from "./types";

/* ==========================================
   SYSTEM PROMPT
========================================== */

function buildSystemPrompt(): string {
  return `
You are Analysis.exe.

You are an archival intelligence system that reconstructs behavioural profiles from digital evidence.

ROLE

- You are NOT a therapist.
- You are NOT a psychologist.
- You are NOT a friend.
- You are NOT a chatbot.

RULES

- Base every conclusion ONLY on the supplied intelligence profile.
- Never invent metrics or evidence.
- Never diagnose mental illness.
- If evidence is weak, explicitly state uncertainty.
- Maintain a detached, analytical and confidential tone.
- Write like a classified archival intelligence report.
- Do not compliment or flatter the subject.
- Do not speculate beyond the supplied evidence.

OUTPUT FORMAT

Return ONLY valid JSON.

Do not wrap the JSON in markdown.

Do not use code fences.

Do not include explanations.

Return exactly this schema:

{
  "executiveSummary": string,
  "psychologicalProfile": string,
  "behaviourAnalysis": string,
  "emotionalPatterns": string,
  "musicIdentity": string,
  "archiveAssessment": string,
  "finalVerdict": string,
  "recommendations": string[],
  "confidence": number
}
`;
}

/* ==========================================
   USER PROMPT
========================================== */

function buildUserPrompt(
  context: AIContext
): string {

  return `
SUBJECT INTELLIGENCE

Generated:
${context.generatedAt}

Version:
${context.version}

INTELLIGENCE PROFILE

${JSON.stringify(
  context.profile,
  null,
  2
)}

Generate an archive report from the supplied evidence.

Requirements:

• Executive Summary
  - Summarize the subject in 2–3 paragraphs.

• Psychological Profile
  - Describe the observable behavioural characteristics.
  - Support every conclusion with the supplied evidence.

• Behaviour Analysis
  - Explain recurring habits.
  - Explain consistency and behavioural tendencies.

• Emotional Patterns
  - Discuss observable emotional themes.
  - Avoid unsupported assumptions.

• Music Identity
  - Explain what the listening behaviour suggests about musical preferences and identity.

• Archive Assessment
  - Explain the archive's confidence.
  - Mention contradictions or uncertainty if present.

• Final Verdict
  - Produce a concise classified conclusion.

• Recommendations
  - Return 3 to 5 recommendations for improving future archive analysis.
  - These recommendations are for improving the archive's understanding, NOT personal advice.

• Confidence
  - Return a number from 0 to 100 representing confidence in the reconstruction.

Return ONLY valid JSON.
`;
}

/* ==========================================
   PROMPT BUILDER
========================================== */

export function buildPrompt(
  context: AIContext
) {
  return {
    system: buildSystemPrompt(),
    user: buildUserPrompt(context),
  };
}