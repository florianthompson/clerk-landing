import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { validateBotToken } from "@/lib/telegram";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "";

function checkAuth(req: NextRequest): boolean {
  if (!ADMIN_SECRET) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_SECRET}`;
}

// POST /api/admin/bots — add one or many bots to the pool
// Body: { token: "..." } or { tokens: ["...", "..."] }
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Normalize to array
    const tokens: string[] = body.tokens
      ? body.tokens
      : body.token
        ? [body.token]
        : [];

    if (tokens.length === 0) {
      return NextResponse.json(
        { error: "Provide 'token' (string) or 'tokens' (array)" },
        { status: 400 }
      );
    }

    // Validate all tokens in parallel
    const results = await Promise.all(
      tokens.map(async (t: string) => {
        const trimmed = t.trim();
        const result = await validateBotToken(trimmed);
        return { token: trimmed, ...result };
      })
    );

    const db = getDb();
    const insert = db.prepare(
      "INSERT OR IGNORE INTO bots (token, username, name) VALUES (?, ?, ?)"
    );

    const added: { username: string; name: string }[] = [];
    const failed: { token: string; error: string }[] = [];

    for (const r of results) {
      if (r.valid && r.botUsername && r.botName) {
        insert.run(r.token, r.botUsername, r.botName);
        added.push({ username: r.botUsername, name: r.botName });
      } else {
        // Show first/last 4 chars only
        const masked = r.token.length > 8
          ? `${r.token.slice(0, 4)}...${r.token.slice(-4)}`
          : "****";
        failed.push({ token: masked, error: r.error || "Invalid token" });
      }
    }

    return NextResponse.json({ added, failed });
  } catch (err) {
    console.error("Add bot error:", err);
    return NextResponse.json({ error: "Failed to add bots" }, { status: 500 });
  }
}

// GET /api/admin/bots — list all bots and their status
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = getDb();
  const bots = db
    .prepare(
      `SELECT id, username, name, assigned_to, created_at
       FROM bots ORDER BY created_at DESC`
    )
    .all();

  const available = db
    .prepare("SELECT COUNT(*) as count FROM bots WHERE assigned_to IS NULL")
    .get() as { count: number };

  return NextResponse.json({
    bots,
    total: bots.length,
    available: available.count,
  });
}
