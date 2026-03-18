"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-20 left-6 z-[9999]">
      <div className="bg-white shadow-xl border border-gray-200 rounded-2xl px-6 py-5 w-[90vw] max-w-md">

        {/* TEXT */}
        <p className="text-sm text-gray-700 mb-4">
          We use <span className="underline">cookies</span> to improve your
          experience.{" "}
          <Link href="/privacy-policy" className="underline text-green-700">
            Learn more
          </Link>
        </p>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button
            onClick={acceptCookies}
            className="px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-sm"
          >
            OK
          </button>
        </div>

      </div>
    </div>
  );
}