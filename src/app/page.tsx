"use client";

import { useEffect, useState } from "react";

const comparisons = [
  { how: "How to build an app", does: "Build an app" },
  { how: "How to clean up my inbox", does: "Clean up my inbox" },
  { how: "How to plan my week", does: "Plan my week and send reminders" },
  { how: "How to run lead outreach", does: "Run lead outreach and follow-ups" },
];

export default function Home() {
  const [idx, setIdx] = useState(0);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % comparisons.length), 2200);
    return () => clearInterval(t);
  }, []);

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
        <div style={{ width: "100%", maxWidth: 980, textAlign: "center" }}>
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
              fontSize: "clamp(42px, 7vw, 76px)",
              fontWeight: 400,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: 14,
            }}
          >
            The AI that does the work,
            <br />
            not just the answers
          </h1>

          <p style={{ fontSize: 18, color: "var(--slate)", maxWidth: 640, margin: "0 auto 26px", lineHeight: 1.7 }}>
            Don’t ask for instructions. Tell Clerk what you want done.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              maxWidth: 860,
              margin: "0 auto 20px",
            }}
            className="skills-grid"
          >
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 16, padding: 18, textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 8 }}>ChatGPT / Claude</div>
              <div style={{ fontSize: 21, fontFamily: "var(--font-display)", lineHeight: 1.2 }}>
                “{comparisons[idx].how}”
              </div>
            </div>
            <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 16, padding: 18, textAlign: "left" }}>
              <div style={{ fontSize: 12, color: "var(--sage)", marginBottom: 8, fontWeight: 600 }}>Clerk</div>
              <div style={{ fontSize: 21, fontFamily: "var(--font-display)", lineHeight: 1.2, display: "flex", gap: 8 }}>
                <span style={{ color: "var(--sage)", fontWeight: 700 }}>✓</span>
                <span>“{comparisons[idx].does}”</span>
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: 860,
              margin: "0 auto 18px",
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: 16,
              padding: 0,
              textAlign: "left",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border)", fontSize: 12, color: "var(--slate)", background: "#fcfcfb" }}>
              Clerk Dashboard Preview
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", minHeight: 220 }}>
              <div style={{ borderRight: "1px solid var(--border)", background: "#fbfbf8", padding: 12 }}>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Workspace</div>
                {[
                  "Overview",
                  "Tasks",
                  "Messages",
                  "Automations",
                ].map((n, i) => (
                  <div key={n} style={{ padding: "8px 10px", borderRadius: 8, fontSize: 13, color: i === 1 ? "var(--ink)" : "var(--slate)", background: i === 1 ? "white" : "transparent", border: i === 1 ? "1px solid var(--border)" : "none", marginBottom: 6 }}>
                    {n}
                  </div>
                ))}
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 13, color: "var(--slate)", marginBottom: 8 }}>Today’s completed tasks</div>
                <div style={{ display: "grid", gap: 8 }}>
                  {[
                    ["Website developed", "10:14"],
                    ["Flights booked", "10:42"],
                    ["Presentation finished", "11:07"],
                  ].map(([t, time]) => (
                    <div key={String(t)} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff" }}>
                      <span style={{ fontSize: 14, color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: "var(--sage)", fontWeight: 700 }}>✓</span>{t}
                      </span>
                      <span style={{ fontSize: 12, color: "var(--slate)" }}>{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 8 }}>
            {[
              "Build an app",
              "Book the cheapest flights",
              "Clean up my inbox",
              "Run follow-ups",
            ].map((x) => (
              <span key={x} style={{ border: "1px solid var(--border)", background: "white", borderRadius: 999, padding: "6px 12px", fontSize: 13, color: "var(--slate)" }}>
                {x}
              </span>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              setJoined(true);
            }}
            style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}
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
