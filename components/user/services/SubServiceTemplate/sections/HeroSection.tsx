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
    <section className="relative w-full min-h-screen overflow-hidden">
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
        <div className="absolute inset-0 bg-black/40" />

        {/* EXTRA LIGHT GLOW TOP RIGHT */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/25" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Keep content vertically centered but slightly top like screenshot */}
        <div className="min-h-screen flex flex-col justify-center pt-28 md:pt-32 pb-20">
          <div className="max-w-[620px]">
            {/* MAIN TITLE */}
            <h1 className="text-white font-semibold tracking-tight leading-[1.05] text-[52px] md:text-[82px]">
              {heroTitle}
            </h1>

            {/* LINE + SUBTITLE */}
            <div className="mt-24 flex items-center gap-6">
              {/* line should not stretch full */}

              <p className="text-white/90 text-xl md:text-3xl font-light">
                {heroSubtitle || "What’s Best for Your Business"}
              </p>
            </div>

            {/* DESCRIPTION */}
            {heroDescription && (
              <p className="mt-10 max-w-[430px] text-white/75 text-sm md:text-base leading-relaxed">
                {heroDescription}
              </p>
            )}

            {/* CTA BUTTON */}
            {heroButtonText && heroButtonLink && (
              <div className="mt-8">
                <Link
                  href={heroButtonLink}
                  className="
                    inline-flex items-center gap-2
                    px-6 py-3 rounded-full
                    bg-green-700 hover:bg-green-800
                    transition font-semibold text-sm text-white
                  "
                >
                  {heroButtonText}
                  <span className="text-lg">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HORIZONTAL LINE ACROSS HERO (like screenshot) */}
      <div className="absolute left-0 right-0 top-[54%] h-[1px] bg-white/20 z-10" />
    </section>
  );
}
