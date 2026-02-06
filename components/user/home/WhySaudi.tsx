"use client";

import { useState } from "react";
import Image from "next/image";
import OvalArrow from "@/components/user/ui/OvalArrow";
import FadeUp from "../ui/FadeUp";

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

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section
      data-navbar="white"
      data-menu="dark-text"
      className="relative w-full bg-white text-black py-[4vw] overflow-hidden"
    >
      {/* PAGINATION */}
      <div className="absolute inset-x-0 top-0">
        <div className="w-full flex justify-end px-[2vw] pt-[4vw]">
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
      <div className="relative max-w-[85vw] mx-auto">

        <div className="grid grid-cols-3 gap-[6vw] items-start">

          {/* LEFT STATIC TITLE */}
          <div className="leading-tight">
            <FadeUp><p className="text-[2vw] font-semibold">Why</p></FadeUp>

            <FadeUp triggerKey={index} delay={0.1}>
              <h2 className="text-[2.18vw] font-bold leading-tight">
                Saudi Arabia
              </h2>
            </FadeUp>
          </div>

          {/* CENTER SLIDE CONTENT */}
          <div className="flex flex-col items-start">

            <FadeUp triggerKey={index} delay={0.15}>
              <Image
                src="/vision.svg"
                alt="Vision 2030"
                width={120}
                height={120}
              />
            </FadeUp>

            <div className="mt-[12vw] max-w-[20vw]">

              <FadeUp triggerKey={index} delay={0.3}>
                <h3 className="text-[1.5vw] font-medium">
                  {slides[index].title}
                </h3>
              </FadeUp>

              <FadeUp triggerKey={index} delay={0.45}>
                <p className="text-gray-500 leading-tight text-[1.1vw]">
                  {slides[index].content}
                </p>
              </FadeUp>

            </div>
          </div>

          {/* EMPTY RIGHT COLUMN */}
          <div />
        </div>

        {/* DIVIDER */}
        <div className="mt-[2vw] border-t border-gray-200" />
      </div>
    </section>
  );
}
