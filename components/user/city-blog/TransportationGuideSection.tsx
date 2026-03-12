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
    <section
      className="relative w-full h-[70vh] md:h-[85vh] lg:h-[100vh] text-white overflow-hidden"
      data-navbar="light"
    >

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
      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-[6vw] py-10 md:py-[6vh]">

        {/* TOP AREA */}
        <div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3.2vw] font-medium tracking-wide mb-6 md:mb-[4vh]">
            {content.heading}
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-[3vw] text-sm md:text-[0.95vw] font-light tracking-wide">

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
        <div className="mb-10 md:mb-[8vh]">

          <div className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-[2vw]">

            {/* Slide Title */}
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5vw] font-extralight leading-tight max-w-full sm:max-w-[60vw] lg:max-w-[50vw]">
              {activeSlide.title}
            </h3>

            {/* Arrow */}
            <Link
              href={activeSlide.link}
              className="
              w-12 h-12
              sm:w-14 sm:h-14
              lg:w-[4vw] lg:h-[6vw]
              min-w-[48px] min-h-[48px]
              rounded-full border border-white/40
              flex items-center justify-center
              transition-all duration-300
              hover:bg-white/20
              "
            >
              <ArrowRight className="w-5 h-5 lg:w-[1.5vw] lg:h-[1.5vw]" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
};