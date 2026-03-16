import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export function authorizeConnector(req: NextRequest): { ok: true; connectorId: string } | { ok: false; error: string; status: number } {
  const auth = req.headers.get("authorization") || "";
  const connectorId = req.headers.get("x-connector-id") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";

  if (!token) return { ok: false, error: "Missing bearer token", status: 401 };
  if (!connectorId) return { ok: false, error: "Missing x-connector-id", status: 400 };

  const db = getDb();
  const row = db
    .prepare("SELECT id FROM connectors WHERE id=? AND token=? AND status='active' LIMIT 1")
    .get(connectorId, token) as { id: string } | undefined;

  if (!row) return { ok: false, error: "Unauthorized", status: 401 };
  return { ok: true, connectorId };
}
