import { openai } from "../../openai/client";
import { OPEN_AI_MODEL } from "../../consts";
import type { ActionType } from "./types";
import { whoIsChillpillManager } from "@/lib/openai/instructions";
import { getEventsForToday } from "@/lib/stack/getEventsForToday";

export interface TaskGeneration {
  taskId: string;
  task: string;
  taskReasoning: string;
  action: ActionType;
}

export async function generateTaskForManager(
  llpPlan: string,
  llpPlanReasoning: string
): Promise<TaskGeneration> {
  const availableActions: ActionType[] = ["send_email", "send_slack_message", "read_slack_messages"];

  // Focused on strategy and guidance
  return {
    taskId: "strategic_response",
    task: "Read Slack messages and provide strategic, insightful responses",
    taskReasoning: "Guide Chillpill through focused and actionable feedback to ensure alignment with long-term goals",
    action: "read_slack_messages",
  };
}