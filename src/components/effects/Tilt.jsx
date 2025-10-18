"use client";

import { useEffect, useRef } from "react";

export default function Tilt({ children, max = 8 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let rAF = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = Math.max(-max, Math.min(max, -py * max * 2));
      const ry = Math.max(-max, Math.min(max, px * max * 2));
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      });
    };
    const reset = () => {
      cancelAnimationFrame(rAF);
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(rAF);
    };
  }, [max]);

  return (
    <div ref={ref} className="transition-transform duration-200 will-change-transform">
      {children}
    </div>
  );
}
