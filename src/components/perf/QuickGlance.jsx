// src/components/perf/QuickGlance.jsx
"use client";

import { useEffect, useRef, useState } from "react";

function useInView(ref, rootMargin = "0px 0px -10% 0px") {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

function CountUp({ to = 0, duration = 900 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const target = Number(to) || 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);

  return <span ref={ref}>{val}</span>;
}

export default function QuickGlance({ groups = [] }) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {groups.map((g) => (
        <section key={g.title} className="gl-card relative overflow-hidden rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">{g.title}</h3>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {g.stats.map((s) => (
              <div
                key={s.label}
                className="stat group relative rounded-xl border bg-white/70 px-4 py-3 text-center dark:bg-neutral-950/60"
              >
                <div className="text-3xl font-semibold leading-none">
                  <CountUp to={s.value} />
                </div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{s.label}</div>
                <span className="hoverline" />
              </div>
            ))}
          </div>

          <style jsx>{`
            .gl-card:before {
              content: "";
              position: absolute;
              inset: -1px;
              pointer-events: none;
              background:
                radial-gradient(600px 200px at 20% -20%, rgba(16, 185, 129, 0.18), transparent),
                radial-gradient(600px 200px at 80% 120%, rgba(56, 189, 248, 0.18), transparent);
              opacity: 0;
              transition: opacity 0.25s ease;
            }
            .gl-card:hover:before { opacity: 0.95 }

            .stat { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease }
            .stat:hover { transform: translateY(-2px); box-shadow: 0 12px 30px rgba(0,0,0,.06) }

            .hoverline {
              position: absolute; left: 0; right: 0; bottom: 0; height: 2px;
              background: linear-gradient(90deg, #10b981, #38bdf8);
              transform: translateX(-100%); transition: transform .45s ease;
            }
            .stat:hover .hoverline { transform: translateX(0) }
          `}</style>
        </section>
      ))}
    </div>
  );
}
