import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { authorizeConnector } from "@/lib/connector-auth";

export async function POST(req: NextRequest) {
  const auth = authorizeConnector(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });

  const db = getDb();
  const row = db.prepare(`
    SELECT id, connector_id, type, payload_json, status
    FROM connector_tasks
    WHERE status='pending' AND (connector_id=? OR connector_id='*')
    ORDER BY created_at ASC
    LIMIT 1
  `).get(auth.connectorId) as any;

  if (!row) return NextResponse.json({ ok: true, task: null });

  db.prepare("UPDATE connector_tasks SET status='running', updated_at=datetime('now') WHERE id=?").run(row.id);

  return NextResponse.json({
    ok: true,
    task: {
      id: row.id,
      connector_id: row.connector_id,
      type: row.type,
      payload: row.payload_json ? JSON.parse(row.payload_json) : {},
      status: "running",
    },
  });
}
