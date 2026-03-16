import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

function uid() {
  return `task_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(req: NextRequest) {
  const adminKey = process.env.ADMIN_API_KEY;
  const provided = req.headers.get("x-admin-key") || "";
  if (!adminKey || provided !== adminKey) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const connectorId = String(body.connectorId || "*");
  const type = String(body.type || "browser_generic");
  const payload = body.payload || {};

  const id = uid();
  const db = getDb();
  db.prepare(`
    INSERT INTO connector_tasks (id, connector_id, type, payload_json, status)
    VALUES (?, ?, ?, ?, 'pending')
  `).run(id, connectorId, type, JSON.stringify(payload));

  return NextResponse.json({ ok: true, taskId: id });
}
