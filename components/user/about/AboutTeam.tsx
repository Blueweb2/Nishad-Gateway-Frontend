"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const slides = [
  {
    src: "/about/testimonials.jpg",
    title: "MAADEN",
    description:
      "MODON enables integrated industrial investment environments that support diversification and employment.",
    link: "Browse Case Studies"
  },
  {
    src: "/about/saudi-expansion.png",
    title: "MODON",
    description:
      "Creating strong industrial ecosystems that foster investment, employment, and long-term development.",
    link: "Explore Mining Projects"
  },
  {
    src: "/about/indro-section.jpg",
    title: "NEOM",
    description:
      "NEOM is building a futuristic, sustainable region powered by innovation, advanced technology, and smart infrastructure.",
    link: "View Industrial Developments"
  },
  {
    src: "/about/buisnessveriticals.jpg",
    title: "ARAMCO",
    description:
      "Aramco drives global energy solutions while investing in sustainable development and technological advancement.",
    link: "Discover Future Cities"
  },
  {
    src: "/about/aboutIntro.jpg",
    title: "RED SEA GLOBAL",
    description:
      "Red Sea Global develops regenerative tourism destinations focused on environmental protection and luxury experiences.",
    link: "Explore Energy Innovations"
  },
  {
    src: "/about/aboutHero.jpg",
    title: "SABIC",
    description:
      "SABIC is a global leader in diversified chemicals, delivering innovative material solutions for industries worldwide.",
    link: "View Tourism Destinations"
  },
];

export default function TeamSection() {

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
    
  const activeSlide = slides[activeIndex];

  return (
    <section className="w-full bg-[#f3f3f3] py-24">
      <div className="max-w-7xl mx-auto px-8 relative">

        {/* Top Title */}
        <h2 className="text-3xl font-extrabold">Our <br /> Team</h2>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 items-center gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-8">

            <div className="flex items-center">
              {/* Counter */}
              <p className="text-sm text-gray-500">
                01 <span className="mx-2">|</span> 06
              </p>

              {/* Name */}
              <div className="ml-10">
                <h3 className="text-xl font-semibold">
                  Nishad <br /> Abdurahiman
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Business Incorporation Specialist
                </p>
              </div>
            </div>

            {/* Divider Line */}
            <div className="h-px bg-gray-300 w-full"></div>

            <div className="flex items-center relative">
              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm ml-10">
                At Analytix, we help businesses expand into Saudi Arabia through
                expert consulting, company setup, and incorporation services.
                We simplify legal procedures, ensure compliance, and guide
                clients through every stage of market entry.
              </p>
            </div> 
          </div>

          {/* CENTER IMAGE */}
          <div className="flex flex-col items-center">

            <div className="relative w-80 h-[480px] rounded-[160px] overflow-hidden">
              <Image
                src="/about/aboutIntro.jpg"
                alt="Team Member"
                fill
                className="object-cover"
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
                <img src="/about/linkedin.svg" alt="" className="w-4 h-4"/>
              </a>
              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400">
                <img src="/about/whatsapp.svg" alt="" className="w-4 h-4"/>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-around">

            <div>
              <p className="text-xs text-gray-400">Work Experience:</p>
              <p className="text-lg font-semibold mt-1">12 Years</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Country:</p>
              <p className="text-lg font-semibold mt-1">Saudi Arabia</p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition">
                <ChevronLeft size={18} />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-black hover:text-white transition">
                <ChevronRight size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};