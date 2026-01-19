"use client";

import { useEffect, useState } from "react";
import { X, ChevronDown } from "lucide-react";

export default function ContactPopup({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [render, setRender] = useState(open);

  useEffect(() => {
    if (open) setRender(true);
    else {
      const t = setTimeout(() => setRender(false), 500);
      return () => clearTimeout(t);
    }
  }, [open]);

  // ESC close
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!render) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0 }}
      />

      {/* POPUP */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          fixed top-28 right-10 z-[9999]
          w-[360px] md:w-[420px]
          ${open ? "animate-sheetReveal" : "animate-sheetHide"}
        `}
      >
        <div className="bg-white rounded-[28px] shadow-2xl border border-black/10 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-7 pt-6 pb-4">
            <h2 className="text-[22px] font-semibold text-gray-900">
              Get in Touch
            </h2>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="px-7 pb-7">
            {/* Name */}
            <label className="block text-xs text-gray-700 mb-2">
              <span className="text-red-500">*</span> Name
            </label>
            <input
              type="text"
              placeholder=""
              className="w-full border-b border-gray-200 focus:border-gray-500 outline-none py-2 mb-5 text-sm"
            />

            {/* Phone */}
            <label className="block text-xs text-gray-700 mb-2">
              <span className="text-red-500">*</span> Phone
            </label>
            <input
              type="text"
              className="w-full border-b border-gray-200 focus:border-gray-500 outline-none py-2 mb-5 text-sm"
            />

            {/* Email */}
            <label className="block text-xs text-gray-700 mb-2">
              <span className="text-red-500">*</span> Email
            </label>
            <input
              type="email"
              className="w-full border-b border-gray-200 focus:border-gray-500 outline-none py-2 mb-5 text-sm"
            />

            {/* Select a Service */}
            <label className="block text-xs text-gray-700 mb-2">
              Select a Service
            </label>
            <div className="relative mb-5">
              <select className="w-full appearance-none border-b border-gray-200 focus:border-gray-500 outline-none py-2 text-sm bg-transparent">
                <option value="">Select a Service</option>
                <option>Business Setup</option>
                <option>Visa Support</option>
                <option>Corporate Advisory</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-0 top-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Country of Interest */}
            <label className="block text-xs text-gray-700 mb-2">
              Country of Interest
            </label>
            <div className="relative mb-6">
              <select className="w-full appearance-none border-b border-gray-200 focus:border-gray-500 outline-none py-2 text-sm bg-transparent">
                <option value="">Country of Interest</option>
                <option>Saudi Arabia</option>
                <option>UAE</option>
                <option>Qatar</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-0 top-3 text-gray-500 pointer-events-none" />
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 mb-8">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <p className="text-xs text-gray-600">
                I agree with the{" "}
                <span className="text-gray-900 underline cursor-pointer">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button className="px-8 py-3 rounded-full bg-green-700 text-white text-sm font-medium hover:bg-green-600 transition">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
