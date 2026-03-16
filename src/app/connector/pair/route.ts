import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";

function randToken() {
  return randomBytes(24).toString("hex");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const code = String(body.code || "").trim();
  if (!code) return NextResponse.json({ ok: false, error: "Missing code" }, { status: 400 });

  const db = getDb();
  const row = db
    .prepare(
      `SELECT code, connector_id, tenant_id, used, expires_at
       FROM connector_pair_codes
       WHERE code=? LIMIT 1`
    )
    .get(code) as any;

  if (!row) return NextResponse.json({ ok: false, error: "Invalid code" }, { status: 404 });
  if (row.used) return NextResponse.json({ ok: false, error: "Code already used" }, { status: 409 });

  const expired = db
    .prepare(`SELECT CASE WHEN datetime('now') > datetime(?) THEN 1 ELSE 0 END as expired`)
    .get(row.expires_at) as { expired: number };
  if (expired.expired) return NextResponse.json({ ok: false, error: "Code expired" }, { status: 410 });

  const token = randToken();
  db.prepare(
    `INSERT OR REPLACE INTO connectors (id, tenant_id, token, status, last_seen)
     VALUES (?, ?, ?, 'active', datetime('now'))`
  ).run(row.connector_id, row.tenant_id, token);

  db.prepare(`UPDATE connector_pair_codes SET used=1 WHERE code=?`).run(code);

  return NextResponse.json({ ok: true, connectorId: row.connector_id, token });
}
