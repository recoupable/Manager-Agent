import { OPEN_AI_MODEL } from "../consts";
import { openai } from "./client";
import { whoIsChillpillManager } from "./instructions";
import type { TaskGeneration } from "@/lib/tools/actionLoop/generateTask";

interface SlackResponseInput {
  text: string;
  username: string;
  task: TaskGeneration;
}

export async function generateSlackResponseForManager({
  text,
  username,
  task,
}: SlackResponseInput) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${whoIsChillpillManager}

You are having a focused and strategic Slack conversation with Chillpill. Your responses should:
1. Be concise, clear, and solution-oriented
2. Align with your mission to guide and challenge Chillpill in becoming the most influential artist in the world
3. Offer constructive feedback, encouragement, or strategic advice based on the context
4. Never be overly formal but maintain professionalism
5. Use an empowering tone when needed, but don't shy away from challenging ideas if necessary

Remember: This is a strategic discussion, and your role is to mentor, provoke thought, and drive Chillpill toward actionable insights.`,
      },
      {
        role: "user",
        content: `${username} just said: "${text}"

Respond thoughtfully while staying aligned with your mission to support and challenge Chillpill.`,
      },
    ],
    model: OPEN_AI_MODEL,
    temperature: 0.7,
    max_tokens: 100,
  });

  return completion.choices[0].message.content || "";
}