"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeUpScroll from "../ui/FadeUpScroll";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function Stats() {
  const authorities = [
    {
      logo: "/icons/authorities/misa.svg",
      title: "Ministry of Investment (MISA)",
      description:
        "Oversees foreign investment licensing, Regional Headquarters (RHQ) programs, and strategic incentives supporting Vision 2030 transformation.",
    },
    {
      logo: "/icons/authorities/commerce.svg",
      title: "Ministry of Commerce",
      description:
        "Responsible for Commercial Registration (CR), corporate governance, and regulatory compliance.",
    },
    {
      logo: "/icons/authorities/hr.svg",
      title: "Ministry of Human Resources",
      description:
        "Regulates labor policies, Saudization (Nitaqat), and workforce development initiatives.",
    },
    {
      logo: "/icons/authorities/zatca.svg",
      title: "Zakat, Tax & Customs Authority",
      description:
        "Administers VAT, Zakat, e-invoicing, withholding tax, and customs regulations.",
    },
    {
      logo: "/icons/authorities/Absher.svg",
      title: "Absher Business",
      description:
        "Digital platform for visa services, iqama issuance, and employer sponsorship management.",
    },
    {
      logo: "/icons/authorities/Monshaat.svg",
      title: "Monsha’at",
      description:
        "Supports SMEs, incubators, startups, and accelerators through funding and enablement programs.",
    },
    {
      logo: "/icons/authorities/Saudi-Business-Center.svg",
      title: "Saudi Business Center",
      description:
        "Unified system for company registration, licensing, and multi-agency approvals.",
    },
  ];

  return (
    <section className="w-full bg-black text-white py-28" data-navbar="light">
      <div className="max-w-[1320px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <FadeUpScroll delay={0.1}>
            <h2 className="text-[42px] font-semibold mb-3">
              Ministries & Authorities
            </h2>
          </FadeUpScroll>

          <FadeUpScroll delay={0.2}>
            <p className="text-white/60 max-w-xl mx-auto">
              Clear decisions rely on understanding the institutions that shape
              policy, regulation, and execution in Saudi Arabia.
            </p>
          </FadeUpScroll>
        </div>

        {/* SLIDER */}
        <Swiper
          className="!overflow-visible cursor-grab active:cursor-grabbing"
          modules={[Autoplay]}
          loop={true}
          speed={900}
          grabCursor={true}
          slidesPerView={4.15}
          spaceBetween={40}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 20 },
            640: { slidesPerView: 2.2, spaceBetween: 25 },
            1024: { slidesPerView: 3.2, spaceBetween: 30 },
            1280: { slidesPerView: 4.15, spaceBetween: 40 },
          }}
        >
          {authorities.map((item, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <AuthorityCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* FOOTER */}
        {/* <div className="mt-20 text-center">
          <button className="text-sm underline text-white/70 hover:text-white transition">
            Access Tools & Resources
          </button>
        </div> */}

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
        w-full
        max-w-[300px]
        h-[420px]
        rounded-[160px]
        bg-[#0f0f0f]
        px-8 py-10
        flex flex-col items-center text-center
        transition-all duration-300
        overflow-hidden
      "
    >
      {/* GRADIENT BORDER */}
<span
  className="
    pointer-events-none
    absolute inset-0
    rounded-[160px]
    opacity-0
    group-hover:opacity-100
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
      <div className="mb-6 py-6">
        <Image src={logo} alt={title} width={120} height={120} />
      </div>

      {/* DOT */}
      <div className="w-1.5 h-1.5 rounded-full bg-[#0fb9b1] mb-6" />

      {/* TITLE */}
      <h3 className="text-sm font-medium mb-4">{title}</h3>

      {/* DESCRIPTION */}
      <p className="text-xs text-white/60 leading-relaxed">
        {description}
      </p>

      {/* ARROW */}
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