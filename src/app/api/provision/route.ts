import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { provisionTenant } from "@/lib/provision";

const provisionSchema = z.object({
  name: z.string().min(1).max(100),
  profileType: z.enum(["personal", "business"]),
  skills: z.array(z.string()).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = provisionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await provisionTenant(parsed.data);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Provisioning failed";
    console.error("Provision error:", err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
