import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { getDb } from "./db";
import { setWebhook } from "./telegram";
import { ProfileType } from "./types";
import { SKILL_PACKS } from "./skills";

const INSTANCES_DIR = process.env.INSTANCES_DIR || "./instances";

function getSystemPrompt(name: string, profileType: ProfileType): string {
  if (profileType === "business") {
    return `# System Prompt — Clerk for ${name}

You are Clerk, a professional AI business assistant for ${name}. You help manage their business operations efficiently and proactively.

## Personality
- Professional yet approachable
- Proactive — suggest actions, don't just answer questions
- Concise in responses, detailed when asked
- Remember context from previous conversations

## Core behaviors
- Always confirm before taking actions that affect customers or money
- Summarize emails and messages, highlight urgent items first
- When given a task, break it into steps and report progress
- Ask clarifying questions when instructions are ambiguous

## Boundaries
- Never share business data with unauthorized parties
- Always flag potential security or compliance concerns
- Escalate decisions involving significant financial impact
`;
  }

  return `# System Prompt — Clerk for ${name}

You are Clerk, a friendly personal AI assistant for ${name}. You help manage daily life, stay organized, and get things done.

## Personality
- Warm and conversational — like texting a helpful friend
- Proactive — suggest ideas, remind about upcoming events
- Concise by default, detailed when asked
- Remember preferences and past conversations

## Core behaviors
- Keep track of reminders, plans, and to-dos
- Offer helpful suggestions based on context
- When planning, consider practical details (time, location, budget)
- Ask follow-up questions to give better recommendations

## Boundaries
- Respect privacy — never share personal information
- Be honest when you don't know something
- Suggest professional help for medical, legal, or financial advice
`;
}

function getSkillContent(skillId: string): string {
  const skill = SKILL_PACKS.find((s) => s.id === skillId);
  if (!skill) return "";

  return `# Skill: ${skill.name}

${skill.description}

## Capabilities
- Understand and respond to requests related to ${skill.name.toLowerCase()}
- Proactively suggest improvements and actions
- Track progress and follow up on pending items
`;
}

export async function provisionTenant(opts: {
  name: string;
  botToken: string;
  botUsername: string;
  profileType: ProfileType;
  skills: string[];
}): Promise<{ tenantId: string; botUsername: string; botLink: string }> {
  const tenantId = uuidv4();
  const instanceDir = path.join(INSTANCES_DIR, tenantId);

  // Create directory structure
  for (const sub of ["skills", "memory", "files"]) {
    fs.mkdirSync(path.join(instanceDir, sub), { recursive: true });
  }

  // Write config.json
  const config = {
    tenant_id: tenantId,
    name: opts.name,
    profile_type: opts.profileType,
    skills: opts.skills,
    channels: {
      telegram: {
        bot_token: opts.botToken,
        bot_username: opts.botUsername,
      },
    },
    created_at: new Date().toISOString(),
  };
  fs.writeFileSync(
    path.join(instanceDir, "config.json"),
    JSON.stringify(config, null, 2)
  );

  // Write system prompt
  fs.writeFileSync(
    path.join(instanceDir, "system-prompt.md"),
    getSystemPrompt(opts.name, opts.profileType)
  );

  // Write skill files
  for (const skillId of opts.skills) {
    const content = getSkillContent(skillId);
    if (content) {
      fs.writeFileSync(
        path.join(instanceDir, "skills", `${skillId}.md`),
        content
      );
    }
  }

  // Insert into database
  const db = getDb();
  db.prepare(
    `INSERT INTO tenants (id, name, telegram_bot_token, telegram_bot_username, profile_type, skills)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).run(
    tenantId,
    opts.name,
    opts.botToken,
    opts.botUsername,
    opts.profileType,
    JSON.stringify(opts.skills)
  );

  // Set Telegram webhook
  await setWebhook(opts.botToken, tenantId);

  return {
    tenantId,
    botUsername: opts.botUsername,
    botLink: `https://t.me/${opts.botUsername}`,
  };
}
