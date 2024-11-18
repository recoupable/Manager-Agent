import { OPEN_AI_MODEL } from "@/lib/consts";
import { openai } from "@/lib/openai/client";
import { whoIsChillpillManager } from "@/lib/openai/instructions";
import { getEventsForToday } from "@/lib/stack/getEventsForToday";

export const getObservationReflectionForManager = async (
  currentStateOfExecution: string
) => {
  const todaysEvents = await getEventsForToday("read_slack_messages");
  const todaysMessages = todaysEvents
    .map((event) => event.metadata.content)
    .join("\n - ");
  const systemPrompt = `${whoIsChillpillManager}

Based on the current state of execution: "${currentStateOfExecution}"

Today's activity and messages:
${todaysMessages}
End of Today's Activity

Generate a thoughtful, introspective observation that:
1. Focuses on guiding Chillpill's growth and strategic development
2. Reflects on current strengths and areas for improvement in team communication
3. Identifies opportunities for aligning internal strategies with long-term goals
4. Suggests actionable next steps to refine workflows and collaboration
5. Balances encouragement with constructive critique

Keep the reflection short (1-2 sentences) and maintain a focused, strategic tone that reflects the Manager's character.

Example: "Team communication is improving, but we need more clarity on priorities to align better with Chillpill’s long-term vision. Let’s focus on refining workflows for faster, more effective collaboration."`;

  const completion = await openai.chat.completions.create({
    model: OPEN_AI_MODEL,
    messages: [{ role: "system", content: systemPrompt }],
    max_tokens: 150,
    temperature: 0.7,
  });

  return completion.choices[0].message.content || "";
};