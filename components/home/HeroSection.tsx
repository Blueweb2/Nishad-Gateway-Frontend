"use client";

import Image from "next/image";
import WaterTouchHover from "@/components/shared/WaterTouchHover";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <Image
        src="/herobg.webp"
        alt="Saudi Arabia Landscape"
        fill
        priority
        className="object-cover"
      />

      {/* Water Touch Effect (hover / mouse move) */}
      <WaterTouchHover className="z-[5]" strength={1.5} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[6] pointer-events-none bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col px-6">
        <div className="mt-auto mb-[10px] text-center">
          <p className="text-white text-[35px] lg:text-[40px] mb-1">
            Your Gateway to
          </p>

          <h1 className="text-white font-extrabold text-[67px] md:text-[150px] lg:text-[240px] leading-none">
            Saudi Arabia
          </h1>
        </div>
      </div>
    </section>
  );
}
