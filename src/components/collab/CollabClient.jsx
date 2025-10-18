// /src/components/collab/CollabClient.jsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function CollabClient() {
  // 1) Title  2) Where I can help  3) Project ideas  4) How I work + Results & Contact
  const sections = useMemo(
    () => [
      { id: "hero", label: "Title" },
      { id: "help", label: "Where I can help" },
      { id: "ideas", label: "Project ideas" },
      { id: "results", label: "How I work & results" }, // wraps HOW + OUTCOMES + CTA
    ],
    []
  );

  const [active, setActive] = useState("hero");
  const refs = useRef(Object.fromEntries(sections.map((s) => [s.id, null])));
  const endRef = useRef(null);

  // sticky header offset (same on desktop & mobile; tweak if your header height changes)
  const OFFSET = 96;

  // Robust scroll spy with header-aware margins
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        // pick the visible section with the largest ratio
        const vis = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({ id: e.target.id, ratio: e.intersectionRatio }))
          .sort((a, b) => b.ratio - a.ratio);
        if (vis.length) setActive(vis[0].id);
      },
      {
        // top margin removes header height; bottom margin prefers “current” section
        root: null,
        rootMargin: `-${OFFSET + 8}px 0px -55% 0px`,
        threshold: [0.05, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    sections.forEach(({ id }) => refs.current[id] && io.observe(refs.current[id]));

    // bottom sentinel guarantees #4 is active at the very end
    const tail = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive("results")),
      { threshold: 0.01 }
    );
    if (endRef.current) tail.observe(endRef.current);

    return () => {
      io.disconnect();
      tail.disconnect();
    };
  }, [sections]);

  // Precise scroll with header offset + clamp to page bottom (fixes #4 click)
  const jump = (id) => {
    const el = refs.current[id];
    if (!el) return;
    const target = el.getBoundingClientRect().top + window.scrollY - OFFSET;
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight
    );
    const top = Math.min(target, maxScroll);
    setActive(id); // highlight immediately
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-4 space-y-4">
      <StyleBlock />

      {/* Desktop dots (right rail) */}
      <nav
        aria-label="Section navigation"
        className="fixed right-3 top-1/2 z-[5] hidden -translate-y-1/2 md:block"
      >
        <ul className="flex flex-col items-center gap-3">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => jump(s.id)}
                title={s.label}
                aria-label={`Jump to ${s.label}`}
                className="pip md:h-3 md:w-3 h-2.5 w-2.5"
                data-on={active === s.id ? 1 : 0}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile dots (bottom pill) */}
      <nav aria-label="Section navigation" className="fixed inset-x-0 bottom-3 z-[5] md:hidden">
        <div className="mx-auto w-fit rounded-full border bg-white/80 px-3 py-2 shadow-sm backdrop-blur dark:bg-neutral-900/70">
          <ul className="flex items-center gap-3">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => jump(s.id)}
                  title={s.label}
                  aria-label={`Jump to ${s.label}`}
                  className="pip h-2.5 w-2.5"
                  data-on={active === s.id ? 1 : 0}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* HERO — DOT #1 */}
      <header
        id="hero"
        ref={(n) => (refs.current.hero = n)}
        className="relative overflow-hidden rounded-3xl border p-6 md:p-10 scroll-mt-24"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-sky-50 to-transparent dark:from-neutral-900/40" />
        <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-5xl">
          <span className="title-grad-soft">Collaborations that ship — and stand up to scrutiny</span>
        </h1>
        <p className="mt-3 max-w-3xl text-neutral-700 dark:text-neutral-300">
          I work on two tracks: <span className="font-medium">AI/ML products</span> (clean UX, measurable lift, real users) and{" "}
          <span className="font-medium">Clinical ML research</span> (calibrated risk, honest figures, transparent thresholds).
          Small studies, careful writing, tools teams actually use.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {sections.slice(1).map((s) => (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              className="chip ink"
              data-active={active === s.id ? 1 : 0}
            >
              {s.label}
            </button>
          ))}
        </div>
      </header>

      {/* WHERE I CAN HELP — DOT #2 (extra gap after hero only) */}
      <section id="help" ref={(n) => (refs.current.help = n)} className="section-first scroll-mt-24">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Where I can help</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Clinical decision support with calibrated risk and decision-curve thresholds.",
              "Fast, safe demos on de-identified data with clear guardrails.",
              "Wet-lab + analysis: reproducible figures and tidy code.",
              "Writing support for abstracts, methods, model cards, and results narratives.",
            ].map((t) => (
              <RippleCard key={t}>{t}</RippleCard>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT IDEAS — DOT #3 */}
      <section id="ideas" ref={(n) => (refs.current.ideas = n)} className="section scroll-mt-24">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Project ideas</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <RippleCard>
              <div className="text-lg font-semibold">ED triage for suspected PAM (pilot)</div>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {[
                  "Retrospective n≈30–50; quick feature audit.",
                  "Calibration curve, Brier score, decision-curve analysis.",
                  "Deliverables: brief report, model card, small demo UI.",
                ].map((b) => (
                  <li key={b} className="text-neutral-700 dark:text-neutral-300">
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                Focused, ~4–6 weeks once data are ready.
              </p>
            </RippleCard>

            <RippleCard>
              <div className="text-lg font-semibold">Montenegro’s Medium — reproducibility note</div>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                {[
                  "Structured growth dataset with timing and counts.",
                  "Baselines with uncertainty notes; methods-ready figures.",
                  "Open data + open figures bundle (CSV + PNG).",
                ].map((b) => (
                  <li key={b} className="text-neutral-700 dark:text-neutral-300">
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                Good fit for a letter / short communication.
              </p>
            </RippleCard>
          </div>
        </div>
      </section>

      {/* RESULTS WRAPPER — DOT #4 */}
      <section id="results" ref={(n) => (refs.current.results = n)} className="section scroll-mt-24">
        <div className="space-y-8">
          {/* HOW I WORK */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">How I work</h2>
            <ul className="space-y-6">
              {[
                ["Scope first", "We draft the one-pager before we write code."],
                ["Evidence over hype", "Every claim earns a figure. Every figure gets a caption."],
                ["Small, shippable units", "Weekly milestones that stand on their own."],
              ].map(([h, d], i, arr) => (
                <TimelineItem key={h} title={h} desc={d} isLast={i === arr.length - 1} />
              ))}
            </ul>
          </div>

          {/* RECENT OUTCOMES */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Recent outcomes</h2>
            <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">
              <li>
                <span className="font-medium">MM growth figures:</span> 0–168 h curves, batch-freshness comparison, and
                passage-timing study with uncertainty bars.
              </li>
              <li>
                <span className="font-medium">Clinical ML demo:</span> triage UI with reliability plot, conformal-style
                threshold option, and decision-curve view.
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="relative overflow-hidden rounded-2xl border p-6 md:p-7">
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(16,185,129,.12),transparent),linear-gradient(-120deg,rgba(56,189,248,.12),transparent)]" />
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Have an idea that fits?</h3>
                <p className="text-neutral-700 dark:text-neutral-300">Send a short note and the smallest useful dataset.</p>
              </div>
              <div className="flex gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 font-medium text-white shadow-sm dark:bg-white dark:text-black"
                >
                  Contact me →
                </a>
                <a
                  href="/playground"
                  className="inline-flex items-center justify-center rounded-lg border px-4 py-2 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  See a live demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* bottom sentinel (forces last dot active at absolute end) */}
      <div ref={endRef} className="h-1" />
    </div>
  );
}

/* ---------- Local styles & pieces ---------- */
function StyleBlock() {
  return (
    <style>{`
      /* Title gradient (soft, premium) */
      @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
      .title-grad-soft{
        background-image: linear-gradient(90deg,#60a5fa,#34d399,#4f46e5,#60a5fa);
        background-size: 200% 200%;
        -webkit-background-clip:text; background-clip:text; color:transparent;
        filter: saturate(.85) brightness(.95);
        animation: gradShift 8s ease-in-out infinite;
      }

      /* Consistent gaps — only the first jump is larger */
      .section { margin-top: 2.75rem }
      .section-first { margin-top: 3.5rem }

      /* Dots */
      .pip{ border-radius:9999px; border:1px solid rgba(0,0,0,.15); transition:all .22s }
      .pip[data-on="1"]{ background:#34d399; border-color:#34d399; transform:scale(1.12) }

      /* Chips */
      .chip{
        border-radius:9999px; padding:.375rem .75rem; font-size:.875rem;
        border:1px solid rgba(0,0,0,.12); background:rgba(255,255,255,.6);
        transition: transform .25s ease, box-shadow .25s ease, background .25s ease, border-color .25s ease;
      }
      .chip:hover{ transform:translateY(-1px); box-shadow:0 8px 18px rgba(0,0,0,.06) }
      .chip[data-active="1"]{ background:rgba(0,0,0,.04); border-color:rgba(0,0,0,.2) }
      @media (prefers-color-scheme: dark){
        .chip{ background:rgba(12,12,12,.6); border-color:rgba(255,255,255,.12) }
        .chip[data-active="1"]{ background:rgba(255,255,255,.06); border-color:rgba(255,255,255,.22) }
      }

      /* Ink bar on click */
      .ink{ position:relative; overflow:hidden }
      .ink:active::after{
        content:""; position:absolute; left:0; right:0; bottom:0; height:2px;
        background:linear-gradient(90deg,#10b981,#38bdf8);
        transform:translateX(-100%); animation:ink .42s ease;
      }
      @keyframes ink { to{ transform:translateX(0) } }

      /* Card hover + ripple + spotlight */
      .card { transition: transform .25s ease, box-shadow .25s ease }
      .card:hover { transform: translateY(-2px) }
      .glow{
        position:absolute; inset:-1px; border-radius:1rem; pointer-events:none;
        background:
          radial-gradient(420px 140px at 20% 0%, rgba(16,185,129,.16), transparent),
          radial-gradient(420px 140px at 80% 100%, rgba(56,189,248,.16), transparent);
        opacity:0; transition:opacity .25s ease;
      }
      .group:hover .glow{ opacity:.999 }

      .ripple{ position:relative; overflow:hidden }
      .ripple::after{
        content:""; position:absolute; left:var(--rx); top:var(--ry); transform:translate(-50%,-50%);
        width:0; height:0; border-radius:9999px; pointer-events:none;
        background:radial-gradient(circle at center, rgba(56,189,248,.16), transparent 60%);
        opacity:.9;
      }
      .ripple.rippling::after{ animation:ripple .6s ease-out forwards }
      @keyframes ripple { to { width:420px; height:420px; opacity:0 } }

      /* Timeline (bar never touches bullet) */
      .tl-bullet{ position:absolute; left:.5rem; top:.5rem; width:.75rem; height:.75rem; border-radius:9999px; background:#fff; box-shadow:0 0 0 2px rgba(16,185,129,.9) inset }
      .tl-line{ position:absolute; left:0.875rem; top:1.85rem; bottom:0; width:2px; background:linear-gradient(to bottom,#34d399,#38bdf8,transparent) }
      .tl-line-last{ position:absolute; left:0.875rem; top:1.85rem; height:56px; width:2px; background:linear-gradient(to bottom,#34d399,#38bdf8,transparent) }
    `}</style>
  );
}

/* Ripple-on-click + soft spotlight wrapper */
function RippleCard({ children }) {
  const ref = useRef(null);
  const onDown = (e) => {
    const box = ref.current;
    if (!box) return;
    const r = box.getBoundingClientRect();
    box.style.setProperty("--rx", `${e.clientX - r.left}px`);
    box.style.setProperty("--ry", `${e.clientY - r.top}px`);
    box.classList.remove("rippling");
    void box.offsetWidth; // restart animation
    box.classList.add("rippling");
  };
  return (
    <div className="group relative">
      <div className="glow" />
      <article
        ref={ref}
        onMouseDown={onDown}
        className="card ripple rounded-2xl border p-6 bg-white/75 dark:bg-neutral-950/70"
      >
        {children}
      </article>
    </div>
  );
}

function TimelineItem({ title, desc, isLast }) {
  return (
    <li className="relative pl-10">
      <span className="tl-bullet" />
      {isLast ? <span className="tl-line-last" /> : <span className="tl-line" />}
      <div className="rounded-2xl border p-4 bg-white/70 dark:bg-neutral-950/70">
        <div className="font-medium">{title}</div>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
      </div>
    </li>
  );
}
