"use client";

import { useEffect, useRef, useState } from "react";
export default function Reveal({
  effect = "fade-up",
  delay = 0,
  as: Tag = "div",
  className = "",
  children,
}) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setOn(true), delay);
            io.unobserve(el);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <>
      <Tag
        ref={ref}
        className={[
          "rv",
          `rv-${effect}`,
          on ? "rv-on" : "",
          className,
        ].join(" ")}
      >
        {children}
      </Tag>

      {/* Scoped global styles so you don't touch globals.css */}
      <style jsx global>{`
        .rv { opacity: 0; transform: translateY(6px); will-change: transform, opacity; }
        .rv-on { opacity: 1; transform: none; transition: transform 500ms cubic-bezier(.2,.8,.2,1), opacity 500ms ease; }

        .rv-fade   { transform: none; }
        .rv-fade-up    { transform: translateY(10px); }
        .rv-fade-down  { transform: translateY(-10px); }
        .rv-fade-left  { transform: translateX(12px); }
        .rv-fade-right { transform: translateX(-12px); }

        @media (prefers-reduced-motion: reduce) {
          .rv, .rv-on {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}
