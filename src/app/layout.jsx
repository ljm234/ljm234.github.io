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
  alternates: { canonical: "/" },
  robots: "index,follow",
};
