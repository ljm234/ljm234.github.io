// src/app/page.jsx
export const metadata = {
  title: "Jordan Montenegro — Clinical ML & Product Engineering",
  description:
    "Clinical ML research and AI/ML product engineering. Calibrated risk, decision curves, clean UX, and tools teams actually use.",
};

import HomeClient from "@/components/home/HomeClient";

export default function HomePage() {
  return <HomeClient />;
}
