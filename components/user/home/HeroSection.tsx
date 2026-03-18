"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] lg:min-h-dvh overflow-hidden">

      {/* Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/riyadhhero.webp"
          alt="Riyadh city skyline with modern buildings and business district, Saudi Arabia"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          title="Business and services in Riyadh, Saudi Arabia"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-[500px] lg:min-h-dvh flex flex-col px-4 sm:px-6 lg:px-6">
        <div className="mt-auto text-center">

          <motion.p
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-[20px] sm:text-[26px] md:text-[30px] lg:text-[35px] xl:text-[40px] mb-1"
          >
            Your Gateway to
          </motion.p>

          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white font-extrabold leading-[0.85] text-center text-[58px] sm:text-[16vw] md:text-[40px] lg:text-[16vw] whitespace-nowrap"
          >
            Saudi Arabia
          </motion.h2>

        </div>
      </div>

    </section>
  );
};