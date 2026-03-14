"use client";

import OvalArrow from "@/components/user/ui/OvalArrow";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/effect-fade";
import FadeUpScroll from "../ui/FadeUpScroll";

const slides = [
  {
    src: "/buisnessgrowth/Company-Formation-Overview.webp",
    alt: "Company Formation Overview",
    title: "Company Formation Overview",
    description: (
      <>
        The process of{" "}
        <Link href="/services/company-formation" className="underline text-green-60">
          company formation in Saudi Arabia
        </Link>{" "}
        begins with obtaining an investment license from the Ministry of
        Investment (MISA) followed by Commercial Registration (CR) from the
        Ministry of Commerce. After registration, companies can establish
        operations in key commercial cities such as{" "}
        <Link href="/cities/discover-riyadh" className="underline text-green-60">
          Riyadh
        </Link>{" "}
        or{" "}
        <Link href="/cities/explore-jeddah" className="underline text-green-60">
          Jeddah
        </Link>
        , two of the leading hubs for business in Saudi Arabia.
      </>
    ),
    linkText: "Understand Business Setup",
    link: "/services/company-formation",
  },

  {
    src: "/buisnessgrowth/Types-of-Licenses.jpg",
    alt: "Types of Licenses",
    title: "Types of Business Licenses",
    description: (
      <>
        Saudi Arabia provides multiple legal structures for companies starting
        business in Saudi Arabia, including LLC structures, branch offices,
        entrepreneur licenses, and professional service licenses depending on
        ownership structure and{" "}
        <Link href="/services/international-market-entry/market-entry-strategy" className="underline text-green-60">
          market entry strategy
        </Link>
        .
      </>
    ),
    linkText: "Explore License Types",
    link: "/services/company-formation/licensing-approvals",
  },

  {
    src: "/buisnessgrowth/Ownership-and-Capital-Rules.webp",
    alt: "Ownership & Capital Rules",
    title: "Ownership & Capital Rules",
    description: (
      <>
        Foreign investors planning business in Saudi Arabia must evaluate
        ownership structure, shareholder rights, and capital requirements. Many
        sectors allow 100% foreign ownership, enabling international companies
        to establish fully owned subsidiaries through{" "}
        <Link href="/services/company-formation" className="underline text-green-60">
          foreign company formation in Saudi Arabia
        </Link>
        .
      </>
    ),
    linkText: "View Ownership Rules",
    link: "/services/company-formation/ownership-&-capital",
  },

  {
    src: "/buisnessgrowth/business-tax-compliance-meeting.jpg",
    alt: "Taxes & Compliance",
    title: "Taxes & Compliance (Zakat, VAT, CT)",
    description: (
      <>
        Companies operating business in Saudi Arabia must comply with tax and
        regulatory requirements including VAT registration, Zakat obligations,
        and corporate tax regulations managed by the{" "}
        <a
          href="https://zatca.gov.sa"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-green-60"
        >
          Zakat, Tax and Customs Authority (ZATCA)
        </a>
        . Businesses can also rely on{" "}
        <Link href="/services/corporate-support" className="underline text-green-60">
          Accounting & Tax Services in Saudi Arabia
        </Link>{" "}
        for compliance support.
      </>
    ),
    linkText: "Understand Tax Structure",
    link: "/services/saudi-business-advisory/tax-regulatory-advisory",
  },

  {
    src: "/buisnessgrowth/Setup-Timeline.webp",
    alt: "Setup Timeline",
    title: "Setup Timeline (Step-by-Step)",
    description: (
      <>
        The typical timeline for starting a business in Saudi Arabia includes
        investment license approval, commercial registration, tax registration,
        bank account opening, and visa processing. Many of these procedures are
        now completed through integrated government portals that simplify the
        business setup process. Learn more about our{" "}
        <Link href="/services/international-market-entry/market-entry-strategy" className="underline text-green-60">
          Market Entry Strategy in Saudi Arabia
        </Link>{" "}
        and{" "}
        <Link href="/services/corporate-support" className="underline text-green-60">
          Corporate Support Services
        </Link>
        .
      </>
    ),
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
      className="relative w-full bg-white text-black overflow-hidden flex flex-col justify-center pb-3 lg:pb-12 pt-12 lg:py-16"
    >

      {/* ================= FULL-WIDTH CONTROLS ================= */}
      <div className="absolute inset-x-0 top-20 lg:top-0 h-full pointer-events-none z-20">
        <div className="w-full h-full flex items-start sm:items-center justify-between px-2 sm:px-6 lg:px-10">

          <div className="pointer-events-auto">
            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-400">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(slides.length).padStart(2, "0")}</span>
            </div>
          </div>

          <div className="pointer-events-auto flex gap-3 lg:gap-6">
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
          <div className="max-w-3xl mx-20 lg:mx-auto text-center mb-10 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight">
              How Business Works in Saudi Arabia
            </h2>
          </div>
        </FadeUpScroll>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-12 items-center">

          {/* LEFT COLUMN ( NOT MOBAIL VIEW ) */}
          <div className="relative hidden lg:block sm:h-[80px] lg:min-h-[480px] text-center lg:text-right">

            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

            <div className="lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-full md:pb-6 w-full">
              <FadeUpScroll delay={0.3} key={activeIndex}>
                <p className="text-xl sm:text-2xl lg:text-[36px] font-medium text-[#287F7F] lg:max-w-sm lg:pr-24 leading-snug text-center lg:text-left">
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
              className="w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] h-[360px] sm:h-[420px] lg:h-[500px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full rounded-[120px] md:rounded-[150px] overflow-hidden">
                    <Image
                      key={slide.title}
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="(max-width:768px) 280px, 380px"
                      className="object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Link
              href={activeSlide.link}
              className="hidden lg:inline-block text-sm text-green-600 underline underline-offset-4 pt-6 "
            >
              {activeSlide.linkText}
            </Link>

            {/* HEADING (ONLY IN MOBILE) */}
            <div className="relative  lg:hidden sm:h-[80px] lg:min-h-[480px] text-center ;g:text-right pt-6">

              <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

              <div className="lg:absolute lg:top-1/2 lg:right-0 ;g:-translate-y-full lg:pb-6 w-full">
                <FadeUpScroll delay={0.3} key={activeIndex}>
                  <p className="text-xl sm:text-2xl lg:text-[36px] font-medium text-[#287F7F] lg:max-w-sm lg:pr-24 leading-snug text-center lg:text-center">
                    {activeSlide.title}
                  </p>
                </FadeUpScroll>
              </div>

            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="relative min-h-[120px] lg:min-h-[480px] text-center lg:text-left">

            <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-px bg-gray-200" />

            <div className="lg:absolute lg:top-1/2 lg:-translate-y-full lg:pb-6 w-full lg:w-[75%]">
              <FadeUpScroll delay={0.4} key={activeIndex + "desc"}>
                <p className="text-gray-500 leading-relaxed h-[205px] lg:h-auto max-w-md mx-auto lg:mx-0 description-text">
                  {activeSlide.description}
                </p>
              </FadeUpScroll>
            </div>

          </div>

          {/* LINK (ONLY DISPLAY IN MOBILE) */}
          <Link
            href={activeSlide.link}
            className="inline-block lg:hidden text-sm text-green-600 underline underline-offset-4 text-center mb-3"
          >
            {activeSlide.linkText}
          </Link>

        </div>

      </div>
    </section>
  );
};