"use client";
import { motion } from "framer-motion";

const values = [
  {
    title: "Saudi Market Expertise",
    description: 'Deep knowledge of MISA licensing in Saudi Arabia (link → MISA License service page) and company formation in Saudi Arabia (link → Company Formation service page) ensures businesses enter the market with clarity and confidence.'
  },
  {
    title:
      "Global Business Perspective",
    description: 'Supporting entrepreneurs and investors worldwide looking to expand their business in Saudi Arabia (link → Market Entry Strategy service page) and access opportunities across the Middle East.'
  },
  {
    title: "End-to-End Market Entry Support",
    description: 'From Saudi Arabia business setup (link → Business Setup service page) and regulatory approvals (link → Government Approvals / Compliance service page) to operational launch and expansion, we guide companies through every stage of their Saudi journey.'
  },
  {
    title:
      "Integrity & Professional Excellence",
    description: 'Delivering trusted advisory services built on Saudi business compliance and regulatory guidance (link → Compliance / Legal service page) to help companies operate confidently in the Kingdom.'
  },
];

export default function BrandValues() {

  return (
    <section className="w-full bg-[#F4F4F4] py-12 lg:py-28" data-menu="dark-text">
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
          Our work is guided by expertise, transparency, and a commitment to helping global businesses
          successfully establish and expand in Saudi Arabia’s evolving business landscape under Vision
          2030 (link → Vision 2030 blog page).
        </p>

        {/* Cards */}
        <div className="flex overflow-x-auto scroll-smooth hide-scrollbar md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4 mt-16">
          {values.map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative min-w-[300px] md:min-w-0  p-8 rounded-3xl text-left flex flex-col transition-all duration-300 cursor-pointer bg-white text-gray-800 shadow-sm hover:bg-[#0E6B63] hover:text-white hover:shadow-xl"
            >
              {/* Text */}
              <h3 className="text-[15px] md:text-[16px] font-semibold leading-snug">
                {value.title}
              </h3>

              <p className="text-sm md:text-[15px] leading-relaxed mt-5">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};