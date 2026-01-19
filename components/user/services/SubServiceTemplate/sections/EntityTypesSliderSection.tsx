"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

export type EntityTypeSlide = {
  title: string;
  image: string;
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
    if (total === 0) return;
    setActive((p) => (p - 1 + total) % total);
  };

  const goNext = () => {
    if (total === 0) return;
    setActive((p) => (p + 1) % total);
  };

  // show 3 cards like screenshot: left, center, right
  const visible = useMemo(() => {
    if (total === 0) return [];
    if (total === 1) return [slides[0]];
    if (total === 2) return [slides[active], slides[(active + 1) % total]];

    const left = slides[(active - 1 + total) % total];
    const center = slides[active];
    const right = slides[(active + 1) % total];

    return [left, center, right];
  }, [slides, total, active]);

  const formatIndex = (i: number) => String(i).padStart(2, "0");

  return (
    <section className="w-full bg-white py-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* TOP ROW */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* left heading */}
          <div className="flex items-start gap-6">
            <div className="text-xs text-gray-400 tracking-wider pt-2">
              {formatIndex(active + 1)} <span className="mx-1">|</span>{" "}
              {formatIndex(Math.max(total, 1))}
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-gray-900 max-w-md">
              {entityTypesHeading || "Entity Types Available to Foreign Investors"}
            </h2>
          </div>

          {/* right description */}
          <p className="text-sm text-gray-500 leading-relaxed max-w-md">
            {entityTypesDescription ||
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>

        {/* SLIDER AREA */}
        <div className="mt-14 relative">
          {/* center arrows */}
          {total > 1 && (
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -top-10 z-20">
              <div className="w-16 h-16 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-center gap-2">
                <button
                  onClick={goPrev}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <ArrowLeft size={14} />
                </button>

                <button
                  onClick={goNext}
                  className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
            {visible.map((slide, idx) => {
              const isCenter = visible.length === 3 && idx === 1;

              return (
                <div
                  key={`${slide.title}-${idx}`}
                  className={`relative w-full overflow-hidden rounded-[40px] ${
                    isCenter ? "md:scale-[1.02]" : "opacity-95"
                  } transition`}
                  style={{ height: 420 }}
                >
                  {/* image */}
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={isCenter}
                  />

                  {/* overlay card */}
                  <div
                    className="
                      absolute
                      left-6
                      right-6
                      top-1/2
                      -translate-y-1/2
                      bg-white
                      rounded-[26px]
                      shadow-xl
                      px-7
                      py-7
                      flex
                      items-start
                      justify-between
                      gap-6
                    "
                  >
                    <div>
                      <p className="text-xs text-gray-400 mb-4">
                        {formatIndex(
                          total >= 3
                            ? (active + idx) % total // approximate
                            : idx + 1
                        )}
                      </p>

                      <h3 className="text-lg font-medium text-gray-900 leading-snug max-w-[220px]">
                        {slide.title}
                      </h3>
                    </div>

                    <div
                      className="
                        w-10 h-10
                        rounded-full
                        border border-green-500
                        flex items-center justify-center
                      "
                    >
                      <Plus size={18} className="text-green-600" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* mobile arrows */}
          {total > 1 && (
            <div className="flex md:hidden justify-center mt-8 gap-3">
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
      </div>
    </section>
  );
}
