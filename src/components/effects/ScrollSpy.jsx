"use client";

import { useEffect, useState } from "react";

export default function ScrollSpy({ sections = [] }) {
  const [active, setActive] = useState(sections[0] || "");

  // highlight the section nearest to viewport center
  useEffect(() => {
    const onScroll = () => {
      const center = window.innerHeight / 2;
      let best = "";
      let bestDist = Infinity;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) {
          best = id;
          bestDist = dist;
        }
      }
      if (best) setActive(best);
      // top progress
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      const bar = document.getElementById("collabProgress");
      if (bar) bar.style.width = `${pct}%`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const smoothTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const OFFSET = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      {/* top progress */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5">
        <div id="collabProgress" className="h-full w-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
      </div>

      {/* right-side dots (lg+) */}
      <nav className="fixed right-4 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {sections.map((id) => (
          <button
            key={id}
            aria-label={id}
            onClick={() => smoothTo(id)}
            className={
              "h-3 w-3 rounded-full border transition-all " +
              (active === id
                ? "bg-emerald-400 border-emerald-400 scale-[1.15]"
                : "bg-white/70 dark:bg-neutral-950/70 hover:scale-105")
            }
          />
        ))}
      </nav>
    </>
  );
}
