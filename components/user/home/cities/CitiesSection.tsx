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
    <section className="relative" >
      {/* Slider Container */}
      <div
        className="relative overflow-hidden h-[100vh]" data-menu="dark-text"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={{ x: direction > 0 ? "100%" : "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: direction > 0 ? "-100%" : "100%" }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1], // premium easing
            }}
            className="absolute inset-0"
          >
            <CitySlide city={cities[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Navigation */}
      <div className="absolute right-16 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-8">

        {/* Counter */}
        <div className="text-white flex items-start gap-0.5 mt-5">
          <span className="text-[28px] font-bold leading-none">
            {current}
          </span>
          <span className="text-white/60 text-lg leading-none pt-1">
            /{total}
          </span>
        </div>

        {/* Arrows */}
        <div className="flex flex-col items-center gap-4">
          <OvalArrow
            direction="left"
            onClick={prev}
            className="w-[32px] h-[48px] transition-transform hover:scale-110 active:scale-95"
          />
          <OvalArrow
            direction="right"
            onClick={next}
            className="w-[32px] h-[48px] transition-transform hover:scale-110 active:scale-95"
          />
        </div>
      </div>
    </section>
  );
}
