"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

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
  const [active, setActive] = useState(0);

  const total = slides.length;

  const goPrev = () => {
    if (total <= 1) return;
    setActive((p) => (p - 1 + total) % total);
  };

  const goNext = () => {
    if (total <= 1) return;
    setActive((p) => (p + 1) % total);
  };

  const prevIndex = total ? (active - 1 + total) % total : 0;
  const nextIndex = total ? (active + 1) % total : 0;

  const leftSlide = total ? slides[prevIndex] : null;
  const centerSlide = total ? slides[active] : null;
  const rightSlide = total ? slides[nextIndex] : null;

  const formatIndex = (i: number) => String(i).padStart(2, "0");

  const [cursor, setCursor] = useState({ x: 0, y: 0, show: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      show: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor((p) => ({ ...p, show: false }));
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (total <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if (x < rect.width / 2) goPrev();
    else goNext();
  };

  return (
    <section className="w-full bg-white py-20 overflow-hidden">
      {/* TOP CONTENT */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div className="flex items-start gap-6">
            <div className="text-xs text-gray-400 tracking-wider pt-2">
              {formatIndex(active + 1)} <span className="mx-1">|</span>{" "}
              {formatIndex(Math.max(total, 1))}
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-gray-900 max-w-md">
              {entityTypesHeading ||
                "Entity Types Available to Foreign Investors"}
            </h2>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
            {entityTypesDescription ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>
      </div>

      {/* SLIDER */}
      <div
        className="mt-14 relative w-full cursor-none hidden md:block"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Custom cursor */}
        {cursor.show && total > 1 && (
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              left: cursor.x,
              top: cursor.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-[74px] h-[96px] rounded-[160px] border border-black/20 bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-500 shadow-sm">
              <div className="flex items-center gap-2">
                <ArrowLeft size={16} />
                <ArrowRight size={16} />
              </div>
            </div>
          </div>
        )}

        <div className="relative w-full h-[520px]">
          {/* LEFT SLIDE */}
          {leftSlide && (
            <div className="absolute left-0 top-0 h-full w-[46%]">
              <div className="absolute left-[6%] top-0 h-full w-[62%] overflow-hidden rounded-[44px]">
                <Image
                  src={cloudinaryAutoWebp(leftSlide.mainImage)}
                  alt={leftSlide.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>

              <div className="absolute left-[58%] top-[110px] h-[240px] w-[44%] overflow-hidden rounded-[34px]">
                <Image
                  src={cloudinaryAutoWebp(leftSlide.subImage)}
                  alt={leftSlide.title}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>

              <div className="absolute left-[28%] top-1/2 -translate-y-1/2 z-10 w-[360px]">
                <div className="bg-white rounded-[28px] shadow-xl px-8 py-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-4">
                      {formatIndex(prevIndex + 1)}
                    </p>
                    <h3 className="text-lg font-medium text-gray-900 leading-snug max-w-[220px]">
                      {leftSlide.title}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full border border-green-500 flex items-center justify-center">
                    <Plus size={18} className="text-green-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RIGHT SLIDE (CURRENT) */}
          {centerSlide && (
            <div className="absolute right-0 top-0 h-full w-[46%]">
              <div className="absolute right-[6%] top-0 h-full w-[62%] overflow-hidden rounded-[44px]">
                <Image
                  src={cloudinaryAutoWebp(centerSlide.mainImage)}
                  alt={centerSlide.title}
                  fill
                  className="object-cover"
                  sizes="50vw"
                  priority
                />
              </div>

              <div className="absolute right-[58%] top-[110px] h-[240px] w-[44%] overflow-hidden rounded-[34px]">
                <Image
                  src={cloudinaryAutoWebp(centerSlide.subImage)}
                  alt={centerSlide.title}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>

              <div className="absolute right-[28%] top-1/2 -translate-y-1/2 z-10 w-[360px]">
                <div className="bg-white rounded-[28px] shadow-xl px-8 py-8 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs text-gray-400 mb-4">
                      {formatIndex(active + 1)}
                    </p>
                    <h3 className="text-lg font-medium text-gray-900 leading-snug max-w-[220px]">
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

          {/* NEXT PREVIEW */}
          {total >= 3 && rightSlide && (
            <div className="absolute -right-[18%] top-[70px] h-[380px] w-[320px] overflow-hidden rounded-[44px] opacity-95">
              <Image
                src={cloudinaryAutoWebp(rightSlide.mainImage)}
                alt={rightSlide.title}
                fill
                className="object-cover"
                sizes="20vw"
              />
            </div>
          )}
        </div>
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
}
