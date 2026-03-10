"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

export type EntityTypeSlide = {
  title: string;
  mainImage: string;
  subImage: string;
  description?: string;
};

type Props = {
  entityTypesHeading: string;
  entityTypesDescription: string;
  entityTypesSlides: EntityTypeSlide[];
};

export default function EntityTypesSliderSection({
  entityTypesHeading,
  entityTypesDescription,
  entityTypesSlides,
}: Props) {
  const slides = useMemo(() => entityTypesSlides || [], [entityTypesSlides]);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const formatIndex = (i: number) => String(i).padStart(2, "0");


  return (
    <section className="w-full bg-white py-12 lg:py-20 overflow-hidden" data-navbar="light">

      {/* TOP CONTENT */}
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">

          {/* LEFT HEADING */}
          <div className="flex items-start gap-4 md:gap-6">
            <h2 className="
              text-2xl 
              sm:text-3xl 
              md:text-4xl 
              font-semibold 
              leading-snug 
              md:leading-tight 
              text-gray-900 
              max-w-full md:max-w-xl
            ">
              {entityTypesHeading ||
                "Entity Types Available to Foreign Investors"}
            </h2>
          </div>

          {/* RIGHT DESCRIPTION */}
          <p className="
            text-sm 
            sm:text-base 
            md:text-lg 
            text-gray-500 
            leading-relaxed 
            max-w-full md:max-w-xl
          ">
            {entityTypesDescription ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>

        </div>
      </div>

      {/* SLIDER */}
      <div className="mt-14 relative w-full cursor-none px-4">
        <Swiper
          modules={[Mousewheel]}
          direction="horizontal"
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
          }}
          loop
          slidesPerView="auto"
          grabCursor
          className="relative w-full h-[420px] md:h-[460px] lg:h-[520px]"
        >
          {slides.map((slide, index) => {
            const isEven = index % 2 === 0;
            return (
              <SwiperSlide
                key={index}
                className="
                  !w-[260px] 
                  md:!w-[320px] 
                  lg:!w-[480px] 
                  h-full relative flex items-center justify-center 
                  mr-6 md:mr-8 lg:mr-10
                "
              >
                {/* IMAGE */}
                <div className="relative h-full w-[90%] lg:w-[80%] overflow-hidden rounded-[28px] lg:rounded-[44px]">
                  <Image
                    src={cloudinaryAutoWebp(slide.mainImage)}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* FLOATING CARD */}
                <div
                  className={`
                    absolute 
                    ${isEven ? "right-0 top-6 md:top-8 lg:top-10" : "right-0 bottom-6 md:bottom-8 lg:bottom-10"} 
                    z-10 
                    w-[200px] 
                    md:w-[240px] 
                    lg:w-[300px] 
                    cursor-auto 
                    floating-card
                  `}
                >
                  <div
                    className="
                      bg-gray-100 
                      rounded-[20px] lg:rounded-[28px] 
                      shadow-xl 
                      px-4 py-5 
                      md:px-6 md:py-6 
                      lg:px-8 lg:py-8 
                      transition-all duration-500
                    "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between gap-4 lg:gap-6">
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-400 mb-2 md:mb-3 lg:mb-4">
                          {formatIndex(index + 1)}
                        </p>

                        <h3 className="text-sm md:text-base lg:text-lg font-medium text-gray-900 leading-snug max-w-[160px] md:max-w-[190px] lg:max-w-[220px]">
                          {slide.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => toggleExpand(index)}
                        className="
                          w-8 h-8 
                          md:w-9 md:h-9 
                          lg:w-10 lg:h-10 
                          rounded-full 
                          border border-green-500 
                          flex items-center justify-center 
                          transition-all duration-300
                        "
                      >
                        <Plus
                          size={16}
                          className={`text-green-600 transition-transform duration-300 ${expandedIndex === index ? "rotate-45" : ""
                            }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedIndex === index && slide.description && (
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="mt-4 md:mt-5 lg:mt-6 text-xs md:text-sm text-gray-600 leading-relaxed rich-text"
                          dangerouslySetInnerHTML={{ __html: slide.description || "" }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};