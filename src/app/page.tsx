"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const roles = ["developer", "designer", "marketer", "accountant", "assistant", "researcher", "copywriter", "strategist"];

const cards = [
  { label: "Build mobile apps", stat: "3", unit: "apps shipped this month", bg: "#F0EDFF", color: "#5B4FC7", badge: "Development", icon: "📱" },
  { label: "Send email campaigns", stat: "1,247", unit: "emails sent", bg: "#E8F0ED", color: "#3A6259", badge: "Marketing", icon: "📧" },
  { label: "Design landing pages", stat: "12", unit: "pages launched", bg: "#FBEAF0", color: "#C4456D", badge: "Design", icon: "🎨" },
  { label: "Manage Shopify stores", stat: "89", unit: "products optimized", bg: "#FFF8E6", color: "#8B6914", badge: "E-commerce", icon: "🛍" },
  { label: "Write blog content", stat: "34", unit: "articles published", bg: "#FFF0EB", color: "#C45A2E", badge: "Content", icon: "✏️" },
  { label: "Research competitors", stat: "6", unit: "reports generated", bg: "#E8F0FB", color: "#2E6BC6", badge: "Research", icon: "🔍" },
  { label: "Book travel plans", stat: "4", unit: "trips planned", bg: "#F0EDFF", color: "#5B4FC7", badge: "Personal", icon: "📍" },
  { label: "Automate follow-ups", stat: "312", unit: "leads contacted", bg: "#E8F0ED", color: "#3A6259", badge: "Sales", icon: "👥" },
  { label: "Plan weekly meals", stat: "52", unit: "weeks planned", bg: "#FFF0EB", color: "#C45A2E", badge: "Personal", icon: "☕" },
  { label: "Generate sales reports", stat: "48", unit: "reports this year", bg: "#FFF8E6", color: "#8B6914", badge: "Analytics", icon: "📊" },
  { label: "Handle customer support", stat: "430", unit: "tickets resolved", bg: "#FBEAF0", color: "#C4456D", badge: "Support", icon: "💬" },
  { label: "File taxes and invoices", stat: "16", unit: "filings completed", bg: "#E8F0FB", color: "#2E6BC6", badge: "Finance", icon: "💳" },
];

function RoleRotator() {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const measureRef = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | undefined>();

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.scrollWidth + 4);
    }
  }, [current]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setCurrent((p) => (p + 1) % roles.length);
        setPhase("in");
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        height: "1.2em",
        lineHeight: 1.2,
        overflow: "hidden",
        verticalAlign: "top",
        transition: "width 0.4s ease",
        width,
      }}
    >
      <span ref={measureRef} style={{ visibility: "hidden", whiteSpace: "nowrap", height: 0, overflow: "hidden", display: "block", lineHeight: 1.2 }}>
        {roles[current]}
      </span>
      {roles.map((role, i) => (
        <span
          key={role}
          style={{
            display: "block",
            position: "absolute",
            left: 0,
            top: 0,
            whiteSpace: "nowrap",
            color: "var(--sage)",
            lineHeight: 1.2,
            animation: i === current ? (phase === "in" ? "roleIn 0.5s ease both" : "roleOut 0.4s ease both") : undefined,
            opacity: i === current && phase === "in" ? 1 : 0,
            transform: i === current && phase === "in" ? "translateY(0)" : "translateY(100%)",
          }}
        >
          {role}
        </span>
      ))}
    </span>
  );
}

function Carousel() {
  const doubled = [...cards, ...cards];
  const totalW = (280 + 16) * cards.length;
  const duration = totalW / 35;

  return (
    <section
      style={{
        width: "100vw",
        marginTop: 48,
        position: "relative",
        overflow: "hidden",
        animation: "fadeUp 0.7s ease 0.24s both",
      }}
    >
      <div style={{ content: "''", position: "absolute", top: 0, bottom: 0, left: 0, width: 120, zIndex: 3, pointerEvents: "none", background: "linear-gradient(to right, var(--paper), transparent)" }} />
      <div style={{ content: "''", position: "absolute", top: 0, bottom: 0, right: 0, width: 120, zIndex: 3, pointerEvents: "none", background: "linear-gradient(to left, var(--paper), transparent)" }} />
      <div
        style={{
          display: "flex",
          gap: 16,
          padding: "8px 0 20px",
          width: "max-content",
          animation: `scroll ${duration}s linear infinite`,
        }}
      >
        {doubled.map((c, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: 280,
              padding: 22,
              background: "white",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              cursor: "default",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.07)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", background: c.bg, fontSize: 20, flexShrink: 0 }}>
                {c.icon}
              </div>
              <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.3, textAlign: "left" }}>{c.label}</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1, color: c.color }}>{c.stat}</div>
                <div style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 3 }}>{c.unit}</div>
              </div>
              <span style={{ padding: "4px 11px", borderRadius: "var(--radius-pill)", fontSize: 11, fontWeight: 600, background: c.bg, color: c.color }}>{c.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/waitlist").then((r) => r.json()).then((d) => setCount(d.count)).catch(() => {});
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim()) return;
      try {
        await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim() }),
        });
        setSubmitted(true);
      } catch {
        // silently fail
      }
    },
    [email]
  );

  const countLabel = count !== null && count > 0 ? `Join ${count.toLocaleString()}+ people on the waitlist.` : "Join the waitlist.";

  return (
    <>
      <style>{`
        @keyframes roleIn {
          from { opacity: 0; transform: translateY(60%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes roleOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-60%); }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <nav style={{ padding: "20px 32px", display: "flex", alignItems: "center" }}>
        <a href="#" style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 400, color: "var(--ink)", textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 10, height: 10, background: "var(--sage)", borderRadius: "50%", animation: "pulse-dot 3s ease-in-out infinite" }} />
          clerk
        </a>
      </nav>

      <section style={{ textAlign: "center", padding: "40px 32px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--sage)", fontWeight: 600, marginBottom: 24, animation: "fadeUp 0.7s ease both" }}>
          Early access
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(44px, 6.5vw, 72px)", fontWeight: 400, letterSpacing: "-0.03em", lineHeight: 1.2, animation: "fadeUp 0.7s ease 0.08s both" }}>
          Your personal AI <RoleRotator />
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(16px, 2.2vw, 22px)", color: "var(--slate)", fontWeight: 400, marginTop: 8, letterSpacing: "-0.01em", animation: "fadeUp 0.7s ease 0.12s both" }}>
          The entire team you&apos;ve been meaning to hire. One Telegram chat.
        </p>
        <p style={{ fontSize: 17, color: "var(--slate)", lineHeight: 1.7, marginTop: 20, fontWeight: 300, maxWidth: 500, animation: "fadeUp 0.7s ease 0.16s both" }}>
          Clerk doesn&apos;t explain how&nbsp;&mdash; it executes. Apps, emails, reports, designs. Tell it what you need and it gets done.
        </p>
      </section>

      <Carousel />

      <section style={{ textAlign: "center", padding: "48px 32px 80px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, animation: "fadeUp 0.7s ease 0.32s both" }}>
            From <span style={{ color: "var(--sage)" }}>how-to</span> to <span style={{ color: "var(--sage)" }}>done.</span>
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ marginTop: 36, display: "flex", alignItems: "center", width: "100%", maxWidth: 440, animation: "fadeUp 0.7s ease 0.4s both" }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            disabled={submitted}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: "15px 20px",
              border: "1.5px solid rgba(26,26,24,0.12)",
              borderRight: "none",
              borderRadius: "var(--radius-pill) 0 0 var(--radius-pill)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              color: "var(--ink)",
              background: "white",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={submitted}
            style={{
              padding: "15px 28px",
              background: submitted ? "var(--sage)" : "var(--ink)",
              color: "var(--paper)",
              border: `1.5px solid ${submitted ? "var(--sage)" : "var(--ink)"}`,
              borderRadius: "0 var(--radius-pill) var(--radius-pill) 0",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              cursor: submitted ? "default" : "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {submitted ? "Added!" : "Get early access"}
          </button>
        </form>
        <p style={{ fontSize: 13, color: "var(--slate)", marginTop: 14, animation: "fadeUp 0.7s ease 0.48s both" }}>
          {submitted ? "You're on the list. We'll be in touch soon." : countLabel}
        </p>

        <div style={{ display: "flex", gap: 32, marginTop: 56, width: "100%", maxWidth: 560, animation: "fadeUp 0.7s ease 0.56s both" }}>
          {[
            { icon: "💬", title: "Text-based", desc: "Works on Telegram. No new apps to download." },
            { icon: "⚡", title: "Skill packs", desc: "Pre-loaded abilities. Business, personal, or both." },
            { icon: "🕐", title: "Works 24/7", desc: "Scheduled tasks run while you sleep." },
          ].map((f) => (
            <div key={f.title} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--sage-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", fontSize: 18 }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{f.title}</h3>
              <p style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: "24px 32px", textAlign: "center", fontSize: 12, color: "var(--slate)" }}>
        &copy; 2026 Clerk. Made by humans, powered by AI.
      </footer>
    </>
  );
}
