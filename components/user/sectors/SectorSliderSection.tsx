"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectorSliderCard from "./SectorSliderCard";

interface CardItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface Props {
  sectionNumber: number;
  totalSections: number;
  title: string;
  subtitle: string;
  cards: CardItem[];
}

export default function SectorSliderSection({
  sectionNumber,
  totalSections,
  title,
  subtitle,
  cards,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 600;
    containerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#8e8b88] py-20 text-white overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-start">

        <div>
          <p className="text-sm opacity-70 mb-4">
            {String(sectionNumber).padStart(2, "0")} |{" "}
            {String(totalSections).padStart(2, "0")}
          </p>

          <h2 className="text-4xl font-semibold max-w-xl">
            {title}
          </h2>
        </div>

        <div className="max-w-md">
          <p className="text-sm opacity-80 leading-6">
            {subtitle}
          </p>

          <div className="flex gap-4 mt-6 justify-end">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div
        ref={containerRef}
        className="flex gap-8 mt-16 overflow-x-auto scrollbar-hide px-6"
      >
        {cards.map((card, index) => (
          <SectorSliderCard
            key={card.id}
            index={index}
            {...card}
          />
        ))}
      </div>

    </section>
  );
}