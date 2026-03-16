import React from "react";

export default function Checkbox({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        cursor: "pointer",
        padding: "16px 20px",
        borderRadius: "var(--radius-sm)",
        border: checked
          ? "1.5px solid var(--sage)"
          : "1px solid var(--border)",
        background: checked ? "var(--sage-light)" : "white",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: checked
            ? "none"
            : "1.5px solid rgba(26,26,24,0.2)",
          background: checked ? "var(--sage)" : "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          transition: "all 0.2s",
        }}
      >
        {checked && (
          <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M2 6l3 3 5-5" />
          </svg>
        )}
      </div>
      <div>
        <p style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>
          {label}
        </p>
        {description && (
          <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 2, lineHeight: 1.4 }}>
            {description}
          </p>
        )}
      </div>
    </label>
  );
}
