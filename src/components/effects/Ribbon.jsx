"use client";

import { useEffect, useRef } from "react";

export default function Ribbon({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const kf = [
      { transform: "translate3d(0, -8px, 0) rotate(-2deg)" },
      { transform: "translate3d(0, 8px, 0) rotate(2deg)" },
      { transform: "translate3d(0, -8px, 0) rotate(-2deg)" },
    ];
    const a = el.animate(kf, { duration: 12000, iterations: Infinity, easing: "ease-in-out" });
    return () => a.cancel();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <div className="mx-auto h-64 w-full max-w-5xl -rotate-6 blur-3xl">
        <div className="h-24 w-full rounded-full bg-accent-gradient opacity-80" />
      </div>
    </div>
  );
}
