"use client";

import { useEffect, useRef, useState } from "react";

export default function CountUpNumber({ value = 0, duration = 800, prefix = "", suffix = "" }) {
  const [n, setN] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const start = performance.now();
    const from = 0;
    const to = Number(value) || 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(from + (to - from) * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return (
    <span aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      <span className="tabular-nums">{n}</span>
      {suffix}
    </span>
  );
}
