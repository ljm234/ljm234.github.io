"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ViewTransitions() {
  const router = useRouter();

  useEffect(() => {
    const doc = typeof document !== "undefined" ? document : null;
    if (!doc) return;
    const supports = "startViewTransition" in doc;

    const onClick = (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const url = new URL(a.href, location.origin);
      const isInternal = url.origin === location.origin;
      const newTab =
        a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      if (!isInternal || newTab) return;

      e.preventDefault();
      const go = () => router.push(url.pathname + url.search + url.hash);
      if (supports) {
        // @ts-ignore
        document.startViewTransition(() => go());
      } else {
        go();
      }
    };

    doc.addEventListener("click", onClick);
    return () => doc.removeEventListener("click", onClick);
  }, [router]);

  return null;
}
