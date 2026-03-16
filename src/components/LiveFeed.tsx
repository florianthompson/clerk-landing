"use client";

import { useEffect, useRef } from "react";

const tasks = [
  { task: "Filed quarterly income tax", name: "Marcus T." },
  { task: "Redesigned landing page", name: "Elena V." },
  { task: "Scheduled 14 social posts", name: "Jordan K." },
  { task: "Drafted pitch deck for investors", name: "Priya M." },
  { task: "Organized inbox to zero", name: "Chris R." },
  { task: "Built Shopify product catalog", name: "Anna S." },
  { task: "Wrote 8 blog posts for SEO", name: "David L." },
  { task: "Created weekly meal plan", name: "Sophie B." },
  { task: "Booked flights to Barcelona", name: "Tomas H." },
  { task: "Analyzed competitor pricing", name: "Rachel W." },
  { task: "Set up email automations", name: "Mike P." },
  { task: "Planned daughter's birthday party", name: "Lisa N." },
  { task: "Generated monthly sales report", name: "Omar F." },
  { task: "Translated website to German", name: "Kai J." },
  { task: "Negotiated vendor contract", name: "Nina D." },
  { task: "Created mobile app prototype", name: "Alex C." },
  { task: "Audited website performance", name: "Sam G." },
  { task: "Planned 2-week Japan itinerary", name: "Mia Z." },
  { task: "Processed 23 refund requests", name: "Ben A." },
  { task: "Wrote job descriptions for 3 roles", name: "Leah T." },
];

export default function LiveFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    function showNext() {
      const container = containerRef.current;
      if (!container) return;

      const item = tasks[indexRef.current % tasks.length];

      const el = document.createElement("div");
      el.className = "feed-item";
      el.innerHTML = `
        <span class="feed-check"><svg viewBox="0 0 12 12"><path d="M2.5 6l2.5 2.5 4.5-5"/></svg></span>
        ${item.task}
        <span class="feed-name">${item.name}</span>
      `;

      const prev = container.querySelector(".feed-item");
      if (prev) {
        (prev as HTMLElement).style.animation = "feedExit 0.35s ease forwards";
        setTimeout(() => prev.remove(), 350);
      }

      setTimeout(
        () => {
          container.appendChild(el);
        },
        prev ? 300 : 0
      );

      indexRef.current++;
    }

    const initialTimeout = setTimeout(showNext, 800);
    const interval = setInterval(showNext, 2800);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="live-feed"
      style={{
        width: "100%",
        maxWidth: 560,
        margin: "48px auto 0",
        animation: "fadeUp 0.8s ease 0.4s both",
        position: "relative",
        height: 44,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 16,
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(to bottom, var(--paper), transparent)",
        }}
      />
      <div
        style={{
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 16,
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(to top, var(--paper), transparent)",
        }}
      />
      <div
        ref={containerRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          position: "relative",
        }}
      />
      <style jsx global>{`
        .feed-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 20px;
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius-pill);
          font-size: 13px;
          color: var(--ink);
          white-space: nowrap;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          animation: feedSlide 0.5s ease both;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
        }
        .feed-item .feed-name {
          color: var(--slate);
          font-weight: 400;
        }
        .feed-item .feed-check {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--sage-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .feed-item .feed-check svg {
          width: 10px;
          height: 10px;
          stroke: var(--sage-dark);
          fill: none;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .feed-item .feed-dot {
          width: 7px;
          height: 7px;
          background: var(--sage);
          border-radius: 50%;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
}
