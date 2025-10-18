"use client";

import { useEffect, useRef } from "react";

export default function SpotlightCard({ children }) {
  const ref = useRef(null);
  const glow = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const g = glow.current;
    if (!el || !g) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      g.style.setProperty("--x", `${x}px`);
      g.style.setProperty("--y", `${y}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "radial-gradient(240px circle at var(--x, -100px) var(--y, -100px), rgba(56,189,248,.18), transparent 45%)",
          transition: "background-position 80ms linear",
        }}
      />
      {children}
    </div>
  );
}
