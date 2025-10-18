"use client";

import { useRef } from "react";

/**
 * Ripple
 */
export default function Ripple({ children, className = "" }) {
  const ref = useRef(null);

  const onClick = (e) => {
    const host = ref.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const span = document.createElement("span");
    span.style.position = "absolute";
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.width = `${size}px`;
    span.style.height = `${size}px`;
    span.style.borderRadius = "9999px";
    span.style.background = "rgba(125,125,125,.18)";
    span.style.transform = "scale(0)";
    span.style.transition = "transform 350ms ease, opacity 500ms ease";
    span.style.pointerEvents = "none";

    host.appendChild(span);
    requestAnimationFrame(() => (span.style.transform = "scale(1)"));
    setTimeout(() => (span.style.opacity = "0"), 160);
    setTimeout(() => host.removeChild(span), 520);
  };

  return (
    <span
      ref={ref}
      onClick={onClick}
      className={`relative inline-block overflow-hidden ${className}`}
    >
      {children}
    </span>
  );
}
