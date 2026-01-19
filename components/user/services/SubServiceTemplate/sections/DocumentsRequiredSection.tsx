"use client";

import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export type DocumentTab = {
  label: string; // ex: LLC
  value: string; // ex: llc
};

export type DocumentCard = {
  title: string;
  items: string[];
  icon?: string; // optional icon url
};

export type DocumentGroup = {
  entityValue: string; // matches tab.value
  cards: DocumentCard[];
};

type Props = {
  documentsHeading: string;
  documentsSubheading: string;

  documentEntityTabs: DocumentTab[];
  documentGroups: DocumentGroup[];
};

export default function DocumentsRequiredSection({
  documentsHeading,
  documentsSubheading,
  documentEntityTabs,
  documentGroups,
}: Props) {
  const tabs = useMemo(() => documentEntityTabs || [], [documentEntityTabs]);
  const groups = useMemo(() => documentGroups || [], [documentGroups]);

  // default selected tab = first tab
  const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.value || "");

  const activeGroup = useMemo(() => {
    return groups.find((g) => g.entityValue === activeTab);
  }, [groups, activeTab]);

  const activeCards = activeGroup?.cards || [];

  // helpers for arrow nav (top right)
  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.value === activeTab)
  );

  const goPrev = () => {
    if (!tabs.length) return;
    const prev = activeIndex - 1;
    if (prev >= 0) setActiveTab(tabs[prev].value);
  };

  const goNext = () => {
    if (!tabs.length) return;
    const next = activeIndex + 1;
    if (next < tabs.length) setActiveTab(tabs[next].value);
  };

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* OUTER BOX */}
        <div
          className="
            border border-gray-200
            rounded-[40px]
            px-6 md:px-12
            py-10 md:py-14
          "
        >
          {/* TOP HEADER */}
          <div className="flex items-start justify-between gap-6">
            <div className="w-full">
              <h2 className="text-3xl md:text-4xl font-semibold text-black leading-tight max-w-xl">
                {documentsHeading || "Documents Required to Set Up Your Company"}
              </h2>

              <p className="text-sm text-gray-600 mt-4 max-w-lg">
                {documentsSubheading ||
                  "Requirements vary by entity type and activity. Below is a practical overview for foreign investors."}
              </p>
            </div>

            {/* ARROWS (top right) */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={goPrev}
                className="
                  w-9 h-9 rounded-full
                  border border-gray-300
                  flex items-center justify-center
                  hover:bg-gray-50 transition
                  disabled:opacity-40
                "
                disabled={activeIndex === 0}
              >
                <ArrowLeft size={16} />
              </button>

              <button
                onClick={goNext}
                className="
                  w-9 h-9 rounded-full
                  border border-gray-300
                  flex items-center justify-center
                  hover:bg-gray-50 transition
                  disabled:opacity-40
                "
                disabled={activeIndex === tabs.length - 1}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* BODY GRID */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT TABS */}
            <div className="lg:col-span-3">
              <div className="space-y-3">
                {tabs.map((tab, idx) => {
                  const isActive = tab.value === activeTab;

                  return (
                    <button
                      key={tab.value}
                      onClick={() => setActiveTab(tab.value)}
                      className={`
                        w-full
                        flex items-center gap-3
                        px-3 py-2
                        rounded-full
                        border
                        transition
                        ${
                          isActive
                            ? "border-green-600 bg-white"
                            : "border-gray-200 bg-white hover:bg-gray-50"
                        }
                      `}
                    >
                      {/* index circle */}
                      <span
                        className={`
                          w-8 h-8 rounded-full
                          flex items-center justify-center
                          text-xs font-semibold
                          border
                          ${
                            isActive
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white text-gray-500 border-gray-300"
                          }
                        `}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      <span
                        className={`text-sm font-medium ${
                          isActive ? "text-black" : "text-gray-600"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT CARDS */}
            <div className="lg:col-span-9">
              {activeCards.length === 0 ? (
                <div className="text-gray-400 text-sm">
                  No document cards added for this entity type.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeCards.slice(0, 3).map((card, i) => (
                    <div
                      key={i}
                      className="
                        bg-[#f6f6f6]
                        rounded-[28px]
                        p-8
                        min-h-[240px]
                      "
                    >
                      {/* ICON */}
                      <div className="w-10 h-10 mb-5">
                        {card.icon ? (
                          <img
                            src={card.icon}
                            alt={card.title}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <div
                            className="
                              w-10 h-10 rounded-xl
                              bg-white
                              border border-gray-200
                              flex items-center justify-center
                            "
                          >
                            <span className="text-green-600 font-bold">✳</span>
                          </div>
                        )}
                      </div>

                      {/* TITLE */}
                      <h3 className="text-base font-semibold text-black">
                        {card.title}
                      </h3>

                      {/* LIST */}
                      <ul className="mt-5 space-y-3">
                        {(card.items || []).map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-700"
                          >
                            <Check size={16} className="text-green-600 mt-[2px]" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
