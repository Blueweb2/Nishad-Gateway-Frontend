"use client";

import { useState } from "react";
import OvalArrow from "@/components/user/ui/OvalArrow";
import ParallaxImage from "../shared/ParallaxImage";

const contentData = {
  western: [
    { title: "Professional Work Culture", description: "Professional, relationship-driven, and fast-evolving, with a strong focus on results and Vision 2030 goals.", image: "/consultant/Work-Culture.jpg" },
    { title: "Dress Code & Cultural Etiquette ", description: "Modest and professional; expats enjoy flexibility while respecting local norms in public spaces.", image: "/consultant/Dress-Code.jpg" },
    { title: "Social Life, Entertainment & Lifestyle ", description: "A growing lifestyle scene with cafés, events, gyms, entertainment zones, and expat communities.", image: "/consultant/Social-Life.jpg" },
    { title: "Housing Options & Expat Communities ", description: "Wide options including expat compounds, gated communities, and modern city apartments.", image: "/consultant/Housing.jpg"  },
    { title: "International Education & Schools ", description: "Access to high-quality international schools following American, British, IB, and European curricula.",  image: "/consultant/Education.jpg" },
    { title: "Healthcare Facilities & Medical Services", description: "Modern hospitals, private clinics, and international-standard medical care are widely available.", image: "/consultant/Healthcare.jpg" },
    { title: "Banking, Finance & Digital Payments ", description: "Advanced digital banking, international transfers, and expat-friendly financial services." , image: "/consultant/Banking.jpg"},
  ],
  asian: [
    { title: "Employment Opportunities Across Key Sectors ", description: "Strong demand across construction, healthcare, IT, logistics, retail, and service sectors.", image: "/consultant/employment.jpg" },
    { title: "Cost of Living & Community Life", description: "Affordable living options with well-established Asian communities across major cities.", image: "/consultant/Cost-of-Living-and-Community-Life.jpg" },
    { title: "Community Networks & Cultural Support", description: "Strong Asian communities, cultural associations, religious centers, and social groups provide support, connection, and a sense of home across major Saudi cities.",image: "/consultant/Cost-of-Living-and-Community-Life.jpg" },
    { title: "Schools & Curriculum Options ", description: "International and community-based schools offering Indian, Filipino, British, and CBSE curricula." ,image: "/consultant/Schoolsasian.jpg"},
    { title: "Food Culture, Cuisine & Daily Lifestyle  ", description: "Easy access to Asian groceries, restaurants, cultural food habits, and social networks", image: "/consultant/Food-and-Lifestyle.jpg"},
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
    <section className="relative w-full h-screen text-white overflow-hidden" data-navbar="light">

      {/* Background */}
 <div key={activeIndex + activeTab} className="absolute inset-0 z-0 transition-opacity duration-700">
  <ParallaxImage
    src={currentItem.image}
    alt={currentItem.title}
    className="w-full h-full object-cover"
    priority
    speed={160}
  />
</div>


      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* Top Right Tabs */}
      <div className="absolute top-[6vw] right-[10vw] z-30 flex gap-[2vw] text-[0.9vw]">
        <button
          onClick={() => {
            setActiveTab("western");
            setActiveIndex(0);
          }}
          className={`pb-[0.3vw] border-b transition ${
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
          className={`pb-[0.3vw] border-b transition ${
            activeTab === "asian"
              ? "border-green-400 text-green-400"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          For Asians
        </button>
      </div>

      {/* Main Grid */}
      <div className="relative z-20 h-full px-[5vw] grid grid-cols-3 items-center">

        {/* LEFT COLUMN */}
        <div className="flex flex-col h-full justify-center">

          <h2 className="text-[3vw] font-semibold leading-tight mb-[2vw] mt-[6vw]">
            Confidence <br />
            Beyond the <br />
            Investment
          </h2>

          {/* Bottom Left */}
          <div className="mt-auto mb-[16vw]">
            <div className="flex items-center gap-[1vw] text-white/60 text-[1vw] mb-[1vw]">
              <span>{formattedCurrent}</span>
              <span>|</span>
              <span>{formattedTotal}</span>
            </div>

            <p className="text-white/40 text-[1.4vw] mb-[1vw] w-[12vw] leading-tight">
              {previousTitle}
            </p>

            <div className="h-px bg-white/20 w-full" />
          </div>
        </div>

        {/* CENTER CAPSULE */}
        <div className="relative flex items-center justify-center">

          <div className="absolute w-[26vw] h-[32vw] bg-white/10 backdrop-blur-xxl border border-white/10
  rounded-[160px]" />

          <h3 className="relative z-10 text-[2.2vw] font-semibold text-center max-w-[16vw] leading-tight">
            {currentItem.title}
          </h3>
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col justify-center items-start max-w-[28vw] ml-auto h-full mt-[10vw]">

          <p className="text-white/80 text-[1vw] leading-tight mb-[2vw] w-[22vw]">
            {currentItem.description}
          </p>

          <button className="text-[1vw] underline underline-offset-4 mb-[2vw]">
            Read More
          </button>

          <div className="h-px bg-white/20 w-full mb-[3vw]" />

          {/* Arrows */}
          <div className="flex gap-[1.5vw]">
            <OvalArrow direction="left" variant="white" onClick={prevSlide} />
            <OvalArrow direction="right" variant="white" onClick={nextSlide} />
          </div>

        </div>
      </div>
    </section>
  );
}
