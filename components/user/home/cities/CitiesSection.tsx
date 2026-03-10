"use client";

import { useEffect, useState } from "react";
import { getCities } from "@/lib/api/public/city.api";
import CitySlide, { City } from "./CitySlide";
import OvalArrow from "@/components/user/ui/OvalArrow";
import { motion, AnimatePresence } from "framer-motion";

export default function CitiesSection() {
  const [cities, setCities] = useState<City[]>([]);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const data = await getCities();
        setCities(data);
      } catch (error) {
        console.error("Failed to load cities", error);
      }
    };

    fetchCities();
  }, []);

  const total = cities.length;

  // 🔥 Auto Slide with Pause Support
  useEffect(() => {
    if (total === 0 || isPaused) return;

    const timer = setTimeout(() => {
      setDirection(1);
      setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, total, isPaused]);

  if (total === 0) {
    return (
      <div className="text-center py-20 bg-black text-white">
        No cities available
      </div>
    );
  }

  const current = index + 1;

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i === 0 ? total - 1 : i - 1));
  };

  const next = () => {
    setDirection(1);
    setIndex((i) => (i === total - 1 ? 0 : i + 1));
  };


  return (
    <section className="relative w-full" data-navbar="light">

      {/* Slider Container */}
      <div
className="relative overflow-hidden h-[100dvh] lg:h-[90dvh]"  
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: direction > 0 ? "-100%" : "100%" }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <CitySlide city={cities[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div
        className="
        absolute z-40
        bottom-6 left-1/2 -translate-x-1/2
        flex items-center gap-6
        lg:flex-col lg:items-center
        lg:right-10 lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0
        w-full lg:w-auto px-[4vw] lg:px-0"
      >

        {/* Counter */}
        <div className="text-white hidden lg:flex items-start gap-1">
          <span className="text-[22px] lg:text-[28px] font-bold leading-none">
            {current}
          </span>
          <span className="text-white/60 text-sm lg:text-lg leading-none pt-[2px]">
            /{total}
          </span>
        </div>

        {/* Arrows */}
        <div className="hidden lg:flex lg:flex-col items-center gap-4">
          <OvalArrow
            direction="left"
            onClick={prev}
            className="w-[26px] h-[40px] lg:w-[32px] lg:h-[48px] transition-transform hover:scale-110 active:scale-95"
          />
          <OvalArrow
            direction="right"
            onClick={next}
            className="w-[26px] h-[40px] lg:w-[32px] lg:h-[48px] transition-transform hover:scale-110 active:scale-95"
          />
        </div>

        {/* Counter and Arrows ( ONLY SHOW IN MOBILE ) */}
        <div className="lg:hidden relative w-full">
            {/* Counter */}
          <div className="text-white flex items-start justify-center gap-1 absolute left-1/2 top-1/2 
          -translate-x-1/2 -translate-y-1/2">
            <span className="text-[22px] md:text-[28px] font-bold leading-none">
              {current}
            </span>
            <span className="text-white/60 text-sm leading-none pt-[2px]">
              /{total}
            </span>
          </div>

          {/* Arrows */}
          <div className="flex items-center justify-between gap-4">
            <OvalArrow
              direction="left"
              onClick={prev}
              className="w-[26px] h-[40px] transition-transform hover:scale-110 active:scale-95"
            />
            <OvalArrow
              direction="right"
              onClick={next}
              className="w-[26px] h-[40px] transition-transform hover:scale-110 active:scale-95"
            />
          </div>
        </div>

      </div>

    </section>
  );
};