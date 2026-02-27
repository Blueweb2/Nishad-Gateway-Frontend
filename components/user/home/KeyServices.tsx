"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import FadeUpScroll from "../ui/FadeUpScroll";


export default function KeyServices() {
  return (
    <section className="w-full bg-[#84817F] text-white" data-navbar="light" data-menu="dark-text">
      <div className="max-w-8xl mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <FadeUpScroll delay={0.1}>
            <h2 className="text-[30px] font-semibold">
              Top Investment Sectors in Saudi Arabia
            </h2>
          </FadeUpScroll>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">

          <Card
            icon="/icons/sectors/manufacturing.svg"
            title="Manufacturing & Industrial Licenses"
            description="The government’s localization initiatives in Saudi Arabia are promoting local manufacturing, industrial licensing, and export-oriented manufacturing as part of Vision 2030."
          />

          <Card
            icon="/icons/sectors/trading.svg"
            title="Trading & Distribution"
            description="Saudi Arabia’s massive consumer market and favorable geographical position make it one of the most prominent trading, import-export, and distribution centers."
          />

          <Card
            icon="/icons/sectors/tech.svg"
            title="IT, AI, SaaS & Tech Startups"
            description="Digital transformation projects, smart city developments, and government-supported innovation initiatives are opening up technology investment opportunities in Saudi Arabia."
          />

          <Card
            icon="/icons/sectors/healthcare.svg"
            title="Healthcare & Pharma"
            description="Healthcare development, pharmaceutical manufacturing, and private healthcare investment are opening up scalable business opportunities in the Kingdom."
          />

          <Card
            icon="/icons/sectors/education.svg"
            title="Education & Training Institutes"
            description="Saudization and workforce development initiatives are fueling demand for licensed training institutes and professional education services."
          />

          <Card
            icon="/icons/sectors/food.svg"
            title="Restaurants, Cafes & Food Production"
            description="The Kingdom’s young population, lifestyle development, and tourism development are fueling food and beverage business setup in Saudi Arabia."
          />

          <Card
            icon="/icons/sectors/logistics.svg"
            title="Logistics & Supply Chain"
            description="The Kingdom’s infrastructure development under Vision 2030 is making Saudi Arabia a global logistics and supply chain hub in the GCC and Middle East."
          />

          <Card
            icon="/icons/sectors/Fleet-and-Transportation-Services.svg"
            title="Fleet & Transportation Services"
            description="E-commerce development and infrastructure development are fueling demand for licensed transportation and fleet management services."
          />

          <Card
            icon="/icons/sectors/realestate.svg"
            title="Real Estate & Construction"
            description="Mega projects, economic cities, and urban development initiatives are driving the long-term."
          />

          <Card
            icon="/icons/sectors/Sports-Media-and-Entertainment.svg"
            title="Sports, Media & Entertainment"
            description="Tourism, cultural, and global initiatives are transforming the sports and entertainment sectors in Saudi Arabia."
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
      bg-[#908D8C]
      hover:bg-[#096C6C]
      transition-all duration-300 ease-out
      rounded-2xl
      p-6
      w-full
      min-h-[280px]
      cursor-pointer
      flex flex-col justify-between
    ">

      {/* Top Row */}
      <div className="flex items-start justify-between">
        <Image src={icon} alt={title} width={50} height={50} />

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>

      {/* Content */}
      <div className="mt-6 relative">
        <p
          className="
            text-2xl text-[14px] font-medium text-white
            absolute bottom-2  left-0 leading-[16px]
            transition-all duration-300
            group-hover:translate-y-[-100px]
          "
        >
          {title}
        </p>
        <p
          className="
            text-white text-sm leading-[16px]
            opacity-0 translate-y-4
            transition-all duration-300
            group-hover:opacity-100
            group-hover:translate-y-0
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
};