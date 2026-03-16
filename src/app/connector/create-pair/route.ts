import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getDb } from "@/lib/db";

function rand(len = 8) {
  return randomBytes(len).toString("hex");
}

export async function POST(req: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = req.headers.get("x-admin-key") || "";
  if (!adminKey || provided !== adminKey) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const tenantId = body.tenantId ? String(body.tenantId) : null;
  const connectorId = String(body.connectorId || `conn_${rand(6)}`);
  const code = `pair_${rand(4)}`;
  const expiresMinutes = Number(body.expiresMinutes || 15);

  const db = getDb();
  db.prepare(
    `INSERT OR REPLACE INTO connector_pair_codes (code, connector_id, tenant_id, expires_at, used)
     VALUES (?, ?, ?, datetime('now', '+' || ? || ' minutes'), 0)`
  ).run(code, connectorId, tenantId, expiresMinutes);

  return NextResponse.json({ ok: true, code, connectorId, expiresMinutes });
}
