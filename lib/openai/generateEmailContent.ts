import { OPEN_AI_MODEL } from "../consts";
import type { TaskGeneration } from "../tools/actionLoop/generateTask";
import { openai } from "./client";
import { whoIsChillpillManager } from "./instructions";

async function generateEmailContentForManager(task: TaskGeneration) {
  const prompt = `
      Generate a concise and strategic email, aligned with Chillpill Manager's tone and role. 
      The email should be focused, professional, and insightful, with a clear call-to-action or recommendation.
      It should demonstrate a balance of encouragement and constructive critique, helping Chillpill achieve his goal of becoming the most influential artist in the world.

      Here are the task details:
      Task ID: ${task.taskId}
      Task Type: ${task.task}
      Task Reasoning: ${task.taskReasoning}

      Format the response in JSON with two fields: 'subject' and 'html'.
      The 'subject' should be attention-grabbing but professional, and the 'html' should have a strategic and solution-oriented tone.
    `;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: whoIsChillpillManager },
      { role: "user", content: prompt },
    ],
    model: OPEN_AI_MODEL,
    response_format: { type: "json_object" },
  });

  console.log("completion:", completion);

  const response = JSON.parse(completion.choices[0].message.content);
  return {
    subject: response.subject,
    html: response.html,
  };
}

export default generateEmailContentForManager;