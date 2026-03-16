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
            The AI that <span style={{ color: "var(--sage)" }}>does the work</span>,
            <br />
            not just the answers.
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
            Don’t ask for instructions. Tell Clerk the outcome you want.
          </p>

          <div
            style={{
              maxWidth: 760,
              margin: "0 auto 20px",
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 14,
              padding: 14,
              textAlign: "left",
            }}
          >
            <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 10 }}>Prompt vs Outcome</div>
            <div style={{ display: "grid", gap: 8 }}>
              {[
                ["How to get more customers", "Get more customers"],
                ["How to build a website", "Build a website"],
                ["How to run outreach", "Run outreach and follow-ups"],
              ].map(([a, b]) => (
                <div key={a} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 10, display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 8, alignItems: "center" }}>
                  <div style={{ color: "var(--slate)", fontSize: 14 }}>"{a}"</div>
                  <div style={{ color: "var(--sage)", fontWeight: 700 }}>→</div>
                  <div style={{ color: "var(--ink)", fontSize: 14, fontWeight: 600 }}>"{b}"</div>
                </div>
              ))}
            </div>
          </div>

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
