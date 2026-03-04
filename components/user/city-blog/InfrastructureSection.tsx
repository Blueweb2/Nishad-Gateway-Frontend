"use client";

import Image from "next/image";
import { useRef } from "react";
import type { InfrastructureSectionContent } from "@/lib/types/city-blog";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import OvalArrow from "@/components/user/ui/OvalArrow";

type Props = {
  content: InfrastructureSectionContent;
};

export default function InfrastructureSection({ content }: Props) {

  const scrollRef = useRef<HTMLDivElement>(null);

  const smoothScroll = (
    container: HTMLElement,
    target: number,
    duration: number = 800
  ) => {
    const start = container.scrollLeft;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeInOutCubic (very smooth feeling)
      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      container.scrollLeft = start + (target - start) * ease;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const nextSlide = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const slide = container.children[0] as HTMLElement;
    if (!slide) return;

    const gap = parseInt(
      window.getComputedStyle(container).gap || "0"
    );

    const slideWidth = slide.offsetWidth + gap;

    smoothScroll(container, container.scrollLeft + slideWidth, 1000);
  };


  const prevSlide = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const slide = container.children[0] as HTMLElement;
    if (!slide) return;

    const gap = parseInt(
      window.getComputedStyle(container).gap || "0"
    );

    const slideWidth = slide.offsetWidth + gap;

    smoothScroll(container, container.scrollLeft - slideWidth, 1000);
  };

  return (
    <section className="pt-24 pb-14 bg-[#7f7b77] text-white">
      <div className="max-w-8xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex justify-items-start items-start mb-20 gap-16 relative">
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
            className="text-white/70 max-w-md text-sm leading-relaxed prose prose-invert mt-10 "
            dangerouslySetInnerHTML={{
              __html: content.description || "",
            }}
          />

          <div className="flex gap-3 absolute right-3 bottom-0">
            <OvalArrow direction="left" variant="gray" onClick={prevSlide} />
            <OvalArrow direction="right" variant="gray" onClick={nextSlide} />
          </div>

        </div>

        {/* SLIDES */}
        <div 
          ref={scrollRef}
          className="flex gap-10 overflow-x-auto pb-6 hide-scrollbar scroll-smooth snap-x snap-mandatory"
        >
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
                className="min-w-[760px] bg-white rounded-[28px] p-8 flex gap-12 relative snap-start"
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
