import React from "react";

const STEPS = ["Profile", "Skills", "Launch"];

export default function StepIndicator({ current }: { current: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%", maxWidth: 400, margin: "0 auto 48px" }}>
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: "0 0 auto" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 600,
                  background: done || active ? "var(--sage)" : "var(--border)",
                  color: done || active ? "white" : "var(--slate)",
                  transition: "all 0.3s",
                }}
              >
                {done ? (
                  <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M2 6l3 3 5-5" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: active ? 600 : 400,
                  color: done || active ? "var(--sage-dark)" : "var(--slate)",
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: i < current ? "var(--sage)" : "var(--border)",
                  marginBottom: 20,
                  transition: "background 0.3s",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
