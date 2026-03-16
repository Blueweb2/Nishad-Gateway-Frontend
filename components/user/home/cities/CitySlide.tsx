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
    <section
      aria-label="Cities and zones in Saudi Arabia"
      className="relative w-full h-full text-white overflow-hidden">

        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src={city.cityImage || "/citiesbg.webp"}
            alt={city.cityName}
            className="absolute inset-0"
            priority
            speed={160}
          />
        </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/40" />

      <div className="relative z-20  mx-auto  h-full flex flex-col pt-12 lg:pt-[6vw]  max-w-[91.6vw]">

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center text-2xl sm:text-3xl lg:text-[38px] font-bold leading-tight mb-10 lg:mb-16"
        >
          Cities & Zones in Saudi Arabia
        </motion.h2>

        {/* Heading + Description*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end mb-6">

          {/* Heading */}
          <motion.h4
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-[1.8vw] leading-tight max-w-md"
          >
            {city.heading}
          </motion.h4>

          {/* Description */}
          <div className="lg:col-span-2 lg:flex">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/90 text-sm md:text-base lg:text-[1vw] leading-tight md:leading-relaxed max-w-lg lg:max-w-[24vw] text-left"
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
          className="w-full lg:w-[80%] h-px bg-white/20 mb-10"
        />

        {/* City Name + Arrow */}
        <div className="mb-10 lg:mb-[4vw] lg:mt-5">
          <div className="flex items-center gap-4 lg:gap-8">

            <motion.h3
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.6vw] font-bold leading-none tracking-tight"
            >
              {city.cityName}
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href={`/cities/${city.citySlug}`} className="group">
                <OvalArrow
                  direction="right"
                  className="w-[4.3vw] h-[7vw] transition-transform group-hover:translate-x-2"
                />
              </Link>
            </motion.div>

          </div>
        </div>

        {/* CTA */}
        <div className="lg:mt-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Link href="/ksa-expansion-cost-calculator">
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base lg:text-[1vw] font-medium px-6 md:px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg">
                Calculate Your KSA Expansion Cost
              </button>
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
};