import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { supabase } from "@/lib/supabase";
import { buildSystemPrompt } from "@/lib/prompts";
import { ScanRecord } from "@/lib/types";

export async function POST(req: Request) {
  const { messages, sessionId } = await req.json();

  if (!sessionId) {
    return new Response("sessionId is required", { status: 400 });
  }

  // Fetch scan data
  const { data: scan, error } = await supabase
    .from("scans")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error || !scan) {
    return new Response("Scan not found", { status: 404 });
  }

  const scanRecord: ScanRecord = {
    id: scan.id,
    store_url: scan.store_url,
    store_name: scan.store_name,
    raw_products: scan.raw_products,
    raw_collections: scan.raw_collections,
    raw_meta: scan.raw_meta,
    analysis: scan.analysis,
    selected_goal: scan.selected_goal,
    created_at: scan.created_at,
  };

  const result = streamText({
    model: anthropic("claude-sonnet-4-20250514"),
    system: buildSystemPrompt(scanRecord),
    messages,
  });

  return result.toDataStreamResponse();
}
