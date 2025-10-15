"use client";

import { useState } from "react";
import Image from "next/image";

export default function PreviewButton({
  label = "Quick Preview",
  abstract,
  items = [], // [{ src, caption }]
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="ml-4 rounded border px-3 py-1.5 text-sm shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-800"
      >
        {label}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="mt-14 w-full max-w-5xl rounded-2xl border bg-white p-6 shadow-xl dark:bg-neutral-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold">Preview</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded border px-3 py-1 text-sm"
              >
                Close
              </button>
            </div>

            {abstract && (
              <p className="mt-3 text-neutral-700 dark:text-neutral-300">
                {abstract}
              </p>
            )}

            {items?.length > 0 && (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((it, i) => (
                  <figure
                    key={i}
                    className="rounded-lg border p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    <Image
                      src={it.src}
                      alt={it.caption || `Preview ${i + 1}`}
                      width={1600}
                      height={1000}
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="h-auto w-full rounded"
                    />
                    {it.caption && (
                      <figcaption className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                        {it.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}