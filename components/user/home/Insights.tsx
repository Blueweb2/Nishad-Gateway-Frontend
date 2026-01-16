"use client";

import Image from "next/image";
import { useState } from "react";

const cards = [
  {
    image: "/buisnessgrowth/buisnessslide3.webp",
    tags: ["Market Entry", "Investor Guide"],
    title:
      "Saudi Arabia Market Entry Guide 2025 – A Smart Roadmap for Foreign Investors",
  },
  {
    image: "/buisnessgrowth/businessslide2.webp",
    tags: ["Government Platforms", "Investor Guide"],
    title:
      "Top Saudi Government Platforms Every Investor Should Know Before Starting a Business",
  },
  {
    image: "/Olaya.webp",
    tags: ["Lifestyle", "Expat Living"],
    title:
      "Investor Life in Saudi Arabia – Culture, Costs & Family-Friendly Insights for Expats",
  },
];

export default function Insights() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white ">
      <div className="w-full ">
        <div className="grid grid-cols-3 ">
          {cards.map((card, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative h-[640px] overflow-hidden cursor-pointer border border-black/20"
              >
                {/* BACKGROUND IMAGE (FINAL STATE) */}
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className={`
          object-cover transition-transform 

          ${isHovered ? "scale-110" : "scale-100"}
        `}

                />
                {/* duration-[4000ms]
ease-[cubic-bezier(0.12,0.9,0.12,1)] */}

                {/* DARK OVERLAY */}
                <div
                  className={`
          absolute inset-0 transition-opacity duration-700
          ${isHovered
                      ? "opacity-100 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      : "opacity-0"}
        `}
                />

                {/* HOVER TAGS */}
                <div
                  className={`
          absolute top-6 left-6 flex gap-3 z-10
          transition-all duration-700
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
                >
                  {card.tags.map((tag) => (
                    <Tag key={tag} label={tag} light />
                  ))}
                </div>

                {/* HOVER TITLE */}
                <div
                  className={`
          absolute bottom-8 left-8 right-8 z-10
          transition-all duration-700
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
                >
                  <h3 className="text-white text-[22px] font-semibold leading-snug">
                    {card.title}
                  </h3>
                </div>

                {/* DEFAULT WHITE LAYER */}
                <div
                  className={`
          absolute inset-0 bg-white flex flex-col z-20
          transition-opacity duration-700
          ${isHovered ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
                >
                  {/* TAGS */}
                  <div className="flex gap-3 p-6">
                    {card.tags.map((tag) => (
                      <Tag key={tag} label={tag} />
                    ))}
                  </div>

                  {/* CAPSULE IMAGE (GROWS INTO FULL IMAGE) */}
                  <div className="flex justify-center mt-10 relative">
                    <div
          className={`
  relative w-[280px] h-[420px] rounded-[160px] overflow-hidden
  transition-all
  duration-[2800ms]
  ease-[cubic-bezier(0.25,0.8,0.25,1)]
  ${isHovered ? "scale-[2.4] opacity-0" : "scale-100 opacity-100"}
`}

                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-auto text-[15px] font-medium leading-relaxed px-8 pb-6">
                    {card.title}
                  </h3>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section >
  );
}

/* ================= TAG ================= */

function Tag({
  label,
  light = false,
}: {
  label: string;
  light?: boolean;
}) {
  return (
    <span
      className={`
        px-4 py-1.5 text-xs font-medium rounded-full border
        ${light
          ? "border-white/40 text-white bg-white/10 backdrop-blur"
          : "border-gray-300 text-gray-700 bg-white"
        }
      `}
    >
      {label}
    </span>
  );
}
