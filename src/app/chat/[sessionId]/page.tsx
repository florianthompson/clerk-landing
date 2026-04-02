"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useChat } from "ai/react";
import Nav from "@/components/Nav";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import FindingsPills from "@/components/FindingsPills";
import ActionSuggestion from "@/components/ActionSuggestion";
import TypingIndicator from "@/components/TypingIndicator";
import { Analysis, GoalType } from "@/lib/types";

interface ScanData {
  store_name: string;
  store_url: string;
  analysis: Analysis;
  selected_goal: GoalType | null;
}

const INITIAL_ACTIONS: Record<GoalType, string[]> = {
  traffic: [
    "Tell me about my SEO",
    "How do I get more traffic?",
    "What keywords should I target?",
  ],
  fix: [
    "What's broken on my store?",
    "Show me technical issues",
    "What should I fix first?",
  ],
  conversion: [
    "How are my product pages?",
    "What's hurting my conversion rate?",
    "Review my store's trust signals",
  ],
  idk: [
    "What should I fix first?",
    "Roast my store",
    "What are my biggest issues?",
  ],
};

export default function ChatPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  const [scanData, setScanData] = useState<ScanData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInitialActions, setShowInitialActions] = useState(true);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const hasTriggeredInitial = useRef(false);

  const { messages, append, isLoading: isStreaming } = useChat({
    api: "/api/chat",
    body: { sessionId },
  });

  // Fetch scan data
  useEffect(() => {
    async function fetchScan() {
      try {
        const res = await fetch(`/api/scan?sessionId=${sessionId}`);
        if (!res.ok) throw new Error("Failed to load scan");
        const data = await res.json();
        setScanData(data);
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }
    fetchScan();
  }, [sessionId]);

  // Trigger first message automatically
  useEffect(() => {
    if (scanData && !hasTriggeredInitial.current && messages.length === 0) {
      hasTriggeredInitial.current = true;
      const goal = scanData.selected_goal || "idk";
      const goalPrompts: Record<GoalType, string> = {
        traffic: "I want to get more customers to my store. What did you find?",
        fix: "What's broken on my store? Show me the issues.",
        conversion: "I want to improve my conversion rate. What should I change?",
        idk: "What should I focus on first? Give me the most important thing.",
      };
      append({ role: "user", content: goalPrompts[goal] });
    }
  }, [scanData, messages.length, append]);

  // Auto-scroll
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSend = (text: string) => {
    setShowInitialActions(false);
    append({ role: "user", content: text });
  };

  const handleActionSelect = (action: string) => {
    setShowInitialActions(false);
    append({ role: "user", content: action });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
        <Nav />
        <div className="flex-1 flex items-center justify-center">
          <div className="typing-indicator">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>
      </div>
    );
  }

  const goal = scanData?.selected_goal || "idk";
  const actions = INITIAL_ACTIONS[goal];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between py-4 px-6">
        <span className="nav-brand">Clerk</span>
        <div className="store-pill text-sm">
          {scanData?.store_url || "Store"}
        </div>
        <a
          href="/scan"
          className="text-xs font-medium"
          style={{ color: "var(--text-soft)" }}
        >
          New scan
        </a>
      </div>

      {/* Findings pills */}
      {scanData?.analysis && <FindingsPills analysis={scanData.analysis} />}

      {/* Chat window */}
      <div className="flex-1 flex flex-col max-w-[700px] w-full mx-auto px-4 pb-4">
        <div className="chat-window flex flex-col flex-1">
          <div className="chat-head">
            <div className="chat-av">C</div>
            <div>
              <div className="text-sm font-medium">Clerk</div>
              <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                Connected to {scanData?.store_url || "your store"}
              </div>
            </div>
          </div>

          <div className="chat-body flex-1" ref={chatBodyRef} style={{ maxHeight: "calc(100vh - 320px)", minHeight: "300px" }}>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                role={msg.role as "user" | "assistant"}
                content={msg.content}
              />
            ))}
            {isStreaming && messages[messages.length - 1]?.role === "user" && (
              <TypingIndicator />
            )}
            {showInitialActions && messages.length >= 2 && !isStreaming && (
              <ActionSuggestion
                actions={actions}
                onSelect={handleActionSelect}
              />
            )}
          </div>

          <ChatInput onSend={handleSend} disabled={isStreaming} />
        </div>
      </div>
    </div>
  );
}
