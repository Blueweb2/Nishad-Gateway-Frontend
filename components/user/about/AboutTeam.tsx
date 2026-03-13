"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import OvalArrow from "@/components/user/ui/OvalArrow";
import FadeUpScroll from "../ui/FadeUpScroll";
import "swiper/css/parallax";

const slides = [
  {
    name: "Ahmed Al-Qahtani",
    jobTitle: "Industrial Market Entry Specialist",
    title: "Manufacturing & Industrial Investment",
    country: "Saudi Arabia",
    experience: "10+ Years",
    src: "/about/manufacturing_and_industrial_investment.webp",
    description:
      "Supporting global manufacturers establishing operations in Saudi Arabia’s growing industrial ecosystem, including MODON zones and industrial licensing.",
  },
  {
    name: "Fahad Al-Salem",
    jobTitle: "Technology Market Entry Advisor",
    title: "Technology & Innovation Companies",
    country: "Middle East",
    experience: "9+ Years",
    src: "/about/saudi-expansion.webp",
    description:
      "Helping technology startups and global tech firms launch and expand in Saudi Arabia’s innovationdriven economy aligned with Vision 2030.",
  },
  {
    name: "Sara Al-Harbi",
    jobTitle: "Tourism Investment Consultant",
    title: "Hospitality & Tourism Projects",
    country: "Saudi Arabia",
    experience: "8+ Years",
    src: "/about/hospitality_and_tourism_project .webp",
    description:
      "Advising investors and hospitality brands entering Saudi Arabia’s rapidly expanding tourism and lifestyle sectors.",
  },
  {
    name: "Omar Al-Faraj",
    jobTitle: "Logistics Sector Specialist",
    title: "Logistics & Supply Chain Businesses",
    country: "GCC Region",
    experience: "10+ Years",
    src: "/about/buisnessveriticals.jpg",
    description:
      "Supporting logistics companies establishing distribution networks and supply chain operations across Saudi Arabia.",
  },
  {
    name: "Noura Al-Mutairi",
    jobTitle: "Retail Market Expansion Advisor",
    title: "Retail & Consumer Brands",
    country: "Middle East",
    experience: "8+ Years",
    src: "/about/retail.webp",
    description:
      "Helping international brands enter the Saudi consumer market through structured retail expansion strategies.",
  },
  {
    name: "Khalid Al-Dossari",
    jobTitle: "Infrastructure Investment Consultant",
    title: "Construction & Infrastructure",
    country: "Saudi Arabia",
    experience: "11+ Years",
    src: "/about/construction.webp",
    description:
      "Advising construction companies and infrastructure investors participating in Saudi Arabia’s mega development projects",
  },
];

export default function TeamSection() {

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
    
  const activeSlide = slides[activeIndex];

  return (
    <section className="w-full bg-[#f3f3f3] py-12 lg:py-24" data-menu="dark-text">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative">

        {/* Top Title */}
        <h2 className="text-2xl text-center lg:text-left sm:text-3xl lg:text-4xl font-extrabold mb-3 lg:mb-12">
          Our Expertise Across <br />
          Saudi Arabia’s Key <br />
          Growth Sectors
        </h2>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 lg:gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-2 lg:space-y-8 text-center md:text-left">
 
            <div className="flex flex-col md:flex-row md:items-center">
              
              {/* Counter */}
              <p className="text-sm text-gray-500">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-2">|</span>
                {String(slides.length).padStart(2, "0")}
              </p>

              {/* Name */}
              <div className="md:ml-10 mt-3 md:mt-0">
                <FadeUpScroll delay={0.3} key={activeIndex}>
                  <h3 className="text-xl font-semibold h-[50px] md:h-[90px] lg:h-[50px]">
                    {activeSlide.title}
                  </h3>
                </FadeUpScroll>
                <p className="text-sm text-gray-500 mt-2 md:h-[40px] lg:h-auto">
                  {activeSlide.jobTitle}
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="h-px bg-gray-300 w-full"></div>

            <div className="flex justify-center md:justify-start">
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm md:ml-10 h-[90px]">
                {activeSlide.description}
              </p>
            </div>

          </div>

          {/* CENTER IMAGE flex-col*/}
          <div className="flex items-center">

            {/* Left Arrows (only show in mobile) */}
            <div className="block md:hidden">
              <OvalArrow
                direction="left"
                variant="gray"
                onClick={() => swiperRef.current?.slidePrev()}
              />
            </div>

            <Swiper
              modules={[Parallax]}
              speed={900}
              parallax
              slidesPerView={1}
              loop
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="w-[260px] sm:w-[320px] lg:w-[360px] h-[400px] sm:h-[480px] lg:h-[520px]"
            >
              {slides.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  className="!flex !items-center !justify-center"
                >
                  <div className="relative w-full h-full rounded-[140px] lg:rounded-[160px] overflow-hidden">
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

            {/* Right Arrows (only show in mobile) */}
            <div className="block md:hidden">
              <OvalArrow
                direction="right"
                variant="gray"
                onClick={() => swiperRef.current?.slideNext()}
              />
            </div>

          </div>

          {/* RIGHT SIDE flex-col*/}
          <div className="flex sm:flex-row md:flex-col lg:flex-row items-center justify-between gap-8 text-center md:text-left">

            <div>
              <p className="text-xs text-gray-400">Work Experience:</p>
              <p className="text-lg font-semibold mt-1">
                {activeSlide.experience}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Country:</p>
              <p className="text-lg font-semibold mt-1">
                {activeSlide.country}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="gap-3 hidden md:flex">
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
      </div>
    </section>
  );
};