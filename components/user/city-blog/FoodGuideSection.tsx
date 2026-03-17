"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { FoodGuideSectionContent } from "@/lib/types/city-blog";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  content: FoodGuideSectionContent;
};

export default function FoodGuideSection({ content }: Props) {
  const [activeFilterIndex, setActiveFilterIndex] = useState(0);

  const activeFilter = content.filters?.[activeFilterIndex];

  const getInitial = (title: string) => {
    if (!title) return "#";
    const firstChar = title.trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(firstChar) ? firstChar : "#";
  };

  return (
    <section className="py-28 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADING ================= */}
        <h2 className="text-4xl font-semibold text-center mb-12">
          {content.heading}
        </h2>

        {/* ================= FILTERS ================= */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <span className="text-white/50 text-sm self-center mr-2">
            Features:
          </span>

          {content.filters?.map((filter, index) => {
            const isActive = index === activeFilterIndex;

            return (
              <button
                key={index}
                onClick={() => setActiveFilterIndex(index)}
                className={`relative px-5 py-2 rounded-full border text-sm transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#096C6C] border-[#096C6C] text-white"
                      : "border-white/20 text-white/70 hover:bg-white/10"
                  }`}
              >
                {filter.label}

                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full
                    ${isActive ? "bg-white/20" : "bg-white/10"}
                  `}
                >
                  {filter.items?.length || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* ================= ITEMS ================= */}
        <div className="space-y-10 transition-all duration-300">
          {activeFilter?.items?.map((item, index) => {
            const hasLink = item.link && item.link.trim() !== "";

            const imageSrc =
              item.imageUrl &&
              typeof item.imageUrl === "string" &&
              item.imageUrl.trim() !== ""
                ? cloudinaryAutoWebp(item.imageUrl)
                : null;

            const Wrapper: any = hasLink ? Link : "div";

            return (
              <Wrapper
                key={index}
                {...(hasLink ? { href: item.link } : {})}
                className="group flex items-center justify-between border-b border-white/10 pb-8 hover:bg-white/5 transition-all duration-300"
              >
                <div className="flex items-center gap-6">

                  {/* LETTER */}
                  <span className="text-white/40 text-sm w-6">
                    {getInitial(item.title)}
                  </span>

                  {/* IMAGE (Safe) */}
                  {imageSrc && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}

                  {/* TEXT */}
                  <div>
                    <h3 className="text-xl font-medium mb-1 group-hover:text-[#096C6C] transition">
                      {item.title}
                    </h3>

                    {/* 🔥 Rich Description */}
                    <div
                      className="text-sm text-white/60 max-w-md rich-text-light prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                    />
                  </div>
                </div>

                {/* ARROW */}
                {hasLink && (
                  <div className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}
