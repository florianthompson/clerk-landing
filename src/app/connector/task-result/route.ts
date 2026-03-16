import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { authorizeConnector } from "@/lib/connector-auth";

export async function POST(req: NextRequest) {
  const auth = authorizeConnector(req);
  if (!auth.ok) return NextResponse.json({ ok: false, error: auth.error }, { status: auth.status });

  const body = await req.json().catch(() => ({}));
  const taskId = String(body.taskId || "");
  const result = body.result || {};
  const finalStatus = String(result.status || "completed");

  if (!taskId) return NextResponse.json({ ok: false, error: "Missing taskId" }, { status: 400 });

  const db = getDb();
  db.prepare(`
    UPDATE connector_tasks
    SET status=?, result_json=?, updated_at=datetime('now')
    WHERE id=?
  `).run(finalStatus, JSON.stringify(result), taskId);

  return NextResponse.json({ ok: true, taskId, status: finalStatus });
}
