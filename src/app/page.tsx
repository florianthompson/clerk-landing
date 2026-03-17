"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)", color: "var(--ink)" }}>
      <section
        style={{
          minHeight: "100vh",
          padding: "120px 24px 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: 860, textAlign: "center" }}>
          <p
            style={{
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--sage)",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            Early access waitlist
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(44px, 8vw, 82px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              marginBottom: 16,
            }}
          >
            From <span style={{ color: "var(--sage)" }}>how-to</span> to{" "}
            <span style={{ color: "var(--sage)" }}>done</span>.
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "var(--slate)",
              maxWidth: 620,
              margin: "0 auto 30px",
              lineHeight: 1.7,
            }}
          >
            Stop asking for instructions. Tell Clerk what you want and it gets done.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              setJoined(true);
            }}
            style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: 320,
                maxWidth: "90vw",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid var(--border)",
                background: "white",
                fontSize: 14,
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 18px",
                borderRadius: 999,
                border: "none",
                background: "var(--ink)",
                color: "var(--paper)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Get early access
            </button>
          </form>

          <p style={{ marginTop: 10, fontSize: 13, color: "var(--slate)" }}>
            {joined ? "You’re on the list. We’ll send your invite soon." : "Invites are rolling out weekly."}
          </p>

        </div>
      </section>
    </main>
  );
}
