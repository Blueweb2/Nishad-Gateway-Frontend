"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import OvalArrow from "@/components/user/ui/OvalArrow";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";

export type WhySlide = {
  title: string;
  description: string;
  image: string;
};

type Props = {
  whyHeading: string;
  whySlides: WhySlide[];
  whyCtaText: string;
  whyCtaLink: string;
};

export default function WhySliderSection({
  whyHeading,
  whySlides,
  whyCtaText,
  whyCtaLink,
}: Props) {
  const slides = useMemo(() => whySlides || [], [whySlides]);

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔥 wipe animation trigger
  const [wipeKey, setWipeKey] = useState(0);

  const total = slides.length;
  const current = slides?.[activeIndex];

  const formatNumber = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      data-navbar="white"
      className="relative w-full bg-white text-black py-6 overflow-hidden"
    >
      {/* ================= FULL WIDTH CONTROLS (TOP) ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-20">
        <div className="w-full h-full flex items-center justify-between px-10">
          {/* LEFT COUNTER */}
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{formatNumber(total === 0 ? 0 : activeIndex + 1)}</span>
              <span>|</span>
              <span>{formatNumber(total)}</span>
            </div>
          </div>

          {/* RIGHT ARROWS */}
          <div className="pointer-events-auto flex items-center gap-6">
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

      {/* ================= CONTENT ================= */}
      <div className="relative max-w-[1320px] mx-auto px-6 z-10">
        {/* IMPORTANT: Use 12 column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 min-h-[560px]">
          {/* LEFT */}
          <div className="lg:col-span-3 flex flex-col">
            <h2 className="text-[38px] md:text-[44px] font-bold leading-tight">
              {whyHeading || "Why Entity Type Matters"}
            </h2>

            {/* counter + title row  */}
            <div className="mt-24 ">
              <div className="flex items-end gap-10">
               
               

                {/* title */}
                <h3 className="text-xl md:text-2xl font-medium text-teal-700 leading-snug">
                  {current?.title || "Ownership Rights"}
                </h3>
              </div>

              {/* divider */}
              <div className="mt-16 border-t border-gray-200" />
            </div>
          </div>

          {/* CENTER SLIDER */}
          <div className="lg:col-span-5 flex items-center justify-center">
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
                  setWipeKey((k) => k + 1);
                }}
                className="w-[390px] h-[510px]"
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-[390px] h-[510px] overflow-hidden rounded-[160px] bg-gray-200">
                      {slide.image ? (
                        <Image
                          src={slide.image}
                          alt={slide.title || "Why slide"}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                          No Image
                        </div>
                      )}

                      {/* wipe */}
                      <div
                        key={wipeKey}
                        className="absolute inset-0 z-20 bg-white origin-left animate-wipeReveal pointer-events-none"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* CTA BELOW IMAGE */}
              {whyCtaText && whyCtaLink && (
                <Link
                  href={whyCtaLink}
                  className="mt-6 text-sm text-green-600 underline underline-offset-4"
                >
                  {whyCtaText}
                </Link>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-4 flex flex-col justify-start mt-26">
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm mt-24">
              {current?.description ||
                "Slide description will appear here from backend."}
            </p>

            {/* arrows in right side */}
           

            {/* divider */}
            <div className="mt-10 border-t border-gray-200" />
          </div>
        </div>
      </div>
    </section>
  );
}
