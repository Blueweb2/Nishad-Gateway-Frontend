"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroButtonText?: string;
  heroButtonLink?: string;
  heroImage?: string;
};

export default function HeroSection({
  heroTitle,
  heroSubtitle,
  heroDescription,
  heroButtonText,
  heroButtonLink,
  heroImage,
}: Props) {
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden">
      {/* BG IMAGE */}
      <div className="absolute inset-0">
        {heroImage ? (
          <Image
            src={heroImage}
            alt="Hero Background"
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#101c2d] via-[#0b0f0b] to-black" />
        )}

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/45" />

        {/* EXTRA BLUR GRADIENT (top right like screenshot) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-white/20" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-20">
        <div className="max-w-4xl">
          {/* MAIN TITLE */}
          <h1 className="text-white font-semibold leading-[1.05] tracking-tight text-[52px] md:text-[76px]">
            {heroTitle || "Subservice Title"}
          </h1>

          {/* LINE + SUBTITLE */}
          <div className="mt-8 flex items-center gap-6">
            <div className="h-[1px] flex-1 bg-white/35" />

            <p className="text-white/90 text-xl md:text-3xl font-light whitespace-nowrap">
              {heroSubtitle || "Hero Subtitle"}
            </p>
          </div>

          {/* DESCRIPTION */}
          {heroDescription && (
            <p className="mt-10 max-w-xl text-white/80 text-sm md:text-base leading-relaxed">
              {heroDescription}
            </p>
          )}

          {/* CTA BUTTON */}
          {heroButtonText && heroButtonLink && (
            <div className="mt-7">
              <Link
                href={heroButtonLink}
                className="
                  inline-flex items-center justify-center
                  px-6 py-3 rounded-full
                  bg-green-700 hover:bg-green-800
                  transition font-semibold text-sm text-white
                "
              >
                {heroButtonText} <span className="ml-2">→</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* HORIZONTAL LINE ACROSS HERO (like screenshot) */}
      <div className="absolute left-0 right-0 top-[58%] h-[1px] bg-white/20 z-10" />
    </section>
  );
}
