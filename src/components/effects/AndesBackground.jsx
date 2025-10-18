// /src/components/effects/AndesBackground.jsx
"use client";

import { useEffect, useRef } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Animated Andes-style background:
 * - Soft dawn sky gradient + sun glow
 * - 6 layered ridges with parallax drift
 * - Subtle star/sparkle twinkle at the top
 * - Very lightweight (canvas only)
 */
export default function AndesBackground({
  className = "",
  layers = 6,
  speed = 0.35,
}) {
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

    const paintStatic = (t = 0) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // 1) vivid dawn sky
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, "rgba(56,189,248,0.55)");  // sky-400
      sky.addColorStop(0.55, "rgba(99,102,241,0.30)"); // indigo-500
      sky.addColorStop(1, "rgba(16,185,129,0.45)");  // emerald-500
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);

      // 2) sun glow (left top)
      const sun = ctx.createRadialGradient(w * 0.22, h * 0.18, 0, w * 0.22, h * 0.18, h * 0.7);
      sun.addColorStop(0, "rgba(255,210,130,0.50)");
      sun.addColorStop(1, "rgba(255,210,130,0.00)");
      ctx.fillStyle = sun;
      ctx.fillRect(0, 0, w, h);

      // 3) twinkles near the top
      const twinkleCount = 30;
      for (let i = 0; i < twinkleCount; i++) {
        const x = (i * 53) % w;
        const y = 10 + (i * 29) % (h * 0.25);
        const a = 0.25 + 0.25 * Math.sin((t * 0.002) + i * 1.7);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      // 4) ridges
      drawRidges(ctx, t * speed, w, h, layers);
    };

    if (prefersReducedMotion()) {
      paintStatic(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let t0 = performance.now();
    const tick = (now) => {
      const dt = (now - t0) / 1000; // eslint-disable-line no-unused-vars
      t0 = now;
      paintStatic(now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [layers, speed]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function drawRidges(ctx, time, w, h, layers) {
  for (let i = 0; i < layers; i++) {
    const d = i / (layers - 1 || 1);
    const baseY = h * (0.50 + d * 0.42);
    const amp = 18 + 28 * (1 - d);
    const freq = 0.006 + d * 0.005;
    const phase = time * (0.8 + d * 0.6);

    const hue = 210 - d * 45; // blue → teal/green
    const alpha = 0.55 - d * 0.35;
    ctx.fillStyle = `hsla(${hue}, 45%, ${28 - d * 8}%, ${alpha})`;

    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 3) {
      const y =
        baseY +
        Math.sin(x * freq + phase) * amp +
        Math.sin(x * (freq * 0.4) - phase * 1.4) * amp * 0.35;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    // soft highlight
    ctx.strokeStyle = `hsla(${hue}, 20%, 85%, ${alpha * 0.25})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 6) {
      const y =
        baseY +
        Math.sin(x * freq + phase) * amp +
        Math.sin(x * (freq * 0.4) - phase * 1.4) * amp * 0.35;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}
