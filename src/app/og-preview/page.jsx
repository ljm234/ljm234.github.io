export default function OgPreviewPage() {
  return (
    <div className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">OG Preview</h1>

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-neutral-500">Dark</h2>
        <div className="border rounded-lg overflow-hidden">
          <img src="/og" alt="OG dark" className="w-full" />
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-neutral-500">Light</h2>
        <div className="border rounded-lg overflow-hidden">
          <img src="/og/light" alt="OG light" className="w-full" />
        </div>
      </section>

      <p className="text-sm text-neutral-500">
        Si ves ambas imágenes arriba, tus rutas <code>/og</code> y <code>/og/light</code> están OK.
      </p>
    </div>
  );
}
