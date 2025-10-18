// /src/components/services/InteractiveDemos.jsx
"use client";

import { useMemo, useState } from "react";
import HoverLift from "@/components/effects/HoverLift";
import Ripple from "@/components/effects/Ripple";
import Magnetic from "@/components/effects/Magnetic";
import CountUpNumber from "@/components/effects/CountUpNumber";

export default function InteractiveDemos() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="text-2xl font-semibold tracking-tight">Demos interactivos</h2>
      <p className="mt-1 text-neutral-600 dark:text-neutral-300">
        Un vistazo real a cómo entregamos rendimiento, datos y pilotos de IA responsables.
      </p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <SpeedSEOCard />
        <KpiSparklineCard />
        <ThresholdMiniCard />
      </div>
    </section>
  );
}

/* ----------- Card 1: Speed & SEO builder ----------- */
function SpeedSEOCard() {
  const [i18n, setI18n] = useState(true);
  const [img, setImg] = useState(true);
  const [prefetch, setPrefetch] = useState(true);

  const score = useMemo(() => {
    let s = 92;
    if (i18n) s += 2;
    if (img) s += 3;
    if (prefetch) s += 2;
    return Math.min(100, s);
  }, [i18n, img, prefetch]);

  return (
    <HoverLift>
      <div className="rounded-xl border p-5 h-full">
        <div className="text-sm text-neutral-500">Rendimiento & SEO</div>
        <div className="mt-1 font-semibold">Constructor de score</div>

        <div className="mt-4 grid gap-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={i18n} onChange={() => setI18n(v => !v)} />
            i18n (ES/EN, hreflang)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={img} onChange={() => setImg(v => !v)} />
            Optimización de imágenes
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={prefetch} onChange={() => setPrefetch(v => !v)} />
            Prefetch + meta SEO
          </label>
        </div>

        <div className="mt-4 rounded-lg border p-3 text-center">
          <div className="text-4xl font-bold">
            <CountUpNumber value={score} /> / 100
          </div>
          <div className="text-xs text-neutral-500">Lighthouse (simulado)</div>
        </div>
      </div>
    </HoverLift>
  );
}

/* ----------- Card 2: KPI sparkline ----------- */
function KpiSparklineCard() {
  const [data, setData] = useState(() => seedSpark(16));

  const addPoint = () => setData(d => [...d.slice(-15), clamp(d[d.length - 1] + rand(-4, 5), 40, 98)]);
  const randomize = () => setData(seedSpark(16));

  const path = useMemo(() => makeSparkPath(data, 240, 60, 8), [data]);

  return (
    <HoverLift>
      <div className="rounded-xl border p-5 h-full">
        <div className="text-sm text-neutral-500">KPI</div>
        <div className="mt-1 font-semibold">Sparkline (calidad/uptime)</div>

        <svg viewBox="0 0 240 60" className="mt-3 w-full">
          <rect x="0" y="0" width="240" height="60" rx="8" className="fill-neutral-50 dark:fill-neutral-900" />
          <path d={path} className="fill-none stroke-current" style={{ color: "rgb(20 184 166)" }} strokeWidth="2" />
        </svg>

        <div className="mt-3 flex gap-2">
          <Magnetic><Ripple><button onClick={addPoint} className="rounded-md border px-3 py-1 text-sm">+ Punto</button></Ripple></Magnetic>
          <Magnetic><Ripple><button onClick={randomize} className="rounded-md border px-3 py-1 text-sm">Aleatorio</button></Ripple></Magnetic>
        </div>
      </div>
    </HoverLift>
  );
}

/* ----------- Card 3: Mini threshold (AI) ----------- */
function ThresholdMiniCard() {
  const [t, setT] = useState(0.2); // threshold
  const N = 500, prev = 0.12;
  const TPR = 0.92 - 0.5 * t;       // toy curve
  const FPR = 0.35 * (1 - t);

  const P = Math.round(N * prev);
  const Nn = N - P;
  const TP = Math.round(TPR * P);
  const FN = P - TP;
  const FP = Math.round(FPR * Nn);
  const TN = Nn - FP;

  return (
    <HoverLift>
      <div className="rounded-xl border p-5 h-full">
        <div className="text-sm text-neutral-500">IA responsable</div>
        <div className="mt-1 font-semibold">Umbral y matriz (simulada)</div>

        <label className="mt-3 block text-sm">Umbral: {t.toFixed(2)}</label>
        <input type="range" min="0" max="1" step="0.01" value={t} onChange={(e)=>setT(parseFloat(e.target.value))} className="w-full" />

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded border p-2"><div className="text-xs text-neutral-500">TP</div><div className="font-semibold">{TP}</div></div>
          <div className="rounded border p-2"><div className="text-xs text-neutral-500">FP</div><div className="font-semibold">{FP}</div></div>
          <div className="rounded border p-2"><div className="text-xs text-neutral-500">FN</div><div className="font-semibold">{FN}</div></div>
          <div className="rounded border p-2"><div className="text-xs text-neutral-500">TN</div><div className="font-semibold">{TN}</div></div>
        </div>

        <p className="mt-2 text-xs text-neutral-500">
          Demo ilustrativa (no clínica). Mostramos cómo varían falsos positivos/negativos con el umbral.
        </p>
      </div>
    </HoverLift>
  );
}

/* ---------- helpers ---------- */
function seedSpark(n) {
  const arr = [rand(60, 90)];
  for (let i = 1; i < n; i++) arr.push(clamp(arr[i-1] + rand(-6, 6), 40, 98));
  return arr;
}
function makeSparkPath(arr, w, h, pad) {
  if (!arr.length) return "";
  const xstep = (w - pad * 2) / (arr.length - 1 || 1);
  const min = Math.min(...arr), max = Math.max(...arr);
  const scaleY = (v) => {
    if (max === min) return h / 2;
    const t = (v - min) / (max - min);
    return h - pad - t * (h - pad * 2);
  };
  let d = `M ${pad} ${scaleY(arr[0])}`;
  arr.forEach((v, i) => {
    if (i === 0) return;
    d += ` L ${pad + xstep * i} ${scaleY(v)}`;
  });
  return d;
}
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
