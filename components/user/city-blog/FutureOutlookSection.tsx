"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";
import type { FutureOutlookSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: FutureOutlookSectionContent;
};

export default function FutureOutlookSection({ content }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const total = content.slides.length;
  const slide = content.slides[activeIndex];

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

  return (
    <section className="bg-[#efefef] py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-3 items-center gap-16">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl font-semibold mb-12">
              {content.heading}
            </h2>

            {/* AUTO NUMBER LABEL */}
            <div className="flex items-center gap-6 text-gray-500 mb-4">
              <span className="text-sm tracking-wider">
                {formatNumber(activeIndex + 1)} | {formatNumber(total)}
              </span>

              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <h3 className="text-2xl text-teal-600 font-medium">
              {slide.title}
            </h3>
          </div>

          {/* CENTER IMAGE */}
          <div className="relative mx-auto w-[380px] h-[540px] rounded-[200px] overflow-hidden shadow-xl">

            <Image
              src={cloudinaryAutoWebp(slide.imageUrl)}
              alt={slide.title}
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <p className="text-gray-600 leading-relaxed mb-10">
              {slide.description}
            </p>

            <div className="flex gap-4 mb-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition"
              >
                <ArrowLeft size={16} />
              </button>

              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition"
              >
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="h-px bg-gray-300 mb-6" />

            <Link
              href={slide.ctaLink}
              className="text-green-600 font-medium hover:underline"
            >
              {slide.ctaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
