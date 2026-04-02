"use client";

import { useEffect, useRef } from "react";

const SCAN_STEPS = [
  "Discovering products and collections",
  "Analyzing product pages and descriptions",
  "Checking SEO and search visibility",
  "Testing page speed and performance",
  "Detecting technical issues",
  "Identifying competitor landscape",
];

interface ScanProgressProps {
  storeUrl: string;
  onComplete: () => void;
}

export default function ScanProgress({ storeUrl, onComplete }: ScanProgressProps) {
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const items = document.querySelectorAll("[data-scan-item]");
    let i = 0;

    function scanNext() {
      if (i >= items.length) {
        setTimeout(onComplete, 600);
        return;
      }
      const el = items[i];
      el.classList.add("visible", "loading");
      setTimeout(() => {
        el.classList.remove("loading");
        el.classList.add("done");
        i++;
        setTimeout(scanNext, 200);
      }, 500 + Math.random() * 400);
    }

    setTimeout(scanNext, 400);
  }, [onComplete]);

  return (
    <div className="w-full max-w-[480px]">
      <div className="store-pill mb-10">{storeUrl}</div>
      <div className="flex flex-col text-left">
        {SCAN_STEPS.map((step, idx) => (
          <div key={idx} className="scan-item" data-scan-item>
            <div className="scan-check">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="scan-loader" />
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
