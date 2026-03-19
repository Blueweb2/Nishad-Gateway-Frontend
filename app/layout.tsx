import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import CookieBanner from "@/components/user/shared/CookieBanner";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nishad-gateway-ksa-web.vercel.app"),

  title: "Gateway to Saudi Arabia",
  description:
    "Consulting services for business setup, investment, and expansion in Saudi Arabia.",

  keywords: [
    "Saudi Arabia business setup",
    "KSA investment",
    "Riyadh business consulting",
    "company formation Saudi Arabia",
  ],

  openGraph: {
    title: "Gateway to Saudi Arabia",
    description:
      "Consulting services for business setup and investment in Saudi Arabia.",
    url: "https://nishad-gateway-ksa-web.vercel.app",
    siteName: "Gateway KSA",
    images: [
      {
        url: "/riyadhhero.webp",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Gateway to Saudi Arabia",
    description:
      "Consulting services for business setup and expansion in Saudi Arabia.",
    images: ["/riyadhhero.webp"],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} w-full min-h-screen overflow-x-hidden`}>
        {children}
        <CookieBanner/>

        {/* Toast container */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1f1a",
              color: "#c7f9cc",
              border: "1px solid #37b24d",
              borderRadius: "8px",
            },
          }}
        />
      </body>
    </html>
  );
}