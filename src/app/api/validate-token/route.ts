import { NextRequest, NextResponse } from "next/server";
import { validateBotToken } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { valid: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const result = await validateBotToken(token.trim());
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { valid: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
