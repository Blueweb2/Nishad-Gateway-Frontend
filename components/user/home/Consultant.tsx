"use client";

import { useState } from "react";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";
import FadeUpScroll from "../ui/FadeUpScroll";

const contentData = {
  western: [
    {
      title: "Work Culture",
      description:
        "Professional, relationship-driven, and fast-evolving, with a strong focus on results and Vision 2030 goals.",
    },
    {
      title: "Dress Code",
      description:
        "Modest and professional; expats enjoy flexibility while respecting local norms in public spaces.",
    },
    {
      title: "Social Life",
      description:
        "A growing lifestyle scene with cafés, events, gyms, entertainment zones, and expat communities.",
    },
    {
      title: "Housing",
      description:
        "Wide options including expat compounds, gated communities, and modern city apartments.",
    },
    {
      title: "Education",
      description:
        "Access to high-quality international schools following American, British, IB, and European curricula.",
    },
    {
      title: "Healthcare",
      description:
        "Modern hospitals, private clinics, and international-standard medical care are widely available.",
    },
    {
      title: "Banking",
      description:
        "Advanced digital banking, international transfers, and expat-friendly financial services.",
    },
  ],
  asian: [
    {
      title: "Job Opportunities",
      description:
        "Strong demand across construction, healthcare, IT, logistics, retail, and service sectors.",
    },
    {
      title: "Cost of Living & Community Life",
      description:
        "Affordable living options with well-established Asian communities across major cities.",
    },
    {
      title: "Schools",
      description:
        "International and community-based schools offering Indian, Filipino, British, and CBSE curricula.",
    },
    {
      title: "Food & Lifestyle",
      description:
        "Easy access to Asian groceries, restaurants, cultural food habits, and social networks.",
    },
  ],
};

export default function Consultant() {
  const [activeTab, setActiveTab] = useState<"western" | "asian">("western");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeContent = contentData[activeTab];
  const currentItem = activeContent[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === activeContent.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? activeContent.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full h-screen text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ParallaxImage
          src="/consultantbg.webp"
          alt="Life in Saudi Arabia"
          className="w-full h-full"
          priority
          speed={160}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/65 z-10" />

      {/* Middle Divider Line */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20 z-20" />

   {/* Controls */}
<div className="absolute inset-x-0 top-0 h-full z-50 pointer-events-none">
  <div className="w-full h-full flex items-center justify-between px-16 pointer-events-auto">

    {/* Counter */}
    <div className="text-sm text-white/50">
      <div className="flex items-center gap-4">
        <span>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span>|</span>
        <span>
          {String(activeContent.length).padStart(2, "0")}
        </span>
      </div>
    </div>

    {/* Arrows */}
    <div className="flex gap-6">
      <OvalArrow
        direction="left"
        variant="white"
        onClick={prevSlide}
      />
      <OvalArrow
        direction="right"
        variant="white"
        onClick={nextSlide}
      />
    </div>

  </div>
</div>

      {/* Content */}
      <div className="relative z-40 max-w-[1400px] mx-auto px-16 h-full">
        <div className="grid grid-cols-3 h-full items-center">

          {/* LEFT */}
          <div className="flex flex-col justify-center">
            <FadeUpScroll delay={0.1}>
              <h2 className="text-[42px] font-semibold leading-[1.15] mb-16">
                Life in <br />
                Saudi Arabia
              </h2>
            </FadeUpScroll>

            <p className="text-white/40 text-lg">
              {currentItem.title}
            </p>
          </div>

          {/* CENTER */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[420px] h-[560px] bg-white/10 rounded-[200px]" />

            <FadeUpScroll key={activeIndex}>
              <p className="relative z-10 text-3xl font-semibold text-center leading-tight">
                {currentItem.title}
              </p>
            </FadeUpScroll>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-center items-start max-w-md">

            {/* Tabs */}
            <div className="flex items-center gap-8 text-sm mb-10">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("western");
                  setActiveIndex(0);
                }}
                className={`underline underline-offset-4 transition ${
                  activeTab === "western"
                    ? "text-green-400"
                    : "text-white/50 hover:text-white"
                }`}
              >
                For Americans & Europeans
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("asian");
                  setActiveIndex(0);
                }}
                className={`underline underline-offset-4 transition ${
                  activeTab === "asian"
                    ? "text-green-400"
                    : "text-white/50 hover:text-white"
                }`}
              >
                For Asians
              </button>
            </div>

            <FadeUpScroll key={activeIndex + activeTab} delay={0.2}>
              <p className="text-white/70 leading-relaxed mb-8">
                {currentItem.description}
              </p>
            </FadeUpScroll>

            <button type="button" className="text-sm underline underline-offset-4">
              Read More
            </button>

          </div>

        </div>
      </div>

    </section>
  );
}
