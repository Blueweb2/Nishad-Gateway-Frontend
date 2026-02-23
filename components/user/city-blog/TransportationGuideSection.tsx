"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { TransportationGuideSectionContent } from "@/lib/types/city-blog";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  content: TransportationGuideSectionContent;
};

export default function TransportationGuideSection({ content }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = content.slides[activeIndex];

  return (
    <section className="relative w-full h-[100vh] text-white overflow-hidden">

      {/* Background */}
      <Image
        src={cloudinaryAutoWebp(activeSlide.backgroundImage)}
        alt={activeSlide.title}
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-[6vw] py-[6vh]">

        {/* TOP AREA */}
        <div>

          {/* Main Heading */}
          <h2 className="text-[3.2vw] font-medium tracking-wide mb-[4vh]">
            {content.heading}
          </h2>

          {/* Tabs */}
          <div className="flex gap-[3vw] text-[0.95vw] font-light tracking-wide">
            {content.slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-300 ${
                  index === activeIndex
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {slide.label}
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM AREA */}
        <div className="mb-[8vh]">

          <div className="flex items-end gap-[2vw]">

            {/* Slide Title */}
            <h3 className="text-[4.5vw] font-extralight leading-tight max-w-[50vw]">
              {activeSlide.title}
            </h3>

            {/* Arrow Button */}
            <Link
              href={activeSlide.link}
              className="w-[4vw] h-[6vw] min-w-[60px] min-h-[60px]
              rounded-full border border-white/40
              flex items-center justify-center
              transition-all duration-300
              hover:bg-white/20"
            >
              <ArrowRight className="w-[1.5vw] h-[1.5vw] min-w-[20px] min-h-[20px]" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}
