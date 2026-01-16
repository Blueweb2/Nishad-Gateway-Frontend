"use client";

import Image from "next/image";
import OvalArrow from "@/components/user/ui/OvalArrow";

export default function WhySaudi() {
  return (
    <section
      data-navbar="white"
      className="relative w-full bg-white text-black py-6 overflow-hidden"
    >

      {/* ================= FULL-WIDTH PAGINATION ================= */}
      <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
        <div className="w-full h-full flex items-start justify-end px-10 pt-10">
          <div className="pointer-events-auto flex items-center gap-4">
            <span className="text-sm text-gray-600">
              1 / <span className="text-black">6</span>
            </span>

            <OvalArrow
              direction="right"
              variant="gray"
              className="w-[26px] h-[36px]"
            />
          </div>
        </div>
      </div>

      {/* ================= CONSTRAINED CONTENT ================= */}
      <div className="relative max-w-[1320px] mx-auto px-6 z-10">

        <div className="grid grid-cols-3 gap-12 min-h-[360px] items-start">

          {/* LEFT — TITLE (ALIGNED WITH BUSINESS GROWTH) */}
          <div className="flex flex-col">
            <p className="text-[30px] font-semibold">Why</p>
            <h2 className="text-[45px] font-bold leading-tight">
              Saudi Arabia
            </h2>
          </div>

          {/* CENTER — VISION CONTENT */}
          <div className="flex flex-col items-start">
            <Image
              src="/vision.svg"
              alt="Vision 2030"
              width={90}
              height={90}
            />

            <div className="max-w-md mt-20">
              <h3 className="text-xl font-medium mb-4">
                Vision 2030
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Transforming the economy,<br />
                diversifying industries, and<br />
                unlocking new growth sectors.
              </p>
            </div>
          </div>

          {/* RIGHT — EMPTY COLUMN (INTENTIONAL) */}
          <div />
        </div>

        {/* DIVIDER — SAME RHYTHM AS BUSINESS GROWTH */}
        <div className="mt-2 border-t border-gray-200" />

      </div>
    </section>
  );
}
