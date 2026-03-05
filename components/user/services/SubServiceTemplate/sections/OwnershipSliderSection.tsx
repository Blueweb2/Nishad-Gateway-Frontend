"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
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

  const ids = ['69a806bdceba1146875a98d9','69a806bdceba1146875a98da','69a806bdceba1146875a98db','69a806bdceba1146875a98dc','69a806bdceba1146875a98dd','69a806bdceba1146875a98de','69a806bdceba1146875a98df','69a806bdceba1146875a98e0'];

  const stageIndex = ids.indexOf(current?._id ?? "");

  return (
    <section className="w-full bg-black text-white" data-navbar="light">
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background */}
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

        {/* Dark tint */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Capsule cut-out (remove tint inside capsule) */}
        <div
          className="absolute inset-0 bg-transparent"
          style={{
            WebkitMaskImage:
              "radial-gradient(ellipse 180px 320px at 50% 50%, black 99%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 180px 320px at 50% 50%, black 99%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">

          <div className="w-full flex items-center justify-between gap-10">

            {/* LEFT */}
            <div className="w-[320px] min-h-[485px] flex flex-col">
  
              <h2 className="text-3xl md:text-4xl font-bold leading-tight h-[200px]">
                {ownershipHeading || "Ownership & Capital Rules"}
              </h2>

              {current?.leftText && (
                <motion.p 
                  key={active}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mt-16 text-white text-lg font-medium leading-none w-[100px]"
                >
                  {current.leftText}
                </motion.p>
              )}

              <div className="mt-10 h-[1px] w-full bg-white/25" />
            </div>


            {/* CAPSULE */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-[26vw] h-[32vw] rounded-[200px] border border-white/25">
                <div className="absolute inset-0 flex items-center justify-center px-15 text-center">
                  <motion.h3
                    key={active}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-2xl md:text-3xl font-semibold leading-snug text-white flex flex-col"
                  >
                    {stageIndex !== -1 && (
                      <span className="text-green-400 font-medium text-[12px] mr-2 uppercase">
                        Stage {stageIndex + 1}
                      </span>
                    )}
                    {current?.title || "No Capsule Text"}
                  </motion.h3>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-[320px] flex flex-col items-end">
              {/* Right text */}
              {current?.rightText && (
                <motion.p 
                  key={active}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="mt-8  lg:pr-0 w-full text-white text-lg font-medium leading-snug text-[1vw]"
                >
                  {current.rightText}
                </motion.p>
              )}

              <div className="mt-10 h-[1px] w-full bg-white/25" />
            </div>
          </div>
        </div>

        <div className="absolute left-2 top-1/2 flex items-center gap-2 text-white/70 text-sm">
          <span>{String(active + 1).padStart(2, "0")}</span>
          <span>|</span>
          <span>{String(total || 1).padStart(2, "0")}</span>
        </div> 

        {/* Arrows */}
        {total > 1 && (
          <div className=" absolute right-2 top-1/2 flex items-center gap-2 z-20">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
