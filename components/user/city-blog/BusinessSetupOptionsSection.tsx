"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
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
    <section className="py-[clamp(60px,8vw,120px)] bg-[#f4f4f4] text-center" data-navbar="light">
      <div className="max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)]">

        {/* Heading */}
        <motion.h2
          initial={{ y: -120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-bold mb-6 text-[clamp(1.8rem,3.5vw,2.5rem)]"
        >
          {heading}
        </motion.h2>

        {/* Description */}

        <motion.h2
          initial={{ y: -120, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rich-text font-bold mb-6 text-[clamp(1.8rem,3.5vw,2.5rem)]"
          dangerouslySetInnerHTML={{
            __html: heading?.trim()
              ? heading
              : "Business Setup Options",
          }}
        />

        {/* Cards */}
        <div className="flex gap-[clamp(16px,2vw,32px)] overflow-x-auto pb-6 snap-x snap-mandatory hide-scrollbar">

          {options.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="
                snap-start
                w-[220px] 
                h-[220px]
                sm:w-[240px] sm:h-[240px]
                md:w-[260px] md:h-[260px]
                lg:w-[280px] lg:h-[280px]
                xl:w-[320px] xl:h-[320px]
                p-5 lg:p-7
                rounded-2xl
                bg-white
                shadow-md
                transition-all
                duration-700
                hover:bg-teal-700
                hover:text-white
                hover:shadow-xl
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
          <div
            className="rich-text mt-6 text-gray-600 max-w-[clamp(300px,65vw,800px)] mx-auto text-[clamp(0.9rem,1.1vw,1rem)]"
            dangerouslySetInnerHTML={{ __html: bottomText }}
          />
        )}

      </div>
    </section>
  );
}
