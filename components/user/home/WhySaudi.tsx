"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import OvalArrow from "@/components/user/ui/OvalArrow";

const slides = [
  {
    title: "Vision 2030 Investment Growth",
    content:
      "The Vision 2030 program is fueling massive strategic development projects, industrial zones, tourism development, and economic transformation programs that attract foreign direct investment (FDI) into Saudi Arabia.",
    image: "/vision 2030.svg",
  },
  {
    title: "Strategic Global Location.",
    content:
      "Being situated at the intersection of Asia, Europe, and Africa, Saudi Arabia serves a strategic logistics and business gateway for companies looking to expand across the GCC and Middle East.",
    image: "/strategic global location.svg",
  },
  {
    title: "100% Foreign Ownership",
    content:
      "Foreign ownership of up to 100% is permitted in most industries, allowing foreign investors to set up wholly foreign-owned businesses through a structured company formation in Saudi Arabia.",
    image: "/100-foreign-ownership.svg",
  },
  {
    title: "Fast & Structured Business Setup",
    content:
      "Saudi Arabia offers fast business setup options through online government services, fast-track MISA approvals, simplified Commercial Registration (CR), and well-defined compliance procedures.",
    image: "/fast and structured business setup.svg",
  },
  {
    title: "High-Growth Sectors",
    content:
      "Saudi Arabia offers growth-ready investment opportunities in healthcare, logistics, fintech, manufacturing, renewable energy, and tourism sectors, making it one of the top investment destinations in the GCC.",
    image: "/high-growth sectors.svg",
  },
  {
    title: "Strong Economy & Stability",
    content:
      "Saudi Arabia is the biggest economy in the Middle East, providing strong economic stability, a USD pegged exchange rate, and government-supported growth programs that boost overall investment confidence.",
    image: "/strong economy and stability.svg",
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
                py-12 px-6 md:px-16"
      data-menu="dark-text"
      data-navbar="light"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-center">

        {/* Left Title */}
        <div className="text-center md:text-left">
          <p className="text-lg md:text-2xl font-semibold">Why</p>
          <h2 className="text-3xl md:text-5xl font-bold leading-tight">
            Saudi Arabia
          </h2>
        </div>

        {/* Slide Content */}
        <div className="relative min-h-[240px] flex justify-center md:block">

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col gap-6 md:gap-8 items-center md:items-start text-center md:text-left"
            >
              {/* Image */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center md:justify-start">
                <Image
                  src={slides[index].image}
                  alt={slides[index].title}
                  width={130}
                  height={130}
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <div className="max-w-sm md:max-w-md">
                <h3 className="text-lg md:text-2xl font-semibold mb-3">
                  {slides[index].title}
                </h3>

                <p className="text-gray-600 leading-tight text-base md:text-lg h-[90px] md:h-auto">
                  {slides[index].content}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Right Image */}
        <div className="h-full w-full relative mt-8 md:mt-0 pt-6">
          <div className="flex justify-end items-center gap-6 absolute top-5 right-0">

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

          <img
            src="/why-saudi-arabia.svg"
            alt="saudi arabia"
            className="w-full max-w-[380px] md:max-w-none mx-auto md:mx-0"
          />
        </div>

      </div>
    </section>
  );
};