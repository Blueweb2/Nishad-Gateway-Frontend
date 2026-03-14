"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import OvalArrow from "@/components/user/ui/OvalArrow";

import "swiper/css";
import "swiper/css/parallax";
import FadeUpScroll from "../ui/FadeUpScroll";

const slides = [
  {
    src: "/casestudies/WhatsApp Image 2026-02-24 at 10.07.00 PM.jpeg",
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
  }
];

export default function CaseStudies() {

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];


  return (
    <section
      data-navbar="light"
      data-menu="dark-text"
      className="relative w-full bg-[#F5F5F5] text-black py-12 lg:py-28 overflow-hidden"
    >

      {/* ================= FULL WIDTH CONTROLS ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="hidden lg:flex w-full h-full items-center justify-between px-6 lg:px-10">

          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="pointer-events-auto flex gap-4 lg:gap-6 z-20">
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
      <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-56 lg:pb-20">
        <span className="text-[80px] sm:text-[120px] lg:text-[180px] font-bold text-black/5 tracking-wide whitespace-nowrap select-none">
          Case Studies
        </span>
      </div>

      {/* ================= Arrows (ONLY SHOW IN MOBILE) ================= */}
      <div className="lg:hidden absolute bottom-0 w-full mx-auto px-6">
        <div className="relative w-full py-4">

          {/* ARROWS */}
          <div className="pointer-events-auto flex items-center justify-between w-full">
            <OvalArrow
              direction="left"
              variant="gray"
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-[26px] h-[40px] transition-transform hover:scale-110 active:scale-95"
            />
            <OvalArrow
              direction="right"
              variant="gray"
              onClick={() => swiperRef.current?.slideNext()}
              className="w-[26px] h-[40px] transition-transform hover:scale-110 active:scale-95"
            />
          </div>

        </div>
      </div>


      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-center">

           {/* LEFT COLUMN */}
          <div className="flex flex-col h-full text-center lg:text-left">

            {/* TOP — HEADING */}
            <FadeUpScroll delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight">
                We're Trusted <br />
                by 2500+ Clients
              </h2>
            </FadeUpScroll>

            {/* CENTER CONTENT */}
            <div className="hidden lg:flex flex-1 flex-col items-center justify-center lg:items-start">

              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl font-medium text-[#287F7F] max-w-sm mx-auto lg:mx-0 lg:h-[90px] flex items-end lg:pr-24"
                >
                  {activeSlide.title}
                </motion.h1>
              </AnimatePresence>

              {/* LINE stays under title */}
              <div className="hidden lg:block w-full h-px bg-gray-200 mt-6" />

            </div>

          </div>

          {/* CENTER COLUMN */}
          <div className="flex flex-col items-center h-full">

            <Swiper
              modules={[Parallax]}
              speed={900}
              parallax
              slidesPerView={1}
              loop
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-[260px] h-[380px] sm:w-[300px] sm:h-[440px] lg:w-[360px] lg:h-[520px]"
            >

              {slides.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="!flex !items-center !justify-center"
                >

                  <div className="relative w-full h-full rounded-[120px] lg:rounded-[160px] overflow-hidden">

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

            <a 
              href="/ksa-expansion-cost-calculator"
              className="hidden lg:block mt-8 text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition"
            >
              Calculate Your KSA Expansion Cost
            </a>

          </div>


          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start h-full">

            {/* CENTER CONTENT ( ONLY DISPLAY IN MOBILE DIVICE ) */}
            <div className="flex lg:hidden flex-1 flex-col items-center justify-center lg:items-start">

              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl font-medium text-[#287F7F] max-w-sm mx-auto md:h-[50px] flex items-end lg:pr-24"
                >
                  {activeSlide.title}
                </motion.h1>
              </AnimatePresence>

            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="text-gray-500 leading-relaxed max-w-sm h-[95px] lg:h-[170px] mt-3 flex items-start lg:items-end"
              >
                {activeSlide.description}
              </motion.div>
            </AnimatePresence>

            <a 
              href="/ksa-expansion-cost-calculator"
              className="block lg:hidden mt-3 text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition"
            >
              Calculate Your KSA Expansion Cost
            </a>

            <div className="hidden lg:block w-full h-px bg-gray-200 mt-6" />

          </div>

        </div>
      </div>

    </section>
  );
};