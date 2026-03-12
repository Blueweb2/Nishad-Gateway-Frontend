import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

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
        {children}

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