import React from "react";
import PillButton from "@/components/ui/PillButton";

export default function StepSuccess({
  botUsername,
  tenantId,
}: {
  botUsername: string;
  tenantId: string;
}) {
  const botLink = `https://t.me/${botUsername}`;

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", animation: "fadeUp 0.5s ease both" }}>
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "var(--sage)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}
      >
        <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 14l6 6 12-12" />
        </svg>
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 400,
          letterSpacing: "-0.02em",
          marginBottom: 8,
        }}
      >
        Your Clerk is ready
      </h2>
      <p style={{ fontSize: 15, color: "var(--slate)", marginBottom: 32, lineHeight: 1.6 }}>
        Open Telegram and start chatting with your new AI assistant. It&apos;ll introduce itself and get to work.
      </p>

      <a
        href={botLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          width: "100%",
          maxWidth: 320,
          padding: "14px 28px",
          borderRadius: "var(--radius-pill)",
          fontSize: 15,
          fontWeight: 500,
          textDecoration: "none",
          background: "var(--ink)",
          color: "var(--paper)",
          cursor: "pointer",
          border: "none",
          marginBottom: 16,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.94 8.13l-1.97 9.28c-.15.67-.54.83-1.1.52l-3.03-2.24-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.06 5.58-5.04c.24-.22-.05-.34-.38-.13l-6.9 4.34-2.97-.93c-.64-.2-.66-.64.14-.95l11.6-4.47c.54-.2 1.01.13.83.95l.05.02z" />
        </svg>
        Open in Telegram
      </a>

      <div>
        <a
          href={`/dashboard/${tenantId}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--sage)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          Go to dashboard
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 7h8M8 3l4 4-4 4" />
          </svg>
        </a>
      </div>
    </div>
  );
}
