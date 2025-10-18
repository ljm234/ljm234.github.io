// /src/app/services/page.jsx
"use client";

import { useEffect, useMemo, useState } from "react";
import AndesParallax from "@/components/effects/AndesParallax";
import SectionRidges from "@/components/effects/SectionRidges";
import Reveal from "@/components/effects/Reveal";
import HoverLift from "@/components/effects/HoverLift";
import Magnetic from "@/components/effects/Magnetic";
import Ripple from "@/components/effects/Ripple";
import CountUpNumber from "@/components/effects/CountUpNumber";

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ServicesPage() {
  const [demo, setDemo] = useState(null); // 'web' | 'data' | 'ai' | null

  return (
    <>
      {/* HERO */}
      <header className="relative isolate overflow-hidden rounded-2xl border bg-transparent">
        <AndesParallax className="absolute inset-0 z-0 block h-full w-full" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center md:py-32">
          <Reveal effect="fade-up">
            <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-5xl">
              Servicios digitales de nivel investigador
            </h1>
          </Reveal>
          <p className="mx-auto mt-4 max-w-3xl text-neutral-700 dark:text-neutral-300">
            Sitios y dashboards rápidos, bilingües (ES/EN) y medibles para Perú y Chile.
            Optimizados con estándares científicos, accesibilidad y Core Web Vitals.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <Ripple>
                <a href="/contact" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">
                  Reservar 15 min
                </a>
              </Ripple>
            </Magnetic>
            <Magnetic>
              <Ripple>
                <a href="https://wa.me/13854006692" className="rounded-md border px-4 py-2 text-sm font-medium">
                  WhatsApp
                </a>
              </Ripple>
            </Magnetic>
          </div>

          {/* quick stats */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            <Stat k="98–100" label="Lighthouse" />
            <Stat
              k={<><CountUpNumber value={3} />–<CountUpNumber value={5} />×</>}
              label="Crecimiento (Medium)"
            />
            <Stat k="16-pt" label="Score triage" />
          </div>
        </div>
      </header>

      {/* SHOWREEL (limpio para no saturar) */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <Reveal effect="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight">Showreel</h2>
        </Reveal>
        <p className="mt-1 text-neutral-600 dark:text-neutral-300">
          Tres demos rápidos de lo que entregamos.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <ShowreelTile
            title="Web rápido"
            subtitle="Next.js + SEO + bilingüe"
            glow="from-sky-400 to-emerald-400"
            bullets={["TTFB bajo", "i18n ES/EN", "Schema.org"]}
            onDemo={() => setDemo("web")}
          />
          <ShowreelTile
            title="Data & Dashboards"
            subtitle="KPI clínicos / laboratorio"
            glow="from-violet-400 to-sky-400"
            bullets={["Sheets → KPI", "Alertas email", "A11y listas"]}
            onDemo={() => setDemo("data")}
          />
          <ShowreelTile
            title="AI Pilotos"
            subtitle="Demos con trazabilidad"
            glow="from-emerald-400 to-amber-400"
            bullets={["Conformal", "Decision curve", "Dataset card"]}
            onDemo={() => setDemo("ai")}
          />
        </div>
      </section>

      {/* QUÉ HACEMOS con montañas sutiles */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="relative overflow-hidden rounded-2xl border p-6 md:p-8">
          <SectionRidges className="opacity-80" />
          <Reveal effect="fade-up">
            <h2 className="text-2xl font-semibold tracking-tight relative">Qué hacemos</h2>
          </Reveal>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 relative">
            {SERVICES.map((s) => (
              <HoverLift key={s.title}>
                <article className="rounded-xl border bg-white/60 p-5 backdrop-blur-sm dark:bg-neutral-950/50">
                  <div className="font-semibold">{s.title}</div>
                  <p className="mt-1 text-sm text-neutral-500">{s.desc}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="rounded-full border px-2 py-0.5 text-xs">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES (limpio) */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <Reveal effect="fade-up">
          <h2 className="text-2xl font-semibold tracking-tight">Preguntas frecuentes</h2>
        </Reveal>

        <FaqGrid items={FAQS} />

        {/* CTA final */}
        <div className="mt-8 rounded-2xl border p-5 md:p-6">
          <div className="text-lg font-semibold">Listo para empezar</div>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
            Agenda una llamada o escríbenos por WhatsApp.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a href="/contact" className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-black">
              Reservar 15 min
            </a>
            <a href="https://wa.me/13854006692" className="rounded-md border px-4 py-2 text-sm font-medium">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Overlay de demos */}
      <DemoOverlay kind={demo} onClose={() => setDemo(null)} />
    </>
  );
}

/* ─── Small UI ─────────────────────────── */
function Stat({ k, label }) {
  return (
    <div className="rounded-lg border bg-white/60 p-3 text-center dark:bg-neutral-950/60">
      <div className="text-lg font-semibold">{k}</div>
      <div className="text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function ShowreelTile({ title, subtitle, glow, bullets, onDemo }) {
  return (
    <HoverLift>
      <div className="group relative overflow-hidden rounded-xl border p-5">
        <div className={`pointer-events-none absolute -inset-16 -z-10 blur-3xl bg-gradient-to-tr ${glow} opacity-25 transition-opacity group-hover:opacity-60`} />
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-neutral-500">{subtitle}</div>
        <ul className="mt-3 space-y-1 text-sm">
          {bullets.map((b) => <li key={b}>• {b}</li>)}
        </ul>
        <button onClick={onDemo} className="mt-4 text-xs underline underline-offset-4">
          Demo interactivo →
        </button>
      </div>
    </HoverLift>
  );
}

/* ─── FAQ ──────────────────────────────── */
function FaqGrid({ items }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      {items.map((q, i) => {
        const isOpen = open === i;
        return (
          <div key={q.q} className="rounded-xl border">
            <button
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span className="font-medium">{q.q}</span>
              <span className={`text-neutral-500 transition-transform ${isOpen ? "rotate-45" : ""}`} aria-hidden="true">+</span>
            </button>
            <div
              id={`faq-${i}`}
              className={`px-4 pb-4 text-sm text-neutral-600 dark:text-neutral-300 transition-[max-height,opacity] duration-200 ease-out ${isOpen ? "opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
            >
              {q.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Demo overlay + three tiny demos ─── */
function DemoOverlay({ kind, onClose }) {
  useEffect(() => {
    if (!kind) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [kind, onClose]);

  if (!kind) return null;

  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full rounded-t-2xl border bg-white p-4 dark:bg-neutral-950 md:w-[720px] md:rounded-2xl md:p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Demo interactivo</div>
          <button onClick={onClose} className="rounded-md border px-2 py-1 text-xs">Cerrar</button>
        </div>
        <div className="mt-4">
          {kind === "web" && <SpeedSEOBuilder />}
          {kind === "data" && <KpiSparkline />}
          {kind === "ai" && <ThresholdMini />}
        </div>
      </div>
    </div>
  );
}

/* Demo 1: Web speed/SEO builder */
function SpeedSEOBuilder() {
  const [i18n, setI18n] = useState(true);
  const [img, setImg] = useState(true);
  const [prefetch, setPrefetch] = useState(true);
  const score = useMemo(() => Math.min(100, 92 + (i18n ? 2 : 0) + (img ? 3 : 0) + (prefetch ? 2 : 0)), [i18n, img, prefetch]);

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div>
        <div className="text-sm text-neutral-500">Rendimiento & SEO</div>
        <div className="font-semibold">Constructor de score</div>
        <div className="mt-3 space-y-2 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={i18n} onChange={()=>setI18n(v=>!v)} /> i18n (ES/EN, hreflang)</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={img} onChange={()=>setImg(v=>!v)} /> Optimización de imágenes</label>
          <label className="flex items-center gap-2"><input type="checkbox" checked={prefetch} onChange={()=>setPrefetch(v=>!v)} /> Prefetch + meta SEO</label>
        </div>
      </div>
      <div className="rounded-lg border p-4 text-center">
        <div className="text-4xl font-bold"><CountUpNumber value={score} /> / 100</div>
        <div className="text-xs text-neutral-500">Lighthouse (simulado)</div>
      </div>
    </div>
  );
}

/* Demo 2: KPI sparkline */
function KpiSparkline() {
  const [data, setData] = useState(() => seedSpark(16));
  const add = () => setData(d => [...d.slice(-15), clamp(d[d.length-1] + rnd(-4,5), 40, 98)]);
  const rand = () => setData(seedSpark(16));
  const path = useMemo(() => makeSparkPath(data, 420, 96, 10), [data]);

  return (
    <div>
      <div className="text-sm text-neutral-500">KPI</div>
      <div className="font-semibold">Sparkline (calidad/uptime)</div>
      <svg viewBox="0 0 420 96" className="mt-3 w-full">
        <rect x="0" y="0" width="420" height="96" rx="10" className="fill-neutral-50 dark:fill-neutral-900" />
        <path d={path} className="fill-none stroke-current" style={{ color: "rgb(20 184 166)" }} strokeWidth="2.5" />
      </svg>
      <div className="mt-3 flex gap-2">
        <button onClick={add} className="rounded-md border px-3 py-1 text-sm">+ Punto</button>
        <button onClick={rand} className="rounded-md border px-3 py-1 text-sm">Aleatorio</button>
      </div>
    </div>
  );
}

/* Demo 3: Mini threshold (AI) */
function ThresholdMini() {
  const [t, setT] = useState(0.2);
  const N = 500, prev = 0.12;
  const TPR = 0.92 - 0.5 * t;
  const FPR = 0.35 * (1 - t);
  const P = Math.round(N * prev);
  const Nn = N - P;
  const TP = Math.round(TPR * P);
  const FN = P - TP;
  const FP = Math.round(FPR * Nn);
  const TN = Nn - FP;

  return (
    <div>
      <div className="text-sm text-neutral-500">IA responsable</div>
      <div className="font-semibold">Umbral y matriz (simulada)</div>
      <label className="mt-3 block text-sm">Umbral: {t.toFixed(2)}</label>
      <input type="range" min="0" max="1" step="0.01" value={t} onChange={(e)=>setT(parseFloat(e.target.value))} className="w-full" />
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <Box label="TP" v={TP} /><Box label="FP" v={FP} /><Box label="FN" v={FN} /><Box label="TN" v={TN} />
      </div>
      <p className="mt-2 text-xs text-neutral-500">Demo ilustrativa (no clínica). Muestra cómo cambian FP/FN con el umbral.</p>
    </div>
  );
}
function Box({label, v}){ return (<div className="rounded border p-2"><div className="text-xs text-neutral-500">{label}</div><div className="font-semibold">{v}</div></div>); }

/* helpers */
function seedSpark(n){ const a=[rnd(60,90)]; for(let i=1;i<n;i++) a.push(clamp(a[i-1]+rnd(-6,6),40,98)); return a; }
function makeSparkPath(arr,w,h,p){ if(!arr.length) return ""; const xs=(w-p*2)/(arr.length-1||1); const mn=Math.min(...arr), mx=Math.max(...arr);
  const sy=(v)=>{ if(mx===mn) return h/2; const t=(v-mn)/(mx-mn); return h-p-t*(h-p*2); }; let d=`M ${p} ${sy(arr[0])}`;
  arr.forEach((v,i)=>{ if(i===0) return; d+=` L ${p+xs*i} ${sy(v)}`; }); return d; }
const rnd=(a,b)=>a+Math.random()*(b-a); const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));

/* content */
const SERVICES = [
  { title: "Sitios web de alto rendimiento", desc: "Next.js + Vercel, SEO técnico, i18n ES/EN, analítica y CMS.", tags: ["Core Web Vitals", "SEO", "i18n", "CMS"] },
  { title: "Portafolios científicos / MD", desc: "Publicaciones (ORCID/Scholar), proyectos, media kit y métricas.", tags: ["Citas", "ORCID", "Model cards"] },
  { title: "Dashboards clínicos / laboratorio", desc: "KPI claros desde Sheets/CSV y reportes programados.", tags: ["Sheets→KPI", "A11y", "Reportes"] },
  { title: "Pilotos de IA responsables", desc: "Demos con trazabilidad, conformal y decision curves (no clínico).", tags: ["Doc. modelo", "Conformal", "Explainability"] },
  { title: "Optimización y accesibilidad", desc: "Mejoramos un sitio existente: +90 Lighthouse y WCAG-AA.", tags: ["Lighthouse", "WCAG-AA", "Perf"] },
  { title: "Automatización y flujos", desc: "Recordatorios email/WhatsApp, ETL a Sheets/BigQuery, PDFs.", tags: ["WhatsApp", "ETL", "PDF"] },
];

const FAQS = [
  { q:"¿Trabajan en ES y EN?", a:"Sí. Entregamos sitios bilingües con i18n (ES/EN), hreflang y SEO técnico." },
  { q:"¿Pagos locales?", a:"Para Perú/Chile: transferencia bancaria local o tarjeta. También USD vía Stripe." },
  { q:"¿Datos y privacidad?", a:"Manejo mínimo de datos; NDA si aplica. Backups cifrados y acceso por roles." },
  { q:"¿Accesibilidad?", a:"Apuntamos a WCAG 2.2 AA: contraste, foco visible, teclado y ARIA." },
  { q:"¿Dashboards y datos?", a:"Sheets/CSV/DB. KPIs trazables con exportes a PDF y alertas." },
  { q:"¿IA responsable?", a:"Prototipos con límites claros (no clínicos) y documentación de modelo." },
];
