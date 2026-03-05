"use client";

import Link from "next/link";

interface Props {
  title: string;
  description: string;
  backgroundImage: string;
}

export default function SectorHero({
  title,
  description,
  backgroundImage,
}: Props) {
  return (
    <section className="px-3">
      <div className="relative rounded-b-[40px] overflow-hidden">

        {/* Background Image */}
        <img
          src={backgroundImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-gray-200">
            {description}
          </p>

          <Link
            href="/ksa-expansion-calculator"
            className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition"
          >
            Calculate Your KSA Expansion Cost
          </Link>
        </div>

        {/* Optional Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white opacity-70">
          <div className="w-6 h-10 border border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}