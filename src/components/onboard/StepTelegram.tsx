import React from "react";
import PillButton from "@/components/ui/PillButton";

export default function StepTelegram({
  botUsername,
  botName,
  onNext,
  onBack,
}: {
  botUsername: string;
  botName: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const handle = botUsername.startsWith("@") ? botUsername : `@${botUsername}`;

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
        Connect Telegram
      </h2>
      <p style={{ fontSize: 15, color: "var(--slate)", marginBottom: 24, lineHeight: 1.6 }}>
        For this test setup, all signups connect to the shared Telegram bot below.
      </p>

      <div
        style={{
          background: "var(--sage-light)",
          borderRadius: "var(--radius)",
          padding: "18px 20px",
          marginBottom: 24,
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 6 }}>Assigned bot</div>
        <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{botName}</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "var(--sage-dark)" }}>{handle}</div>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <PillButton variant="secondary" onClick={onBack} style={{ flex: 1 }}>
          Back
        </PillButton>
        <PillButton onClick={onNext} style={{ flex: 2 }}>
          Continue
        </PillButton>
      </div>
    </div>
  );
}
