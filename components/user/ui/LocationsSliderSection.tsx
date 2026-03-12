"use client";

import { useMemo, useState, useRef, useEffect } from "react";
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
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const sliderRef = useRef(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const maxIndex = Math.max(0, slides.length - visibleCount);

  useEffect(() => {
    const updateWidth = () => {
      if (cardRef.current) {
        const gap = window.innerWidth < 640 ? 16 : window.innerWidth < 1024 ? 24 : 32;
        setCardWidth(cardRef.current.offsetWidth + gap);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setVisibleCount(1); // mobile
      } else if (width < 1024) {
        setVisibleCount(2); // tablet
      } else {
        setVisibleCount(3); // desktop
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);

    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const translateX = activeIndex * cardWidth;

  return (
    <section className="w-full bg-[#0b6b67] text-white py-16 overflow-hidden" data-navbar="light">
      <div className="w-full max-w-8xl mx-auto px-6 md:px-10">
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
        <div className="mt-12 relative overflow-hidden max-w-7xl mx-auto">
          <div
            ref={sliderRef}
            className="flex gap-4 md:gap-6 lg:gap-8 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${translateX}px)`,
            }}
          >
            {slides.map((city,index) => (
              <div
                key={city._id}
                ref={index === 0 ? cardRef : null}
                className="
                  min-w-[85%] 
                  sm:min-w-[340px]
                  md:min-w-[360px]
                  lg:min-w-[400px] lg:max-w-[400px]
                bg-white rounded-3xl overflow-hidden shadow-lg flex
                "
              >
                <div className=" relative w-[110px] sm:w-[120px] md:w-[140px] h-[180px] md:h-[200px] shrink-0 m-3 md:m-4 rounded-2xl overflow-hidden">
                  <Image
                    src={city.cityImage || "/images/placeholder.jpg"}
                    alt={city.cityName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Right Content */}
                <div className=" flex-1 px-3 md:px-4 py-4 md:py-6 flex flex-col justify-between">
                  <div>
                    <h3 className=" text-lg md:text-xl font-semibold text-black">
                      {city.cityName}
                    </h3>
                    <p className=" mt-2 text-xs md:text-sm text-gray-600 leading-snug">
                      {city.description ||
                        "Headquarters, government access, and corporate ecosystem."}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-end">

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
