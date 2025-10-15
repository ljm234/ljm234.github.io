import "./globals.css";
import SiteHeader from "@/components/layout/SiteHeader";

export const metadata = {
  metadataBase: new URL("https://cs-220-portfolio-v3-ljm234.vercel.app"),
  title: {
    default: "Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher",
    template: "%s — Jordan Montenegro",
  },
  description: "Portfolio with research, demos, and AI/ML artifacts.",
  openGraph: {
    title: "Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher",
    description: "ML/AI prototypes with calibration, decision-curve analysis, and safe demos.",
    url: "/",
    siteName: "Jordan Montenegro",
    type: "website",
    images: ["/og"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher",
    description: "ML/AI prototypes with calibration, decision-curve analysis, and safe demos.",
    images: ["/og"],
  },
  robots: "index,follow",
  alternates: { canonical: "/" },
};

// Move themeColor to viewport to silence Next.js warnings
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-yellow-300 text-black px-3 py-1 rounded"
        >
          Skip to content
        </a>

        {/* Sticky header with high z-index so it sits above content */}
        <SiteHeader />

        <main id="main" className="mx-auto max-w-7xl px-4 py-10">
          {children}
        </main>

        <footer className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800">
          <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500">
            © {new Date().getFullYear()} Jordan Montenegro — AI/ML Research Engineer & Clinical ML Researcher
          </div>
        </footer>
      </body>
    </html>
  );
}
