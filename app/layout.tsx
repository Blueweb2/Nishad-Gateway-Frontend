import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Nunito_Sans } from "next/font/google";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} w-full min-h-screen overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
