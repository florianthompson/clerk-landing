import { SkillPack, ProfileType } from "./types";

export const SKILL_PACKS: SkillPack[] = [
  {
    id: "email",
    name: "Email management",
    description: "Reads, drafts, and sends emails on your behalf. Filters the noise, surfaces what matters.",
    tag: "Business",
    iconBg: "var(--sage-light)",
    iconColor: "var(--sage-dark)",
    defaultFor: ["business"],
  },
  {
    id: "planning",
    name: "Planning & scheduling",
    description: "Manages your calendar, sets reminders, plans your week. Understands context like travel time.",
    tag: "Personal",
    iconBg: "var(--coral-light)",
    iconColor: "var(--coral)",
    defaultFor: ["personal", "business"],
  },
  {
    id: "research",
    name: "Research & analysis",
    description: "Digs into any topic, summarizes findings, compares options. Like having a research intern on call.",
    tag: "Business",
    iconBg: "#F0EDFF",
    iconColor: "#5B4FC7",
    defaultFor: ["business"],
  },
  {
    id: "shopify",
    name: "Shopify store management",
    description: "Edits your theme, writes product descriptions, handles SEO. Your store runs while you sleep.",
    tag: "Shopify",
    iconBg: "#FFF8E6",
    iconColor: "#B8860B",
    defaultFor: ["business"],
  },
  {
    id: "writing",
    name: "Writing & content",
    description: "Blog posts, social captions, product copy, customer replies. Matches your voice after a few conversations.",
    tag: "Business",
    iconBg: "var(--sage-light)",
    iconColor: "var(--sage-dark)",
    defaultFor: ["business"],
  },
  {
    id: "daily",
    name: "Daily life",
    description: "Meal planning, travel research, gift ideas, home management. The stuff that eats your free time.",
    tag: "Personal",
    iconBg: "var(--coral-light)",
    iconColor: "var(--coral)",
    defaultFor: ["personal"],
  },
];

export function getDefaultSkills(profileType: ProfileType): string[] {
  return SKILL_PACKS
    .filter((s) => s.defaultFor.includes(profileType))
    .map((s) => s.id);
}
