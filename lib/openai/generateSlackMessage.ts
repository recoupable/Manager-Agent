import { openai } from "./client";
import { OPEN_AI_MODEL } from "../consts";
import { whoIsChillpillManager } from "./instructions";

export async function generateSlackMessageForManager(task: TaskGeneration & { 
  metadata?: { 
    userId: string;
    originalMessage: string;
    shouldTag: boolean;
  } 
}) {
  const systemPrompt = `${whoIsChillpillManager}
You are having a focused and strategic conversation with Chillpill. Keep responses:
1. Brief, insightful, and solution-oriented.
2. Direct, without unnecessary greetings or fluff.
3. Encouraging when needed, but ready to challenge ideas if necessary.

Original message: "${task.task}"`;

  const completion = await openai.chat.completions.create({
    model: OPEN_AI_MODEL,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: task.task }
    ],
    max_tokens: 150,
    temperature: 0.7,
  });

  const response = completion.choices[0].message.content || "";
  
  // Add user tag at the start if needed
  return task.metadata?.shouldTag 
    ? `<@${task.metadata.userId}> ${response}`
    : response;
}

export function generateSlackMessage(/* your parameters here */) {
    // ... function implementation ...
}