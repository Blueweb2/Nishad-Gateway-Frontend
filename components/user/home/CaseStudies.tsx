"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import OvalArrow from "@/components/user/ui/OvalArrow";

import "swiper/css";
import "swiper/css/parallax";
import FadeUpScroll from "../ui/FadeUpScroll";

const slides = [
  {
    src: "/casestudies/building.webp",
    title: "Manufacturing & Industrial Licenses",
    description:
      "MODON enables integrated industrial investment environments that support diversification and employment.",
    link: "Browse Case Studies",
  },
  {
    src: "/consultantbg.webp",
    title: "Commercial & Trade Permits",
    description:
      "Streamlined licensing solutions designed to accelerate business setup, ensure regulatory compliance, and support sustainable commercial growth.",
    link: "Explore Permit Solutions",
  },
  {
    src: "/citiesbg.webp",
    title: "Real Estate Development Approvals",
    description:
      "Comprehensive approval processes that facilitate property development projects while maintaining urban planning standards and legal requirements.",
    link: "View Development Projects",
  },
  {
    src: "/ksa-a.png",
    title: "Environmental & Regulatory Clearances",
    description:
      "Efficient environmental assessment and regulatory clearance services to ensure responsible development aligned with national sustainability goals.",
    link: "Discover Regulatory Services",
  },
  {
    src: "/herobg.webp",
    title: "Infrastructure & Public Sector Projects",
    description:
      "Strategic advisory and licensing support for large-scale infrastructure initiatives aligned with national development objectives.",
    link: "Explore Infrastructure Solutions",
  },
  {
    src: "/Olaya.webp",
    title: "Foreign Investment & Business Setup",
    description:
      "End-to-end assistance for international investors seeking compliant market entry and long-term operational success.",
    link: "Start Your Investment Journey",
  }
];

export default function CaseStudies() {

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];

  return (
    <section data-navbar="light" data-menu="dark-text"
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
              <FadeUpScroll delay={0.1}>
                <h2 className="text-[36px] font-bold leading-tight mb-2">
                  Real-World <br />
                  Investment <br />
                  Scenarios
                </h2>
              </FadeUpScroll >
            </div>

            <div className="flex items-center justify-items-start mt-8">
              <h1 className="text-5xl font-medium">hello</h1>
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
              {activeSlide.link}
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between items-end text-left">
            <div className="flex">
              <p className="text-gray-500 leading-relaxed max-w-sm mt-56">
                {slides[activeIndex].description}
              </p>

              <div className="pointer-events-auto flex gap-6 relative mt-[65%]">
                {/* RIGHT — ARROWS */}
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

            <div className="w-full h-px bg-gray-200 mb-48" />
          </div>

        </div>
      </div>
    </section>
  );
}
