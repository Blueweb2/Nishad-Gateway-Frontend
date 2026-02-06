"use client";

import Image from "next/image";
import WaterTouchHover from "@/components/user/shared/WaterTouchHover";
import FadeUp from "../ui/FadeUp";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Background Image */}
      <Image
        src="/riyadhhero.webp"
        alt="Saudi Arabia Landscape"
        fill
        priority
        className="object-cover"
      />

      {/* Water Effect */}
      <WaterTouchHover className="z-[5]" strength={1.5} />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[6] pointer-events-none bg-gradient-to-b from-black/60 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col px-6">
        <div className="mt-auto mb-[10px] text-center">

          <FadeUp delay={1.2}>
            <p className="text-white text-[35px] lg:text-[40px] mb-1">
              Your Gateway to
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            <h2
              className="
                w-full
                text-white
                font-extrabold
                text-[16vw]
                leading-[0.85]
                text-center
                whitespace-nowrap
              "
            >
              Saudi Arabia
            </h2>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
