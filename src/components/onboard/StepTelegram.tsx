import React, { useState } from "react";
import Input from "@/components/ui/Input";
import PillButton from "@/components/ui/PillButton";

export default function StepTelegram({
  botToken,
  botUsername,
  onTokenChange,
  onValidated,
  onNext,
  onBack,
}: {
  botToken: string;
  botUsername: string;
  onTokenChange: (v: string) => void;
  onValidated: (username: string, name: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [validating, setValidating] = useState(false);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(!!botUsername);

  async function handleValidate() {
    if (!botToken.trim()) return;
    setValidating(true);
    setError("");

    try {
      const res = await fetch("/api/validate-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: botToken.trim() }),
      });
      const data = await res.json();

      if (data.valid) {
        setValidated(true);
        onValidated(data.botUsername, data.botName);
      } else {
        setError(data.error || "Invalid token");
      }
    } catch {
      setError("Failed to validate token");
    } finally {
      setValidating(false);
    }
  }

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
      <p style={{ fontSize: 15, color: "var(--slate)", marginBottom: 32, lineHeight: 1.6 }}>
        Create a Telegram bot and paste the token here.
      </p>

      {/* BotFather guide */}
      <div
        style={{
          background: "var(--sage-light)",
          borderRadius: "var(--radius)",
          padding: "20px 24px",
          marginBottom: 24,
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--sage-dark)", marginBottom: 12 }}>
          How to get a bot token:
        </p>
        <ol style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.8, paddingLeft: 16 }}>
          <li>
            Open Telegram and search for{" "}
            <strong>@BotFather</strong>
          </li>
          <li>
            Send <code style={{ background: "rgba(0,0,0,0.06)", padding: "1px 6px", borderRadius: 4, fontSize: 12 }}>/newbot</code> and follow the prompts
          </li>
          <li>Choose a name and username for your bot</li>
          <li>Copy the API token BotFather gives you</li>
          <li>Paste it below</li>
        </ol>
      </div>

      <Input
        label="Bot token"
        value={botToken}
        onChange={(v) => {
          onTokenChange(v);
          setValidated(false);
          setError("");
        }}
        placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
        error={error}
        style={{ marginBottom: 16 }}
      />

      {validated && botUsername && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            background: "var(--sage-light)",
            borderRadius: "var(--radius-sm)",
            marginBottom: 24,
          }}
        >
          <svg width="16" height="16" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round">
            <circle cx="8" cy="8" r="6" />
            <path d="M5 8l2 2 4-4" />
          </svg>
          <span style={{ fontSize: 13, color: "var(--sage-dark)", fontWeight: 500 }}>
            Connected as @{botUsername}
          </span>
        </div>
      )}

      {!validated && (
        <PillButton
          onClick={handleValidate}
          disabled={!botToken.trim() || validating}
          variant="secondary"
          style={{ width: "100%", marginBottom: 24 }}
        >
          {validating ? "Validating..." : "Validate token"}
        </PillButton>
      )}

      <div style={{ display: "flex", gap: 12 }}>
        <PillButton variant="secondary" onClick={onBack} style={{ flex: 1 }}>
          Back
        </PillButton>
        <PillButton onClick={onNext} disabled={!validated} style={{ flex: 2 }}>
          Launch my Clerk
        </PillButton>
      </div>
    </div>
  );
}
