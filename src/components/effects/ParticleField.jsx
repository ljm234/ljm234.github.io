// /src/components/effects/ParticleField.jsx
"use client";

import { useEffect, useRef } from "react";

/** Reduced-motion safe check */
function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * ParticleField
 * - Canvas-based, 60fps when possible, capped work per frame.
 * - Particles flow along a curl/noise-like field with a vertical band emphasis.
 * - Automatically resizes to parent.
 */
export default function ParticleField({
  className = "",
  density = 180,         // number of particles
  speed = 0.6,           // base speed
  bandX = 0.35,          // center of the vertical band (0..1 from left)
  bandWidth = 0.22,      // width of the band
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    if (prefersReducedMotion()) {
      // Fallback: paint once with a smooth gradient
      const ctx = canvas.getContext("2d", { alpha: true });
      const resizeOnce = () => {
        const { clientWidth: w, clientHeight: h } = canvas;
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = Math.max(1, Math.floor(w * dpr));
        canvas.height = Math.max(1, Math.floor(h * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "rgba(56,189,248,0.25)");  // sky-400
        g.addColorStop(1, "rgba(16,185,129,0.25)");  // emerald-500
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      };
      resizeOnce();
      const ro = new ResizeObserver(resizeOnce);
      ro.observe(canvas);
      return () => ro.disconnect();
    }

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

    // Particles
    const P = [];
    const spawn = () => {
      const { clientWidth: w, clientHeight: h } = canvas;
      // Spawn more frequently inside the "band"
      const bx = bandX * w, bw = bandWidth * w;
      const x = rnd(bx - bw / 2, bx + bw / 2);
      const y = rnd(0, h);
      const s = rnd(0.6, 1.6);
      const hue = rnd(172, 210); // teal-ish
      return { x, y, vx: 0, vy: 0, s, hue, life: rnd(3, 7) };
    };
    for (let i = 0; i < density; i++) P.push(spawn());

    // Field
    const field = (x, y, t) => {
      const { clientWidth: w, clientHeight: h } = canvas;
      // Normalize coordinates
      const nx = x / w, ny = y / h;
      // Curl-ish field combining sin/cos; emphasize towards the band
      const dx = nx - bandX;
      const bandBoost = Math.exp(-(dx * dx) / (bandWidth * bandWidth));
      const ang = Math.sin((nx + t) * 2.2) * 1.2 + Math.cos((ny - t) * 2.0) * 0.8;
      const mag = 0.8 + 1.4 * bandBoost;
      return { ax: Math.cos(ang) * mag, ay: Math.sin(ang) * mag };
    };

    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min(32, now - last) / 1000;
      last = now;

      const { clientWidth: w, clientHeight: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      // soft background wash
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(56,189,248,0.10)");
      g.addColorStop(1, "rgba(16,185,129,0.10)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const t = now * 0.00025;

      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        const f = field(p.x, p.y, t);
        p.vx += f.ax * dt * speed;
        p.vy += f.ay * dt * speed;

        // mild damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx * 60 * dt;
        p.y += p.vy * 60 * dt;

        // wrap around edges
        if (p.x < -5) p.x = w + 5;
        if (p.x > w + 5) p.x = -5;
        if (p.y < -5) p.y = h + 5;
        if (p.y > h + 5) p.y = -5;

        // draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, 0.5)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [bandWidth, bandX, density, speed]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

function rnd(a, b) {
  return a + Math.random() * (b - a);
}
