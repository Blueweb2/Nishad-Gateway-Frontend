"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SliderBlock as SliderBlockType } from "@/lib/types/ministry";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  block: SliderBlockType;
};

export default function SliderBlock({ block }: Props) {
  const [current, setCurrent] = useState(0);

  const slides = block.slides || [];

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[current];

  if (!slide) return null;

  return (
    <section className="py-16 border-t border-gray-200">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 items-center">

        {/* LEFT */}
        <div className="space-y-6">

          {block.heading && (
            <h2 className="text-3xl font-semibold leading-snug">
              {block.heading}
            </h2>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>
              {String(current + 1).padStart(2, "0")} | {String(slides.length).padStart(2, "0")}
            </span>
          </div>

          <h3 className="text-lg font-medium text-teal-600">
            {slide.title}
          </h3>

        </div>

        {/* CENTER IMAGE */}
        <div className="flex justify-center">

          {slide.image && (
            <Image
              src={cloudinaryAutoWebp(slide.image)}
              alt={slide.alt || slide.title}
              width={420}
              height={520}
              className="rounded-[120px] object-cover"
            />
          )}

        </div>

        {/* RIGHT */}
        <div className="space-y-6">

          {slide.description && (
            <p className="text-gray-500 leading-relaxed">
              {slide.description}
            </p>
          )}

          <div className="flex gap-3">

            <button
              onClick={prev}
              className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={next}
              className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-100"
            >
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <a
          href="#"
          className="text-green-600 text-sm underline hover:text-green-700"
        >
          Calculate Expansion Cost
        </a>
      </div>

    </section>
  );
}