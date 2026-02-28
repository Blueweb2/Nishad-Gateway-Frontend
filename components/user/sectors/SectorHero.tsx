"use client";

import Image from "next/image";

interface Props {
  sector: {
    title: string;
    excerpt: string;
    coverImage: {
      url: string;
      alt: string;
    };
  };
}

export default function SectorHero({ sector }: Props) {
  return (
    <section className="px-6 pt-10">
      <div className="relative w-full h-[620px] rounded-[30px] overflow-hidden">

        {/* Background Image */}
        <Image
          src={sector.coverImage.url}
          alt={sector.coverImage.alt}
          fill
          priority
          className="object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-14 text-white max-w-4xl">
          
          <h1 className="text-[56px] leading-[64px] font-semibold tracking-tight">
            {sector.title}
          </h1>

          <p className="mt-6 text-lg text-white/90 max-w-2xl">
            {sector.excerpt}
          </p>

          <button className="mt-8 bg-green-600 hover:bg-green-700 transition px-8 py-3 rounded-full text-sm font-medium w-fit">
            Calculate Your KSA Expansion Cost
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm animate-bounce">
          ⌄
        </div>

        {/* Optional Top Right Badge */}
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full overflow-hidden border-2 border-white/60">
          <Image
            src="/images/city-badge.jpg"   // replace if dynamic
            alt="City"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}