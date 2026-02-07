"use client";

import Link from "next/link";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "@/components/user/shared/ParallaxImage";
import FadeUpScroll from "../../ui/FadeUpScroll";

export type City = {
  cityName: string;
  citySlug: string;
  cityImage?: string;
  bestSuitedFor?: string;
  focus?: string;
};

type Props = {
  city?: City;
};

export default function CitySlide({ city }: Props) {
  console.log("🎯 CitySlide received city:", city);

  if (!city) {
    console.log("❌ CitySlide received undefined city");
    return (
      <div className="bg-red-500 text-white p-10 text-center">
        City is undefined
      </div>
    );
  }

  return (
    <section className="relative w-full h-[110vh] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={city.cityImage || "/citiesbg.webp"}
          alt={city.cityName}
          className="w-full h-full object-cover"
          priority
          speed={160}
        />
      </div>

      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20 max-w-[1320px] mx-auto px-6 h-full flex flex-col py-16">
        {/* Title */}
        <FadeUpScroll delay={0.1}>
          <h2 className="text-center text-[42px] font-semibold mb-24">
            Where You Operate Matters
          </h2>
        </FadeUpScroll>

        {/* Best Suited For & Focus Section */}
        <div className="mb-auto">
          <div className="flex items-start gap-32">
            <div>
              <FadeUpScroll delay={0.2}>
                <p className="text-sm font-bold uppercase text-white mb-3 tracking-wide">
                  BEST SUITED FOR:
                </p>
              </FadeUpScroll>
              <FadeUpScroll delay={0.3}>
                <p className="text-base text-white/90 max-w-xs leading-relaxed">
                  {city.bestSuitedFor || "—"}
                </p>
              </FadeUpScroll>
            </div>

            <div>
              <FadeUpScroll delay={0.2}>
                <p className="text-sm font-bold uppercase text-white mb-3 tracking-wide">
                  FOCUS:
                </p>
              </FadeUpScroll>
              <FadeUpScroll delay={0.3}>
                <p className="text-base text-white/90 max-w-md leading-relaxed">
                  {city.focus || "—"}
                </p>
              </FadeUpScroll>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 mb-12" />

        {/* City Name with Arrow */}
        <div className="mb-16">
          <div className="flex items-center gap-6">
            <FadeUpScroll delay={0.2}>
              <h3 className="text-[90px] font-bold leading-none tracking-tight">
                {city.cityName}
              </h3>
            </FadeUpScroll>
            <Link href={`/cities/${city.citySlug}`} className="group mt-4">
              <OvalArrow
                direction="right"
                className="w-[62px] h-[102px] transition-transform group-hover:translate-x-2"
              />
            </Link>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <FadeUpScroll delay={0.4}>
            <Link href="/ksa-expansion-cost-calculator">
              <button className="bg-green-600 hover:bg-green-700 text-white text-base font-medium px-12 py-4 rounded-full transition-all duration-300 hover:shadow-lg">
                Calculate Your KSA Expansion Cost
              </button>
            </Link>
          </FadeUpScroll>
        </div>
      </div>
    </section>
  );
}