"use client";

import { useState } from "react";
import OvalArrow from "@/components/user/ui/OvalArrow";
import { motion, AnimatePresence } from "framer-motion";

import Link from "next/link";

const contentData = {
  western: [
    {
      title: "Professional Work Culture",
      description:
        "Professional, relationship-driven, and fast-evolving, with a strong focus on results and Vision 2030 goals.",
      image: "/consultant/Professional-Work-Culture.jpg.jpeg",
    },

    {
      title: "Dress Code & Cultural Etiquette ",
      description:
        "Modest and professional; expats enjoy flexibility while respecting local norms in public spaces.",
      image: "/buisnessgrowth/Dress-Code.webp",
    },

    {
      title: "Social Life, Entertainment & Lifestyle ",
      description: (
        <>
          Expat life in Saudi Arabia has evolved significantly with modern
          cafés, international restaurants, global events, sports facilities,
          and entertainment districts. Professionals who{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            establish their companies in Saudi Arabia
          </Link>{" "}
          benefit from a vibrant lifestyle supported by{" "}
          <Link
            href="/blogs/giga-projects-in-saudi-arabia-a-key-part-of-vision-2030"
            className="text-green-700 hover:underline"
          >
            Vision 2030 developments
          </Link>{" "}
          across major cities.
        </>
      ),
      image: "/consultant/Social-Life.jpg",
    },

    {
      title: "Housing Options & Expat Communities ",
      description: (
        <>
          Living in Saudi Arabia offers diverse housing choices including
          gated compounds, expatriate communities, and modern apartments in
          business hubs such as{" "}
          <Link
            href="/cities/discover-riyadh"
            className="text-green-700 hover:underline"
          >
            Riyadh
          </Link>{" "}
          and{" "}
          <Link
            href="/cities/explore-jeddah"
            className="text-green-700 hover:underline"
          >
            Jeddah
          </Link>
          . These cities host many global entrepreneurs completing{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            company registration in Saudi Arabia
          </Link>{" "}
          and expanding their business in Saudi Arabia.
        </>
      ),
      image: "/buisnessgrowth/Housing.webp",
    },

    {
      title: "International Education & Schools ",
      description: (
        <>
          Families relocating after completing{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            ownership structuring
          </Link>{" "}
          can access leading international schools offering American,
          British, IB, and European curricula across major cities. These
          institutions support expatriate families involved in{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            foreign investment in Saudi Arabia
          </Link>{" "}
          and long-term relocation.
        </>
      ),
      image: "/buisnessgrowth/Education.webp",
    },

    {
      title: "Healthcare Facilities & Medical Services",
      description: (
        <>
          Saudi Arabia provides internationally accredited hospitals,
          private clinics, and advanced healthcare services that support
          professionals and families relocating to manage their business in
          Saudi Arabia and long-term investment operations. Businesses can
          also rely on{" "}
          <Link
            href="/services/saudi-business-advisory"
            className="text-green-700 hover:underline"
          >
            business planning & strategy services
          </Link>
          .
        </>
      ),
      image: "/buisnessgrowth/Healthcare.webp",
    },

    {
      title: "Banking, Finance & Digital Payments ",
      description: (
        <>
          The financial ecosystem regulated by the{" "}
          <a
            href="https://www.sama.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:underline"
          >
            Saudi Central Bank (SAMA)
          </a>{" "}
          supports advanced digital banking, international transfers, and
          corporate financial services. Dedicated{" "}
          <Link
            href="/services/corporate-support"
            className="text-green-700 hover:underline"
          >
            financial services support
          </Link>{" "}
          helps investors opening companies after completing company
          formation in Saudi Arabia manage their banking operations
          efficiently. Investors also coordinate with the{" "}
          <a
            href="https://www.misa.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 hover:underline"
          >
            Ministry of Investment (MISA)
          </a>
          .
        </>
      ),
      image: "/consultant/Banking.jpg",
    },
  ],

  asian: [
    {
      title: "Employment Opportunities Across Key Sectors ",
      description: (
        <>
          Saudi Arabia continues to create strong demand across
          construction, logistics, healthcare, technology, retail, and
          service industries. Businesses entering through structured{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            company setup procedures
          </Link>{" "}
          benefit from transparent regulations and strong licensing
          compliance frameworks supporting{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            foreign investment in Saudi Arabia
          </Link>
          .
        </>
      ),
      image: "/consultant/employment-opportunities-across-key-sectors.jpg",
    },

    {
      title: "Cost of Living & Community Life",
      description: (
        <>
          Compared to many Western economies, the cost of living in Saudi
          Arabia remains competitive. Affordable housing, growing
          infrastructure, and established Asian communities support
          professionals planning to{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            start a business in Saudi Arabia
          </Link>{" "}
          or expand their regional operations.
        </>
      ),
      image: "/consultant/Cost-of-Living-and-Community-Life.jpg",
    },

    {
      title: "Community Networks & Cultural Support",
      description: (
        <>
          Large Asian communities across{" "}
          <Link
            href="/cities/discover-riyadh"
            className="text-green-700 hover:underline"
          >
            Riyadh
          </Link>
          ,{" "}
          <Link
            href="/cities/explore-jeddah"
            className="text-green-700 hover:underline"
          >
            Jeddah
          </Link>
          , and the Eastern Province provide cultural associations,
          religious centers, and social networks supporting professionals
          entering the Kingdom through strategic{" "}
          <Link
            href="/services/international-market-entry/market-entry-strategy"
            className="text-green-700 hover:underline"
          >
            market entry planning
          </Link>{" "}
          and business expansion in Saudi Arabia.
        </>
      ),
      image: "/consultant/community-networks-and-cultural-support.jpg",
    },

    {
      title: "Schools & Curriculum Options ",
      description: (
        <>
          Families relocating after completing{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            company setup procedures
          </Link>{" "}
          can access Indian, Filipino, British, and CBSE curriculum schools
          across major cities supporting professionals establishing their
          business in Saudi Arabia.
        </>
      ),
      image: "/consultant/Schoolsasian.jpg",
    },

    {
      title: "Food Culture, Cuisine & Daily Lifestyle",
      description: (
        <>
          Asian grocery stores, restaurants, and familiar cuisine are
          widely available in cities where international investors{" "}
          <Link
            href="/services/company-formation"
            className="text-green-700 hover:underline"
          >
            establish their companies in Saudi Arabia
          </Link>
          , making long-term relocation comfortable for expatriate
          communities.
        </>
      ),
      image: "/consultant/Food-and-Lifestyle.jpg",
    },
  ],
};

export default function Consultant() {
  const [activeTab, setActiveTab] = useState<"western" | "asian">("western");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeContent = contentData[activeTab];
  const currentItem = activeContent[activeIndex];

  const nextSlide = () =>
    setActiveIndex((prev) =>
      prev === activeContent.length - 1 ? 0 : prev + 1
    );

  const prevSlide = () =>
    setActiveIndex((prev) =>
      prev === 0 ? activeContent.length - 1 : prev - 1
    );

  const formattedCurrent = String(activeIndex + 1).padStart(2, "0");
  const formattedTotal = String(activeContent.length).padStart(2, "0");

  const previousTitle =
    activeIndex === 0
      ? activeContent[activeContent.length - 1].title
      : activeContent[activeIndex - 1].title;



  return (
    <section
      data-navbar="light"
      className="relative w-full min-h-[90dvh] lg:min-h-screen text-white overflow-hidden flex flex-col justify-center py-16"
    >

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        {activeContent.map((item, index) => (
          <img
            key={index}
            src={item.image}
            alt={item.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700
            ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      {/* TOP BAR (ONLY SHOW IN MOBILE) */}
      <div className="w-full lg:hidden z-20 absolute top-12 flex flex-col gap-3 items-center justify-center">
        <h2
          className="block w-full font-semibold text-3xl text-center"
        >
          Confidence Beyond the Investment
        </h2>

        <div className="flex justify-center gap-6 text-xm leading-snug">

          <button
            onClick={() => {
            setActiveTab("western");
            setActiveIndex(0);
            }}
            className={`pb-1 border-b transition ${
            activeTab === "western"
            ? "border-green-400 text-green-400"
            : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            For Americans & Europeans
          </button>

          <button
            onClick={() => {
            setActiveTab("asian");
            setActiveIndex(0);
            }}
            className={`pb-1 border-b transition ${
            activeTab === "asian"
            ? "border-green-400 text-green-400"
            : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            For Asians
          </button>

        </div>
      </div>


      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="relative z-20 mx-auto w-full px-6 mt-[60%] lg:mt-0">

        {/* TOP TABS */}
        <div className="hidden lg:flex lg:justify-end gap-6 text-sm md:text-[0.9vw] mb-12">

          <button
            onClick={() => {
            setActiveTab("western");
            setActiveIndex(0);
            }}
            className={`pb-1 border-b transition ${
            activeTab === "western"
            ? "border-green-400 text-green-400"
            : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            For Americans & Europeans
          </button>

          <button
            onClick={() => {
            setActiveTab("asian");
            setActiveIndex(0);
            }}
            className={`pb-1 border-b transition ${
            activeTab === "asian"
            ? "border-green-400 text-green-400"
            : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            For Asians
          </button>

        </div>


        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="hidden lg:flex flex-col text-center lg:text-left h-full">

            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-[3vw] font-semibold  leading-tight mb-10 lg:mt-[-139px]"
            >
              Confidence <br />
              Beyond the <br />
              Investment
            </motion.h2>

            {/* COUNTER md:justify-start*/}
            <div className="flex justify-center lg:justify-start items-center gap-3 text-white/60 text-sm mb-4">
              <span>{formattedCurrent}</span>
              <span>|</span>
              <span>{formattedTotal}</span>
            </div>


            {/* PREVIOUS TITLE */}
            <div className="relative min-h-[48px] max-w-[220px] mx-auto md:mx-0">

              <AnimatePresence mode="wait">
                <motion.div
                key={activeIndex}
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute w-full text-white/40 text-lg leading-snug"
                >
                {previousTitle}
                </motion.div>
              </AnimatePresence>

            </div>

            {/* md:block */}
            <div className="hidden lg:block h-px bg-white/20 w-full mt-6" />

          </div>

          {/* CENTER CAPSULE */}
          <div className="flex justify-center h-full">

            <div className="relative flex items-center justify-center">

            <div className="absolute w-[240px] h-[320px] sm:w-[280px] sm:h-[360px] md:w-[300px] md:h-[420px] lg:w-[26vw] lg:h-[32vw]
            bg-white/10 backdrop-blur-xxl border-white/10 rounded-[160px]" />

              <AnimatePresence mode="wait">
                <motion.h3
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-xl sm:text-2xl lg:text-[2.2vw] font-semibold text-center max-w-[240px] lg:max-w-[16vw] h-[70px] lg:h-auto"
                >
                  {currentItem.title}
                </motion.h3>
              </AnimatePresence>

            </div>

          </div>

          {/* RIGHT COLUMN 25%*/}
          <div className="flex flex-col items-center justify-end lg:items-start text-center lg:text-left max-w-lg mx-auto lg:mx-0 h-full mt-[25%] lg:mt-auto">

            <AnimatePresence mode="wait">
              <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-white/80 text-sm md:text-base lg:text-[1vw] leading-relaxed mb-6 h-[70px] lg:h-auto"
              >
                {currentItem.description}
              </motion.div>
            </AnimatePresence>

            <button className="text-sm md:text-base pb-10 lg:pb-0 underline underline-offset-4 ">
               Read More
            </button>

            <div className="hidden md:block h-px bg-white/20 w-full mt-5 mb-6" />

            {/* ARROWS FOR LARGE DIVICE */}
            <div className="hidden lg:flex gap-4 justify-center md:justify-start mb-[-67px]">
              <OvalArrow direction="left" variant="white" onClick={prevSlide} />
              <OvalArrow direction="right" variant="white" onClick={nextSlide} />
            </div>

          </div>

        </div>

      </div>

      {/* ARROWS (BUTTONS FOR MOBILE) */}
      <div className="flex lg:hidden gap-4 justify-between absolute bottom-5 w-full px-6 z-20">
        <OvalArrow direction="left" variant="white" onClick={prevSlide} />
        <OvalArrow direction="right" variant="white" onClick={nextSlide} />
      </div>

    </section>
  );
};