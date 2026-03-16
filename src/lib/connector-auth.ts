import { NextRequest } from "next/server";

export function authorizeConnector(req: NextRequest): { ok: true; connectorId: string } | { ok: false; error: string; status: number } {
  const auth = req.headers.get("authorization") || "";
  const connectorId = req.headers.get("x-connector-id") || "";
  const expected = process.env.CONNECTOR_SHARED_TOKEN || "";

  if (!expected) {
    return { ok: false, error: "CONNECTOR_SHARED_TOKEN not configured", status: 500 };
  }

  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || token !== expected) {
    return { ok: false, error: "Unauthorized", status: 401 };
  }

  if (!connectorId) {
    return { ok: false, error: "Missing x-connector-id", status: 400 };
  }

  return { ok: true, connectorId };
}
