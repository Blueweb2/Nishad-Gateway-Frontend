import type { Metadata } from "next";
import KsaExpansionCostCalculator from "@/components/user/calculator/KsaExpansionCostCalculator";

export const metadata: Metadata = {
  title: "KSA Expansion Cost Calculator | Nishad Gateway",
  description:
    "Calculate your Saudi Arabia business expansion cost instantly. Get an estimated setup cost, visa cost, timeline, and recommended services.",
  openGraph: {
    title: "KSA Expansion Cost Calculator | Nishad Gateway",
    description:
      "Estimate your KSA business setup cost instantly with visa, city, and support options.",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white" data-navbar="white">
      <KsaExpansionCostCalculator />
    </main>
  );
}
