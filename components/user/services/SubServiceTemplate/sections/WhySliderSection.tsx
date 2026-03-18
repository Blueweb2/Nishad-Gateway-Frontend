"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
      data-navbar="light"
      className="relative w-full bg-white text-black py-12 lg:py-28 overflow-hidden"
    >

      {/* ================= DESKTOP CONTROLS ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="hidden lg:flex w-full h-full items-center justify-between px-10">

          {/* counter */}
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{formatNumber(activeIndex + 1)}</span>
              <span>|</span>
              <span>{formatNumber(total)}</span>
            </div>
          </div>

          {/* arrows */}
          <div className="pointer-events-auto flex items-center gap-6 z-20">
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

      {/* ================= MOBILE ARROWS ================= */}
      <div className="lg:hidden absolute bottom-0 w-full px-6 z-20">
        <div className="flex items-center justify-between py-6">

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

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 ">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">

          {/* ================= LEFT ================= */}
          <div className="flex flex-col text-center lg:text-left h-full ">
            <motion.h2 
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight"
            >
              {whyHeading || "Why Entity Type Matters"}
            </motion.h2>

            {/* desktop title */}
            <div className=" hidden lg:flex flex-1 flex-col items-center justify-center lg:items-start">
              
              <motion.h3
                key={current?.title}
                initial={{y:200, opacity:0}}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-xl lg:text-2xl text-teal-700 font-bold leading-tight"
              >
                {current?.title || "Ownership Rights"}
              </motion.h3>
              <div className="hidden lg:block w-full h-px bg-gray-200 mt-6" />
            </div>

          </div>

          {/* ================= CENTER SLIDER ================= */}
          <div className="flex flex-col items-center h-full ">

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
              className="w-[260px] h-[360px] sm:w-[300px] sm:h-[420px] lg:w-[390px] lg:h-[510px]"
            >

              {slides.map((slide, index) => (
                <SwiperSlide key={index}>

                  <div className="relative w-full h-full overflow-hidden rounded-[120px] lg:rounded-[160px] bg-gray-200">

                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={slide.title || "Slide"}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        No Image
                      </div>
                    )}

                    {/* wipe animation */}
                    <div
                      key={wipeKey}
                      className="absolute inset-0 z-20 bg-white origin-left animate-wipeReveal pointer-events-none"
                    />

                  </div>

                </SwiperSlide>
              ))}

            </Swiper>

            {/* link for large divice */}
            {whyCtaText && whyCtaLink && (
              <Link
                href={whyCtaLink}
                className="hidden lg:block mt-8 text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition"
              >
                {whyCtaText}
              </Link>
            )}

          </div>

          {/* ================= RIGHT ================= */}
          <div className=" flex flex-col justify-center text-center lg:text-left items-center lg:items-start h-full">

            {/* mobile title */}
            <div className=" flex lg:hidden flex-1 flex-col items-center justify-center lg:items-start">
              <h3 className=" text-xl sm:text-2xl font-medium text-[#287F7F] max-w-sm mx-auto h-[50px] 
              md:h-[50px] flex items-end lg:pr-24">
                {current?.title || "Ownership Rights"}
              </h3>
            </div>

            <motion.div
              key={current?.title}
              initial={{y:200, opacity:0}}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-gray-500 leading-relaxed max-w-sm h-[165px] lg:h-[170px] mt-3 flex items-start lg:items-end rich-text-light lg:pr-20"
              dangerouslySetInnerHTML={{ __html: current?.description || "" }}
            />

            {/* link for small divice */}
            {whyCtaText && whyCtaLink && (
              <Link
                href={whyCtaLink}
                className="block lg:hidden mt-3 text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition"
              >
                {whyCtaText}
              </Link>
            )}

            <div className="hidden lg:block w-full h-px bg-gray-200 mt-6" />

          </div>

        </div>
      </div>

    </section>
  );

};