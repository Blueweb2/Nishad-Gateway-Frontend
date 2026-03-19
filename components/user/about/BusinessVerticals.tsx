"use client";

import { useState } from "react";
import OvalArrow from "@/components/user/ui/OvalArrow";

const verticals = [
  {
    title: "Business Consultancy",
    subtitle: "Strategic advisory to help companies enter and grow in Saudi Arabia.",
    image: "about/business-consultancy.jpg",
    points: [
      "Business Planning",
      "Market Entry Strategy",
      "Feasibility Studies",
      "Investment Advisory",
    ],
  },
  {
    title: "Company Formation",
    subtitle: "End-to-end support for establishing businesses in Saudi Arabia.",
    image: "/about/company_formation.webp",
    points: [
      "MISA Licensing",
      "Company Incorporation",
      "Legal Structuring",
      "Government Approvals"
    ],
  },
  {
    title: "Regulatory & Compliance",
    subtitle: "Ensuring businesses operate fully compliant with Saudi regulations",
    image: "/about/regulatory-and-compliance.webp",
    points: [
      "Legal Compliance",
      "Saudization Advisory",
      "Regulatory Filings",
      "Corporate Governance"
    ],
  },
  {
    title: "Business Expansion Support",
    subtitle: "Helping companies scale operations and strengthen market presence",
    image: "/about/business-consultancy.jpg",
    points: [
      "Office Setup",
      "Operational Strategy",
      "Local Partnership Support",
      "Market Expansion Planning"
    ],
  },
  {
    title: "Strategic Investment Advisory",
    subtitle: "Guiding investors to identify and leverage opportunities in Saudi Arabia.",
    image: "/about/Strategic-investment-advisory.webp", 
    points: [
      "Vision 2030 Opportunities",
      "Sector Market Insights",
      "Investment Structuring",
      "Growth Strategy"
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
      ? verticals[verticals.length - 1].title
      : verticals[activeIndex - 1].title;


  return (
    <section
      className="relative w-full min-h-screen text-white overflow-hidden "
      data-navbar="light"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-700"
      >
        <img src={current.image} alt={current.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"/>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Main Grid */}
      <div className="relative z-20 min-h-screen lg:py-0 px-6 md:px-10 lg:px-[5vw] grid grid-cols-1  lg:grid-cols-3 items-center gap-12">

        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-end text-center lg:text-left h-[140px] lg:h-[300px]">

          <h2 className="text-3xl sm:text-4xl lg:text-[3vw] font-semibold leading-tight mb-0 lg:mb-8">
            Our Global <br className="hidden lg:block" />
            Business <br />
            Verticals
          </h2>

          {/* Bottom Left Info */}
          <div>

            <div className="flex justify-center lg:justify-start items-center gap-3 text-white/60 text-sm lg:text-[1vw] mb-4">
              <span>{formattedCurrent}</span>
              <span>|</span>
              <span>{formattedTotal}</span>
            </div>

            {/* ONLY SHOW IN LARGE DIVICE */}
            <p className="hidden lg:block text-white/40 text-lg mb-4 max-w-xs">
              {previousTitle}
            </p>

            <div className="hidden lg:block h-px bg-white/20 w-full" />
          </div>
        </div>

        {/* CENTER GLASS CAPSULE */}
        <div className="relative flex items-center justify-center">

          <div
            className="
            absolute
            w-[220px] h-[280px]
            sm:w-[260px] sm:h-[320px]
            lg:w-[26vw] lg:h-[32vw]
            bg-white/10 backdrop-blur-xxl
            border border-white/10
            rounded-[160px]
          "
          />
          <h3 className="relative z-10 text-xl sm:text-2xl lg:text-[2.2vw] font-semibold text-center max-w-[200px] lg:max-w-[16vw] leading-tight h-[40px] lg:h-auto">
            {current.title}
          </h3>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col justify-end items-center lg:items-end lg:h-[300px]">

          <div className="hidden lg:block w-full h-full">
            <p className="text-white/90 text-lg mb-4 max-w-xs">
              {current.subtitle}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start w-full max-w-md lg:max-w-[28vw] lg:border-b lg:border-white/20 lg:pb-6">

            {/* ONLY SHOW IN MOBILE */}
            <p className="lg:hidden text-white/90 text-lg mb-4 max-w-xs h-[60px] mt-5">
              {current.subtitle}
            </p>

            <ul className="grid grid-cols-2 lg:grid-cols-1 gap-y-3 gap-x-6 text-white/90 text-sm lg:text-[1vw] mb-6 lg:mb-0 h-[90px] lg:h-auto">
              {current.points.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-2 w-2 h-2 bg-white rounded-full" />
                  {point}
                </li>
              ))}
            </ul>

            
            <div className="flex gap-4 h-[30px] lg:h-auto">
              <OvalArrow direction="left" variant="white" onClick={prevSlide} />
              <OvalArrow direction="right" variant="white" onClick={nextSlide} />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};