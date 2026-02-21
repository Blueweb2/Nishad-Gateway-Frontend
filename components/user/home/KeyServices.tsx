"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import FadeUpScroll from "../ui/FadeUpScroll";


export default function KeyServices() {
  return (
    <section className="w-full bg-[#84817F] text-white" data-navbar="light">
      <div className="max-w-8xl mx-auto px-6 py-24">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">
          <FadeUpScroll delay={0.1}>
            <h2 className="text-[30px] font-semibold">
              Key Sectors Driving Growth
            </h2>
          </FadeUpScroll>
          <button className="text-xl text-white/80 hover:text-white underline">
            Explore Investment Sectors
          </button>
        </div>

        {/* GRID */}
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8">

          <Card
            icon="/icons/sectors/manufacturing.svg"
            title="Manufacturing & Industrial Licenses"
            description="Government localization policies are accelerating domestic manufacturing and industrial expansion."
          />

          <Card
            icon="/icons/sectors/trading.svg"
            title="Trading & Distribution"
            description="Saudi Arabia’s large consumer base and strategic location support strong trade and distribution growth."
          />

          <Card
            icon="/icons/sectors/tech.svg"
            title="IT, AI, SaaS & Tech Startups"
            description="Digital transformation and smart-city initiatives are fueling rapid technology adoption."
          />

          <Card
            icon="/icons/sectors/healthcare.svg"
            title="Healthcare & Pharma"
            description="Public and private investment is expanding healthcare infrastructure and pharmaceutical production."
          />

          <Card
            icon="/icons/sectors/education.svg"
            title="Education & Training Institutes"
            description="Workforce development and Saudization are increasing demand for professional education providers."
          />

          <Card
            icon="/icons/sectors/food.svg"
            title="Restaurants, Cafes & Food Production"
            description="Lifestyle changes and a young population are driving growth in food and beverage businesses."
          />

          <Card
            icon="/icons/sectors/logistics.svg"
            title="Logistics & Supply Chain"
            description="Vision 2030 positions Saudi Arabia as a global logistics and supply-chain hub."
          />

          <Card
            icon="/icons/sectors/Fleet-and-Transportation-Services.svg"
            title="Fleet & Transportation Services"
            description="Rising e-commerce and infrastructure projects are boosting transport and fleet operations."
          />

          <Card
            icon="/icons/sectors/realestate.svg"
            title="Real Estate & Construction"
            description="Mega projects and urban development continue to generate long-term construction demand."
          />

          <Card
            icon="/icons/sectors/Sports-Media-and-Entertainment.svg"
            title="Sports, Media & Entertainment"
            description="Government-backed tourism and cultural initiatives are transforming the entertainment sector."
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
"
    >

      {/* Top Row */}
      <div className="flex items-start justify-between">
        <Image src={icon} alt={title} width={82} height={82} />

        <ArrowRight
          size={18}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>

      {/* Content */}
      <div className="mt-6">
        <p className="text-xl font-medium">
          {title}
        </p>

        <p
          className="
            text-base md:text-lg text-white/90 leading-tight
            mt-3
            opacity-0 translate-y-2
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
}





