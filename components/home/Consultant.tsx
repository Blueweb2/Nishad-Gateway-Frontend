"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OvalArrow from "@/components/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";


export default function Consultant() {
  return (

    <section className="relative w-full h-[110vh] text-white overflow-hidden">
      {/* BACKGROUND (lowest layer) */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/consultantbg.webp"
          alt="Confidence beyond investment"
          className="w-full h-full"
          priority
          speed={160}
        />
      </div>

      {/* DARK OVERLAY (above bg) */}
      <div className="absolute inset-0 z-10 bg-black/60" />

      {/* FULL WIDTH CONTROLS */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none z-20">
        <div className="w-full h-full flex items-center justify-between px-10">
          {/* LEFT — COUNTER */}
          <div className="pointer-events-auto text-sm text-white/60">
            <div className="flex items-center gap-3">
              <span>01</span>
              <span>|</span>
              <span>07</span>
            </div>
          </div>

          {/* RIGHT — ARROWS */}
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="flex gap-6">
              <OvalArrow
                direction="left"
                variant="white"
                className="w-[24px] h-[36px]"
              />
              <OvalArrow
                direction="right"
                variant="white"
                className="w-[24px] h-[36px]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT (top layer) */}
      <div className="relative z-30 max-w-[1320px] mx-auto px-6 h-full">
        <div className="grid grid-cols-3 h-full items-center">
          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[32px] font-semibold leading-tight mb-10">
              Confidence <br />
              Beyond the <br />
              Investment
            </h2>

            <p className="text-white/40">Living & Housing</p>

            <div className="mt-6 w-40 h-px bg-white/20" />
          </div>

          {/* CENTER */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[360px] h-[480px] bg-white/10 rounded-[160px]" />
            <p className="relative z-10 text-2xl font-semibold text-center leading-tight">
              Education <br /> & Schools
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center items-start">
            <div className="flex items-center gap-6 text-sm mb-8">
              <button className="text-green-400 underline underline-offset-4">
                For Americans & Europeans
              </button>
              <button className="text-white/50 hover:text-white transition">
                For Asians
              </button>
            </div>

            <p className="text-white/70 leading-relaxed max-w-sm mb-6">
              Understand the main business structures available to{" "}
              <span className="text-green-400 underline underline-offset-2">
                foreign investors
              </span>
              , from wholly owned entities to partnerships and regional
              headquarters.
            </p>

            <button className="text-sm underline underline-offset-4 mb-10">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

