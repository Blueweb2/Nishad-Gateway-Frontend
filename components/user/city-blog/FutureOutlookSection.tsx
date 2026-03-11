"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import type { FutureOutlookSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: FutureOutlookSectionContent;
};

export default function FutureOutlookSection({ content }: Props) {
  const slides = content.slides || [];

  const [activeIndex, setActiveIndex] = useState(0);

  if (!slides.length) return null;

  const total = slides.length;
  const slide = slides[activeIndex];

  const formatNumber = (num: number) =>
    String(num).padStart(2, "0");

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? total - 1 : prev - 1
    );
  };

  const imageSrc =
    slide.imageUrl &&
    typeof slide.imageUrl === "string" &&
    slide.imageUrl.trim() !== ""
      ? cloudinaryAutoWebp(slide.imageUrl)
      : null;

  const hasCTA =
    slide.ctaText &&
    slide.ctaLink &&
    slide.ctaLink.trim() !== "";

  return (
    <section className="bg-[#efefef] py-12 lg:py-24" data-navbar="light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-10 lg:gap-16">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl text-center lg:text-left sm:text-3xl lg:text-4xl font-semibold mb-8 lg:mb-12">
              {content.heading}
            </h2>

            {/* AUTO NUMBER LABEL */}
            <div className="flex items-center gap-4 lg:gap-6 text-gray-500 mb-3 lg:mb-4">
              <span className="text-xs sm:text-sm tracking-wider">
                {formatNumber(activeIndex + 1)} | {formatNumber(total)}
              </span>

              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <h3 className="text-lg sm:text-xl lg:text-2xl text-teal-600 font-medium">
              {slide.title}
            </h3>
          </div>

          {/* CENTER IMAGE */}
          {imageSrc && (
            <div className="relative mx-auto w-[260px] h-[360px] sm:w-[300px] sm:h-[420px] lg:w-[380px] lg:h-[540px] rounded-[120px] sm:rounded-[160px] lg:rounded-[200px] overflow-hidden shadow-xl">
              <Image
                src={imageSrc}
                alt={slide.title}
                fill
                className="object-cover"
                sizes="(max-width:640px) 260px, (max-width:1024px) 300px, 380px"
              />
            </div>
          )}

          {/* RIGHT SIDE */}
          <div>

            {/* DESCRIPTION */}
            <div
              className="text-gray-600 text-sm sm:text-base leading-relaxed rich-text max-w-none lg:flex 
              lg:items-end h-[200px] lg:h-[90px]"
              dangerouslySetInnerHTML={{
                __html: slide.description || "",
              }}
            />

            {/* NAVIGATION */}
            <div className="flex items-center justify-center lg:items-start lg:justify-start gap-3 lg:gap-4 mb-8 lg:mb-10">
              <button
                onClick={prev}
                className="w-11 h-11 lg:w-10 lg:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                onClick={next}
                className="w-11 h-11 lg:w-10 lg:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="h-px bg-gray-300 mb-5 lg:mb-6" />

            {/* CTA */}
            {hasCTA && (
              <Link
                href={slide.ctaLink}
                className="text-green-600 font-medium hover:underline"
              >
                {slide.ctaText}
              </Link>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};