"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    name: "Shiju S Pillai",
    role: "Founder & Chairman",
    image: "/about/testimonial1.jpg",
    quote: `We’re your on-the-ground partner in Saudi Arabia. Our team
    of local business experts help you set up and grow.

    Explore the unique advantages of establishing your business
    in Saudi Arabia. Discover how the Saudi’s business
    environment and strategic location can boost your business growth.`,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () =>
    setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const data = testimonials[active];

  return (
    <section className="relative w-full bg-[#F4F4F4] py-28 overflow-hidden">
      {/* Background Text */}
      <h1 className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[180px] font-bold text-gray-200 opacity-30 select-none pointer-events-none">
        Testimonials
      </h1>

      <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-3 items-center gap-12 relative z-10">
        
        {/* LEFT SIDE */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl lg:text-5xl font-semibold leading-tight"
          >
            Real <br /> Experiences <br /> with Our <br /> Agents
          </motion.h2>

          <div className="mt-16 text-gray-500 text-sm flex items-center gap-4">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <div className="w-10 h-[1px] bg-gray-400" />
            <span>{String(testimonials.length).padStart(2, "0")}</span>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">{data.name}</h3>
            <p className="text-sm text-gray-500">{data.role}</p>
          </div>
        </div>

        {/* CENTER IMAGE */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <div className="relative w-[380px] h-[520px] rounded-[200px] overflow-hidden">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          key={`text-${active}`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">
            "{data.quote}"
          </p>

          {/* Arrows */}
          <div className="flex gap-4 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20 relative z-10">
        <a
          href="/contact"
          className="text-green-700 font-medium hover:underline"
        >
          Get Personalized Setup Advice →
        </a>
      </div>
    </section>
  );
}