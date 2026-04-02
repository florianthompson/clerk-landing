"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import ScanUrlInput from "@/components/ScanUrlInput";
import ScanProgress from "@/components/ScanProgress";
import GoalSelection from "@/components/GoalSelection";
import { GoalType, ScanResult } from "@/lib/types";
import { normalizeUrl } from "@/lib/scraper";

type Step = "url" | "scanning" | "goal";

export default function ScanPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("url");
  const [storeUrl, setStoreUrl] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanDone, setScanDone] = useState(false);
  const [animDone, setAnimDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (url: string) => {
    const normalized = normalizeUrl(url);
    setStoreUrl(normalized);
    setStep("scanning");
    setError(null);

    try {
      const res = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalized }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to scan store");
      }
      const data: ScanResult = await res.json();
      setScanResult(data);
      setScanDone(true);
      if (animDone) setStep("goal");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep("url");
    }
  };

  const handleAnimComplete = useCallback(() => {
    setAnimDone(true);
    if (scanDone) setStep("goal");
  }, [scanDone]);

  const handleGoalSelect = async (goal: GoalType) => {
    if (!scanResult) return;

    // Update goal in backend
    await fetch("/api/scan", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: scanResult.sessionId, goal }),
    }).catch(() => {});

    router.push(`/chat/${scanResult.sessionId}`);
  };

  const dots = (
    <div className="step-indicator flex gap-2 mb-12">
      <div className={`dot ${step === "url" ? "active" : "done"}`} />
      <div className={`dot ${step === "scanning" ? "active" : step === "goal" ? "done" : ""}`} />
      <div className={`dot ${step === "goal" ? "active" : ""}`} />
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <Nav />
      <div className="flex-1 flex items-center justify-center px-6 pb-15 pt-5">
        {step === "url" && (
          <div className="step-enter flex flex-col items-center text-center w-full max-w-[600px]">
            {dots}
            <h1 className="step-heading mb-3">
              Let&apos;s scan your <em>store.</em>
            </h1>
            <p className="text-base mb-10 max-w-[420px]" style={{ color: "var(--text-soft)" }}>
              We&apos;ll check your products, pages, SEO, speed, and technical health. Takes about 30 seconds.
            </p>
            {error && (
              <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "var(--warn-light)", color: "var(--warn)" }}>
                {error}
              </div>
            )}
            <ScanUrlInput onSubmit={handleUrlSubmit} />
          </div>
        )}

        {step === "scanning" && (
          <div className="step-enter flex flex-col items-center text-center w-full max-w-[600px]">
            {dots}
            <h1 className="step-heading mb-3">Scanning your store...</h1>
            <ScanProgress storeUrl={storeUrl} onComplete={handleAnimComplete} />
          </div>
        )}

        {step === "goal" && (
          <div className="step-enter flex flex-col items-center text-center w-full max-w-[600px]">
            {dots}
            <h1 className="step-heading mb-3">
              What should we<br />focus on <em>first?</em>
            </h1>
            <p className="text-base mb-10 max-w-[420px]" style={{ color: "var(--text-soft)" }}>
              We found a few things. Where do you want to start?
            </p>
            <GoalSelection onSelect={handleGoalSelect} />
          </div>
        )}
      </div>
    </div>
  );
}
