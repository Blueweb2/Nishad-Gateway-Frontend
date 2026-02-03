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
        console.log("🔍 Fetching cities...");

        const data = await getCities();

        console.log("✅ Cities API Response:", data);

        setCities(data);
      } catch (error) {
        console.error("❌ Failed to load cities", error);
      }
    };

    fetchCities();
  }, []);

  console.log("📦 Cities state:", cities);
  console.log("📍 Current index:", index);

  if (cities.length === 0) {
    console.log("⚠️ No cities found");
    return (
      <div className="text-center py-20 bg-black text-white">
        No cities available
      </div>
    );
  }

  const total = cities.length;
  const current = index + 1;

  const prev = () =>
    setIndex((i) => (i === 0 ? total - 1 : i - 1));

  const next = () =>
    setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <section className="relative">
      <CitySlide city={cities[index]} />

      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-6">
        <div className="text-white flex items-baseline gap-1">
          <span className="text-[22px] font-semibold leading-none">
            {current}
          </span>
          <span className="text-white/70 text-sm leading-none">
            / {total}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <OvalArrow direction="left" onClick={prev} className="w-[48px] h-[64px]" />
          <OvalArrow direction="right" onClick={next} className="w-[48px] h-[64px]" />
        </div>
      </div>
    </section>
  );
}
