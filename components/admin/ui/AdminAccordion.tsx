"use client";

import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  rightSlot?: ReactNode;
  children: ReactNode;
};

export default function AdminAccordion({
  title,
  subtitle,
  isOpen,
  onToggle,
  rightSlot,
  children,
}: Props) {
  return (
    <div className="border border-gray-800 rounded-2xl overflow-hidden bg-black/30">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 hover:bg-white/5 transition"
      >
        <div className="text-left">
          <h3 className="text-white font-semibold text-sm md:text-base">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-1 leading-snug">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {rightSlot}
          <ChevronDown
            className={`w-5 h-5 text-gray-300 transition ${isOpen ? "rotate-180" : "rotate-0"
              }`}
          />
        </div>
      </button>

      {/* Body */}
      {isOpen && (
        <div
          className="px-5 pb-5 pt-2"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      )}
    </div>
  );
}
