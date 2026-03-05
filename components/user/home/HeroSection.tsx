"use client";

import Image from "next/image";
import WaterTouchHover from "@/components/user/shared/WaterTouchHover";
import FadeUpMount from "../ui/FadeUpMount";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background Image */}
      <Image
        src="/riyadhhero.webp"
        alt="Saudi Arabia Landscape"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Water Effect */}
      <WaterTouchHover className="z-[5]" strength={1.5} />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 sm:px-6 lg:px-6">
        <div className="mt-auto mb-[10px] text-center">

          <FadeUpMount delay={0.3}>
            <p className="text-white text-[20px] sm:text-[26px] md:text-[30px] lg:text-[35px] xl:text-[40px] mb-1">
              Your Gateway to
            </p>
          </FadeUpMount>

          <FadeUpMount delay={0.6}>
            <h2 className="text-white font-extrabold leading-[0.85] text-center text-[20vw] sm:text-[18vw] 
            md:text-[17vw] lg:text-[16vw] whitespace-normal lg:whitespace-nowrap">
              Saudi Arabia
            </h2>
          </FadeUpMount>

        </div>
      </div>

    </section>
  );
};