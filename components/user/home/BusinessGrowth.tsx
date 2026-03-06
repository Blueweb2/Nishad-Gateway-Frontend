"use client";

import OvalArrow from "@/components/user/ui/OvalArrow";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import FadeUpScroll from "../ui/FadeUpScroll";

const slides = [
  {
    src: "/buisnessgrowth/Company-Formation-Overview.jpg",
    alt: "Company Formation Overview",
    title: "Company Formation Overview",
    description:
      "Company formation in Saudi Arabia starts with an investment license from the Ministry of Investment, followed by Commercial Registration (CR) from the Ministry of Commerce, with many businesses establishing operations in Riyadh or Jeddah.",
    linkText: "Understand Business Setup",
    link: "/services/company-formation",
  },
  {
    src: "/buisnessgrowth/Types-of-Licenses.jpg",
    alt: "Types of Licenses",
    title: "Types of Business Licenses",
    description:
      "Saudi company registration offers structures such as LLC, Branch Office, Entrepreneur License, and Professional License depending on ownership structure and market entry strategy.",
    linkText: "Explore License Types",
    link: "/services/company-formation/licensing-approvals",
  },
  {
    src: "/buisnessgrowth/Ownership-and-Capital-Rules.jpg",
    alt: "Ownership & Capital Rules",
    title: "Ownership & Capital Rules",
    description:
      "Ownership structure and capital requirements influence shareholder control, banking eligibility, and visa quotas. Many sectors allow 100% foreign ownership under current investment regulations.",
    linkText: "View Ownership Rules",
    link: "/services/company-formation/ownership-&-capital",
  },
  {
    src: "/buisnessgrowth/business-tax-compliance-meeting.jpg",
    alt: "Taxes & Compliance",
    title: "Taxes & Compliance (Zakat, VAT, CT)",
    description:
      "Businesses must comply with VAT, Zakat, and corporate tax obligations regulated by the Zakat, Tax and Customs Authority.",
    linkText: "Understand Tax Structure",
    link: "/services/saudi-business-advisory/tax-regulatory-advisory",
  },
  {
    src: "/buisnessgrowth/Setup-Timeline.jpg",
    alt: "Setup Timeline",
    title: "Setup Timeline (Step-by-Step)",
    description:
      "The Saudi company registration timeline includes licensing approval, CR issuance, tax registration, bank account setup, and visa processing through government portals.",
    linkText: "View Setup Timeline",
    link: "/services/company-formation/setup-timeline",
  },
];

export default function BusinessGrowth() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];


  return (
    <section
      data-navbar="light"
      data-menu="dark-text"
      className="relative w-full bg-white text-black overflow-hidden flex flex-col justify-center pb-3 md:pb-12 pt-12 md:py-16"
    >

      {/* ================= FULL-WIDTH CONTROLS ================= */}
      <div className="absolute inset-x-0 top-20 md:top-0 h-full pointer-events-none z-20">
        <div className="w-full h-full flex items-start sm:items-center justify-between px-2 sm:px-6 md:px-10">
          
          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="pointer-events-auto flex gap-3 md:gap-6">
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

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-4 sm:px-6">

        {/* HEADING mx-auto*/}
        <FadeUpScroll delay={0.2}>
          <div className="max-w-3xl mx-20 md:mx-auto text-center mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-[38px] font-bold leading-tight">
              How Business Works in Saudi Arabia
            </h2>
          </div>
        </FadeUpScroll>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-12 items-center">

          {/* LEFT COLUMN ( NOT MOBAIL VIEW ) */}
          <div className="relative hidden md:block sm:h-[80px] md:min-h-[480px] text-center md:text-right">

            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

            <div className="md:absolute md:top-1/2 md:right-0 md:-translate-y-full md:pb-6 w-full">
              <FadeUpScroll delay={0.3} key={activeIndex}>
                <p className="text-xl sm:text-2xl md:text-[36px] font-medium text-[#287F7F] md:max-w-sm md:pr-24 leading-snug text-center md:text-left">
                  {activeSlide.title}
                </p>
              </FadeUpScroll>
            </div>

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
              className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] h-[360px] sm:h-[420px] md:h-[500px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full rounded-[120px] md:rounded-[150px] overflow-hidden">
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Link
              href={activeSlide.link}
              className="hidden md:inline-block text-sm text-green-600 underline underline-offset-4 pt-6 "
            >
              {activeSlide.linkText}
            </Link>

              {/* HEADING (ONLY IN MOBILE) */}
            <div className="relative  md:hidden sm:h-[80px] md:min-h-[480px] text-center md:text-right pt-6">

              <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

              <div className="md:absolute md:top-1/2 md:right-0 md:-translate-y-full md:pb-6 w-full">
                <FadeUpScroll delay={0.3} key={activeIndex}>
                  <p className="text-xl sm:text-2xl md:text-[36px] font-medium text-[#287F7F] md:max-w-sm md:pr-24 leading-snug text-center md:text-center">
                    {activeSlide.title}
                  </p>
                </FadeUpScroll>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="relative min-h-[120px] md:min-h-[480px] text-center md:text-left">

            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

            <div className="md:absolute md:top-1/2 md:-translate-y-full md:pb-6 w-full md:w-[75%]">
              <FadeUpScroll delay={0.4} key={activeIndex + "desc"}>
                <p className="text-gray-500 leading-relaxed max-w-md mx-auto md:mx-0 description-text">
                  {activeSlide.description}
                </p>
              </FadeUpScroll>
            </div>

          </div>

          {/* LINK (ONLY DISPLAY IN MOBILE) */}
          <Link
            href={activeSlide.link}
            className="inline-block md:hidden text-sm text-green-600 underline underline-offset-4 text-center mb-3"
          >
            {activeSlide.linkText}
          </Link>

        </div>

      </div>
    </section>
  );
};