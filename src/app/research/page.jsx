// /src/app/research/page.jsx
"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import HoverLift from "@/components/effects/HoverLift";
import Reveal from "@/components/effects/Reveal";

const FILTERS = ["All", "ML", "Wet lab", "Clinical"];

const PROJECTS = [
  {
    slug: "amoebanator",
    title: "Amoebanator CDS",
    desc: "Early PAM triage with risk calibration, decision curve, and explainability.",
    tags: ["ML", "Clinical"],
    anim: "amoebanator",
  },
  {
    slug: "montenegro-medium",
    title: "Montenegro’s Medium",
    desc: "Low-cost culture medium with 3–5× growth for Naegleria fowleri.",
    tags: ["Wet lab"],
    anim: "medium",
  },
  {
    slug: "organelle-targets",
    title: "Organelle-Target Discovery for Selective Amoebicidal Therapy",
    desc: "LDH (24 h), Caspase-3 (48 h), JC-1 (72 h) matched HeLa+Nf vs Nf-only.",
    tags: ["Wet lab"],
    anim: "erstress",
  },
];

export default function ResearchPage() {
  const [filter, setFilter] = useState("All");
  const items = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter))),
    [filter]
  );

  return (
    <>
      <div className="space-y-6">
        <header className="space-y-2">
          <Reveal effect="fade-up">
            <h1 className="text-3xl font-bold tracking-tight">Research</h1>
          </Reveal>
          <p className="text-neutral-600 dark:text-neutral-300">
            Selected work across ML, wet lab, and clinical collaborations.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  "rounded-full border px-3 py-1 text-sm transition " +
                  (filter === f
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-900")
                }
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {filter === "All" ? <Marquee items={items} /> : <StaticGrid items={items} />}
      </div>

      {/* Inline keyframes so the marquee always works */}
      <style jsx global>{`
        @keyframes rf-slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .rf-marquee { position: relative; overflow: hidden; }
        .rf-marquee .rf-track {
          animation: rf-slide var(--dur, 18s) linear infinite;
          will-change: transform;
        }
        .rf-marquee.paused .rf-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .rf-marquee .rf-track { animation: none !important; }
        }
      `}</style>
    </>
  );
}

/* ---------- Static grid for filtered views ---------- */
function StaticGrid({ items }) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p) => (
        <ResearchCard key={p.slug} proj={p} variant="grid" />
      ))}
    </section>
  );
}

/* ---------- Auto-rotating marquee for “All” ---------- */
function Marquee({ items }) {
  // duplicate for seamless loop (both halves identical width)
  const doubled = useMemo(() => [...items, ...items], [items]);
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`rf-marquee ${paused ? "paused" : ""}`}
      aria-label="Research projects carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="rf-track flex w-max gap-6" style={{ ["--dur"]: "18s" }}>
        {doubled.map((p, i) => (
          <ResearchCard key={`${p.slug}-${i}`} proj={p} variant="carousel" />
        ))}
      </div>
    </div>
  );
}

/* ---------- Card with floating Quick preview ---------- */
function ResearchCard({ proj, variant = "grid" }) {
  const open = () => (window.location.href = `/research/${proj.slug}`);
  const onKey = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  };

  const sizing = variant === "carousel" ? "w-[min(92vw,22rem)] shrink-0" : "w-full";

  return (
    <HoverLift>
      <div
        role="link"
        tabIndex={0}
        onKeyDown={onKey}
        onClick={open}
        className={`group relative ${sizing} overflow-hidden rounded-xl border bg-white dark:bg-neutral-950`}
      >
        {/* Media/animation area */}
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <AnimatedPanel kind={proj.anim} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
        </div>

        {/* Text */}
        <div className="p-4">
          <div className="font-semibold">{proj.title}</div>
          <p className="mt-1 text-sm text-neutral-500">{proj.desc}</p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300"
                >
                  {t}
                </span>
              ))}
            </div>
            <span
              aria-hidden="true"
              className="text-sm text-neutral-500 transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </div>
        </div>

        {/* Floating Quick preview */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          aria-hidden="false"
        >
          <div className="pointer-events-auto rounded-xl border bg-white/90 p-3 text-sm shadow-xl dark:bg-neutral-900/90">
            <div className="font-medium">{proj.title}</div>
            <div className="mt-1 max-w-[36ch] text-neutral-600 dark:text-neutral-300">
              {proj.desc}
            </div>
            <div className="mt-3 flex gap-2">
              <a className="rounded-md border px-3 py-1" href={`/research/${proj.slug}`}>
                Open
              </a>
              <a className="rounded-md border px-3 py-1" href="/publications">
                Publications
              </a>
            </div>
          </div>
        </div>
      </div>
    </HoverLift>
  );
}

/* ---------- Canvas animations ---------- */
function AnimatedPanel({ kind }) {
  if (prefersReducedMotion())
    return <div className="h-full w-full bg-accent-gradient opacity-30" aria-hidden="true" />;
  switch (kind) {
    case "amoebanator":
      return <CanvasAnim draw={drawLogistic} />;
    case "medium":
      return <CanvasAnim draw={drawColonies} />;
    case "erstress":
      return <CanvasAnim draw={drawNetwork} />;
    default:
      return <div className="h-full w-full bg-accent-gradient opacity-30" />;
  }
}

function CanvasAnim({ draw }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const { clientWidth: w, clientHeight: h } = canvas;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    const tick = (t) => {
      draw(ctx, t, canvas.clientWidth, canvas.clientHeight);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [draw]);

  return <canvas ref={ref} className="h-full w-full" aria-hidden="true" />;
}

/* draw funcs */
function drawLogistic(ctx, t, w, h) {
  ctx.clearRect(0, 0, w, h);
  const pad = 18;
  ctx.strokeStyle = "rgba(120,120,120,.5)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(pad, h - pad);
  ctx.lineTo(w - pad, h - pad);
  ctx.moveTo(pad, h - pad);
  ctx.lineTo(pad, pad);
  ctx.stroke();

  ctx.strokeStyle = "rgba(99,102,241,.9)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let i = 0; i <= 100; i++) {
    const x = i / 100;
    const y = 1 / (1 + Math.exp(-10 * (x - 0.5)));
    const px = pad + x * (w - 2 * pad);
    const py = h - pad - y * (h - 2 * pad);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  const s = (Math.sin(t * 0.0015) + 1) / 2;
  const x = s,
    y = 1 / (1 + Math.exp(-10 * (x - 0.5)));
  const px = pad + x * (w - 2 * pad);
  const py = h - pad - y * (h - 2 * pad);
  ctx.fillStyle = "rgba(16,185,129,.95)";
  ctx.beginPath();
  ctx.arc(px, py, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawColonies(ctx, t, w, h) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2,
    cy = h / 2,
    R = Math.min(w, h) * 0.45;
  ctx.strokeStyle = "rgba(120,120,120,.4)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  const seeds = 7;
  for (let i = 0; i < seeds; i++) {
    const ang = (i / seeds) * Math.PI * 2 + 0.3;
    const ex = cx + Math.cos(ang) * (R * 0.4);
    const ey = cy + Math.sin(ang) * (R * 0.4);
    const pulse = 1 + 0.25 * Math.sin(t * 0.001 + i);
    const rad = 3 + 6 * pulse * (i % 3 ? 0.5 : 1);
    ctx.fillStyle = "rgba(99,102,241,.18)";
    ctx.beginPath();
    ctx.arc(ex, ey, rad, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(99,102,241,.45)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawNetwork(ctx, t, w, h) {
  ctx.clearRect(0, 0, w, h);
  const nodes = [];
  const N = 18;
  for (let i = 0; i < N; i++) {
    const ang = (i / N) * Math.PI * 2;
    const r = Math.min(w, h) * 0.35;
    nodes.push({
      x: w / 2 + Math.cos(ang) * r * (0.6 + 0.2 * Math.sin(t / 1500 + i)),
      y: h / 2 + Math.sin(ang) * r * (0.6 + 0.2 * Math.cos(t / 1500 + i)),
    });
  }
  ctx.strokeStyle = "rgba(120,120,120,.35)";
  ctx.lineWidth = 1;
  for (let i = 0; i < N; i++) {
    const a = nodes[i],
      b = nodes[(i + 3) % N];
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(16,185,129,.9)";
  const p = (Math.sin(t * 0.002) + 1) / 2;
  const k = Math.floor(p * N);
  for (let i = 0; i < N; i++) {
    const n = nodes[(i + k) % N];
    const r = 2 + 2 * (i === k ? 2 : 1);
    ctx.beginPath();
    ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
