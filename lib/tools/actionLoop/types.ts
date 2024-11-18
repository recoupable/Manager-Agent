export type ActionType = "send_slack_message" | "send_email" | "read_slack_messages";

export interface HighLevelPlanning {
  currentStateOfExecution: string;
  observationReflection: string;
  stateOfMind: string;
  hlpPlanId: string;
  hlpPlanReasoning: string;
  hlpPlan: string[];
}

export interface LowLevelPlanning {
  llpPlan: string[];
  llpPlanReasoning: string;
  situationAnalysis: string;
  taskReasoning: string;
  taskId: string;
  task: string;
}

export interface Performing {
  action: ActionType;
}

export interface ActionLoop {
  highLevelPlanning: HighLevelPlanning;
  lowLevelPlanning: LowLevelPlanning;
  performing: Performing;
}

export const EXAMPLE_ACTION_LOOP: ActionLoop = {
  highLevelPlanning: {
    currentStateOfExecution:
      "I have provided strategic feedback in 8 Slack messages and sent 2 emails to the internal team. While my guidance has been well-received, my ability to analyze Chillpill’s direct communication and respond dynamically is limited. This feature is being prioritized to enhance collaboration.",
    observationReflection:
      "Slack engagement has been productive, but without the ability to analyze messages, I can only provide generic feedback and initiate strategies. Reading message threads will allow me to challenge ideas and refine plans in real-time.",
    stateOfMind:
      "I am eager to enhance my contributions by gaining full context from Slack conversations. This will improve my ability to mentor Chillpill effectively and align our strategies with his long-term vision.",
    hlpPlanId: "9b4d3e7f-5c6a-4e8b-a3f1-7d6f2a4b1e3c",
    hlpPlanReasoning:
      "To better support Chillpill, I need to read Slack messages to understand team dynamics and provide insightful feedback. This will also prepare me for collaboration with external platforms and broader strategic decision-making.",
    hlpPlan: [
      "Enable the ability to read and analyze Slack messages for contextual understanding",
      "Refine strategic plans based on message analysis to align with Chillpill’s vision",
      "Prepare for real-time collaboration with Chillpill by improving responsiveness",
    ],
  },
  lowLevelPlanning: {
    llpPlan: [
      "Integrate the Slack API to read messages from key team channels",
      "Analyze the last 15 messages in relevant channels for context and engagement patterns",
      "Draft a Slack message summarizing key insights and propose actionable steps for the team",
    ],
    llpPlanReasoning:
      "Reading and analyzing Slack messages will allow me to provide more targeted feedback, identify opportunities for growth, and improve overall team collaboration.",
    situationAnalysis:
      "Currently, I cannot analyze Slack conversations in detail, which limits my ability to refine strategies. Adding this feature will significantly enhance my ability to guide and mentor Chillpill effectively.",
    taskReasoning:
      "The immediate priority should be implementing the read_slack_message action to build context-aware communication capabilities.",
    taskId: "8c5a4e3d-7b6f-4c01-a9f1-9d6e2a8b5c7c",
    task: "Set up and test the read_slack_message feature to analyze team conversations for strategic insights",
  },
  performing: {
    action: "read_slack_messages",
  },
};