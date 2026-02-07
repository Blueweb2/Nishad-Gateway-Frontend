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
      <div className="bg-red-500 text-white p-10 text-center">
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

      <div className="relative z-20 max-w-[1320px] mx-auto px-6 h-full flex flex-col py-16">

        {/* Section Title */}
        <FadeUpScroll delay={0.1}>
          <h2 className="text-center text-[42px] font-semibold mb-24">
            Where You Operate Matters
          </h2>
        </FadeUpScroll>

        {/* Heading + Description */}
        <div className="mb-auto max-w-3xl">
          <FadeUpScroll delay={0.2}>
            <h4 className="text-lg uppercase tracking-wide font-semibold mb-4">
              {city.heading}
            </h4>
          </FadeUpScroll>

          <FadeUpScroll delay={0.3}>
            <p className="text-white/90 text-base leading-relaxed">
              {city.description}
            </p>
          </FadeUpScroll>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/20 mb-12" />

        {/* City Name + Arrow */}
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

        {/* CTA */}
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
