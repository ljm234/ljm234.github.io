"use client";

import { useEffect, useState } from "react";

/** Thin scroll progress bar at the very top. */
export default function TopProgress() {
  const [w, setW] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? (el.scrollTop / max) * 100 : 0;
      setW(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="top-progress" style={{ width: `${w}%` }} aria-hidden="true" />;
}
