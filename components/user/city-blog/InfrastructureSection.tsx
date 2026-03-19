"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
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
    <section 
      className="pt-16 md:pt-20 lg:pt-24 pb-10 md:pb-12 lg:pb-14 bg-[#7f7b77] text-white" 
      data-navbar="light"
    >
      <div className="max-w-8xl mx-auto px-4 md:px-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16 mb-14 lg:mb-20 relative">

          {/* LEFT TITLE */}
          <motion.div
            initial={{ x: -120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold max-w-xl leading-tight">
              {content.heading}
            </h2>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ x: 120, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-md text-xs sm:text-sm leading-relaxed rich-text"
            dangerouslySetInnerHTML={{
              __html: content.description || "",
            }}
          />

          {/* ARROWS */}
          <div className="flex gap-3 lg:absolute lg:right-3 lg:bottom-0">
            <OvalArrow direction="left" variant="gray" onClick={prevSlide} />
            <OvalArrow direction="right" variant="gray" onClick={nextSlide} />
          </div>

        </div>


        {/* SLIDES */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 lg:gap-10 overflow-x-auto pb-6 hide-scrollbar scroll-smooth snap-x snap-mandatory"
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
                className="
                min-w-[330px]
                sm:min-w-[420px]
                md:min-w-[560px]
                lg:min-w-[760px]
                bg-white
                rounded-[20px] md:rounded-[24px] lg:rounded-[28px]
                p-5 sm:p-6 md:p-7 lg:p-8
                flex flex-col md:flex-row
                gap-6 md:gap-8 lg:gap-12
                relative
                snap-start
                "
              >

                {/* Slide Number */}
                <span className="absolute top-4 md:top-6 left-5 md:left-8 text-gray-400 text-xs md:text-sm">
                  {String(index + 1).padStart(2, "0")} /
                </span>


                {/* LEFT CONTENT */}
                <div className="flex-1 mt-8 md:mt-10 pr-2 md:pr-4">

                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">
                    {slide.title}
                  </h3>

                  <div
                    className="text-gray-600 text-xs sm:text-sm leading-relaxed rich-text-light"
                    dangerouslySetInnerHTML={{
                    __html: slide.text || "",
                    }}
                  />

                </div>


                {/* IMAGE */}
                {imageSrc && (

                  <div className="relative w-full md:w-[240px] lg:w-[320px] h-[200px] sm:h-[240px] md:h-[260px] lg:h-[320px] rounded-[18px] md:rounded-[20px] lg:rounded-[24px] overflow-hidden shrink-0">

                    <Image
                      src={imageSrc}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 320px"
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
};