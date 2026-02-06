"use client";

import { useState } from "react";
import Image from "next/image";
import OvalArrow from "@/components/user/ui/OvalArrow";

const slides = [
  {
    title: "Vision 2030–Driven Growth",
    content:
      "Massive government investment is transforming the economy and opening new industries.",
  },
  {
    title: "Strategic Global Location",
    content:
      "Saudi Arabia connects Asia, Europe, and Africa, making it a gateway for regional expansion.",
  },
  {
    title: "100% Foreign Ownership Options",
    content:
      "Many sectors allow full foreign ownership with strong investor protections.",
  },
  {
    title: "Business-Friendly Reforms",
    content:
      "Fast company setup, digital government portals, and transparent regulations.",
  },
  {
    title: "High-Growth Sectors",
    content:
      "Opportunities across healthcare, logistics, manufacturing, fintech, tourism, and energy.",
  },
  {
    title: "Strong Economy & Stability",
    content:
      "The largest economy in the Middle East with stable currency and government-backed growth.",
  },
];

export default function WhySaudi() {
  const [index, setIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
    setAnimateKey((prev) => prev + 1); // trigger animation
  };

  return (
    <section
      data-navbar="white"
      data-menu="dark-text"
      className="relative w-full bg-white text-black py-[6vw] px-[0vw] overflow-hidden"
    >
      {/* PAGINATION */}
      <div className="absolute inset-x-0 top-0">
        <div className="w-full flex justify-end px-[2vw] pt-[3vw]">
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-600">
              {index + 1} / <span className="text-black">6</span>
            </span>

            <button onClick={nextSlide}>
              <OvalArrow
                direction="right"
                variant="gray"
                className="w-[2.2vw] h-[3vw]"
              />
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative max-w-[85vw] mx-auto px-[0vw]">

        <div className="grid grid-cols-3 gap-[6vw] items-start">

          {/* LEFT STATIC TITLE */}
          <div>
            <p className="text-[2vw] font-semibold">Why</p>
            <h2 className="text-[4vw] font-bold leading-tight">
              Saudi Arabia
            </h2>
          </div>

          {/* CENTER SLIDE CONTENT */}
          {/* CENTER SLIDE CONTENT */}
          <div key={index} className="flex flex-col items-start">

            <Image
              src="/vision.svg"
              alt="Vision 2030"
              width={80}
              height={80}
              className="fade-up-animate"
            />

            <div className="mt-[12vw] max-w-[30vw]">

              <h3 className="text-[1.5vw] font-medium mb-[1vw] fade-up-animate">
                {slides[index].title}
              </h3>

              <p
                className="text-gray-500 leading-relaxed text-[1.1vw] fade-up-animate"
                style={{ animationDelay: "0.15s" }}
              >
                {slides[index].content}
              </p>

            </div>
          </div>


          {/* EMPTY RIGHT COLUMN */}
          <div />
        </div>

        {/* DIVIDER */}
        <div className="mt-[4vw] border-t border-gray-200" />
      </div>
    </section>
  );
}
