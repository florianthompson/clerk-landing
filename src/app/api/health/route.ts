import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const row = db.prepare("SELECT COUNT(*) as count FROM tenants WHERE active = 1").get() as { count: number };

    return NextResponse.json({
      status: "ok",
      activeTenants: row.count,
    });
  } catch {
    return NextResponse.json({
      status: "ok",
      activeTenants: 0,
    });
  }
}
