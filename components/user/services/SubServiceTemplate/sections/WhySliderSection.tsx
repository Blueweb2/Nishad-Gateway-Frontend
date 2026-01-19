"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";


export type WhySlide = {
  title: string;
  description: string;
  image: string;
};

type Props = {
  whyHeading: string;
  whySlides: WhySlide[];
  whyCtaText: string;
  whyCtaLink: string;
};

export default function WhySliderSection({
  whyHeading,
  whySlides,
  whyCtaText,
  whyCtaLink,
}: Props) {
  const slides = useMemo(() => whySlides || [], [whySlides]);
  const [activeSlide, setActiveSlide] = useState(0);

  const total = slides.length;

  const nextSlide = () => {
    if (total === 0) return;
    setActiveSlide((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total === 0) return;
    setActiveSlide((prev) => (prev - 1 + total) % total);
  };

  const current = slides[activeSlide];

  const formatNumber = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="w-full bg-white text-black py-16">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* ======================
              LEFT SIDE
          ====================== */}
          <div className="lg:col-span-3 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              {whyHeading || "Why Entity Type Matters"}
            </h2>

            {/* Slide counter */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{formatNumber(total === 0 ? 0 : activeSlide + 1)}</span>
              <span className="opacity-50">|</span>
              <span>{formatNumber(total)}</span>
            </div>

            {/* Slide title */}
            <div className="space-y-3">
              <h3 className="text-xl font-medium text-teal-700 leading-snug">
                {current?.title || "Slide Title"}
              </h3>

              {/* line */}
              <div className="w-full h-[1px] bg-gray-200" />
            </div>
          </div>

          {/* ======================
              CENTER IMAGE
          ====================== */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[320px] h-[420px] md:w-[360px] md:h-[480px] overflow-hidden rounded-[999px] bg-gray-200 shadow-sm">
              {current?.image ? (
                <Image
                  src={current.image}
                  alt={current.title || "Why slide"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                  No Image
                </div>
              )}
            </div>
          </div>

          {/* ======================
              RIGHT SIDE
          ====================== */}
          <div className="lg:col-span-4 space-y-6">
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-sm">
              {current?.description ||
                "Slide description will appear here from backend."}
            </p>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ======================
            CTA
        ====================== */}
        {whyCtaText && whyCtaLink && (
          <div className="mt-10 flex justify-center">
            <Link
              href={whyCtaLink}
              className="text-sm font-medium text-green-700 underline underline-offset-4 hover:text-green-800 transition"
            >
              {whyCtaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
