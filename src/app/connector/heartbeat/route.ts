import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { authorizeConnector } from "@/lib/connector-auth";

export async function POST(req: NextRequest) {
  const auth = authorizeConnector(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => ({}));
  const status = String(body.status || "online");

  const db = getDb();
  db.prepare(`
    INSERT INTO connector_heartbeats (connector_id, status, last_seen, meta_json)
    VALUES (?, ?, datetime('now'), ?)
    ON CONFLICT(connector_id)
    DO UPDATE SET status=excluded.status, last_seen=datetime('now'), meta_json=excluded.meta_json
  `).run(auth.connectorId, status, JSON.stringify(body || {}));

  return NextResponse.json({ ok: true, connectorId: auth.connectorId });
}
