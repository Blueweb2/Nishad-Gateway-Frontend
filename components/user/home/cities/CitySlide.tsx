"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "@/components/user/shared/ParallaxImage";

export type City = {
  cityName: string;
  citySlug: string;
  cityImage?: string;
  heading: string;
  description: string;
};

type Props = {
  city?: City;
};

export default function CitySlide({ city }: Props) {
  if (!city) {
    return (
      <div className="bg-red-500 text-white p-[2vw] text-center">
        City is undefined
      </div>
    );
  }

  return (
    <section className="relative w-full h-[110vh] text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src={city.cityImage || "/citiesbg.webp"}
          alt={city.cityName}
          className="w-full h-full object-cover"
          priority
          speed={160}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20 max-w-[91.6vw] mx-auto px-[4vw] h-full flex flex-col py-[4vw]">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[2.9vw] font-semibold mb-[6vw] mt-[3vw]"
        >
          Cities & Zones in Saudi Arabia
        </motion.h2>

        {/* Heading + Description */}
        <div className="grid grid-cols-3 items-start mb-[1.5vw]">

          {/* Heading */}
          <motion.h4
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[1.8vw] leading-[1.8vw] tracking-wide max-w-[18vw] "
          >
            {city.heading}
          </motion.h4>

          {/* Description */}
          <div className="flex justify-center">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/90 text-[1vw] leading-[1.2vw] max-w-[20vw] text-left"
            >
              {city.description}
            </motion.p>
          </div>

        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full h-px bg-white/20 mb-[4vw]"
        />

        {/* City Name + Arrow */}
        <div className="mb-[4vw]">
          <div className="flex items-center gap-[2vw]">

            <motion.h3
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="text-[5.6vw] font-bold leading-none tracking-tight"
            >
              {city.cityName}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href={`/cities/${city.citySlug}`} className="group mt-[1vw]">
                <OvalArrow
                  direction="right"
                  className="w-[4.3vw] h-[7vw] transition-transform group-hover:translate-x-[0.5vw]"
                />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* CTA */}
        <div className="flex">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/ksa-expansion-cost-calculator">
              <button className="bg-green-600 hover:bg-green-700 text-white text-[1vw] font-medium px-[2vw] py-[0.8vw] rounded-full transition-all duration-300 hover:shadow-lg">
                Calculate Your KSA Expansion Cost
              </button>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
