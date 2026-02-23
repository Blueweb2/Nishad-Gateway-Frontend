"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

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
    <section className="w-full bg-[#F4F4F4] py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-semibold"
        >
          Our Brand Values
        </motion.h2>

        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
          Lorem Ipsum is simply dummy text of the printing and typesetting
        </p>

        {/* Cards */}
        <div className="mt-16 flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {values.map((value, index) => {
            const isActive = index === active;

            return (
              <motion.div
                key={index}
                onClick={() => setActive(index)}
                whileHover={{ y: -6 }}
                className={`
                  min-w-[320px] p-8 rounded-3xl text-left transition-all duration-300 cursor-pointer
                  ${
                    isActive
                      ? "bg-[#0E6B63] text-white shadow-xl"
                      : "bg-white text-gray-800 shadow-sm"
                  }
                `}
              >
                <p className="leading-relaxed text-sm">
                  {value.title}
                </p>

                <div className="mt-8 flex justify-end">
                  <div
                    className={`
                      w-12 h-12 rounded-full border flex items-center justify-center transition
                      ${
                        isActive
                          ? "border-white text-white"
                          : "border-gray-400 text-green-600"
                      }
                    `}
                  >
                    <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}