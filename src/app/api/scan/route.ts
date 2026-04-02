import { NextRequest, NextResponse } from "next/server";
import { scrapeStore } from "@/lib/scraper";
import { analyzeStore } from "@/lib/analyzer";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Scrape store
    const storeData = await scrapeStore(url);

    if (storeData.products.length === 0 && storeData.collections.length === 0) {
      return NextResponse.json(
        {
          error:
            "We couldn't access your store data. Make sure the URL is correct and the store is public.",
        },
        { status: 422 }
      );
    }

    // Analyze
    const analysis = analyzeStore(storeData);

    // Save to Supabase
    const { data: scan, error: dbError } = await supabase
      .from("scans")
      .insert({
        store_url: storeData.url,
        store_name: storeData.name,
        raw_products: storeData.products,
        raw_collections: storeData.collections,
        raw_meta: storeData.meta,
        analysis,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save scan results" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sessionId: scan.id,
      storeName: storeData.name,
      storeUrl: storeData.url,
      summary: analysis,
    });
  } catch (err) {
    console.error("Scan error:", err);
    return NextResponse.json(
      { error: "Failed to scan store" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { sessionId, goal } = await req.json();

    if (!sessionId || !goal) {
      return NextResponse.json(
        { error: "sessionId and goal are required" },
        { status: 400 }
      );
    }

    await supabase
      .from("scans")
      .update({ selected_goal: goal })
      .eq("id", sessionId);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to update goal" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json(
        { error: "sessionId is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("scans")
      .select("*")
      .eq("id", sessionId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Scan not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch scan" },
      { status: 500 }
    );
  }
}
