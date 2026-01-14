"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import OvalArrow from "@/components/ui/OvalArrow";

import "swiper/css";
import "swiper/css/parallax";

const slides = [
  {
    src: "/casestudies/building.webp",
    title: "MODON",
    description:
      "MODON enables integrated industrial investment environments that support diversification and employment.",
  },
  {
    src: "/casestudies/building.webp",
    title: "MODON",
    description:
      "MODON enables integrated industrial investment environments that support diversification and employment.",
  },
];

export default function CaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section data-navbar="white"
 className="relative w-full bg-[#F5F5F5] text-black py-28 overflow-hidden">

      {/* ================= FULL-WIDTH CONTROLS ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="w-full h-full flex items-center justify-between px-10">

          {/* LEFT — COUNTER */}
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* RIGHT — ARROWS */}
          <div className="pointer-events-auto flex gap-6">
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

      {/* ================= WATERMARK ================= */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-20">
        <span className="text-[180px] font-bold text-black/5 tracking-wide whitespace-nowrap select-none">
          Case Studies
        </span>
      </div>

      {/* ================= CONSTRAINED CONTENT ================= */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-3 gap-12 items-stretch min-h-[560px]">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-[36px] font-bold leading-tight mb-16">
                Real-World <br />
                Investment <br />
                Scenarios
              </h2>

              <div className="lg:mt-32 ms-26">
                <Image
                  src="/casestudies/modon-logo.svg"
                  alt="MODON"
                  width={120}
                  height={40}
                />
              </div>
            </div>


            <div className="w-full h-px bg-gray-200 mb-48" />
          </div>

          {/* CENTER COLUMN — SLIDER */}
          <div className="flex flex-col items-center justify-between">
            <Swiper
              modules={[Parallax]}
              speed={900}
              parallax
              slidesPerView={1}
              loop
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-[360px] h-[520px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="!flex !items-center !justify-center"
                >
                  <div className="relative w-[360px] h-[520px] rounded-[160px] overflow-hidden">
                    <div
                      className="absolute inset-0"
                      data-swiper-parallax="-30%"
                    >
                      <Image
                        src={slide.src}
                        alt="Case Study"
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="mt-10 text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition">
              Browse Case Studies
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between items-end text-left">
            <p className="text-gray-500 leading-relaxed max-w-sm mt-56">
              {slides[activeIndex].description}
            </p>

            <div className="w-full h-px bg-gray-200 mb-48" />
          </div>

        </div>
      </div>
    </section>
  );
}
