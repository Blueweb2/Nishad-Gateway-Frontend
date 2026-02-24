"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  mainHeading: string;
  description: string;
  cards: {
    mainImage: string;
    subImage: string;
    title: string;
    subText: string;
  }[];
};

export default function InvestmentHighlightsSection({
  mainHeading,
  description,
  cards,
}: Props) {
  const slides = useMemo(() => cards || [], [cards]);

  const [active, setActive] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const total = slides.length;

  const goPrev = () => {
    if (total <= 1) return;
    setExpandedIndex(null);
    setActive((p) => (p - 1 + total) % total);
  };

  const goNext = () => {
    if (total <= 1) return;
    setExpandedIndex(null);
    setActive((p) => (p + 1) % total);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const prevIndex = total ? (active - 1 + total) % total : 0;

  const leftSlide = total ? slides[prevIndex] : null;
  const centerSlide = total ? slides[active] : null;

  const formatIndex = (i: number) => String(i).padStart(2, "0");

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (total <= 1) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) goPrev();
    else goNext();
  };

  return (
    <section className="w-full bg-white py-20 overflow-hidden">

      {/* ================= TOP SECTION ================= */}
      <div className="w-full max-w-8xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

          <div className="flex items-start gap-8">
            <div className="text-xs text-gray-400 tracking-[0.25em] mt-2 whitespace-nowrap">
              {formatIndex(active + 1)} | {formatIndex(Math.max(total, 1))}
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold leading-[1.2] text-gray-900 max-w-lg">
              {mainHeading}
            </h2>
          </div>

          <div
            className="max-w-lg pr-6 text-lg text-gray-500 leading-tight"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>
      </div>

      {/* ================= DESKTOP SLIDER ================= */}
      <div
        className="mt-14 relative w-full hidden md:block cursor-pointer"
        onClick={handleClick}
      >
        {total > 1 && (
          <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
            <div className="w-[74px] h-[96px] rounded-[160px] border border-black/20 bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2">
                <ArrowLeft size={16} />
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        )}

        <div className="relative w-full h-[520px] flex">

          {/* LEFT SLIDE */}
          {leftSlide && (
            <div className="relative h-full w-1/2">
              <ImageLayer slide={leftSlide} align="left" />

              <SlideCard
                slide={leftSlide}
                index={prevIndex}
                expandedIndex={expandedIndex}
                toggleExpand={toggleExpand}
                formatIndex={formatIndex}
                align="left"
              />
            </div>
          )}

          {/* RIGHT / ACTIVE SLIDE */}
          {centerSlide && (
            <div className="relative h-full w-1/2">
              <ImageLayer slide={centerSlide} priority align="right" />

              <SlideCard
                slide={centerSlide}
                index={active}
                expandedIndex={expandedIndex}
                toggleExpand={toggleExpand}
                formatIndex={formatIndex}
                align="right"
              />
            </div>
          )}

        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden px-6 mt-10">
        {centerSlide && (
          <div className="space-y-6">
            <div className="relative h-[320px] rounded-[30px] overflow-hidden">
              <Image
                src={cloudinaryAutoWebp(centerSlide.mainImage)}
                alt={centerSlide.title}
                fill
                className="object-cover"
              />
            </div>

            <SlideCard
              slide={centerSlide}
              index={active}
              expandedIndex={expandedIndex}
              toggleExpand={toggleExpand}
              formatIndex={formatIndex}
              align="center"
            />
          </div>
        )}
      </div>

    </section>
  );
}

/* ================= IMAGE LAYER ================= */

function ImageLayer({
  slide,
  priority = false,
  align = "right",
}: {
  slide: any;
  priority?: boolean;
  align?: "left" | "right";
}) {
  return (
    <>
      <div
        className={`absolute top-0 h-full w-[62%] overflow-hidden rounded-[44px]
        ${align === "right" ? "right-[6%]" : "left-[6%]"}`}
      >
        <Image
          src={cloudinaryAutoWebp(slide.mainImage)}
          alt={slide.title}
          fill
          priority={priority}
          className="object-cover"
        />
      </div>

      <div
        className={`absolute top-[110px] h-[240px] w-[44%] overflow-hidden rounded-[34px]
        ${align === "right" ? "right-[58%]" : "left-[58%]"}`}
      >
        <Image
          src={cloudinaryAutoWebp(slide.subImage)}
          alt={slide.title}
          fill
          className="object-cover"
        />
      </div>
    </>
  );
}

/* ================= SLIDE CARD ================= */

function SlideCard({
  slide,
  index,
  expandedIndex,
  toggleExpand,
  formatIndex,
  align,
}: any) {
  const isExpanded = expandedIndex === index;

  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 z-20 w-[360px]
      ${align === "left" ? "left-[28%]" : "right-[28%]"}`}
    >
      <div
        className="bg-white rounded-[28px] px-8 py-8 
        shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-4">
              {formatIndex(index + 1)}
            </p>
            <h3 className="text-lg font-medium text-gray-900 leading-snug">
              {slide.title}
            </h3>
          </div>

          <button
            onClick={() => toggleExpand(index)}
            className="w-10 h-10 rounded-full border border-green-500 flex items-center justify-center transition-all duration-300"
          >
            <Plus
              size={18}
              className={`text-green-600 transition-transform duration-300 ${
                isExpanded ? "rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {isExpanded && slide.subText && (
          <div
            className="mt-6 text-sm text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: slide.subText }}
          />
        )}
      </div>
    </div>
  );
}
