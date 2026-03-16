import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { validateBotToken } from "@/lib/telegram";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "";

function checkAuth(req: NextRequest): boolean {
  if (!ADMIN_SECRET) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${ADMIN_SECRET}`;
}

// POST /api/admin/bots — add a bot to the pool
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Validate with Telegram
    const result = await validateBotToken(token.trim());
    if (!result.valid) {
      return NextResponse.json(
        { error: result.error || "Invalid bot token" },
        { status: 400 }
      );
    }

    // Insert into pool
    const db = getDb();
    db.prepare(
      "INSERT OR IGNORE INTO bots (token, username, name) VALUES (?, ?, ?)"
    ).run(token.trim(), result.botUsername, result.botName);

    return NextResponse.json({
      ok: true,
      username: result.botUsername,
      name: result.botName,
    });
  } catch (err) {
    console.error("Add bot error:", err);
    return NextResponse.json({ error: "Failed to add bot" }, { status: 500 });
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
