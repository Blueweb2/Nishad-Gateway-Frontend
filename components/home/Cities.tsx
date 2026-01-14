"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OvalArrow from "@/components/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";


export default function Cities() {
  return (
    <section className="relative w-full h-[110vh] text-white overflow-hidden">
      {/* BACKGROUND (lowest) */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/citiesbg.webp"
          alt="City view"
          className="w-full h-full"
          priority
          speed={160}
        />
      </div>

      {/* DARK OVERLAY */}
      {/* DARK OVERLAY (above bg) */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* FULL-WIDTH CONTROLS (top) */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-30">
        <div className="w-full h-full flex justify-end px-10 pt-24">

          {/* COUNTER */}
          <div className="flex flex-col items-end leading-none text-white">
            {/* TOP SMALL */}
            <span className="text-sm font-medium opacity-70">
              2/
            </span>

            {/* BIG NUMBER */}
            <span className="text-4xl font-semibold">
              4
            </span>
          </div>

        </div>

        {/* BOTTOM RIGHT ARROWS */}
        <div className="absolute bottom-24 right-10 flex gap-3 pointer-events-auto">
          <div className="flex gap-6">
            <OvalArrow
              direction="left"
              onClick={() => console.log("Prev city")}
            />
            <OvalArrow
              direction="right"
              className="w-[20px] h-[30px]"
              onClick={() => console.log("Next city")}
            />
          </div>
        </div>
      </div>

      {/* ================= CONSTRAINED CONTENT ================= */}
      <div className="relative z-20 max-w-[1320px] mx-auto px-6 h-full flex flex-col justify-between py-20">
        {/* TOP TITLE */}
        <h2 className="text-center text-[40px] font-semibold tracking-wide mb-20">
          Where You Operate Matters
        </h2>



        {/* INFO + DIVIDER */}
        <div className="mb-16">
          <div className="flex items-start gap-24">
            <div>
              <p className="text-xs uppercase text-white/70 mb-2">
                Best suited for
              </p>
              <p className="text-sm text-white/90 max-w-xs">
                Trading, logistics, tourism,
                consumer-facing businesses
              </p>
            </div>

            <div>
              <p className="text-xs uppercase text-white/70 mb-2">
                Focus
              </p>
              <p className="text-sm text-white/90 max-w-xs">
                Lifestyle-friendly gateway to
                Red Sea trade routes
              </p>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="mt-10 w-full h-px bg-white/30" />
        </div>

        {/* CITY CONTENT */}
        <div>
          {/* CITY NAME + ARROW */}
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-[82px] font-bold leading-none">
              Jeddah
            </h3>

            <OvalArrow
              direction="right"
              className="w-[62px] h-[102px]"
            />


          </div>

        </div>

        {/* BOTTOM CTA */}
        <div className="flex justify-center">
          <button
            className="bg-green-600 hover:bg-green-700
                       text-white text-sm
                       px-10 py-3
                       rounded-full
                       transition"
          >
            Calculate Your KSA Expansion Cost
          </button>
        </div>

      </div>
    </section>
  );
}
