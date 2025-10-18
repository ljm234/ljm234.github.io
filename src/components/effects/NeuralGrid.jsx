// /src/components/effects/NeuralGrid.jsx
"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight animated neural/tech grid.
 * - Canvas-based, DPI-aware
 * - Subtle nodes + connections with a slow drift
 * - Respects prefers-reduced-motion (renders static)
 */
export default function NeuralGrid({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    // Resize for DPR
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

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Drawing constants
    const SP = 52; // grid spacing
    const NODE_R = 1.4;
    const NODE_ALPHA = 0.28;
    const EDGE_ALPHA = 0.12;

    const drawFrame = (tms = 0) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Soft radial glow behind hero (center-left)
      const gx = w * 0.35;
      const gy = h * 0.28;
      const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.6);
      grad.addColorStop(0, "rgba(255,245,180,0.22)");
      grad.addColorStop(1, "rgba(255,245,180,0.0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Grid bounds
      const cols = Math.ceil(w / SP) + 2;
      const rows = Math.ceil(h / SP) + 2;

      // Time (slow)
      const t = reduce ? 0 : tms * 0.0012;

      // Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(99,102,241,${EDGE_ALPHA})`; // indigo-500

      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          // Node base position
          let x = ix * SP - SP;
          let y = iy * SP - SP;

          // Subtle drift/jitter
          const j = Math.sin((ix * 0.9 + iy * 1.1) + t) * 2.0;
          const k = Math.cos((ix * 0.7 - iy * 1.3) - t * 0.8) * 2.0;
          x += j;
          y += k;

          // Edges: right & down
          if (ix < cols - 1) {
            const nx = (ix + 1) * SP - SP + Math.sin(((ix + 1) * 0.9 + iy * 1.1) + t) * 2.0;
            const ny = iy * SP - SP + Math.cos(((ix + 1) * 0.7 - iy * 1.3) - t * 0.8) * 2.0;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
            ctx.stroke();
          }
          if (iy < rows - 1) {
            const nx = ix * SP - SP + Math.sin((ix * 0.9 + (iy + 1) * 1.1) + t) * 2.0;
            const ny = (iy + 1) * SP - SP + Math.cos((ix * 0.7 - (iy + 1) * 1.3) - t * 0.8) * 2.0;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, ny);
            ctx.stroke();
          }
        }
      }

      // Nodes
      ctx.fillStyle = `rgba(20,184,166,${NODE_ALPHA})`; // teal-500
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          let x = ix * SP - SP + Math.sin((ix * 0.9 + iy * 1.1) + t) * 2.0;
          let y = iy * SP - SP + Math.cos((ix * 0.7 - iy * 1.3) - t * 0.8) * 2.0;
          ctx.beginPath();
          ctx.arc(x, y, NODE_R, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    if (reduce) {
      // One static frame
      drawFrame(0);
      return () => ro.disconnect();
    }

    // Animate
    let raf = 0;
    const loop = (now) => {
      drawFrame(now);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
