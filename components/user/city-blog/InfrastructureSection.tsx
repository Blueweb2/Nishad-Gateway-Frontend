"use client";

import Image from "next/image";
import type { InfrastructureSectionContent } from "@/lib/types/city-blog";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Props = {
  content: InfrastructureSectionContent;
};

export default function InfrastructureSection({ content }: Props) {
  return (
    <section className="pt-24 pb-14 bg-[#7f7b77] text-white">
      <div className="max-w-8xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-20 gap-16">
          <div>
            <span className="text-white/60 text-sm mb-4 block">
              01 | {String(content.slides.length).padStart(2, "0")}
            </span>

            <h2 className="text-4xl font-semibold max-w-xl leading-tight">
              {content.heading}
            </h2>
          </div>

          {/* 🔥 Rich Description */}
          <div
            className="text-white/70 max-w-md text-sm leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: content.description || "",
            }}
          />
        </div>

        {/* SLIDES */}
        <div className="flex gap-10 overflow-x-auto pb-6 hide-scrollbar">
          {content.slides.map((slide, index) => {
            const imageSrc =
              slide.imageUrl &&
              typeof slide.imageUrl === "string" &&
              slide.imageUrl.trim() !== ""
                ? cloudinaryAutoWebp(slide.imageUrl)
                : null;

            return (
              <div
                key={index}
                className="min-w-[760px] bg-white rounded-[28px] p-8 flex gap-12 relative"
              >
                {/* Slide Number */}
                <span className="absolute top-6 left-8 text-gray-400 text-sm">
                  {String(index + 1).padStart(2, "0")} /
                </span>

                {/* LEFT CONTENT */}
                <div className="flex-1 mt-10 pr-4">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {slide.title}
                  </h3>

                  {/* 🔥 Rich Slide Text */}
                  <div
                    className="text-gray-600 text-sm leading-relaxed max-w-sm prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: slide.text || "",
                    }}
                  />
                </div>

                {/* RIGHT IMAGE (Safe Render) */}
                {imageSrc && (
                  <div className="relative w-[320px] h-[320px] rounded-[24px] overflow-hidden shrink-0">
                    <Image
                      src={imageSrc}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
