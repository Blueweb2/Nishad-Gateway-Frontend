"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

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
    <section className="relative py-16 md:py-20">

      {/* CONTROLS */}
      <div className="absolute inset-x-0 top-0 z-20 flex justify-between items-center px-6 max-w-8xl mx-auto">
        <div className="text-sm text-gray-400">
          {String(activeIndex + 1).padStart(2, "0")} |{" "}
          {String(slides.length).padStart(2, "0")}
        </div>

        <div className="flex gap-4">
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

      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-10 items-center px-6">

        {/* LEFT */}
        <div className="space-y-4 text-center sm:text-left md:text-left lg:text-left">

          {block.heading && (
            <h2 className="text-2xl md:text-3xl font-semibold">
              {block.heading}
            </h2>
          )}

          <h3 className="text-xl md:text-2xl text-[#287F7F] font-medium">
            {activeSlide?.title}
          </h3>

        </div>

        {/* CENTER SLIDER */}
        <div className="flex justify-center">

          <Swiper
            modules={[EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={800}
            slidesPerView={1}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full max-w-[360px] h-[420px] md:h-[480px] max-auto"
          >

            {slides.map((slide, index) => (
<SwiperSlide key={index}>
  <div className="relative w-full max-w-[360px] aspect-[3/4] rounded-[120px] md:rounded-[160px] overflow-hidden mx-auto">
    <Image
      src={cloudinaryAutoWebp(slide.image)}
      alt={slide.alt || slide.title}
      fill
      sizes="(max-width: 768px) 60vw, 360px"
      className="object-cover"
    />
  </div>
</SwiperSlide>
            ))}

          </Swiper>

        </div>

        {/* RIGHT */}
        <div className="space-y-4 text-center lg:text-left">

          {activeSlide?.description && (
            <p className="text-gray-500 leading-relaxed">
              {activeSlide.description}
            </p>
          )}

        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="#"
          className="text-green-600 underline text-sm hover:text-green-700"
        >
          Calculate Expansion Cost
        </a>
      </div>

    </section>
  );
}