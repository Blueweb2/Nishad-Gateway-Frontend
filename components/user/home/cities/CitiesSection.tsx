"use client";

import { useEffect, useState } from "react";
import { getCities } from "@/lib/api/public/city.api";


import CitySlide, { City } from "./CitySlide";
import OvalArrow from "@/components/user/ui/OvalArrow";

export default function CitiesSection() {
  const [cities, setCities] = useState<City[]>([]);
  const [index, setIndex] = useState(0);

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

  if (cities.length === 0) {
    return (
      <div className="text-center py-20 bg-black text-white">
        No cities available
      </div>
    );
  }

  const total = cities.length;
  const current = index + 1;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section className="relative">
      <CitySlide city={cities[index]} />

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
