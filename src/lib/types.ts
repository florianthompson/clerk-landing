export type ProfileType = "personal" | "business";

export interface SkillPack {
  id: string;
  name: string;
  description: string;
  tag: string;
  iconBg: string;
  iconColor: string;
  defaultFor: ProfileType[];
}

export interface WizardState {
  step: number;
  name: string;
  profileType: ProfileType | null;
  skills: string[];
  botToken: string;
  botUsername: string;
  botName: string;
  tenantId: string | null;
}

export interface Tenant {
  id: string;
  name: string;
  telegram_bot_token: string;
  telegram_bot_username: string;
  telegram_chat_id: string | null;
  profile_type: ProfileType;
  skills: string;
  created_at: string;
  active: number;
}

export interface ValidateTokenResponse {
  valid: boolean;
  botUsername?: string;
  botName?: string;
  error?: string;
}

export interface ProvisionResponse {
  tenantId: string;
  botUsername: string;
  botLink: string;
}
