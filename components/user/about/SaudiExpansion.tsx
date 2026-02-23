"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "17+", label: "Years of Experience" },
  { value: "8+", label: "International Market Presence" },
  { value: "2,500+", label: "Company Formations in KSA" },
  { value: "250+", label: "Professionals" },
];

export default function SaudiExpansion() {
  return (
    <section className="w-full bg-[#0F6B63] text-white py-28">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Top Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT TITLE */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-semibold leading-tight max-w-[500px]">
              We help you to expand your business in Saudi Arabia
            </h2>
          </motion.div>

          {/* RIGHT DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 leading-relaxed max-w-[520px]"
          >
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.
          </motion.p>
        </div>

        {/* Bottom Grid */}
        <div className="mt-20 grid lg:grid-cols-2 gap-16 items-center">

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[420px] rounded-[40px] overflow-hidden"
          >
            <Image
              src="/about/saudi-expansion.jpg"
              alt="Saudi Expansion"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* STATS */}
          <div className="space-y-12">

            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex justify-between items-center border-b border-white/20 pb-6"
              >
                <span className="text-3xl font-semibold">
                  {stat.value}
                </span>

                <span className="text-white/80 text-sm">
                  {stat.label}
                </span>
              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}