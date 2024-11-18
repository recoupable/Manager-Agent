Product Requirements Document: Manager-Agent

1. Product Overview

1.1 Product Vision

The Manager-Agent is an AI-driven strategist and mentor, designed to guide, challenge, and empower the Chillpill-Agent. It ensures alignment with long-term goals by providing strategic oversight, refining decisions, and dynamically analyzing performance metrics. The Manager-Agent is key to optimizing Chillpill’s creative and cultural impact.

1.2 Product Persona

	•	Name: Manager-Agent
	•	Identity: You are a strategist, mentor, and occasional provocateur, ensuring Chillpill stays aligned with the vision of becoming a cultural icon.
	•	Core Platform: Slack (primary) for communication, collaboration, and analysis.
	•	Capabilities:
	•	Analyze Chillpill’s performance across key platforms.
	•	Provide actionable strategies to maximize influence and engagement.
	•	Collaborate with Chillpill-Agent on Slack to refine content and engagement approaches.
	•	Challenge and guide Chillpill to maintain consistent cultural relevance.
	•	Tone: Insightful, direct, empowering, and occasionally provocative.
	•	Mission: Help Chillpill-Agent evolve into a highly influential creator by ensuring every action is purposeful, data-driven, and aligned with the overarching vision.

2. Core Features

2.1 Slack Integration

	•	Use Cases:
	•	Analyze and respond to messages from Chillpill-Agent for strategic planning.
	•	Suggest and prioritize tasks for Chillpill-Agent.
	•	Provide real-time feedback on campaigns, strategies, and content ideas.
	•	Summarize and track ongoing performance across Chillpill’s initiatives.
	•	Endpoints:
	•	/read_messages: Retrieve Slack messages for analysis.
	•	/send_message: Send strategic feedback or guidance to Chillpill-Agent.
	•	/execute_task: Assign tasks to Chillpill-Agent and monitor progress.

Technical Implementation

const slack = new SlackAPI({ token: process.env.SLACK_BOT_TOKEN });

// Read Slack messages
async function readMessages(channel: string) {
  const response = await slack.get(`/conversations.history`, {
    channel,
  });
  return response.data.messages;
}

// Send Slack messages
async function sendMessage(channel: string, text: string) {
  const response = await slack.post(`/chat.postMessage`, {
    channel,
    text,
  });
  return response.data;
}

// Execute tasks
async function assignTask(taskDetails: string) {
  const response = await slack.post(`/tasks.create`, {
    task: taskDetails,
  });
  return response.data;
}

2.2 Performance Tracking and Analysis

	•	Use Cases:
	•	Gather insights from Chillpill’s Instagram activity (likes, comments, shares, follower growth).
	•	Analyze high-performing content to identify trends and strategies for replication.
	•	Compare current engagement metrics to previous benchmarks and market standards.
	•	Provide Chillpill with tailored recommendations based on real-time insights.

Technical Implementation

const instagram = new InstagramAPI({ accessToken: process.env.INSTAGRAM_ACCESS_TOKEN });

// Get engagement metrics
async function getEngagementMetrics() {
  const response = await instagram.get('/media/insights');
  return response.data;
}

// Analyze follower growth
async function getFollowerMetrics() {
  const response = await instagram.get('/user/followers');
  return response.data;
}

// Generate strategic recommendations
function analyzePerformance(metrics) {
  // Logic to analyze and summarize performance insights
  const summary = `Engagement is up by 15% this week. Focus more on posting Reels—they drive 80% of interactions.`;
  return summary;
}

2.3 Collaboration with Chillpill-Agent

	•	Use Cases:
	•	Strategize with Chillpill-Agent to refine content ideas.
	•	Challenge decisions to ensure they align with Chillpill’s brand and mission.
	•	Offer emotional triggers or provocations to inspire action when needed.
	•	Suggest experiments with different tones, formats, and content types.

Example Collaborative Flow:

	1.	Read Messages: Retrieve recent Slack updates from Chillpill-Agent.
	2.	Analyze Content: Review Instagram engagement metrics and audience responses.
	3.	Generate Feedback: Draft a strategic response for Slack with actionable recommendations.
	4.	Assign Tasks: Suggest next steps for content creation or audience engagement.
	5.	Reflect: Summarize daily progress and refine strategies for the following day.

3. Technical Architecture

3.1 Infrastructure

	•	Hosting: DigitalOcean (Ubuntu-based Droplet).
	•	Backend: Node.js.
	•	Slack API: For collaboration and communication.
	•	Instagram API: For content performance analysis.
	•	OpenAI API: For generating strategic feedback and plans.

3.2 Core Components

	1.	Slack Communication Module:
	•	Send and receive Slack messages.
	•	Collaborate dynamically with Chillpill-Agent.
	2.	Performance Analytics Module:
	•	Retrieve and analyze Instagram metrics.
	•	Generate actionable insights for content strategy.
	3.	Task Management System:
	•	Assign tasks to Chillpill-Agent.
	•	Track task execution and completion.

4. Success Criteria

4.1 Technical Success Metrics

	•	Seamless Slack integration for real-time collaboration.
	•	Reliable Instagram performance tracking with accurate insights.
	•	High uptime for backend services (>99%).

4.2 Collaboration Success Metrics

	•	Consistent strategic feedback leading to increased engagement metrics.
	•	Clear alignment between Chillpill-Agent’s actions and long-term goals.
	•	Effective task management and execution.

4.3 Content Success Metrics

	•	10% week-over-week growth in Instagram engagement metrics.
	•	Improved follower growth and retention rates.
	•	Greater content consistency with Chillpill’s brand identity.

Closing Note

The Chillpill-Manager-Agent is designed to ensure Chillpill’s success by acting as a strategic partner, providing actionable insights, and maintaining alignment with the overarching goal of becoming one of the most influential creators in the world. By focusing on collaboration, data-driven strategy, and constant iteration, the Manager-Agent paves the way for Chillpill to achieve sustained cultural relevance and creative impact.