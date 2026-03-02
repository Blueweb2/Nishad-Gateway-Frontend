"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export type City = {
  _id: string;
  cityName: string;
  citySlug: string;
  cityImage?: string;
  description?: string;
  tag?: "ARTICLE" | "FEATURED" | "TRENDING";
};

type Props = {
  locationsHeading?: string;
  locationsSubheading?: string;
  cities: City[];
};

export default function LocationsSliderSection({
  locationsHeading,
  locationsSubheading,
  cities,
}: Props) {
  const slides = useMemo(() => cities || [], [cities]);

  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCount = 3;
  const cardWidth = 420; // exact card width including gap
  const maxIndex = Math.max(0, slides.length - visibleCount);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const translateX = activeIndex * cardWidth;

  return (
    <section className="w-full bg-[#0b6b67] text-white py-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <h2 className="text-3xl md:text-4xl font-semibold max-w-xl leading-tight">
            {locationsHeading ||
              "Start Your Business Anywhere in Saudi Arabia"}
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
                className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-40"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={activeIndex === maxIndex}
                className="w-11 h-11 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition disabled:opacity-40"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="mt-12 relative">
          <div
            className="flex gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {slides.map((city) => (
              <div
                key={city._id}
                className="min-w-[400px] max-w-[400px] bg-white rounded-3xl overflow-hidden shadow-lg flex"
              >
                {/* Left Image */}
                <div className="relative w-[140px] h-[200px] shrink-0 m-4 rounded-2xl overflow-hidden">
                  <Image
                    src={city.cityImage || "/images/placeholder.jpg"}
                    alt={city.cityName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right Content */}
                <div className="flex-1 px-4 py-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-black">
                      {city.cityName}
                    </h3>

                    <p className="mt-2 text-sm text-gray-600 leading-snug">
                      {city.description ||
                        "Headquarters, government access, and corporate ecosystem."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between">

                    <Link
                      href={`/cities/${city.citySlug}`}
                      className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700 transition"
                    >
                      <ArrowRight className="w-4 h-4 text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile hint */}
          <div className="mt-4 text-xs text-white/70 md:hidden">
            Swipe horizontally to explore →
          </div>
        </div>
      </div>
    </section>
  );
}
