"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type OwnershipSlide = {
  title: string;
  subtitle: string;
  image: string;
};

type Props = {
  ownershipHeading: string;
  ownershipSlides: OwnershipSlide[];
};

export default function OwnershipSliderSection({
  ownershipHeading,
  ownershipSlides,
}: Props) {
  const slides = useMemo(() => ownershipSlides || [], [ownershipSlides]);
  const [active, setActive] = useState(0);

  const total = slides.length;
  const current = total > 0 ? slides[active] : null;

  const next = () => {
    if (total === 0) return;
    setActive((prev) => (prev + 1) % total);
  };

  const prev = () => {
    if (total === 0) return;
    setActive((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="w-full bg-black text-white">
      <div className="relative w-full h-[520px] overflow-hidden">
        {/* Background Image */}
        {current?.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.image})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-900" />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
          <div className="w-full flex items-start justify-between gap-10">
            {/* LEFT */}
            <div className="max-w-sm">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {ownershipHeading || "Ownership & Capital Rules"}
              </h2>

              <div className="mt-12 flex items-center gap-2 text-white/70 text-sm">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <span>|</span>
                <span>{String(total).padStart(2, "0")}</span>
              </div>
            </div>

            {/* CENTER CIRCLE */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-[320px] h-[320px] rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center px-10 text-center">
                <h3 className="text-2xl md:text-3xl font-semibold leading-snug">
                  {current?.title || "No Slide Title"}
                </h3>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-end gap-6">
              <p className="text-white/60 text-lg font-medium">
                {current?.subtitle || ""}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom line (like UI) */}
        <div className="absolute bottom-16 left-0 right-0 h-[1px] bg-white/20" />
      </div>
    </section>
  );
}
