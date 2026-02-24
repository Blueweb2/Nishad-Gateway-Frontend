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
    src: "/about/testimonials.jpg",
    title: "MAADEN",
    description:
      "MODON enables integrated industrial investment environments that support diversification and employment.",
    link: "Browse Case Studies"
  },
  {
    src: "/about/saudi-expansion.png",
    title: "MODON",
    description:
      "Creating strong industrial ecosystems that foster investment, employment, and long-term development.",
    link: "Explore Mining Projects"
  },
  {
    src: "/about/indro-section.jpg",
    title: "NEOM",
    description:
      "NEOM is building a futuristic, sustainable region powered by innovation, advanced technology, and smart infrastructure.",
    link: "View Industrial Developments"
  },
  {
    src: "/about/buisnessveriticals.jpg",
    title: "ARAMCO",
    description:
      "Aramco drives global energy solutions while investing in sustainable development and technological advancement.",
    link: "Discover Future Cities"
  },
  {
    src: "/about/aboutIntro.jpg",
    title: "RED SEA GLOBAL",
    description:
      "Red Sea Global develops regenerative tourism destinations focused on environmental protection and luxury experiences.",
    link: "Explore Energy Innovations"
  },
  {
    src: "/about/aboutHero.jpg",
    title: "SABIC",
    description:
      "SABIC is a global leader in diversified chemicals, delivering innovative material solutions for industries worldwide.",
    link: "View Tourism Destinations"
  },
];

export default function CaseStudies() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const activeSlide = slides[activeIndex];

  return (
    <section data-navbar="light" data-menu="dark-text"
      className="relative w-full bg-white text-black py-28 overflow-hidden">

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
          <div className="pointer-events-auto flex gap-6 z-20">
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
          Testimonials
        </span>
      </div>

      {/* ================= CONSTRAINED CONTENT ================= */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-3 gap-12 items-stretch min-h-[560px]">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-between">
            <div>
              <FadeUpScroll delay={0.1}>
                <h2 className="text-[36px] font-bold leading-tight mb-16">
                  Real <br />
                  Experiences <br />
                  With Our <br />
                  Agents
                </h2>
              </FadeUpScroll >

              <div className="lg:mt-32 ms-26">
                <FadeUpScroll delay={0.3} key={activeIndex}>
                  <h1 className="text-2xl font-extrabold">{activeSlide.title}</h1>
                </FadeUpScroll>
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
              {activeSlide.link}
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-between items-end text-left">
            <p className="text-gray-500 leading-relaxed max-w-sm mt-56">
              {activeSlide.description}
            </p>

            <div className="w-full h-px bg-gray-200 mb-48" />
          </div>

        </div>
      </div>
    </section>
  );
};