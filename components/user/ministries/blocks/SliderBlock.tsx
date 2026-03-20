"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/effect-fade";

import OvalArrow from "@/components/user/ui/OvalArrow";

import { SliderBlock as SliderBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: SliderBlockType;
};

export default function SliderBlock({ block }: Props) {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = block.slides || [];
  const activeSlide = slides[activeIndex];

  if (!slides.length) return null;

  return (
    <section className="relative pt-7 md:py-16 lg:py-20 border-t border-gray-200">

      {/* CONTROLS */}
      <div className="absolute inset-x-0 top-[47%] -translate-y-1/2 z-20 hidden md:flex justify-between items-center px-4 md:px-6 max-w-7xl mx-auto">

        <div className="text-xs md:text-sm text-gray-400">
          {String(activeIndex + 1).padStart(2, "0")} |{" "}
          {String(slides.length).padStart(2, "0")}
        </div>
 
        <div className="flex gap-3 md:gap-4">
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

      {/* CONTENT GRID */}
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 md:gap-10 items-center px-6">

        {/* LEFT */}
        <div className="space-y-4 text-center lg:text-left">

          {block.heading && (
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
              className="text-xl block lg:hidden sm:text-2xl md:text-3xl font-semibold"
            >
              {block.heading}
            </motion.h2>
          )}

          <motion.h3
            key={activeSlide.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-[#287F7F] font-medium"
          >
            {activeSlide?.title}
          </motion.h3>

        </div>

        {/* CENTER SLIDER */}
        <div className="flex justify-center items-center lg:flex-col">

          <h2 className="hidden lg:block text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
            {block.heading}
          </h2>

          <Swiper
            modules={[EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={800}
            loop={true}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
          >

            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-[3/4] rounded-[100px] sm:rounded-[120px] md:rounded-[160px] overflow-hidden mx-auto">
                  <Image
                    src={cloudinaryAutoWebp(slide.image)}
                    alt={slide.alt || slide.title}
                    fill
                    sizes="(max-width: 768px) 70vw, 360px"
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}

          </Swiper>

        </div>

        {/* RIGHT */}
        <div className="space-y-4 text-center lg:text-left h-[90px] md:h-[10px] lg:h-auto lg:pr-9">

          {activeSlide?.description && (
            <motion.p
              key={activeSlide.description}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-gray-500 leading-relaxed text-sm md:text-base"
            >
              {activeSlide.description}
            </motion.p>
          )}

        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-3 md:mt-12 lg:mt-3">
        <a
          href="#"
          className="text-green-600 underline text-sm hover:text-green-700"
        >
          Calculate Expansion Cost
        </a>
      </div>

      <div className="md:hidden flex items-center justify-between px-6">
        <OvalArrow
          direction="left"
          variant="gray"
          onClick={() => swiperRef.current?.slidePrev()}
        />

        <div className="text-xs text-gray-400">
          {String(activeIndex + 1).padStart(2, "0")} |{" "}
          {String(slides.length).padStart(2, "0")}
        </div>

        <OvalArrow
          direction="right"
          variant="gray"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </section>
  );
};