// src/components/home/HomeClient.jsx
"use client";

import { useEffect, useRef } from "react";

export default function HomeClient() {
  // subtle parallax for the hero field
  const fxRef = useRef(null);
  useEffect(() => {
    const el = fxRef.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const Cards = [
    {
      title: "AI/ML products",
      bullets: [
        "Production-ready web apps with accessible, clean UX.",
        "Observable data pipelines and evaluation harnesses.",
        "A/B or counterfactual checks to prove real lift.",
      ],
      href: "/playground",
    },
    {
      title: "Clinical ML research",
      bullets: [
        "Calibrated risk with decision-curve thresholds.",
        "External validation, reliability plots, uncertainty.",
        "Model/Data cards and reproducible analysis.",
      ],
      href: "/collaborations",
    },
  ];

  const Work = [
    {
      title: "Research",
      desc: "Bench assays paired with tidy analysis pipelines and clear figures.",
      href: "/research",
      tag: "Bench → bytes",
    },
    {
      title: "Publications",
      desc: "Preprints and method notes with code, data, and repeatable results.",
      href: "/publications",
      tag: "Open & reproducible",
    },
    {
      title: "Performance",
      desc: "Budgets, Lighthouse, and live device vitals — fast on purpose.",
      href: "/perf",
      tag: "Measured",
    },
    {
      title: "Collaborations",
      desc: "Scope, guardrails, and weekly milestones. Small wins that stack.",
      href: "/collaborations",
      tag: "Let’s build",
    },
  ];

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-8 md:py-10 space-y-10">
      <StyleBlock />

      {/* HERO */}
      <header className="relative overflow-hidden rounded-3xl border">
        {/* background field */}
        <div
          ref={fxRef}
          className="heroFX pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <div className="noise" />
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="gridlines" />
        </div>

        <div className="p-6 md:p-10">
          <h1 className="text-balance text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="title-grad">Clinical&nbsp;ML</span>{" "}
            and{" "}
            <span className="title-grad-2">AI/ML products</span>{" "}
            that ship — and stand up to scrutiny
          </h1>
          <p className="mt-4 max-w-3xl text-neutral-700 dark:text-neutral-300">
            I split my work between careful{" "}
            <span className="font-medium">Clinical ML research</span> and shipping{" "}
            <span className="font-medium">AI/ML products</span>. The through-line:
            calibrated risk, decision-curve thresholds, and figures that anyone on
            the team can trust. Fewer claims, better evidence, usable tools.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/research" className="btn-primary">See work</a>
            <a href="/contact" className="btn-ghost">Contact</a>
            <a href="/playground" className="btn-ghost">Live demo</a>
          </div>

          {/* trust chips / marquee */}
          <div className="mt-8 overflow-hidden rounded-xl border bg-white/60 dark:bg-neutral-950/60">
            <div className="marquee">
              {[
                "Calibrated risk",
                "Decision-curve thresholds",
                "External validation",
                "Reliability diagrams",
                "Conformal options",
                "Model cards",
                "Dataset cards",
                "Reproducible figures",
                "Accessible UX",
                "Core Web Vitals 98–100",
                "Prospective pilots",
              ].map((t, i) => (
                <span key={i} className="mx-3 whitespace-nowrap text-sm opacity-80">
                  {t} •
                </span>
              ))}
              {[
                "Calibrated risk",
                "Decision-curve thresholds",
                "External validation",
                "Reliability diagrams",
                "Conformal options",
                "Model cards",
                "Dataset cards",
                "Reproducible figures",
                "Accessible UX",
                "Core Web Vitals 98–100",
                "Prospective pilots",
              ].map((t, i) => (
                <span key={`d-${i}`} className="mx-3 whitespace-nowrap text-sm opacity-80">
                  {t} •
                </span>
              ))}
            </div>
          </div>

          {/* quick KPIs */}
          <dl className="mt-6 grid gap-3 sm:grid-cols-4">
            {[
              ["Lighthouse", "98–100"],
              ["Ship cadence", "Weekly"],
              ["Accessibility", "AA+"],
              ["Tests", "Green"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border bg-white/60 p-3 text-center dark:bg-neutral-950/60">
                <div className="text-2xl font-semibold leading-none">{v}</div>
                <div className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">{k}</div>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* WHERE I CAN HELP */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Where I can help</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {Cards.map((c) => (
            <a key={c.title} href={c.href} className="group relative block rounded-2xl border p-6 card hover:shadow-lg">
              <span className="glow" />
              <div className="text-lg font-semibold">{c.title}</div>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {c.bullets.map((b) => (
                  <li key={b} className="text-neutral-700 dark:text-neutral-300">{b}</li>
                ))}
              </ul>
              <div className="mt-5 inline-flex items-center text-sm opacity-80 group-hover:opacity-100">
                Explore <Arrow />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Selected work</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Work.map((w) => (
            <a key={w.title} href={w.href} className="group relative block rounded-2xl border p-5 card hover:shadow-lg">
              <span className="chip">{w.tag}</span>
              <div className="mt-2 text-lg font-semibold">{w.title}</div>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{w.desc}</p>
              <div className="mt-4 inline-flex items-center text-sm opacity-80 group-hover:opacity-100">
                Open <Arrow />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden rounded-2xl border p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_20%_0%,rgba(16,185,129,.12),transparent),radial-gradient(80%_60%_at_80%_100%,rgba(56,189,248,.12),transparent)]" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Have an idea that fits?</h3>
            <p className="max-w-xl text-neutral-700 dark:text-neutral-300">
              Send the smallest useful dataset and a short note. I’ll reply quickly with next steps.
            </p>
          </div>
          <div className="flex gap-3">
            <a href="/contact" className="btn-primary">Contact</a>
            <a href="/collaborations" className="btn-ghost">How I work</a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------- UI bits ---------------- */

function Arrow() {
  return (
    <svg className="ml-2 h-4 w-4 transition -translate-x-[1px] group-hover:translate-x-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M5 12h14" strokeWidth="2" />
      <path d="M13 6l6 6-6 6" strokeWidth="2" />
    </svg>
  );
}

function StyleBlock() {
  return (
    <style>{`
      /* Title treatments */
      .title-grad{
        background: linear-gradient(90deg,#22c55e,#38bdf8,#6366f1);
        background-size: 220% 220%;
        -webkit-background-clip:text; background-clip:text; color:transparent;
        animation: gradShift 8s ease-in-out infinite;
      }
      .title-grad-2{
        background: linear-gradient(90deg,#60a5fa,#34d399,#8b5cf6);
        background-size: 220% 220%;
        -webkit-background-clip:text; background-clip:text; color:transparent;
        animation: gradShift 10s ease-in-out infinite reverse;
      }
      @keyframes gradShift {
        0%{background-position:0% 50%}
        50%{background-position:100% 50%}
        100%{background-position:0% 50%}
      }

      /* Buttons */
      .btn-primary{
        position:relative; display:inline-flex; align-items:center; gap:.5rem;
        padding:.625rem 1rem; border-radius:.9rem; font-weight:600;
        color:white; background:#111;
      }
      .btn-primary:hover{ background:#000; transform:translateY(-1px); }
      .btn-ghost{
        display:inline-flex; align-items:center; gap:.5rem;
        padding:.625rem 1rem; border-radius:.9rem; font-weight:600;
        border:1px solid rgba(0,0,0,.12);
      }
      .btn-ghost:hover{ background:rgba(0,0,0,.035); transform:translateY(-1px); }
      @media (prefers-color-scheme: dark){
        .btn-ghost{ border-color:rgba(255,255,255,.15) }
        .btn-ghost:hover{ background:rgba(255,255,255,.06) }
      }

      /* Cards */
      .card{ transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; background:rgba(255,255,255,.7); }
      .card:hover{ transform: translateY(-3px); }
      .glow{
        pointer-events:none; position:absolute; inset:-1px; border-radius:1rem; opacity:0; transition:opacity .25s ease;
        background:
          radial-gradient(420px 120px at 20% 0%, rgba(16,185,129,.16), transparent),
          radial-gradient(420px 120px at 80% 100%, rgba(56,189,248,.16), transparent);
      }
      .card:hover .glow{ opacity:1 }
      .chip{
        position:absolute; top:.75rem; right:.75rem; font-size:.7rem; letter-spacing:.02em;
        padding:.35rem .55rem; border-radius:9999px; border:1px solid rgba(0,0,0,.12);
        background:rgba(255,255,255,.75);
      }
      @media (prefers-color-scheme: dark){
        .card{ background:rgba(12,12,12,.65) }
        .chip{ border-color:rgba(255,255,255,.12); background:rgba(18,18,18,.6) }
      }

      /* Marquee */
      .marquee{
        display:flex; align-items:center; height:40px; padding:0 10px;
        animation: slide 18s linear infinite; will-change: transform;
        white-space:nowrap;
      }
      @keyframes slide{
        0%{ transform:translateX(0) }
        100%{ transform:translateX(-50%) }
      }

      /* HERO FX (parallax field) */
      .heroFX{
        --mx: 0; --my: 0;
      }
      .noise{
        position:absolute; inset:0; opacity:.035; pointer-events:none;
        background-image:url('data:image/svg+xml;utf8,\
<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">\
<filter id="n"><feTurbulence baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter>\
<rect width="140" height="140" filter="url(%23n)" opacity=".9"/></svg>');
        mix-blend-mode:multiply;
      }
      .orb{
        position:absolute; width:72vmin; height:72vmin; border-radius:50%; filter: blur(32px);
        transform: translate(calc(var(--mx) * 24px), calc(var(--my) * 20px));
      }
      .orb-a{ left:-20vmin; top:-12vmin; background: radial-gradient(closest-side, rgba(16,185,129,.22), transparent 70%) }
      .orb-b{ right:-18vmin; bottom:-22vmin; background: radial-gradient(closest-side, rgba(56,189,248,.22), transparent 70%) }
      .gridlines{
        position:absolute; inset:0; background-image:
          linear-gradient(to right, rgba(0,0,0,.04) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,.04) 1px, transparent 1px);
        background-size: 44px 44px; mask-image: radial-gradient(80% 80% at 50% 40%, #000, transparent 75%);
      }
    `}</style>
  );
}
