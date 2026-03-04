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
      "The company formation in Saudi Arabia process begins with securing a foreign investor license from the Ministry of Investment of Saudi Arabia followed by Commercial Registration (CR) from the Ministry of Commerce. Businesses commonly establish operations in major commercial hubs like Riyadh and Jeddah depending on their industry and expansion strategy.",
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
    <section data-navbar="light" data-menu="dark-text"
      className="relative w-full  bg-white text-black overflow-hidden flex flex-col justify-center pb-10"
    >
      {/* ================= FULL-WIDTH CONTROLS ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-20">
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
      <div className="relative z-10 max-w-[1320px] mx-auto  w-full ">

        {/* HEADING */}
        <FadeUpScroll delay={0.2}>
          <div className="max-w-3xl mx-auto mt-18 text-center mb-12">
            <h2 className="text-[38px] font-bold leading-tight">
              How Business Works in Saudi Arabia
            </h2>
          </div>
        </FadeUpScroll>

        <div className="grid grid-cols-3 gap-12 items-center">

          {/* LEFT COLUMN */}
          <div className="relative min-h-[480px] ">

            {/* Center Divider */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

            {/* Text above divider */}
            <div className="absolute top-1/2 right-0 -translate-y-full pb-6  w-[100%]">
              <FadeUpScroll delay={0.3} key={activeIndex}>
                <p className="text-[36px] font-medium text-[#287F7F] max-w-sm pr-24 leading-snug">
                  {activeSlide.title}
                </p>
              </FadeUpScroll>
            </div>

          </div>

          {/* CENTER SLIDER */}
          <div className="flex flex-col items-center self-start">
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
              className="w-[380px] h-[500px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-[380px] h-[500px] rounded-[150px] overflow-hidden">
                    <img src={slide.src} alt={slide.alt} className="w-full h-full" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Link
              href={activeSlide.link}
              className="text-sm text-green-600 underline underline-offset-4 pt-6 inline-block"
            >
              {activeSlide.linkText}
            </Link>
          </div>

          {/* RIGHT COLUMN */}
          <div className="relative min-h-[480px]">

            {/* Center Divider */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

            {/* Text above divider */}
            <div className="absolute top-1/2 -translate-y-full pb-6 w-[75%]">
              <FadeUpScroll delay={0.4} key={activeIndex + "desc"}>
                <p className="text-gray-500 leading-relaxed max-w-sm description-text">
                  {activeSlide.description}
                </p>
              </FadeUpScroll>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};