"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax } from "swiper/modules";
import OvalArrow from "@/components/user/ui/OvalArrow";
import FadeUpScroll from "../ui/FadeUpScroll";
import "swiper/css/parallax";

const slides = [
  {
    name: "Ahmed Al-Qahtani",
    jobTitle: "Business Incorporation Specialist",
    title: "MAADEN",
    country: "Saudi Arabia",
    experience: "8+ Years",
    src: "/about/aboutIntro.jpg",
    description:
      "MODON enables integrated industrial investment environments that support diversification and employment.",
    link: "Browse Case Studies"
  },
  {
    name: "Fahad Al-Salem",
    jobTitle: "Industrial Development Manager",
    title: "MODON",
    country: "UAE",
    experience: "10+ Years",
    src: "/about/saudi-expansion.png",
    description:
      "Creating strong industrial ecosystems that foster investment, employment, and long-term development.",
    link: "Explore Mining Projects"
  },
  {
    name: "Sara Al-Harbi",
    jobTitle: "Sustainability Strategy Director",
    title: "NEOM",
    country: "India",
    experience: "12+ Years",
    src: "/about/indro-section.jpg",
    description:
      "NEOM is building a futuristic, sustainable region powered by innovation, advanced technology, and smart infrastructure.",
    link: "View Industrial Developments"
  },
  {
    name: "Omar Al-Faraj",
    jobTitle: "Energy Investment Advisor",
    title: "ARAMCO",
    country: "America",
    experience: "15+ Years",
    src: "/about/buisnessveriticals.jpg",
    description:
      "Aramco drives global energy solutions while investing in sustainable development and technological advancement.",
    link: "Discover Future Cities"
  },
  {
    name: "Noura Al-Mutairi",
    jobTitle: "Tourism Development Consultant",
    title: "RED SEA GLOBAL",
    country: "China",
    experience: "9+ Years",
    src: "/about/aboutIntro.jpg",
    description:
      "Red Sea Global develops regenerative tourism destinations focused on environmental protection and luxury experiences.",
    link: "Explore Energy Innovations"
  },
  {
    name: "Khalid Al-Dossari",
    jobTitle: "Chemical Innovation Lead",
    title: "SABIC",
    country: "Brazil",
    experience: "11+ Years",
    src: "/about/aboutHero.jpg",
    description:
      "SABIC is a global leader in diversified chemicals, delivering innovative material solutions for industries worldwide.",
    link: "View Tourism Destinations"
  },
];

export default function TeamSection() {

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
    
  const activeSlide = slides[activeIndex];

  return (
    <section className="w-full bg-[#f3f3f3] py-24">
      <div className="max-w-7xl mx-auto px-8 relative">

        {/* Top Title */}
        <h2 className="text-3xl font-extrabold">Our <br /> Team</h2>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 items-center gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div className="flex items-center">
              {/* Counter */}
              <p className="text-sm text-gray-500">
                {String(activeIndex + 1).padStart(2, "0")} 
                <span className="mx-2">|</span> 
                {String(slides.length).padStart(2, "0")}
              </p>

              {/* Name */}
              <div className="ml-10">
                <FadeUpScroll delay={0.3} key={activeIndex}>
                  <h3 className="text-xl font-semibold">{activeSlide.title}</h3>
                </FadeUpScroll>
                <p className="text-sm text-gray-500 mt-2">
                  {activeSlide.jobTitle}
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="h-px bg-gray-300 w-full"></div>

            <div className="flex items-center relative">
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm ml-10">
                {activeSlide.description}
              </p>
            </div> 
          </div>

          {/* CENTER IMAGE src="/about/aboutIntro.jpg"*/}
          <div className="flex flex-col items-center">
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

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
                <img src="/about/linkedin.svg" alt="" className="w-4 h-4"/>
              </a>
              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
                <img src="/about/whatsapp.svg" alt="" className="w-4 h-4"/>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-around">

            <div>
              <p className="text-xs text-gray-400">Work Experience:</p>
              <p className="text-lg font-semibold mt-1">{activeSlide.experience}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Country:</p>
              <p className="text-lg font-semibold mt-1">{activeSlide.country}</p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
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