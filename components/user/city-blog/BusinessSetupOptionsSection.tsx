"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BusinessSetupOptionsContent } from "@/lib/types/city-blog";

type Props = BusinessSetupOptionsContent;

export default function BusinessSetupOptionsSection({
  heading,
  description,
  options,
  decisionFlow,
  bottomText,
}: Props) {
  return (
    <section className="py-[clamp(60px,8vw,120px)] bg-[#f4f4f4] text-center">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]">

        {/* Heading */}
        <h2 className="font-bold mb-6 text-[clamp(1.8rem,3.5vw,2.5rem)]">
          {heading}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-16 max-w-[clamp(300px,60vw,700px)] mx-auto text-[clamp(0.95rem,1.2vw,1.1rem)]">
          {description}
        </p>

        {/* Cards */}
        <div className="flex gap-[clamp(16px,2vw,32px)] overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide">

          {options.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="
                snap-start
                w-[clamp(220px,22vw,320px)]
                h-[clamp(220px,22vw,320px)]
                p-[clamp(16px,2vw,28px)]
                rounded-2xl
                bg-white
                shadow-md
                transition-all
                duration-300
                hover:bg-teal-700
                hover:text-white
                hover:shadow-xl
                hover:scale-105
                flex
                flex-col
                items-start
                justify-between
                text-left
                group
              "
            >
              <h3 className="font-semibold text-[clamp(1rem,1.2vw,1.25rem)]">
                {item.title}
              </h3>

              {/* Arrow Button */}
              <div
                className="
                  w-[clamp(36px,3vw,48px)]
                  h-[clamp(36px,3vw,48px)]
                  rounded-full
                  border
                  border-gray-300
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-300
                  group-hover:border-white
                  group-hover:bg-white/20
                "
              >
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}

        </div>

        {/* Decision Flow */}
        {decisionFlow && (
          <p className="mt-16 text-gray-700 font-medium text-[clamp(0.95rem,1.2vw,1.1rem)]">
            {decisionFlow}
          </p>
        )}

        {/* Bottom Text */}
        {bottomText && (
          <p className="mt-6 text-gray-600 max-w-[clamp(300px,65vw,800px)] mx-auto text-[clamp(0.9rem,1.1vw,1rem)]">
            {bottomText}
          </p>
        )}

      </div>
    </section>
  );
}
