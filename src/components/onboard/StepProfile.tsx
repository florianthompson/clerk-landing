import React from "react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import PillButton from "@/components/ui/PillButton";
import { ProfileType } from "@/lib/types";

export default function StepProfile({
  name,
  profileType,
  onNameChange,
  onProfileChange,
  onNext,
}: {
  name: string;
  profileType: ProfileType | null;
  onNameChange: (v: string) => void;
  onProfileChange: (v: ProfileType) => void;
  onNext: () => void;
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
        Tell us about you
      </h2>
      <p style={{ fontSize: 15, color: "var(--slate)", marginBottom: 32, lineHeight: 1.6 }}>
        We&apos;ll customize your Clerk based on how you plan to use it.
      </p>

      <Input
        label="Your name"
        value={name}
        onChange={onNameChange}
        placeholder="e.g. Sarah"
        style={{ marginBottom: 24 }}
      />

      <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 12, color: "var(--ink)" }}>
        How will you use Clerk?
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
        <Card
          selected={profileType === "personal"}
          onClick={() => onProfileChange("personal")}
        >
          <div style={{ fontSize: 28, marginBottom: 12 }}>
            <svg width="32" height="32" fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="16" cy="12" r="5" />
              <path d="M6 28c0-5.5 4.5-10 10-10s10 4.5 10 10" />
            </svg>
          </div>
          <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Personal</p>
          <p style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.4 }}>
            Day-to-day life, planning, reminders, research
          </p>
        </Card>
        <Card
          selected={profileType === "business"}
          onClick={() => onProfileChange("business")}
        >
          <div style={{ fontSize: 28, marginBottom: 12 }}>
            <svg width="32" height="32" fill="none" stroke="var(--sage-dark)" strokeWidth="1.5" strokeLinecap="round">
              <rect x="4" y="8" width="24" height="18" rx="2" />
              <path d="M12 8V6a4 4 0 018 0v2" />
            </svg>
          </div>
          <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Business</p>
          <p style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.4 }}>
            Email, customers, content, Shopify, operations
          </p>
        </Card>
      </div>

      <PillButton
        onClick={onNext}
        disabled={!name.trim() || !profileType}
        style={{ width: "100%" }}
      >
        Continue
      </PillButton>
    </div>
  );
}
