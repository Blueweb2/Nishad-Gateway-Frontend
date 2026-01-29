"use client";

import React, { useMemo, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

/* =====================
   TYPES (FINAL – STRING BASED)
===================== */

export type DocumentEntityTab = {
  label: string;   // LLC, Branch, RHQ
  value: string;   // llc, branch, rhq
};

export type DocumentCard = {
  title: string;
  items: string[];
  icon?: string;
};

export type DocumentGroup = {
  entityValue: string;
  cards: DocumentCard[];
};

type Props = {
  documentsHeading: string;
  documentsSubheading: string;
  documentEntityTabs: DocumentEntityTab[];
  documentGroups: DocumentGroup[];
};

/* =====================
   COMPONENT
===================== */

export default function DocumentsRequiredSection({
  documentsHeading,
  documentsSubheading,
  documentEntityTabs,
  documentGroups,
}: Props) {
  const tabs = useMemo(() => documentEntityTabs || [], [documentEntityTabs]);
  const groups = useMemo(() => documentGroups || [], [documentGroups]);

  const [activeTab, setActiveTab] = useState<string>("");

  // ✅ Select first tab automatically
  useEffect(() => {
    if (!activeTab && tabs.length > 0) {
      setActiveTab(tabs[0].value);
    }
  }, [tabs, activeTab]);

  const activeGroup = useMemo(
    () => groups.find((g) => g.entityValue === activeTab),
    [groups, activeTab]
  );

  const activeCards = activeGroup?.cards || [];

  const activeIndex = Math.max(
    0,
    tabs.findIndex((t) => t.value === activeTab)
  );

  const goPrev = () => {
    if (activeIndex > 0) {
      setActiveTab(tabs[activeIndex - 1].value);
    }
  };

  const goNext = () => {
    if (activeIndex < tabs.length - 1) {
      setActiveTab(tabs[activeIndex + 1].value);
    }
  };

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="border border-gray-200 rounded-[40px] px-6 md:px-12 py-10 md:py-14">
          
          {/* HEADER */}
          <div className="flex justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold text-black max-w-xl">
                {documentsHeading}
              </h2>
              <p className="text-sm text-gray-600 mt-4 max-w-lg">
                {documentsSubheading}
              </p>
            </div>

            {/* ARROWS */}
            <div className="flex gap-2 pt-2">
              <button
                onClick={goPrev}
                disabled={activeIndex === 0}
                className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-40"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                onClick={goNext}
                disabled={activeIndex === tabs.length - 1}
                className="w-9 h-9 rounded-full border flex items-center justify-center disabled:opacity-40"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* LEFT TABS */}
            <div className="lg:col-span-3 space-y-3">
              {tabs.map((tab, idx) => {
                const isActive = tab.value === activeTab;

                return (
                  <button
                    key={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                    className={`w-full flex gap-3 px-3 py-2 rounded-full border ${
                      isActive
                        ? "border-green-600"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border ${
                        isActive
                          ? "bg-green-600 text-white border-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-medium">
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* RIGHT CARDS */}
            <div className="lg:col-span-9">
              {activeCards.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No document cards added for this entity.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeCards.map((card, i) => (
                    <div
                      key={i}
                      className="bg-[#f6f6f6] rounded-[28px] p-8"
                    >
                      <div className="w-10 h-10 mb-5">
                        {card.icon ? (
                          <img src={card.icon} className="w-10 h-10" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl border flex items-center justify-center">
                            ✳
                          </div>
                        )}
                      </div>

                      <h3 className="font-semibold text-black">
                        {card.title}
                      </h3>

                      <ul className="mt-5 space-y-3">
                        {card.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex gap-3 text-sm text-gray-700"
                          >
                            <Check size={16} className="text-green-600" />
                            {item}
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