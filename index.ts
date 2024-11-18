import dotenv from 'dotenv';
import path from 'path';

// Add debugging for env loading
const result = dotenv.config();
console.log("Environment loading result:", result);
console.log("Current working directory:", process.cwd());
console.log("Env variables after loading:", {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY?.slice(0, 10) + "...", // Only show first 10 chars for security
  SLACK_BOT_TOKEN: !!process.env.SLACK_BOT_TOKEN,
  SLACK_CHANNEL_ID: process.env.SLACK_CHANNEL_ID,
});

import { createActionLoop } from "./lib/tools/actionLoop";
import { generateSlackMessageForManager as generateSlackMessage } from './lib/openai/generateSlackMessage';

const init = async () => {
  console.log("Starting Recoup Agent");

  // Start polling loop
  while (true) {
    await createActionLoop();
    // Sleep for 5 minutes (300000 milliseconds)
    await new Promise((resolve) => setTimeout(resolve, 300000));
  }
};

init().catch(console.error);
