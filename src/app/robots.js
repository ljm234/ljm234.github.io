export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://cs-220-portfolio-v3-ljm234.vercel.app/sitemap.xml",
  };
}