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
    <section
      data-navbar="light"
      data-menu="dark-text"
      className="relative w-full bg-white text-black py-12 lg:py-28 overflow-hidden"
    >

      {/* ================= FULL WIDTH CONTROLS (DESKTOP ONLY) ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="hidden lg:flex w-full h-full items-center mt-12 justify-between px-6 lg:px-10">

          {/* COUNTER */}
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          {/* ARROWS */}
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
          Testimonials
        </span>
      </div>


      {/* ================= MOBILE ARROWS ================= */}
      <div className="lg:hidden absolute bottom-0 w-full mx-auto px-6">
        <div className="relative w-full py-4">

          <div className="pointer-events-auto flex items-center justify-between w-full">
            <OvalArrow
              direction="left"
              variant="gray"
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-[26px] h-[40px]"
            />
            <OvalArrow
              direction="right"
              variant="gray"
              onClick={() => swiperRef.current?.slideNext()}
              className="w-[26px] h-[40px]"
            />
          </div>

        </div>
      </div>


      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col h-full lg:h-[300px] lg:justify-end text-center lg:text-left">

            <FadeUpScroll delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight">
              Real <br className="hidden lg:block"/>
              Experiences <br />
              With Our <br className="hidden lg:block"/>
              Agents
              </h2>
            </FadeUpScroll>

            <div className="hidden lg:flex flex-1 flex-col justify-center lg:justify-end">

              <FadeUpScroll delay={0.3} key={activeIndex}>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#287F7F] max-w-sm">
                  {activeSlide.title}
                </h3>
              </FadeUpScroll>

              <div className="w-full h-px bg-gray-200 mt-6" />

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
                    alt="testimonial"
                    fill
                    className="object-cover"
                    priority={index === 0}
                    />
                  </div>

                </div>

                </SwiperSlide>
              ))}

            </Swiper>

            <button className="mt-8 text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition">
            {activeSlide.link}
            </button>

          </div>


          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-center items-center lg:h-[300px] lg:justify-end lg:items-start text-center lg:text-left h-full">

            {/* MOBILE TITLE */}
            <div className="flex lg:hidden flex-col items-center">
              <FadeUpScroll delay={0.3} key={activeIndex}>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#287F7F]">
              {activeSlide.title}
              </h3>
              </FadeUpScroll>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-sm mt-3 lg:pr-20 lg:mt-10 h-[90px] md:h-auto">
              {activeSlide.description}
            </p>

            <div className="hidden lg:block w-full h-px bg-gray-200 mt-6" />

          </div>

        </div>
      </div>

    </section>
  );
};