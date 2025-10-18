"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic
 */
export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * strength * 0.15;
        const dy = (e.clientY - cy) * strength * 0.15;
        el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
        raf = 0;
      });
    };
    const reset = () => (el.style.transform = "translate3d(0,0,0)");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return (
    <span ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </span>
  );
}
