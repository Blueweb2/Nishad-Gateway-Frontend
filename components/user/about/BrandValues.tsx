"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import OvalArrow from "@/components/user/ui/OvalArrow";

const values = [
  {
    title: "Leading Consultants Across Saudi Arabia",
  },
  {
    title:
      "Global presence supporting businesses in every major market",
  },
  {
    title: "End-to-end support for your entire business journey",
  },
  {
    title:
      "Integrity and excellence in every client engagement",
  },
  {
    title:
      "Strong collaborative stakeholder partnerships",
  },
];

export default function BrandValues() {
  const [active, setActive] = useState(1);

  return (
    <section className="w-full bg-[#F4F4F4] py-28" data-menu="dark-text">
      <div className="max-w-[1400px] mx-auto px-6 text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-semibold"
        >
          Our Brand Values
        </motion.h2>

        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </p>

        {/* Cards */}
        <div className="mt-16 flex gap-6 overflow-x-auto pb-4 scroll-smooth hide-scrollbar">

          {values.map((value, index) => {
            const isActive = index === active;

            return (
              <motion.div
                key={index}
                onClick={() => setActive(index)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative min-w-[300px] md:min-w-[340px] h-[220px] p-8 rounded-3xl text-left flex flex-col justify-between transition-all duration-300 cursor-pointer bg-white text-gray-800 shadow-sm hover:bg-[#0E6B63] hover:text-white hover:shadow-xl"
              >
                {/* Text */}
                <p className="leading-relaxed text-[15px]">
                  {value.title}
                </p>

                {/* Arrow */}
                <div className="flex justify-end">
                  <OvalArrow
                    direction="right"
                    variant="gray"
                    className="w-[36px] h-[48px]"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}