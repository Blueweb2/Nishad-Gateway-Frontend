"use client";

import Link from "next/link";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";

import "swiper/css";
import "swiper/css/effect-fade";
import FadeUpScroll from "../ui/FadeUpScroll";

const slides = [
  {
    src: "/buisnessgrowth/Company-Formation-Overview.jpg",
    alt: "Company Formation Overview",
    title: "Company Formation Overview",
    description:
      "Understand the end-to-end process of setting up a company in Saudi Arabia, from foreign investor licensing to Commercial Registration (CR), municipality approvals, banking, and visa activation.",
    linkText: "Understand Business Setup",
  },
  {
    src: "/buisnessgrowth/Types-of-Licenses.jpg",
    alt: "Types of Licenses",
    title: "Types of Licenses",
    description:
      "Saudi Arabia offers multiple license types—LLC, Branch Office, Entrepreneur, and Professional—each tailored to different business models, ownership needs, and stages of market entry.",
    linkText: "Explore License Types",
  },
  {
    src: "/buisnessgrowth/Ownership-and-Capital-Rules.jpg",
    alt: "Ownership & Capital Rules",
    title: "Ownership & Capital Rules",
    description:
      "Learn how ownership structures and capital requirements impact control, licensing, banking, and visas.",
    linkText: "View Ownership Rules",
  },
  {
    src: "/buisnessgrowth/business-tax-compliance-meeting.jpg",
    alt: "Taxes & Compliance",
    title: "Taxes & Compliance (Zakat, VAT, CT)",
    description:
      "Understand Saudi tax obligations, Zakat for Saudi entities, VAT compliance, and Corporate Tax requirements.",
    linkText: "Understand Tax Structure",
  },
  {
    src: "/buisnessgrowth/Setup-Timeline.jpg",
    alt: "Setup Timeline",
    title: "Setup Timeline (Step-by-Step)",
    description:
      "A clear roadmap showing how long each stage takes—from approvals and licensing to banking and visas.",
    linkText: "View Setup Timeline",
  },
];

console.log("Slides:", slides);


export default function BusinessGrowth() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [wipeKey, setWipeKey] = useState(0);

  const activeSlide = slides[activeIndex];

  return (
    <section
      data-navbar="light"
      className="relative w-full bg-white text-black py-[2vw] overflow-hidden"
    >
      {/* CONTROLS */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-20">
        <div className="w-full h-full flex items-center justify-between px-[4vw]">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-[0.5vw] text-[0.9vw] text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="pointer-events-auto flex gap-[2vw]">
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

      {/*  HEADING  */}
      <div className="px-[4vw] pt-[3vw]">
        <FadeUpScroll delay={0.2}>
          <h2 className="text-[2.2vw] font-bold leading-[1.25]">
            How Business <br />
            Works in <br />
            Saudi Arabia
          </h2>
        </FadeUpScroll>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-[85vw] mx-auto px-[3vw] z-10">
        <div className="grid grid-cols-3 gap-[4vw] min-h-[35vw]">

          {/* LEFT */}
          <div className="grid grid-rows-[1fr_auto] pr-[2vw] min-h-[38vw]">

            {/* Top Content (grows upward) */}
            <div className="flex flex-col justify-end pb-[1.5vw]">


              <FadeUpScroll delay={0.3} key={activeIndex}>
                <p className="text-[1.8vw] max-w-[17vw] font-medium text-[#287F7F] leading-[1.25]">
                  {activeSlide.title}
                </p>
              </FadeUpScroll>
            </div>

            {/* Divider (true center anchor) */}
            <div className="h-px bg-gray-200 w-full mt-5" />

          </div>


          {/* CENTER SLIDER */}
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <Swiper
                modules={[EffectFade, Autoplay]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                speed={900}
                loop
                slidesPerView={1}
                autoplay={{
                  delay: 4000, // 4 seconds
                  disableOnInteraction: false, // continue after manual swipe
                  pauseOnMouseEnter: true, // pause on hover
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.realIndex);
                  setWipeKey((k) => k + 1);
                }}
                className="w-[30vw] h-[38vw]"
              >

                {slides.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-[30vw] h-[38vw] overflow-hidden rounded-[10vw]">
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

              <FadeUpScroll delay={0.4} key={activeIndex + "cta"}>
                <p className="mt-[2vw] text-[0.9vw] text-green-600 underline underline-offset-[0.3vw] cursor-pointer">
                  {activeSlide.linkText}
                </p>
              </FadeUpScroll>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-rows-[1fr_auto] pl-[2vw] min-h-[38vw]">

            {/* Top Content */}
            <div className="flex flex-col justify-end pb-[1.5vw]">
              <FadeUpScroll delay={0.5} key={activeIndex + "desc"}>
                <p className="text-gray-500 leading-[1.4] max-w-[20vw] text-left text-[1vw]">
                  {activeSlide.description}
                </p>
              </FadeUpScroll>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 w-full mt-5 " />

          </div>



        </div>
      </div>
    </section>
  );
}
