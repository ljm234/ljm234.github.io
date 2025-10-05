import Script from "next/script";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Jordan Montenegro — Clinical ML & Decision Support",
  description: "Portfolio with research, demos, and engineering artifacts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Prevents light→dark flash on first paint */}
        <Script id="theme-init" strategy="beforeInteractive">{`
          try {
            var t = localStorage.getItem('theme');
            var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', t ? t==='dark' : d);
          } catch(e) {}
        `}</Script>
      </head>
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
          bg-yellow-300 text-black px-3 py-1 rounded">Skip to content</a>

        <header className="border-b border-neutral-200/60 dark:border-neutral-800 sticky top-0 z-40 bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold tracking-tight">Jordan Montenegro</a>
            <nav className="flex items-center gap-4">
              <a href="/about" className="hover:underline">About</a>
              <a href="/research" className="hover:underline">Research</a>
              <a href="/playground" className="hover:underline">Playground</a>
              <a href="/contact" className="hover:underline">Contact</a>
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main id="main" className="mx-auto max-w-7xl px-4 py-10">{children}</main>

        <footer className="mt-16 border-t border-neutral-200/60 dark:border-neutral-800">
          <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-neutral-500">
            © {new Date().getFullYear()} Jordan Montenegro — Clinical ML & Decision Support
          </div>
        </footer>
      </body>
    </html>
  );
}
