"use client";

import { useEffect, useRef, useState } from "react";

export default function WhenVisible({
  rootMargin = "0px 0px 200px 0px",
  threshold = 0.01,
  placeholder = null,
  children,
}) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ref.current || show) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          obs.disconnect();
        }
      },
      { root: null, rootMargin, threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [show, rootMargin, threshold]);

  return <div ref={ref}>{show ? children : placeholder}</div>;
}
