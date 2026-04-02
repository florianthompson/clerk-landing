import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* NAV */}
      <nav className="flex items-center justify-between py-5 px-6 md:px-10">
        <span className="nav-brand">Clerk</span>
        <Link
          href="/scan"
          className="text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
          style={{ background: "var(--accent)", color: "white" }}
        >
          Scan your store
        </Link>
      </nav>

      {/* HERO */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 pb-20 pt-10">
        <div className="step-enter max-w-2xl">
          <div
            className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-8"
            style={{ background: "var(--accent-light)", color: "var(--accent)" }}
          >
            Free Shopify Advisor
          </div>
          <h1
            className="step-heading mb-5"
            style={{ fontSize: "clamp(36px, 5vw, 56px)" }}
          >
            Your personal <em>growth expert</em> for Shopify
          </h1>
          <p
            className="text-lg leading-relaxed max-w-lg mx-auto mb-10"
            style={{ color: "var(--text-soft)" }}
          >
            Clerk scans your store, finds what&apos;s broken, and tells you exactly
            what to fix. Specific advice based on your real products and pages.
          </p>
          <Link
            href="/scan"
            className="inline-flex items-center gap-2 text-base font-medium px-8 py-4 rounded-full transition-colors"
            style={{ background: "var(--accent)", color: "white" }}
          >
            Scan my store — it&apos;s free
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
            No login required. Works with any Shopify store.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section
        className="py-20 px-6"
        style={{ background: "var(--bg-warm)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="step-heading text-center mb-4" style={{ fontSize: "32px" }}>
            What Clerk <em>finds</em>
          </h2>
          <p className="text-center mb-12" style={{ color: "var(--text-soft)" }}>
            A full audit of your store in 30 seconds.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "📦",
                title: "Product issues",
                desc: "Thin descriptions, missing images, weak titles, pricing gaps",
              },
              {
                icon: "🔍",
                title: "SEO gaps",
                desc: "Missing meta descriptions, no alt text, poor keyword coverage",
              },
              {
                icon: "⚡",
                title: "Technical problems",
                desc: "Slow pages, broken links, missing structured data",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl"
                style={{ background: "var(--white)", border: "1px solid var(--border)" }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="text-[15px] font-semibold mb-1">{f.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-soft)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="step-heading mb-4" style={{ fontSize: "32px" }}>
          Ready to grow your <em>store?</em>
        </h2>
        <p className="mb-8" style={{ color: "var(--text-soft)" }}>
          Get your free store audit in 30 seconds.
        </p>
        <Link
          href="/scan"
          className="inline-flex items-center gap-2 text-base font-medium px-8 py-4 rounded-full transition-colors"
          style={{ background: "var(--accent)", color: "white" }}
        >
          Scan my store
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 text-center text-xs" style={{ color: "var(--text-muted)" }}>
        Clerk — Your personal Shopify expert
      </footer>
    </div>
  );
}
