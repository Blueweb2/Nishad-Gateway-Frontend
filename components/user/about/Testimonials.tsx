"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import Link from "next/link";
import OvalArrow from "@/components/user/ui/OvalArrow";

import "swiper/css";
import "swiper/css/parallax";
import FadeUpScroll from "../ui/FadeUpScroll";

const slides = [
  {
    src: "/about/testimonials.webp",
    title: "Manufacturing Sector – UAE Investor",
    description:
      "Nishad and his team made our Saudi market entry smooth and structured. From MISA licensing to company formation, every step was handled professionally. Their expertise helped us establish operations in Riyadh much faster than expected."
  },
  {
    src: "/about/saudi-expansion.webp",
    title: "Technology Company – India",
    description:
      "Entering Saudi Arabia felt complex initially, but Nishad provided clear guidance on market entry strategy and regulatory requirements. His insights helped us confidently launch our technology operations in the Kingdom."
  },
  {
    src: "/about/intro_section.webp",
    title: "Logistics Company – Singapore",
    description:
      "We were exploring expansion into Saudi Arabia and Nishad’s advisory helped us understand the logistics sector opportunities under Vision 2030. The process from licensing to office setup was extremely efficient."
  },
  {
    src: "/about/buisnessveriticals.jpg",
    title: "Industrial Investor – Europe",
    description:
      "The support we received during our industrial company setup in Saudi Arabia was exceptional. Nishad understands both government regulations and investor expectations."
  },
  {
    src: "/about/aboutintro.webp",
    title: "Retail & Hospitality Group – UK",
    description:
      "Our group expanded into Saudi Arabia’s growing hospitality market with Nishad’s strategic support. His team helped us with business planning, licensing, and operational setup."
  },
  {
    src: "/about/aboutHero.webp",
    title: "Consulting Firm – Qatar",
    description:
      "Nishad has deep expertise in Saudi market entry and investment structuring. His ability to simplify regulatory processes makes him a trusted advisor for companies entering the Kingdom."
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
      <div className="lg:hidden absolute bottom-0 w-full mx-auto px-6 z-20">
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
              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold leading-tight lg:mt-[-140px]">
              Real <br className="hidden lg:block"/>
              Experiences <br />
              With Our <br className="hidden lg:block"/>
              Agents
              </h2>
            </FadeUpScroll>

            <div className="hidden lg:flex flex-1 flex-col justify-center lg:justify-end">

              <FadeUpScroll delay={0.3} key={activeIndex}>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#287F7F] pr-40">
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

            <Link
              href="/ksa-expansion-cost-calculator"
              aria-label="Calculate your business expansion cost in Saudi Arabia"
              title="KSA Expansion Cost Calculator"
              className="mt-8 text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition"
            >
              Calculate Your KSA Expansion Cost
            </Link>

          </div>


          {/* RIGHT COLUMN */}
          <div className="flex flex-col justify-center items-center lg:h-[300px] lg:justify-end lg:items-start text-center lg:text-left h-full">

            {/* MOBILE TITLE */}
            <div className="flex lg:hidden flex-col items-center">
              <FadeUpScroll delay={0.3} key={activeIndex}>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#287F7F] h-[60px] md:h-auto">
              {activeSlide.title}
              </h3>
              </FadeUpScroll>
            </div>

            <p className="text-gray-500 leading-relaxed max-w-sm mt-3 lg:pr-20 lg:mt-10 h-[150px] lg:h-auto">
              {activeSlide.description}
            </p>

            <div className="hidden lg:block w-full h-px bg-gray-200 mt-6" />

          </div>

        </div>
      </div>

    </section>
  );
};