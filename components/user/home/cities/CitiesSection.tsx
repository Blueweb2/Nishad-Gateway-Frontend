"use client";

import { useEffect, useState } from "react";
import { getCities } from "@/lib/api/public";
import CitySlide, { City } from "./CitySlide";
import OvalArrow from "@/components/user/ui/OvalArrow";

export default function CitiesSection() {
  const [cities, setCities] = useState<City[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { cities } = await getCities(); // ✅ works
        setCities(cities);
      } catch (error) {
        console.error("Failed to load cities", error);
      }
    };

    fetchCities();
  }, []);

  if (cities.length === 0) return null;

  const total = cities.length;
  const current = index + 1;

  const prev = () =>
    setIndex((i) => (i === 0 ? total - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section className="relative">
      {/* SLIDE */}
      <CitySlide city={cities[index]} />

   {/* RIGHT CONTROLS */}
<div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-6">

  {/* SLIDE COUNT */}
  <div className="text-white flex items-baseline gap-1">
    <span className="text-[22px] font-semibold leading-none">
      {current}
    </span>
    <span className="text-white/70 text-sm leading-none">
      / {total}
    </span>
  </div>

  {/* OVAL ARROWS – SIDE BY SIDE */}
  <div className="flex items-center gap-4">
    <OvalArrow
      direction="left"
      onClick={prev}
      className="w-[48px] h-[64px]"
    />

    <OvalArrow
      direction="right"
      onClick={next}
      className="w-[48px] h-[64px]"
    />
  </div>
</div>
    </section>
  );
}