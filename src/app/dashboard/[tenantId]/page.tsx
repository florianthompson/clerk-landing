import { getDb } from "@/lib/db";
import { Tenant } from "@/lib/types";
import { SKILL_PACKS } from "@/lib/skills";
import { notFound } from "next/navigation";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ tenantId: string }>;
}) {
  const { tenantId } = await params;

  let tenant: Tenant | undefined;
  let messageCount = 0;

  try {
    const db = getDb();
    tenant = db
      .prepare("SELECT * FROM tenants WHERE id = ?")
      .get(tenantId) as Tenant | undefined;

    if (tenant) {
      const row = db
        .prepare("SELECT COUNT(*) as count FROM messages WHERE tenant_id = ?")
        .get(tenantId) as { count: number };
      messageCount = row.count;
    }
  } catch {
    // DB not initialized yet
  }

  if (!tenant) {
    notFound();
  }

  const skills: string[] = JSON.parse(tenant.skills || "[]");
  const botLink = `https://t.me/${tenant.telegram_bot_username}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--paper)",
      }}
    >
      {/* Nav */}
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
            }}
          />
          clerk
        </a>
      </nav>

      {/* Dashboard content */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: "-0.02em",
            }}
          >
            {tenant.name}&apos;s Clerk
          </h1>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "3px 10px",
              background: tenant.active ? "var(--sage-light)" : "var(--coral-light)",
              color: tenant.active ? "var(--sage-dark)" : "var(--coral)",
              borderRadius: "var(--radius-pill)",
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: tenant.active ? "var(--sage)" : "var(--coral)",
              }}
            />
            {tenant.active ? "Active" : "Inactive"}
          </span>
        </div>

        <p style={{ fontSize: 13, color: "var(--slate)", marginBottom: 32 }}>
          Created {new Date(tenant.created_at).toLocaleDateString()}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 400 }}>
              {messageCount}
            </p>
            <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 4 }}>Messages</p>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 400 }}>
              {skills.length}
            </p>
            <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 4 }}>Skills</p>
          </div>
          <div
            style={{
              background: "white",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {tenant.profile_type}
            </p>
            <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 4 }}>Profile</p>
          </div>
        </div>

        {/* Bot link */}
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            padding: "24px",
            marginBottom: 24,
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Telegram Bot</p>
          <a
            href={botLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 14,
              color: "var(--sage)",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            @{tenant.telegram_bot_username}
          </a>
        </div>

        {/* Active skills */}
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            padding: "24px",
            marginBottom: 32,
          }}
        >
          <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Active Skills</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((skillId) => {
              const pack = SKILL_PACKS.find((s) => s.id === skillId);
              return (
                <span
                  key={skillId}
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    background: "var(--sage-light)",
                    color: "var(--sage-dark)",
                    borderRadius: "var(--radius-pill)",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  {pack?.name || skillId}
                </span>
              );
            })}
          </div>
        </div>

        {/* Open in Telegram button */}
        <a
          href={botLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            padding: "12px 28px",
            borderRadius: "var(--radius-pill)",
            fontSize: 14,
            fontWeight: 500,
            textDecoration: "none",
            background: "var(--ink)",
            color: "var(--paper)",
            cursor: "pointer",
            border: "none",
          }}
        >
          Open in Telegram
        </a>
      </div>
    </div>
  );
}
