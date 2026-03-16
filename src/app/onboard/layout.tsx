export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Minimal nav — logo only */}
      <nav
        style={{
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              background: "var(--sage)",
              borderRadius: "50%",
              display: "inline-block",
              animation: "pulse-dot 3s ease-in-out infinite",
            }}
          />
          clerk
        </a>
      </nav>

      {/* Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
