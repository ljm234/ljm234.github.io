// /src/app/collaborations/page.jsx
import CollabClient from "@/components/collab/CollabClient";

export const metadata = {
  title: "Collaborations — Jordan Montenegro",
  description:
    "Partnering on AI/ML products and Clinical ML research with careful evaluation, clear writing, and fast, useful prototypes.",
};

// Server Component wrapper (keeps metadata valid)
export default function CollaborationsPage() {
  return <CollabClient />;
}
