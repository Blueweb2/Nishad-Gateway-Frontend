"use client";

import { useState } from "react";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";

const verticals = [
  {
    title: "Business Consultancy",
    subtitle: "Management Consultancy",
    image: "/about/buisnessveriticals.jpg",
    points: [
      "Business Planning",
      "Market Entry Strategy",
      "Feasibility Studies",
    ],
  },
  {
    title: "Investment Advisory",
    subtitle: "Capital & Growth Advisory",
    image: "/about/buisnessveriticals.jpg",
    points: [
      "Investment Structuring",
      "Due Diligence",
      "Risk Assessment",
    ],
  },
  {
    title: "Strategic Partnerships",
    subtitle: "Global Expansion Support",
    image: "/about/buisnessveriticals.jpg",
    points: [
      "Joint Ventures",
      "Local Sponsor Identification",
      "Regulatory Advisory",
    ],
  },
];

export default function BusinessVerticals() {
  const [activeIndex, setActiveIndex] = useState(0);

  const current = verticals[activeIndex];

  const nextSlide = () =>
    setActiveIndex((prev) =>
      prev === verticals.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setActiveIndex((prev) =>
      prev === 0 ? verticals.length - 1 : prev - 1
    );

  const formattedCurrent = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(verticals.length).padStart(2, "0");

  const previousTitle =
    activeIndex === 0
      ? verticals[verticals.length - 1].subtitle
      : verticals[activeIndex - 1].subtitle;

  return (
    <section
      className="relative w-full h-screen text-white overflow-hidden"
      data-navbar="light"
    >
      {/* Background */}
      <div
        key={activeIndex}
        className="absolute inset-0 z-0 transition-opacity duration-700"
      >
        <ParallaxImage
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
          priority
          speed={160}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Main Grid */}
      <div className="relative z-20 h-full px-[5vw] grid grid-cols-3 items-center">

        {/* LEFT COLUMN */}
        <div className="flex flex-col h-full justify-center">

          <h2 className="text-[3vw] font-semibold leading-tight mb-[2vw] mt-[6vw]">
            Our Global <br />
            Business <br />
            Verticals
          </h2>

          {/* Bottom Left Info */}
          <div className="mt-auto mb-[14vw]">
            <div className="flex items-center gap-[1vw] text-white/60 text-[1vw] mb-[1vw]">
              <span>{formattedCurrent}</span>
              <span>|</span>
              <span>{formattedTotal}</span>
            </div>

            <p className="text-white/40 text-[1.4vw] mb-[1vw] w-[12vw] leading-tight">
              {previousTitle}
            </p>

            <div className="h-px bg-white/20 w-full" />
          </div>
        </div>

        {/* CENTER GLASS CAPSULE */}
        <div className="relative flex items-center justify-center">

          <div className="absolute w-[26vw] h-[32vw] bg-white/10 backdrop-blur-xxl border border-white/10
            rounded-[160px]"/>

          <h3 className="relative z-10 text-[2.2vw] font-semibold text-center max-w-[16vw] leading-tight">
            {current.title}
          </h3>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center max-w-[28vw] ml-auto h-full mt-[8vw] w-full border-b border-white/20">

            <ul className="space-y-[1vw] text-white/90 text-[1vw] mb-[2vw]">
              {current.points.map((point, index) => (
                <li key={index} className="flex items-start gap-[0.8vw]">
                  <span className="mt-[0.4vw] w-[0.4vw] h-[0.4vw] bg-white rounded-full" />
                  {point}
                </li>
              ))}
            </ul>

            {/* Arrows */}
            <div className="flex gap-[1.5vw]">
              <OvalArrow direction="left" variant="white" onClick={prevSlide} />
              <OvalArrow direction="right" variant="white" onClick={nextSlide} />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};