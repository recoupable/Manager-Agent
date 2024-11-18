import { type ActionLoop } from "./types";
import { generateResponseForManager } from "../../openai/generateResponse";
import { getCurrentStateOfExecution } from "./getCurrentStateOfExectution";
import { getObservationReflectionForManager } from "./getObservationReflection";
import { generateTaskForManager } from "./generateTask";
import { executeTask } from "./executeTask";

export async function createActionLoop() {
  try {
    // Get current state
    const currentState = await getCurrentStateOfExecution();
    
    // Get observation reflection
    const observationReflection = await getObservationReflectionForManager(currentState);
    
    // Generate task based on current state and reflection
    const task = await generateTaskForManager(currentState, observationReflection);
    
    // Execute the generated task
    await executeTask(task);
    
    console.log("Action loop completed successfully");
  } catch (error) {
    console.error("Error in action loop:", error);
    throw error;
  }
}

export async function createActionLoopForManager(): Promise<ActionLoop> {
  const currentStateOfExecution = await getCurrentStateOfExecution();
  console.log("currentStateOfExecution", currentStateOfExecution);

  const observationReflection = await getObservationReflectionForManager(
    currentStateOfExecution
  );
  console.log("observationReflection", observationReflection);

  const stateOfMind = await generateResponseForManager({
    text: observationReflection,
    username: "ChillpillManager",
    userPrompt:
      "Based on your observations, describe your current state of mind as Chillpill’s Manager:",
  });
  console.log("stateOfMind", stateOfMind);

  const hlpPlanReasoning = await generateResponseForManager({
    text: `${currentStateOfExecution}\n${observationReflection}\n${stateOfMind}`,
    username: "ChillpillManager",
    userPrompt:
      "Provide reasoning for your next high-level plan as Chillpill’s Manager:",
  });
  console.log("hlpPlanReasoning", hlpPlanReasoning);

  const task = await generateTaskForManager(
    currentStateOfExecution,
    observationReflection
  );
  console.log("task", task);

  const taskResponse = await executeTask(task);
  console.log("Task execution response:", taskResponse);

  // Create the action loop structure
  return {
    highLevelPlanning: {
      currentStateOfExecution,
      observationReflection,
      stateOfMind,
      hlpPlanId: "",
      hlpPlanReasoning,
      hlpPlan: [], // To be implemented in next step
    },
    lowLevelPlanning: {
      llpPlan: [],
      llpPlanReasoning: "",
      situationAnalysis: "",
      taskReasoning: "",
      taskId: "",
      task: "",
    },
    performing: {
      action: "read_slack_messages",
    },
  };
}