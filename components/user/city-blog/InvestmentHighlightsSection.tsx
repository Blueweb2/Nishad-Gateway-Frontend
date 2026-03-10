"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type EntityTypeSlide = {
  title: string;
  mainImage: string;
  subImage: string;
  subText: string;
};

type Props = {
  mainHeading: string;
  description: string;
  cards: EntityTypeSlide[];
};

export default function InvestmentHighlightsSection({
  mainHeading,
  description,
  cards,
}: Props) {

  const slides = useMemo(() => cards || [], [cards]);

  const [active, setActive] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const total = slides.length;

  const goPrev = () => {
    if (total <= 1) return;
    setActive((p) => (p - 1 + total) % total);
  };

  const goNext = () => {
    if (total <= 1) return;
    setActive((p) => (p + 1) % total);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const centerSlide = total ? slides[active] : null;
  const formatIndex = (i: number) => String(i).padStart(2, "0");


  return (
    <section className="w-full bg-white py-20 overflow-hidden" data-navbar="light">
      {/* TOP CONTENT */}
      <div className="w-full max-w-8xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="flex items-start gap-6">
            <div className="text-xs text-gray-400 tracking-wider pt-2">
              {formatIndex(active + 1)} <span className="mx-1">|</span>{" "}
              {formatIndex(Math.max(total, 1))}
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-gray-900 max-w-xl">
              {mainHeading ||
                "Entity Types Available to Foreign Investors"}
            </h2>
          </div>

          <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
            {description ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>
      </div>

      {/* SLIDER */}
      <div className="mt-14 relative w-full cursor-none hidden md:block px-4">
        <Swiper
          modules={[Mousewheel]}
          direction="horizontal"
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
          }}
          loop={true}
          slidesPerView="auto"
          grabCursor
          className="relative w-full h-[520px]"
        >
          {slides.map((slide, index) => {
            const isEven = index % 2 === 0;
            return (
              <SwiperSlide
                key={index}
                className="!w-[480px] h-full relative flex items-center justify-center mr-10"
              >
                {/* IMAGE */}
                <div className="relative h-full w-[80%] overflow-hidden rounded-[44px]">
                  <Image
                    src={cloudinaryAutoWebp(slide.mainImage)}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* FLOATING CARD */}
                <div
                  className={`absolute ${isEven ? "right-0 top-10" : "right-0 bottom-10"}  z-10 w-[300px] cursor-auto floating-card`}
                >
                  <div
                    className="bg-gray-100 rounded-[28px] shadow-xl px-8 py-8 transition-all duration-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-xs text-gray-400 mb-4">
                          {formatIndex(index + 1)}
                        </p>
                        <h3 className="text-lg font-medium text-gray-900 leading-snug max-w-[220px]">
                          {slide.title}
                        </h3>
                      </div>

                      <button
                        onClick={() => toggleExpand(index)}
                        className="w-10 h-10 rounded-full border border-green-500 flex items-center justify-center transition-all duration-300"
                      >
                        <Plus
                          size={18}
                          className={`text-green-600 transition-transform duration-300 ${expandedIndex === index ? "rotate-45" : ""
                            }`}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {expandedIndex === index && slide.subText && (
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="mt-6 text-sm text-gray-600 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: slide.subText }}
                        />
                      )}
                    </AnimatePresence>

                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

      </div>

      {/* MOBILE */}
      <div className="md:hidden px-6 mt-10">
        {centerSlide && (
          <div className="relative h-[420px]">
            <div className="absolute left-0 top-0 h-full w-[70%] overflow-hidden rounded-[40px]">
              <Image
                src={cloudinaryAutoWebp(centerSlide.mainImage)}
                alt={centerSlide.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>

            <div className="absolute right-0 top-24 h-[220px] w-[45%] overflow-hidden rounded-[30px]">
              <Image
                src={cloudinaryAutoWebp(centerSlide.subImage)}
                alt={centerSlide.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px]">
              <div className="bg-white rounded-[26px] shadow-xl px-7 py-7 flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs text-gray-400 mb-4">
                    {formatIndex(active + 1)}
                  </p>
                  <h3 className="text-lg font-medium text-gray-900 leading-snug">
                    {centerSlide.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full border border-green-500 flex items-center justify-center">
                  <Plus size={18} className="text-green-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {total > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
            >
              <ArrowLeft size={16} />
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};