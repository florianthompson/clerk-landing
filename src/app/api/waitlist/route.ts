import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const db = getDb();

  try {
    db.prepare("INSERT INTO waitlist (email) VALUES (?)").run(email.trim().toLowerCase());
  } catch (e: unknown) {
    if (e instanceof Error && e.message.includes("UNIQUE")) {
      return NextResponse.json({ ok: true, message: "Already on the list" });
    }
    throw e;
  }

  const { count } = db.prepare("SELECT COUNT(*) as count FROM waitlist").get() as { count: number };

  return NextResponse.json({ ok: true, count });
}

export async function GET() {
  const db = getDb();
  const { count } = db.prepare("SELECT COUNT(*) as count FROM waitlist").get() as { count: number };
  return NextResponse.json({ count });
}
