import type { Metadata } from "next";
import KsaExpansionCostCalculator from "@/components/user/calculator/KsaExpansionCostCalculator";

export const metadata: Metadata = {
  title: "KSA Business Setup Cost Calculator | Saudi Expansion Estimate | Nishad Gateway",
  description:
    "Estimate your Saudi Arabia business setup cost instantly. Calculate company formation cost, visa expenses, licensing fees, and expansion timeline in Riyadh, Jeddah, Dammam & Khobar.",
  
  keywords: [
    "Saudi business setup cost",
    "KSA company formation cost",
    "Saudi expansion calculator",
    "Riyadh company registration cost",
    "Saudi visa cost",
    "KSA LLC formation"
  ],

  alternates: {
    canonical: "https://nishad-gateway-ksa-web.vercel.app/ksa-expansion-cost-calculator",
  },

  openGraph: {
    title: "KSA Business Setup Cost Calculator | Nishad Gateway",
    description:
      "Instantly estimate your Saudi company formation cost including visa, licensing, and accounting support.",
    url: "https://nishad-gateway-ksa-web.vercel.app/ksa-expansion-cost-calculator",
    siteName: "Nishad Gateway",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://nishad-gateway-ksa-web.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KSA Business Setup Cost Calculator",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KSA Business Setup Cost Calculator",
    description:
      "Estimate your Saudi expansion cost instantly with visa and city options.",
    images: ["https://nishad-gateway-ksa-web.vercel.app/og-image.jpg"],
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-white" data-navbar="light" data-menu="dark-text">
      <KsaExpansionCostCalculator />
    </main>
  );
}