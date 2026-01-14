import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { SERVICES } from "@/lib/services/services.data";
import BackButton from "@/components/shared/BackButton";
import FinalCTA from "@/components/home/FinalCTA";
import ParallaxImage from "@/components/shared/ParallaxImage";

export default function CompanyFormationPage() {
  const service = SERVICES.companyFormation;

  return (
    <main data-navbar="white" className="w-full bg-white text-black">
      {/* TOP SPACE (because navbar fixed) */}
      <div className="h-28" />

      {/* HEADER */}
      <section className="w-full pb-10 pt-10">
        {/* FULL WIDTH TOP LINE */}
        <div className="w-full px-6">
          <div className="flex items-center justify-between mb-6">
            <BackButton />

            <div className="text-right text-gray-400 text-sm leading-tight">
              All/
              <span className="text-black font-semibold text-lg ml-1">
                {service.items.length}
              </span>
            </div>
          </div>
        </div>

        {/* CENTERED CONTENT (TITLE + DESCRIPTION) */}
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-12 items-start">
            {/* LEFT TITLE */}
            <div className="col-span-5">
              <h1 className="text-[46px] leading-[1.05] font-semibold text-gray-700">
                Company <br /> Formation
              </h1>
            </div>

            {/* DESCRIPTION CENTER */}
            <div className="col-span-4 col-start-7">
              <p className="text-sm text-gray-500 leading-relaxed">
                Lorem ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* LIST */}
      <section className="max-w-[1300px] mx-auto px-6">
        {service.items.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            className="
        group
        grid grid-cols-[420px_1fr_60px]
        items-center
        gap-10
        py-7
        border-t border-gray-200
      "
          >
            {/* LEFT COLUMN (Image + Title) */}
            <div className="flex items-center gap-6">
              {/* ICON IMAGE */}
              <div className="relative w-[58px] h-[58px] rounded-full overflow-hidden bg-gray-100 shrink-0">
                <ParallaxImage
                  src="/Olaya.webp"
                  alt={item.label}
                  className="absolute inset-0"
                  speed={40}
                />

              </div>

              <h3
                className="
    text-[26px] leading-[1.15] font-medium tracking-[-0.02em]
    text-black
    transition-colors
    group-hover:text-green-600
  "
              >
                {item.label}
              </h3>

            </div>

            {/* MIDDLE COLUMN (Description text) */}
            <p className="text-[12px] leading-[1.55] text-gray-600 max-w-[380px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
            </p>

            {/* RIGHT COLUMN (Arrow button) */}
            <div className="flex justify-end">
              <div
                className="
            w-10 h-10
            border border-gray-300
            rounded-xl
            flex items-center justify-center
            transition-all duration-300
            group-hover:border-gray-400
          "
              >
                <ArrowRight size={16} className="text-black" />
              </div>
            </div>
          </Link>
        ))}

        {/* Bottom border */}
        <div className="border-t border-gray-200" />
      </section>


      {/* CTA SECTION */}
      <FinalCTA />
    </main>
  );
}
