"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";

type City = {
  cityName: string;
  citySlug: string;
  bestSuitedFor?: string;
  focus?: string;
};

export default function Cities({ city }: { city: City }) {
  return (
    <section className="relative w-full h-[110vh] text-white overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/citiesbg.webp"
          alt="City view"
          className="w-full h-full"
          priority
          speed={160}
        />
      </div>

      {/* OVERLAY */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* CONTENT */}
      <div className="relative z-20 max-w-[1320px] mx-auto px-6 h-full flex flex-col justify-between py-20">
        {/* TITLE */}
        <h2 className="text-center text-[40px] font-semibold mb-20">
          Where You Operate Matters
        </h2>

        {/* INFO */}
        <div className="mb-16">
          <div className="flex items-start gap-24">
            <div>
              <p className="text-xs uppercase text-white/70 mb-2">
                Best suited for
              </p>
              <p className="text-sm text-white/90 max-w-xs">
                {city.bestSuitedFor || "—"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-white/70 mb-2">
                Focus
              </p>
              <p className="text-sm text-white/90 max-w-xs">
                {city.focus || "—"}
              </p>
            </div>
          </div>

          <div className="mt-10 w-full h-px bg-white/30" />
        </div>

        {/* CITY NAME + LINK */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[82px] font-bold leading-none">
              {city.cityName}
            </h3>

            <Link
              href={`/cities/${city.citySlug}`}
              aria-label={`Explore ${city.cityName} city guide and categories`}
              prefetch
              className="group"
            >

              <OvalArrow
                direction="right"
                className="w-[62px] h-[102px] transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* CTA */}


        <div className="flex justify-center">
          <Link href="/ksa-expansion-cost-calculator">
            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full transition">
              Calculate Your KSA Expansion Cost
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}