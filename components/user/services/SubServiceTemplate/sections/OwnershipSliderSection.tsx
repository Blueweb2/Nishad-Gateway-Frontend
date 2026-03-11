"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import OvalArrow from "@/components/user/ui/OvalArrow";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

export type OwnershipSlide = {
  title: string; //  Capsule text (Restricted activities)
  leftText?: string; // Left text (Universal 100% rules)
  rightText?: string; // Right text (Sector exceptions)
  image: string;
  _id: string;
};

type Props = {
  ownershipHeading: string;
  ownershipSlides: OwnershipSlide[];

  // ✅ Admin controlled tab headings
  ownershipTabOneLabel?: string;
  ownershipTabTwoLabel?: string;
};

export default function OwnershipSliderSection({
  ownershipHeading,
  ownershipSlides,
  ownershipTabOneLabel = "Foreign Ownership",
  ownershipTabTwoLabel = "Capital Reality",
}: Props) {
  const slides = useMemo(() => ownershipSlides || [], [ownershipSlides]);
  const [active, setActive] = useState(0);

  const total = slides.length;
  const current = total > 0 ? slides[active] : null;

  const next = () => {
    if (total <= 1) return;
    setActive((prev) => (prev + 1) % total);
  };

  const prev = () => {
    if (total <= 1) return;
    setActive((prev) => (prev - 1 + total) % total);
  };

  const ids = ['69a806bdceba1146875a98d9', '69a806bdceba1146875a98da', '69a806bdceba1146875a98db', '69a806bdceba1146875a98dc', '69a806bdceba1146875a98dd', '69a806bdceba1146875a98de', '69a806bdceba1146875a98df', '69a806bdceba1146875a98e0'];

  const stageIndex = ids.indexOf(current?._id ?? "");


  return (
    <section
      data-navbar="light"
      className="relative w-full min-h-[90dvh] lg:min-h-screen text-white overflow-hidden flex flex-col justify-center py-16"
    >

      {/* BACKGROUND */}
      {current?.image && (
        <motion.div
          key={current.image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={cloudinaryAutoWebp(current.image)}
            alt="slide background"
            fill
            priority
            className="object-cover"
          />
        </motion.div>
      )}

      {/* TOP BAR (ONLY SHOW IN MOBILE) */}
      <div className="w-full lg:hidden z-20 absolute top-12 flex flex-col gap-3 items-center justify-center">
        <h2
          className="block w-full font-semibold text-3xl text-center"
        >
          {ownershipHeading || "Ownership & Capital Rules"}
        </h2>
      </div>


      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* ================= CONTENT WRAPPER ================= */}
      <div className="relative z-20 max-w-[1320px] mx-auto w-full px-6 mt-[60%] lg:mt-0">

        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-12 items-center">

          {/* LEFT COLUMN */}
          <div className="hidden lg:flex flex-col text-center lg:text-left h-full">

            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-[3vw] font-semibold  leading-tight mb-10 lg:mt-[-139px]"
            >
              {ownershipHeading || "Ownership & Capital Rules"}
            </motion.h2>

            {/* COUNTER */}
            <div className="flex justify-center lg:justify-start items-center gap-3 text-white/60 text-sm mb-4">
              <span>{String(active + 1).padStart(2, "0")}</span>
              <span>|</span>
              <span>{String(total || 1).padStart(2, "0")}</span>
            </div>


            {/* PREVIOUS TITLE */}
            <div className="relative min-h-[48px] max-w-[220px] mx-auto md:mx-0">

              <AnimatePresence mode="wait">
                {
                  current?.leftText && (
                    <motion.p
                      key={current._id}
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: "0%", opacity: 1 }}
                      exit={{ x: "-100%", opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full text-white/40 text-lg leading-snug"
                    >
                      {current.leftText}
                    </motion.p>
                  )
                }
              </AnimatePresence>

            </div>

            <div className="hidden lg:block h-px bg-white/20 w-full mt-6" />
          </div>

          {/* CENTER CAPSULE */}
          <div className="flex justify-center h-full">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-[240px] h-[320px] sm:w-[280px] sm:h-[360px] md:w-[300px] md:h-[420px] lg:w-[26vw] lg:h-[32vw]
              bg-white/10 backdrop-blur-xxl border-white/10 rounded-[160px]" />
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current?._id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 text-xl sm:text-2xl lg:text-[2.2vw] font-semibold text-center max-w-[240px] lg:max-w-[16vw] h-[70px] lg:h-auto"
                >
                  {stageIndex !== -1 && (
                    <span className="text-green-400 font-medium text-[12px] mr-2 uppercase">
                      Stage {stageIndex + 1}
                    </span>
                  )}
                  {current?.title}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col items-center justify-end lg:items-start text-center lg:text-left max-w-lg mx-auto lg:mx-0 h-full mt-[25%] lg:mt-auto">

            <AnimatePresence mode="wait">
              {current?.rightText && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="text-white/80 text-sm md:text-base lg:text-[1vw] leading-relaxed mb-6 h-[190px] lg:h-auto rich-text"
                  dangerouslySetInnerHTML={{ __html: current.rightText || "" }}
                />
              )}
            </AnimatePresence>

            <div className="hidden md:block h-px bg-white/20 w-full mt-5 mb-6" />

            {/* ARROWS FOR LARGE DIVICE */}
            <div className="hidden lg:flex gap-4 justify-center md:justify-start mb-[-67px]">
              <OvalArrow direction="left" variant="white" onClick={prev} />
              <OvalArrow direction="right" variant="white" onClick={next} />
            </div>

          </div>

        </div>

      </div>

      {/* ARROWS (BUTTONS FOR MOBILE) */}
      <div className="flex lg:hidden gap-4 justify-between absolute bottom-5 w-full px-6 z-20">
        <OvalArrow direction="left" variant="white" onClick={prev} />
        <OvalArrow direction="right" variant="white" onClick={next} />
      </div>

    </section>
  );
};