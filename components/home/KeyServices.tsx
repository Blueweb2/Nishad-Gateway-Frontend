"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";


export default function KeyServices() {
  return (
    <section className="w-full bg-[#84817F] text-white">
      <div className="max-w-[1320px] mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-2xl font-semibold">
            Key Sectors Driving Growth
          </h2>

          <button className="text-sm text-white/80 hover:text-white underline">
            Explore Investment Sectors
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-4 gap-6">

          <Card
            icon="/icons/sectors/manufacturing.svg"
            title="Manufacturing & Industrial"
            description="Growing industrial zones across key neighborhoods and regions."
          />

          <Card
            icon="/icons/sectors/trading.svg"
            title="Trading & Distribution"
            description="Strengthening import, export, and regional distribution networks."
          />

          <Card
            icon="/icons/sectors/tech.svg"
            title="IT, AI & Tech"
            description="Innovation driven by digital culture, smart cities, and AI adoption."
          />

          <Card
            icon="/icons/sectors/healthcare.svg"
            title="Healthcare & Pharma"
            description="Advanced medical services supporting local communities and demand."
          />

          <Card
            icon="/icons/sectors/education.svg"
            title="Education & Training"
            description="Skills development aligned with local cultures and future needs."
          />

          <Card
            icon="/icons/sectors/food.svg"
            title="Food & Hospitality"
            description="Culinary diversity shaped by food traditions and celebrations."
          />

          <Card
            icon="/icons/sectors/logistics.svg"
            title="Logistics & Transport"
            description="Supporting tourism, attractions, and cross-region connectivity."
          />

          <Card
            icon="/icons/sectors/realestate.svg"
            title="Real Estate & Construction"
            description="Developments for housing, shopping, and lifestyle destinations."
          />

        </div>
      </div>
    </section>
  );
}

/* ---------- Reusable Card ---------- */

function Card({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        group
        relative
        bg-[#908D8C] border border-[transparent]
        hover:bg-[#096C6C]
        transition-colors duration-300
        rounded-2xl
        p-6
        h-[170px]
        cursor-pointer
        overflow-hidden
      "
    >
      {/* TOP ROW */}
      <div className="flex items-start justify-between">
        {/* SECTOR ICON */}
      <Image
  src={icon}
  alt={title}
  width={50}
  height={46}
  priority={false}
/>
        {/* ARROW ICON */}

      <ArrowRight
  size={18}
  className="text-white transition-transform duration-300 group-hover:translate-x-1"
/>

      </div>

      {/* BOTTOM CONTENT */}
      <div className="absolute left-6 right-6 bottom-6">
        {/* Description (hover only) */}
        <p
          className="
            text-xs text-white/90 leading-relaxed
            mb-2
            opacity-0 translate-y-2
            transition-all duration-300
            group-hover:opacity-100
            group-hover:translate-y-0
          "
        >
          {description}
        </p>

        {/* Title (always visible, bottom-aligned) */}
        <p
          className="
            text-sm font-medium
            transition-opacity duration-300
            group-hover:opacity-90
          "
        >
          {title}
        </p>
      </div>
    </div>
  );
}
