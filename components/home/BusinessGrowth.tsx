"use client";

import Link from "next/link";
import OvalArrow from "@/components/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  { src: "/buisnessgrowth/businessslide1.webp", alt: "Business Growth Strategy" },
  { src: "/buisnessgrowth/businessslide2.webp", alt: "Team Collaboration" },
  { src: "/buisnessgrowth/buisnessslide3.webp", alt: "Market Analysis" },
  { src: "/buisnessgrowth/buisnessslide4.webp", alt: "Business Expansion" },
];

export default function BusinessGrowth() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 this will re-trigger wipe animation every slide change
  const [wipeKey, setWipeKey] = useState(0);

  return (
    <section
      data-navbar="white"
      className="relative w-full bg-white text-black py-6 overflow-hidden"
    >
      {/* FULL WIDTH CONTROLS */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-20">
        <div className="w-full h-full flex items-center justify-between px-10">
          {/* LEFT COUNTER */}
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* RIGHT ARROWS */}
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="flex gap-6">
              <OvalArrow
                direction="left"
                variant="gray"
                onClick={() => swiperRef.current?.slidePrev()}
              />
              <OvalArrow
                direction="right"
                variant="gray"
                onClick={() => swiperRef.current?.slideNext()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-[1320px] mx-auto px-6 z-10">
        <div className="grid grid-cols-3 gap-12 min-h-[560px]">
          {/* LEFT */}
          <div className="flex flex-col">
            <h2 className="text-[36px] font-bold leading-[1.25] mb-10">
              How Business <br />
              Works in <br />
              Saudi Arabia
            </h2>

            <p className="text-[15px] font-medium text-[#287F7F] mb-3">
              Company Setup Options
            </p>

            <div className="w-full h-px bg-gray-200" />
          </div>

          {/* CENTER SLIDER */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Swiper
                modules={[EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={900}
                loop
                slidesPerView={1}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                  setWipeKey((k) => k + 1); // 🔥 trigger wipe each time
                }}
                className="w-[390px] h-[510px]"
              >
                {slides.map((slide, index) => (
                 <SwiperSlide key={index}>
  <div className="relative w-[390px] h-[510px] overflow-hidden rounded-[160px]">
    <ParallaxImage
      src={slide.src}
      alt={slide.alt}
      className="w-full h-full"
      priority={index === 0}
      speed={120}
    />

    <div
      key={wipeKey}
      className="absolute inset-0 z-20 bg-white origin-left animate-wipeReveal pointer-events-none"
    />
  </div>
</SwiperSlide>

                ))}
              </Swiper>

              <p className="mt-6 text-sm text-green-600 underline underline-offset-4">
                Understand Business Setup
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-end">
            <p className="text-gray-500 leading-relaxed max-w-sm text-left mb-10 mt-20">
              Understand the main business structures available to{" "}
              <Link
                href="/foreign-investors"
                className="text-green-600 hover:text-green-700 underline underline-offset-2 transition-colors"
              >
                foreign investors
              </Link>
              , from wholly owned entities to partnerships and regional headquarters.
            </p>

            <div className="w-full h-px bg-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
