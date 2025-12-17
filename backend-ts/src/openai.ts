import OpenAI from "openai";
import { SocialMediaPost } from "./types";

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw { code: "OPENAI_NOT_CONFIGURED" };
  }

  if (!client) {
    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 30000, // 30 second timeout
      maxRetries: 2,
    });
  }

  return client;
}

export async function callOpenAI(prompt: string): Promise<SocialMediaPost[]> {
  const client = getClient();

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
        You are a professional social media copywriter.
        
        Your task is to generate engaging, platform-appropriate social media posts
        to promote a product.
        
        Rules:
        - Always return valid JSON only.
        - Follow platform best practices.
        - Be concise, clear, and persuasive.
        - Use emojis sparingly and appropriately.
        - Do not invent facts not provided in the input.
        `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;

    if (content) {
      return JSON.parse(content).posts;
    }

    return [];
  } catch (error: any) {
    const status = error?.status ?? error?.response?.status;

    if (status === 401) throw { code: "OPENAI_UNAUTHORIZED" };
    if (status === 429) throw { code: "OPENAI_RATE_LIMIT" };

    throw { code: "OPENAI_TIMEOUT" };
  }
}
