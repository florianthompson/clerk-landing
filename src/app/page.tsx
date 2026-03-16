"use client";

import LiveFeed from "@/components/LiveFeed";

export default function Home() {
  return (
    <>
      {/* NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(250,250,247,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a
          href="#"
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
        <ul
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            listStyle: "none",
          }}
        >
          <li>
            <a
              href="#how"
              style={{
                fontSize: 14,
                color: "var(--slate)",
                textDecoration: "none",
                fontWeight: 400,
              }}
            >
              How it works
            </a>
          </li>
          <li>
            <a
              href="#skills"
              style={{
                fontSize: 14,
                color: "var(--slate)",
                textDecoration: "none",
                fontWeight: 400,
              }}
            >
              Skills
            </a>
          </li>
          <li>
            <a
              href="#pricing"
              style={{
                fontSize: 14,
                color: "var(--slate)",
                textDecoration: "none",
                fontWeight: 400,
              }}
            >
              Pricing
            </a>
          </li>
          <li>
            <a
              href="/onboard"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 24px",
                borderRadius: "var(--radius-pill)",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                background: "var(--ink)",
                color: "var(--paper)",
                transition: "all 0.25s ease",
                cursor: "pointer",
                border: "none",
              }}
            >
              Get your Clerk
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 32px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px 6px 8px",
            background: "var(--sage-light)",
            borderRadius: "var(--radius-pill)",
            fontSize: 13,
            color: "var(--sage-dark)",
            fontWeight: 500,
            marginBottom: 32,
            animation: "fadeUp 0.8s ease both",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              background: "var(--sage)",
              borderRadius: "50%",
            }}
          />
          Now available on Telegram and WhatsApp
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            maxWidth: 1000,
            animation: "fadeUp 0.8s ease 0.1s both",
          }}
        >
          Your personal AI <em style={{ fontStyle: "normal", color: "var(--sage)" }}>clerk</em>
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "var(--slate)",
            maxWidth: 480,
            margin: "24px auto 40px",
            lineHeight: 1.7,
            fontWeight: 300,
            animation: "fadeUp 0.8s ease 0.2s both",
          }}
        >
          An AI assistant that actually does things for you. Manages your emails, plans your week,
          runs your store. Just text it like a friend.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            animation: "fadeUp 0.8s ease 0.3s both",
          }}
        >
          <a
            href="/onboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: "var(--radius-pill)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              background: "var(--ink)",
              color: "var(--paper)",
              transition: "all 0.25s ease",
              cursor: "pointer",
              border: "none",
            }}
          >
            Start for free
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
          <a
            href="#how"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: "var(--radius-pill)",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              background: "transparent",
              color: "var(--ink)",
              border: "1.5px solid rgba(26,26,24,0.15)",
              transition: "all 0.25s ease",
              cursor: "pointer",
            }}
          >
            See how it works
          </a>
        </div>

        {/* LIVE FEED */}
        <LiveFeed />

        {/* CHAT PREVIEW */}
        <div
          style={{
            width: "100%",
            maxWidth: 420,
            margin: "64px auto 0",
            animation: "fadeUp 0.8s ease 0.5s both",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                borderBottom: "1px solid var(--border)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--sage)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontFamily: "var(--font-display)",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                C
              </div>
              <div>
                <p style={{ fontWeight: 500, fontSize: 14 }}>Clerk</p>
                <p style={{ fontSize: 12, color: "var(--sage)", fontWeight: 500 }}>Online</p>
              </div>
            </div>
            <div
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: 16,
                  fontSize: 14,
                  lineHeight: 1.5,
                  background: "var(--ink)",
                  color: "white",
                  borderBottomRightRadius: 4,
                }}
              >
                Can you check if any customers emailed about returns today?
              </div>
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: 16,
                  fontSize: 14,
                  lineHeight: 1.5,
                  background: "var(--sage-light)",
                  color: "var(--ink)",
                  borderBottomLeftRadius: 4,
                }}
              >
                You have 3 return requests today. I&apos;ve drafted replies for each one. Want me to
                send them, or would you like to review first?
              </div>
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                  padding: "10px 14px",
                  borderRadius: 16,
                  fontSize: 14,
                  lineHeight: 1.5,
                  background: "var(--ink)",
                  color: "white",
                  borderBottomRightRadius: 4,
                }}
              >
                Send the first two, let me see the third
              </div>
              <div
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  gap: 4,
                  padding: "12px 16px",
                  background: "var(--sage-light)",
                  borderRadius: 16,
                  borderBottomLeftRadius: 4,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: "var(--sage)",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite",
                  }}
                />
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: "var(--sage)",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite 0.2s",
                  }}
                />
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: "var(--sage)",
                    borderRadius: "50%",
                    animation: "typing 1.4s infinite 0.4s",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        style={{
          padding: "120px 32px",
          background: "var(--warm)",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
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
            How it works
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: 600,
            }}
          >
            Set up in two minutes.
            <br />
            <em style={{ fontStyle: "normal" }}>No tech skills needed.</em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--slate)",
              maxWidth: 500,
              marginTop: 16,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Pick what you need, connect your messaging app, and your Clerk starts working
            immediately.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
              marginTop: 64,
            }}
            className="steps-grid"
          >
            {[
              {
                num: "1",
                title: "Tell us about you",
                desc: "Running a business? Managing a household? Your Clerk comes pre-loaded with the right skills for your world.",
                bg: "var(--sage-light)",
                color: "var(--sage-dark)",
              },
              {
                num: "2",
                title: "Connect your chat",
                desc: "Scan a QR code to add Clerk to your Telegram or WhatsApp. That's it. No apps to install, no passwords to set.",
                bg: "var(--coral-light)",
                color: "var(--coral)",
              },
              {
                num: "3",
                title: "Start texting",
                desc: "Your Clerk introduces itself and gets to work. It remembers everything and gets smarter the more you use it.",
                bg: "#F0EDFF",
                color: "#5B4FC7",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="step-card"
                style={{
                  background: "var(--paper)",
                  borderRadius: "var(--radius)",
                  padding: "32px 28px",
                  border: "1px solid var(--border)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontSize: 16,
                    fontWeight: 500,
                    marginBottom: 20,
                    background: step.bg,
                    color: step.color,
                  }}
                >
                  {step.num}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    marginBottom: 8,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--slate)", lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "120px 32px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
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
            Skills
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: 600,
            }}
          >
            One assistant.
            <br />
            <em style={{ fontStyle: "normal" }}>Dozens of skills.</em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "var(--slate)",
              maxWidth: 500,
              marginTop: 16,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Clerk comes pre-loaded with skills for your use case. New skills are added every week.
          </p>

          <div
            className="skills-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
              marginTop: 64,
            }}
          >
            {[
              {
                title: "Email management",
                desc: "Reads, drafts, and sends emails on your behalf. Filters the noise, surfaces what matters.",
                tag: "Business",
                iconBg: "var(--sage-light)",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="var(--sage-dark)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="5" width="16" height="14" rx="2" />
                    <path d="M3 9l8 5 8-5" />
                  </svg>
                ),
              },
              {
                title: "Planning and scheduling",
                desc: "Manages your calendar, sets reminders, plans your week. Understands context like travel time.",
                tag: "Personal",
                iconBg: "var(--coral-light)",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="var(--coral)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <rect x="3" y="3" width="16" height="16" rx="2" />
                    <path d="M3 9h16M9 3v16" />
                  </svg>
                ),
              },
              {
                title: "Research and analysis",
                desc: "Digs into any topic, summarizes findings, compares options. Like having a research intern on call.",
                tag: "Business",
                iconBg: "#F0EDFF",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#5B4FC7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 3v4M4 11h4M14 11h4M6.3 6.3l2.8 2.8M14.9 6.3l-2.8 2.8" />
                    <circle cx="11" cy="17" r="3" />
                  </svg>
                ),
              },
              {
                title: "Shopify store management",
                desc: "Edits your theme, writes product descriptions, handles SEO. Your store runs while you sleep.",
                tag: "Shopify",
                iconBg: "#FFF8E6",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="#B8860B"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M3 17l4-8 4 5 3-3 5 6" />
                    <rect x="3" y="3" width="16" height="16" rx="2" />
                  </svg>
                ),
              },
              {
                title: "Writing and content",
                desc: "Blog posts, social captions, product copy, customer replies. Matches your voice after a few conversations.",
                tag: "Business",
                iconBg: "var(--sage-light)",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="var(--sage-dark)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M14 3v4a1 1 0 001 1h4" />
                    <path d="M5 3h9l5 5v11a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                    <path d="M7 13h8M7 17h5" />
                  </svg>
                ),
              },
              {
                title: "Daily life",
                desc: "Meal planning, travel research, gift ideas, home management. The stuff that eats your free time.",
                tag: "Personal",
                iconBg: "var(--coral-light)",
                icon: (
                  <svg
                    width="22"
                    height="22"
                    fill="none"
                    stroke="var(--coral)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M11 7v4l3 3" />
                  </svg>
                ),
              },
            ].map((skill) => (
              <div
                key={skill.title}
                style={{
                  padding: 28,
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "white",
                  display: "flex",
                  gap: 16,
                  alignItems: "flex-start",
                  transition: "border-color 0.2s",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "var(--radius-sm)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                    background: skill.iconBg,
                  }}
                >
                  {skill.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{skill.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.5 }}>
                    {skill.desc}
                  </p>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "3px 10px",
                      background: "var(--sage-light)",
                      color: "var(--sage-dark)",
                      borderRadius: "var(--radius-pill)",
                      fontSize: 11,
                      fontWeight: 600,
                      marginTop: 8,
                    }}
                  >
                    {skill.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="pricing"
        style={{
          padding: "120px 32px",
          background: "var(--ink)",
          color: "var(--paper)",
        }}
      >
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
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
            Pricing
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 48px)",
              fontWeight: 400,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: 600,
              color: "var(--paper)",
            }}
          >
            Simple plans.
            <br />
            <em style={{ fontStyle: "normal", color: "var(--sage)" }}>No surprises.</em>
          </h2>
          <p
            style={{
              fontSize: 17,
              color: "rgba(250,250,247,0.6)",
              maxWidth: 500,
              marginTop: 16,
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Start free, upgrade when your Clerk becomes indispensable.
          </p>

          <div
            className="pricing-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
              maxWidth: 960,
              margin: "64px auto 0",
            }}
          >
            {/* Starter */}
            <div
              style={{
                padding: "32px 28px",
                borderRadius: "var(--radius)",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(250,250,247,0.5)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Starter
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 44,
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  margin: "12px 0 4px",
                }}
              >
                $0{" "}
                <span style={{ fontSize: 16, color: "rgba(250,250,247,0.4)", fontWeight: 300 }}>
                  /month
                </span>
              </p>
              <p style={{ fontSize: 14, color: "rgba(250,250,247,0.5)", marginBottom: 24 }}>
                Try it out
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {["20 messages per day", "2 skill packs", "Telegram or WhatsApp", "Basic memory"].map(
                  (f) => (
                    <li
                      key={f}
                      style={{
                        fontSize: 13,
                        color: "rgba(250,250,247,0.7)",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          background: "var(--sage)",
                          borderRadius: "50%",
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </li>
                  )
                )}
              </ul>
              <a
                href="/onboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "10px 24px",
                  borderRadius: "var(--radius-pill)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  background: "transparent",
                  color: "var(--paper)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  marginTop: 28,
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
              >
                Get started
              </a>
            </div>

            {/* Personal – Featured */}
            <div
              style={{
                padding: "32px 28px",
                borderRadius: "var(--radius)",
                border: "1px solid var(--sage)",
                background: "rgba(74,124,111,0.1)",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: -12,
                  left: 28,
                  padding: "4px 14px",
                  background: "var(--sage)",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: "var(--radius-pill)",
                }}
              >
                Most popular
              </span>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(250,250,247,0.5)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Personal
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 44,
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  margin: "12px 0 4px",
                }}
              >
                $29{" "}
                <span style={{ fontSize: 16, color: "rgba(250,250,247,0.4)", fontWeight: 300 }}>
                  /month
                </span>
              </p>
              <p style={{ fontSize: 14, color: "rgba(250,250,247,0.5)", marginBottom: 24 }}>
                For individuals
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Unlimited messages",
                  "All skill packs",
                  "Gmail and Calendar sync",
                  "Full memory and context",
                  "Priority responses",
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 13,
                      color: "rgba(250,250,247,0.7)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        background: "var(--sage)",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/onboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "10px 24px",
                  borderRadius: "var(--radius-pill)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  background: "var(--paper)",
                  color: "var(--ink)",
                  marginTop: 28,
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Get your Clerk
              </a>
            </div>

            {/* Business */}
            <div
              style={{
                padding: "32px 28px",
                borderRadius: "var(--radius)",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(250,250,247,0.5)",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Business
              </p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 44,
                  fontWeight: 400,
                  letterSpacing: "-0.03em",
                  margin: "12px 0 4px",
                }}
              >
                $79{" "}
                <span style={{ fontSize: 16, color: "rgba(250,250,247,0.4)", fontWeight: 300 }}>
                  /month
                </span>
              </p>
              <p style={{ fontSize: 14, color: "rgba(250,250,247,0.5)", marginBottom: 24 }}>
                For store owners
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Everything in Personal",
                  "Shopify integration",
                  "Customer email handling",
                  "Weekly performance reports",
                  "Custom skill requests",
                ].map((f) => (
                  <li
                    key={f}
                    style={{
                      fontSize: 13,
                      color: "rgba(250,250,247,0.7)",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        background: "var(--sage)",
                        borderRadius: "50%",
                        flexShrink: 0,
                      }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="/onboard"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  padding: "10px 24px",
                  borderRadius: "var(--radius-pill)",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                  background: "transparent",
                  color: "var(--paper)",
                  border: "1.5px solid rgba(255,255,255,0.15)",
                  marginTop: 28,
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "48px 32px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#"
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
        <p style={{ fontSize: 13, color: "var(--slate)" }}>
          &copy; 2026 Clerk. Made by humans, powered by AI.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: 13,
                color: "var(--slate)",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </footer>

      {/* Responsive styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-links {
            display: none !important;
          }
          .steps-grid,
          .pricing-grid {
            grid-template-columns: 1fr !important;
          }
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
