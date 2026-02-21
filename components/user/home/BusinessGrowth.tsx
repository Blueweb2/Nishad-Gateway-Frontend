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
    <section data-navbar="light"
      className="relative w-full h-screen bg-white text-black overflow-hidden flex items-center"
    >
      {/* ================= FULL-WIDTH CONTROLS ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="w-full h-full flex items-center justify-between px-10">
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

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

      {/* ================= CONSTRAINED CONTENT ================= */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-6 w-full">
        
        {/* HEADING */}
        <FadeUpScroll delay={0.2}>
          <h2 className="text-[36px] font-bold leading-tight ">
            How Business <br />
            Works in <br />
            Saudi Arabia
          </h2>
        </FadeUpScroll>

        <div className="grid grid-cols-3 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <FadeUpScroll delay={0.3} key={activeIndex}>
              <p className="text-2xl font-medium text-[#287F7F] max-w-sm">
                {activeSlide.title}
              </p>
            </FadeUpScroll>
          </div>

          {/* CENTER SLIDER */}
          <div className="flex flex-col items-center">
            <Swiper
              modules={[EffectFade, Autoplay]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={900}
              loop
              slidesPerView={1}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-[340px] h-[480px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-[340px] h-[480px] rounded-[150px] overflow-hidden">
                    <ParallaxImage
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="mt-6 text-sm text-green-600 underline underline-offset-4">
              {activeSlide.linkText}
            </button>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-center">
            <FadeUpScroll delay={0.4} key={activeIndex + "desc"}>
              <p className="text-gray-500 leading-relaxed max-w-sm">
                {activeSlide.description}
              </p>
            </FadeUpScroll>
          </div>

        </div>
      </div>
    </section>
  );
};