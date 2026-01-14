"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Stats() {
  return (
    <section className="w-full bg-black text-white py-28">
      <div className="max-w-full mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-2xl font-semibold mb-3">
            Ministries & Authorities
          </h2>

          <p className="text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
            Clear decisions rely on understanding the institutions that shape policy,
            regulation, and execution in Saudi Arabia.
          </p>
        </div>

        {/* CARDS */}
        <div className="flex justify-center gap-10">

          <AuthorityCard
            logo="/icons/authorities/misa.svg"
            title="MISA (Investment)"
            description="The ongoing transformation of Saudi Arabia under Vision 2030 is unlocking new opportunities at an unprecedented pace."
          />

          <AuthorityCard
            logo="/icons/authorities/commerce.svg"
            title="Ministry of Commerce"
            description="The Ministry aims to strengthen the Kingdom’s economic position as a preferred hub for trade in the Middle East and around the world."
          />

          <AuthorityCard
            logo="/icons/authorities/hr.svg"
            title="Ministry of Human Resources"
            description="Global leadership in empowering individuals and communities, and enhancing labour market competitiveness."
          />

          <AuthorityCard
            logo="/icons/authorities/zatca.svg"
            title="ZATCA"
            description="Formed by the Council of Ministers through the merger of Zakat, Tax, and Customs authorities."
          />

        </div>

        {/* FOOTER LINK */}
        <div className="mt-20 text-center">
          <button className="text-sm underline text-white/70 hover:text-white">
            Access Tools & Resources
          </button>
        </div>

      </div>
    </section>
  );
}

/* ---------------- Authority Card ---------------- */

function AuthorityCard({
  logo,
  title,
  description,
}: {
  logo: string;
  title: string;
  description: string;
}) {
  return (
<div
  className="
    group
    relative
    w-[260px] h-[420px]
    rounded-[160px]
    bg-[#0f0f0f]
    px-8 py-10
    flex flex-col items-center text-center
    transition-all duration-300
    overflow-hidden
  "
>
  {/* GRADIENT BORDER (HOVER ONLY) */}
  <span
    className="
      pointer-events-none
      absolute inset-0
      rounded-[160px]
      opacity-0
      transition-opacity duration-300
      group-hover:opacity-100
    "
    style={{
      padding: "1.5px",
      background: `
        linear-gradient(
          135deg,
          rgba(15,185,177,0) 0%,
          rgba(15,185,177,0.15) 30%,
          rgba(15,185,177,0.6) 60%,
          rgba(15,185,177,0.9) 100%
        )
      `,
      WebkitMask:
        "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
    }}
  />

  


      {/* LOGO */}
      <div className="mb-6 py-6">
        <Image
          src={logo}
          alt={title}
          width={156}
          height={156}
        />
      </div>

      {/* DOT */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#0fb9b1] mb-6" />

      {/* TITLE */}
      <h3 className="text-sm font-medium mb-4">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-xs text-white/60 leading-relaxed">
        {description}
      </p>

      {/* ARROW — ONLY ON HOVER */}
      <div
        className="
          absolute bottom-8
          opacity-0 translate-y-2
          transition-all duration-300
          group-hover:opacity-100
          group-hover:translate-y-0
        "
      >
        <button
          className="
            w-10 h-10 rounded-full
            border border-white/30
            flex items-center justify-center
            hover:bg-white/10 transition
          "
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
