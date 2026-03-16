import React from "react";

export default function Card({
  children,
  selected,
  onClick,
  style,
}: {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "white",
        borderRadius: "var(--radius)",
        border: selected
          ? "2px solid var(--sage)"
          : "1px solid var(--border)",
        padding: "28px 24px",
        cursor: onClick ? "pointer" : "default",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: selected
          ? "0 0 0 3px var(--sage-light)"
          : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
