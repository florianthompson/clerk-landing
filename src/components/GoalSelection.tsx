"use client";

import { useState } from "react";
import { GoalType } from "@/lib/types";

const GOALS: { type: GoalType; icon: string; title: string; desc: string }[] = [
  {
    type: "traffic",
    icon: "📈",
    title: "Get more customers",
    desc: "SEO, ads, and visibility — get more people to your store",
  },
  {
    type: "fix",
    icon: "🔧",
    title: "Fix something that's broken",
    desc: "Technical issues, broken links, slow pages, checkout problems",
  },
  {
    type: "conversion",
    icon: "💰",
    title: "Improve my conversion rate",
    desc: "Product pages, trust signals, descriptions — turn visitors into buyers",
  },
  {
    type: "idk",
    icon: "✨",
    title: "Just tell me what to do",
    desc: "Clerk picks the highest-impact action and walks you through it",
  },
];

interface GoalSelectionProps {
  onSelect: (goal: GoalType) => void;
}

export default function GoalSelection({ onSelect }: GoalSelectionProps) {
  const [selected, setSelected] = useState<GoalType | null>(null);

  const handleClick = (goal: GoalType) => {
    setSelected(goal);
    setTimeout(() => onSelect(goal), 400);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {GOALS.map((g) => (
        <div
          key={g.type}
          className={`goal-card ${selected === g.type ? "selected" : ""}`}
          onClick={() => handleClick(g.type)}
        >
          <div className="goal-icon">{g.icon}</div>
          <div>
            <h3 className="text-[15px] font-semibold mb-0.5">{g.title}</h3>
            <p className="text-[13px] text-[var(--text-soft)] leading-relaxed">
              {g.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
