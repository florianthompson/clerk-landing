import React from "react";
import Checkbox from "@/components/ui/Checkbox";
import PillButton from "@/components/ui/PillButton";
import { SKILL_PACKS } from "@/lib/skills";

export default function StepSkills({
  skills,
  onToggle,
  onNext,
  onBack,
}: {
  skills: string[];
  onToggle: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div style={{ maxWidth: 480, margin: "0 auto", animation: "fadeUp 0.5s ease both" }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 400,
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}
      >
        Pick your skills
      </h2>
      <p style={{ fontSize: 15, color: "var(--slate)", marginBottom: 32, lineHeight: 1.6 }}>
        Select what you want your Clerk to help with. You can change these later.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
        {SKILL_PACKS.map((skill) => (
          <Checkbox
            key={skill.id}
            checked={skills.includes(skill.id)}
            onChange={() => onToggle(skill.id)}
            label={skill.name}
            description={skill.description}
          />
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <PillButton variant="secondary" onClick={onBack} style={{ flex: 1 }}>
          Back
        </PillButton>
        <PillButton onClick={onNext} disabled={skills.length === 0} style={{ flex: 2 }}>
          Continue
        </PillButton>
      </div>
    </div>
  );
}
