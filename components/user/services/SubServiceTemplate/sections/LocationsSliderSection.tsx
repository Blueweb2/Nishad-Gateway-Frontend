"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export type LocationSlide = {
  title: string;
  description: string;
  image: string;
  tag?: string; // ex: ARTICLE
  link?: string; // ex: /blog/riyadh
};

type Props = {
  locationsHeading: string;
  locationsSubheading: string;
  locationsSlides: LocationSlide[];
};

export default function LocationsSliderSection({
  locationsHeading,
  locationsSubheading,
  locationsSlides,
}: Props) {
  const slides = useMemo(() => locationsSlides || [], [locationsSlides]);

  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCount = 3; // desktop cards
  const maxIndex = Math.max(0, slides.length - visibleCount);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const translateX = activeIndex * 380; // card width + gap (adjusted)

  return (
    <section className="w-full bg-[#0b6b67] text-white py-14 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Top Heading Row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <h2 className="text-3xl md:text-4xl font-semibold leading-tight max-w-xl">
            {locationsHeading || "Start Your Business Anywhere in Saudi Arabia"}
          </h2>

          <div className="flex items-start justify-between md:justify-end gap-6 w-full md:w-auto">
            <p className="text-sm md:text-base text-white/85 max-w-md leading-relaxed">
              {locationsSubheading ||
                "Entity selection and licensing can be completed regardless of your chosen city or economic zone."}
            </p>

            {/* Arrows */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={activeIndex === maxIndex}
                className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-40"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-10 relative">
          {/* Track */}
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {slides.length === 0 ? (
              <div className="text-white/70 text-sm">
                No locations slides added yet.
              </div>
            ) : (
              slides.map((slide, idx) => (
                <div
                  key={idx}
                  className="min-w-[360px] max-w-[360px] bg-white rounded-2xl overflow-hidden shadow-lg flex"
                >
                  {/* Left Image */}
                  <div className="relative w-[120px] h-[150px] shrink-0">
                    <Image
                      src={slide.image || "/images/placeholder.jpg"}
                      alt={slide.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-black">
                        {slide.title}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600 leading-snug line-clamp-2">
                        {slide.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[11px] font-medium tracking-wide text-gray-500 uppercase">
                        {slide.tag || "ARTICLE"}
                      </span>

                      {slide.link ? (
                        <Link
                          href={slide.link}
                          className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition"
                        >
                          <ArrowRight className="w-4 h-4 text-white" />
                        </Link>
                      ) : (
                        <button className="w-9 h-9 rounded-full bg-green-600 flex items-center justify-center opacity-70 cursor-not-allowed">
                          <ArrowRight className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Mobile scroll hint (optional) */}
          <div className="mt-4 text-xs text-white/70 md:hidden">
            Swipe horizontally to explore →
          </div>
        </div>
      </div>
    </section>
  );
}
