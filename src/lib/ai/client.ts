import OpenAI from "openai";

import { AnalystOptions } from "./types";

/* ==========================================
   OPENAI CLIENT
========================================== */

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ==========================================
   GENERATE REPORT
========================================== */

export async function generateReport(
  system: string,
  user: string,
  options?: AnalystOptions
) {
  const response = await client.responses.create({
    model: options?.model ?? "gpt-5.5",

    temperature: options?.temperature ?? 0.7,

    max_output_tokens: options?.maxTokens ?? 2000,

    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: system,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: user,
          },
        ],
      },
    ],
  });

  return response.output_text;
}