"use client";

import Link from "next/link";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "@/components/user/shared/ParallaxImage";
import FadeUpScroll from "../../ui/FadeUpScroll";

export type City = {
  cityName: string;
  citySlug: string;
  cityImage?: string;
  heading: string;
  description: string;
};

type Props = {
  city?: City;
};

export default function CitySlide({ city }: Props) {
  if (!city) {
    return (
      <div className="bg-red-500 text-white p-[2vw] text-center">
        City is undefined
      </div>
    );
  }

  return (
    <section className="relative w-full h-[110vh] text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={city.cityImage || "/citiesbg.webp"}
          alt={city.cityName}
          className="w-full h-full object-cover"
          priority
          speed={160}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      <div className="relative z-20 max-w-[91.6vw] mx-auto px-[4vw] h-full flex flex-col py-[4vw]">

        {/* Section Title */}
        <FadeUpScroll delay={0.1}>
          <h2 className="text-center text-[2.9vw] font-semibold mb-[6vw] mt-[3vw]">
            Cities & Zones in Saudi Arabia
          </h2>
        </FadeUpScroll>

        {/* Heading + Description (Same Row) */}
        <div className="grid grid-cols-3 items-start mb-[1.5vw]">

          {/* Heading - Left */}
          <FadeUpScroll delay={0.2}>
            <h4 className="text-[1.8vw]  leading-[1.8vw] tracking-wide  max-w-[18vw]  text-[#00A63E]">
              {city.heading}
            </h4>
          </FadeUpScroll>

          {/* Empty middle column for balance */}
          {/* <div /> */}

          {/* Description - Centered column */}
          <FadeUpScroll delay={0.3}>
            <div className="flex justify-center">
              <p className="text-white/90 text-[1vw] leading-[1.2vw] max-w-[20vw] text-left">
                {city.description}
              </p>
            </div>
          </FadeUpScroll>

        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 mb-[10vw]" />

        {/* City Name + Arrow */}
        <div className="mb-[4vw]">
          <div className="flex items-center gap-[2vw]">
            <FadeUpScroll delay={0.2}>
              <h3 className="text-[6.25vw] font-bold leading-none tracking-tight">
                {city.cityName}
              </h3>
            </FadeUpScroll>

            <Link href={`/cities/${city.citySlug}`} className="group mt-[1vw]">
              <OvalArrow
                direction="right"
                className="w-[4.3vw] h-[7vw] transition-transform group-hover:translate-x-[0.5vw]"
              />
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <FadeUpScroll delay={0.4}>
            <Link href="/ksa-expansion-cost-calculator">
              <button className="bg-green-600 hover:bg-green-700 text-white text-[1vw] font-medium px-[2vw] py-[0.8vw] rounded-full transition-all duration-300 hover:shadow-lg">
                Calculate Your KSA Expansion Cost
              </button>
            </Link>
          </FadeUpScroll>
        </div>

      </div>
    </section>
  );
}
