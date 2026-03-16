"use client";

import { useEffect, useState } from "react";

const roles = ["developer", "designer", "expert"];

export default function ShopifyLanding() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % roles.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            background: "var(--sage-light)",
            borderRadius: "999px",
            fontSize: 13,
            color: "var(--sage-dark)",
            marginBottom: 24,
          }}
        >
          Shopify-focused Clerk
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(44px, 7vw, 78px)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          Your Shopify AI <span style={{ color: "var(--sage)", textTransform: "capitalize" }}>{roles[idx]}</span>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--slate)",
            maxWidth: 620,
            margin: "22px auto 34px",
            lineHeight: 1.7,
          }}
        >
          Ask Clerk to fix theme issues, run QA checks, generate implementation plans, and execute repetitive Shopify work without switching tools.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="/onboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              background: "var(--ink)",
              color: "var(--paper)",
            }}
          >
            Get started for free
          </a>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: "999px",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              color: "var(--ink)",
              border: "1px solid var(--border)",
              background: "white",
            }}
          >
            Back to main site
          </a>
        </div>
      </section>
    </main>
  );
}
