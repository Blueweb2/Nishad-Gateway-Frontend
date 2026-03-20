"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Ministry = {
  _id: string;
  title: string;
  slug: string;
  shortDesc?: string;
  logo?: string;
  logoAlt?: string;
};

export default function MinistryCard({ ministry }: { ministry: Ministry }) {
  return (
    <div
      className="
        group relative w-full max-w-[300px] h-[420px]
        rounded-[160px] bg-[#0f0f0f]
        px-8 py-10 flex flex-col items-center text-center
        transition-all duration-300 overflow-hidden
      "
    >

      {/* ANIMATED BORDER */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          rounded-[160px]
          opacity-100 sm:opacity-0
          sm:group-hover:opacity-100
          transition-opacity duration-300
        "
      >
        <span
          className="absolute inset-0 rounded-[160px] border-animate"
          style={{
            padding: "4px",
            background: `
              conic-gradient(
                from var(--angle),
                rgba(15,185,177,0.02) 0deg,
                rgba(15,185,177,0.05) 40deg,
                rgba(15,185,177,0.15) 80deg,
                rgba(15,185,177,0.4) 120deg,
                rgba(15,185,177,0.8) 150deg,
                rgba(15,185,177,1) 180deg,
                rgba(15,185,177,0.8) 210deg,
                rgba(15,185,177,0.4) 240deg,
                rgba(15,185,177,0.15) 280deg,
                rgba(15,185,177,0.05) 320deg,
                rgba(15,185,177,0.02) 360deg
              )
            `,
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
      </span>

      {/* LOGO */}
      {ministry.logo && (
        <div className="mb-6 py-6">
          <Image
            src={cloudinaryAutoWebp(ministry.logo)}
            alt={
              ministry.logoAlt ||
              `${ministry.title} official logo in Saudi Arabia`
            }
            loading="lazy"
            width={120}
            height={120}
          />
        </div>
      )}

      {/* DOT */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#0fb9b1] mb-6" />

      {/* TITLE */}
      <h3 className="text-sm font-medium mb-4">{ministry.title}</h3>

      {/* DESCRIPTION */}
      <p className="text-xs text-white/60 leading-relaxed">
        {ministry.shortDesc}
      </p>

      {/* LINK */}
      <div
        className="
          absolute bottom-8
          opacity-100 sm:opacity-0
          translate-y-0 sm:translate-y-2
          transition-all duration-300
          sm:group-hover:opacity-100
          sm:group-hover:translate-y-0
        "
      >
        <Link
          href={`/ministries/${ministry.slug}`}
          prefetch={false}
          aria-label={`View details about ${ministry.title}`}
          title={`View ${ministry.title}`}
          className="
            w-10 h-10 rounded-full
            border border-white/30
            flex items-center justify-center
            hover:bg-white/10 transition
          "
        >
          <ArrowRight size={16} />
        </Link>
      </div>

    </div>
  );
}