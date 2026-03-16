import React from "react";

export default function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  style,
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ width: "100%", ...style }}>
      {label && (
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--ink)",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: "var(--radius-sm)",
          border: error
            ? "1.5px solid var(--coral)"
            : "1px solid var(--border)",
          fontSize: 14,
          fontFamily: "inherit",
          color: "var(--ink)",
          background: "white",
          outline: "none",
          transition: "border-color 0.2s",
        }}
      />
      {error && (
        <p style={{ fontSize: 12, color: "var(--coral)", marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}
