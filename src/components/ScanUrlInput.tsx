"use client";

import { useState } from "react";

interface ScanUrlInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export default function ScanUrlInput({ onSubmit, isLoading }: ScanUrlInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  return (
    <div className="w-full max-w-[480px]">
      <div className="url-field">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="yourstore.myshopify.com"
          autoComplete="off"
          className="flex-1 border-none bg-transparent text-[15px] font-[inherit] text-[var(--text)] outline-none min-w-0 py-3"
          disabled={isLoading}
        />
        <button
          className="scan-btn"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Scanning..." : "Scan my store"}
        </button>
      </div>
      <div className="mt-3 text-[13px] text-[var(--text-muted)] text-center">
        Works with any Shopify store. No login needed.
      </div>
    </div>
  );
}
