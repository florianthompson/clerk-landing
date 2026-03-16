import React from "react";

export default function PillButton({
  children,
  variant = "primary",
  onClick,
  disabled,
  style,
  type,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: "button" | "submit";
}) {
  const isPrimary = variant === "primary";
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 28px",
        borderRadius: "var(--radius-pill)",
        fontSize: 14,
        fontWeight: 500,
        border: isPrimary ? "none" : "1.5px solid rgba(26,26,24,0.15)",
        background: isPrimary ? "var(--ink)" : "transparent",
        color: isPrimary ? "var(--paper)" : "var(--ink)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.25s ease",
        fontFamily: "inherit",
        ...style,
      }}
    >
      {children}
    </button>
  );
}
