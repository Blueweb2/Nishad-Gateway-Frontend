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
    <section className="relative w-full min-h-screen text-white overflow-hidden">

      {/* Background */}
      <div key={activeIndex} className="absolute inset-0 z-0">
        <ParallaxImage
          src={current.image}
          alt={current.title}
          className="w-full h-full object-cover"
          priority
          speed={120}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Main Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-8 h-screen grid lg:grid-cols-3 items-center">

        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-center h-full">

          <h2 className="text-4xl lg:text-5xl font-semibold leading-tight mb-12">
            Our Global <br />
            Business <br />
            Verticals
          </h2>

          <div className="mt-auto mb-20">
            <div className="flex items-center gap-4 text-white/60 text-sm mb-6">
              <span>{formattedCurrent}</span>
              |
              <span>{formattedTotal}</span>
            </div>

            <p className="text-white/40 text-xl max-w-[250px] leading-snug mb-6">
              {previousTitle}
            </p>

            <div className="h-px bg-white/20 w-full" />
          </div>
        </div>

        {/* CENTER TITLE */}
        <div className="relative flex items-center justify-center">

          <div className="absolute w-[380px] h-[480px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[160px]" />

          <h3 className="relative z-10 text-3xl lg:text-4xl font-semibold text-center max-w-[260px] leading-snug">
            {current.title}
          </h3>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col justify-center items-start max-w-[400px] ml-auto">

          <ul className="space-y-4 text-white/90 mb-10">
            {current.points.map((point, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-2 h-2 bg-white rounded-full" />
                {point}
              </li>
            ))}
          </ul>

          <div className="h-px bg-white/20 w-full mb-10" />

          <div className="flex gap-6">
            <OvalArrow direction="left" variant="white" onClick={prevSlide} />
            <OvalArrow direction="right" variant="white" onClick={nextSlide} />
          </div>
        </div>
      </div>
    </section>
  );
}