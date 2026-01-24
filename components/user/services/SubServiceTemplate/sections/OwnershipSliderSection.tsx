"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

export type OwnershipSlide = {
  title: string; //  Capsule text (Restricted activities)
  leftText?: string; // Left text (Universal 100% rules)
  rightText?: string; // Right text (Sector exceptions)
  image: string;
};

type Props = {
  ownershipHeading: string;
  ownershipSlides: OwnershipSlide[];

  // ✅ Admin controlled tab headings
  ownershipTabOneLabel?: string;
  ownershipTabTwoLabel?: string;
};

export default function OwnershipSliderSection({
  ownershipHeading,
  ownershipSlides,
  ownershipTabOneLabel = "Foreign Ownership",
  ownershipTabTwoLabel = "Capital Reality",
}: Props) {
  const slides = useMemo(() => ownershipSlides || [], [ownershipSlides]);
  const [active, setActive] = useState(0);

  const total = slides.length;
  const current = total > 0 ? slides[active] : null;

  const next = () => {
    if (total <= 1) return;
    setActive((prev) => (prev + 1) % total);
  };

  const prev = () => {
    if (total <= 1) return;
    setActive((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className="w-full bg-black text-white">
      <div className="relative w-full h-[820px] overflow-hidden">
        {/* Background */}
        {current?.image ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${cloudinaryAutoWebp(current.image)})`,
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-neutral-900" />
        )}

        {/* Dark tint */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Capsule cut-out (remove tint inside capsule) */}
        <div
          className="absolute inset-0 bg-transparent"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 180px 320px at 50% 50%, black 99%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 180px 320px at 50% 50%, black 99%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
          <div className="w-full flex items-center justify-between gap-10">
            {/* LEFT */}
            <div className="w-[320px]">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {ownershipHeading || "Ownership & Capital Rules"}
              </h2>

              <div className="mt-12 flex items-center gap-2 text-white/70 text-sm">
                <span>{String(active + 1).padStart(2, "0")}</span>
                <span>|</span>
                <span>{String(total || 1).padStart(2, "0")}</span>
              </div>

              {/* Left text */}
              {current?.leftText && (
                <p className="mt-6 text-white/45 text-lg font-medium leading-snug">
                  {current.leftText}
                </p>
              )}

              <div className="mt-10 h-[1px] w-full bg-white/25" />
            </div>

            {/* CAPSULE */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-[360px] md:w-[420px] h-[640px] rounded-[200px] border border-white/25">
                <div className="absolute inset-0 flex items-center justify-center px-12 text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold leading-snug text-white">
                    {current?.title || "No Capsule Text"}
                  </h3>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-[320px] flex flex-col items-end">
              {/* Tabs */}
              <div className="flex items-center gap-6 text-xs">
                <button className="text-green-500 font-medium">
                  {ownershipTabOneLabel}
                </button>
                <button className="text-white/50 hover:text-white/70 transition">
                  {ownershipTabTwoLabel}
                </button>
              </div>

              {/* Right text */}
              {current?.rightText && (
                <p className="mt-8 text-white/45 text-lg font-medium leading-snug text-right">
                  {current.rightText}
                </p>
              )}

              {/* Arrows */}
              {total > 1 && (
                <div className="mt-10 flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
