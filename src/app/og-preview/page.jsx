import Image from "next/image";

export const metadata = {
  title: "OG Preview — Jordan Montenegro",
  description: "Preview Open Graph images (dark & light).",
};

export default function OgPreview() {
  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">OG Preview</h1>

      <div className="grid gap-6 sm:grid-cols-2">
        <figure className="rounded-xl border bg-white/50 p-3 dark:bg-neutral-900/50">
          <Image
            src="/og"
            alt="Open Graph image (default)"
            width={1200}
            height={630}
            className="h-auto w-full rounded"
            priority
          />
          <figcaption className="mt-2 text-sm text-neutral-500">Default</figcaption>
        </figure>

        <figure className="rounded-xl border bg-white/50 p-3 dark:bg-neutral-900/50">
          <Image
            src="/og/light"
            alt="Open Graph image (light theme)"
            width={1200}
            height={630}
            className="h-auto w-full rounded"
          />
          <figcaption className="mt-2 text-sm text-neutral-500">Light</figcaption>
        </figure>
      </div>
    </div>
  );
}
