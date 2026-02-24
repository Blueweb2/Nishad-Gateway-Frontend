"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import OvalArrow from "@/components/user/ui/OvalArrow";

const slides = [
  {
    title: "Vision 2030–Driven Growth",
    content:
      "Massive government investment is transforming the economy and opening new industries.",
    image: "/vision.svg",
  },
  {
    title: "Strategic Global Location",
    content:
      "Saudi Arabia connects Asia, Europe, and Africa, making it a gateway for regional expansion.",
    image: "/icons/Strategic-Global-Location.svg",
  },
  {
    title: "100% Foreign Ownership Options",
    content:
      "Many sectors allow full foreign ownership with strong investor protections.",
    image: "/icons/Foreign-Ownership-Options.svg",
  },
  {
    title: "Business-Friendly Reforms",
    content:
      "Fast company setup, digital government portals, and transparent regulations.",
    image: "/icons/Business-Friendly-Reforms.svg",
  },
  {
    title: "High-Growth Sectors",
    content:
      "Opportunities across healthcare, logistics, manufacturing, fintech, tourism, and energy.",
    image: "/icons/High-Growth-Sectors.svg",
  },
  {
    title: "Strong Economy & Stability",
    content:
      "The largest economy in the Middle East with stable currency and government-backed growth.",
    image: "/icons/Strong-Economy-Stability.svg",
  },
];

export default function WhySaudi() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const nextSlide = () => {
    setIndex([(index + 1) % slides.length, 1]);
  };

  const prevSlide = () => {
    setIndex([(index - 1 + slides.length) % slides.length, -1]);
  };

  // Auto Play
  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [index, paused]);

  return (
    <section
      className="relative w-full bg-green-50 text-black
                 py-12 md:py-12 px-6 md:px-16" data-menu="dark-text" data-navbar="light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top Controls */}
      <div className="flex justify-end items-center gap-6 ">
        <span className="text-sm text-gray-500">
          {index + 1} /
          <span className="text-black font-semibold ml-1">
            {slides.length}
          </span>
        </span>

        <div className="flex gap-3">
          <OvalArrow direction="left" variant="gray" onClick={prevSlide} />
          <OvalArrow direction="right" variant="gray" onClick={nextSlide} />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-3 gap-12 items-center">

        {/* Left Static Title */}
        <div>
          <p className="text-lg md:text-2xl font-semibold">Why</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Saudi Arabia
          </h2>
        </div>

        {/* Slide Content */}
        <div className=" min-h-[220px] relative">

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-8 items-start"
            >
              {/* Image */}
          <div className="w-40 h-40 md:w-48 md:h-48 flex items-center justify-center mb-8">
  <Image
    src={slides[index].image}
    alt={slides[index].title}
    width={110}
    height={110}
    className="object-contain md:w-[130px] md:h-[130px]"
  />
</div>

              {/* Text */}
              <div className="max-w-md">
                <h3 className="text-lg md:text-2xl font-semibold mb-3">
                  {slides[index].title}
                </h3>

                <p className="text-gray-600 leading-tight text-base md:text-lg">
                  {slides[index].content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        <div className="h-full w-full">
          <img src="/why-saudi-arabia.svg" alt="saudi arabia" />
        </div>
      </div>
    </section>
  );
}