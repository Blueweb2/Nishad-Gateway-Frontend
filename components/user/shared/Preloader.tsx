"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const steps = [
  { percent: 0, image: "/Olaya.webp" },
  { percent: 45, image: "/buisnessgrowth/buisnessslide3.webp" },
  { percent: 99, image: "/herobg.webp" },
];

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [zoomOut, setZoomOut] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Animate percentage
  useEffect(() => {
    const target = steps[step].percent;
    let current = displayPercent;

    const interval = setInterval(() => {
      if (current < target) {
        current++;
        setDisplayPercent(current);
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [step]);

  // Step transitions
  useEffect(() => {
    if (step < steps.length - 1) {
      const timeout = setTimeout(() => {
        setStep((s) => s + 1);
      }, 1200);
      return () => clearTimeout(timeout);
    } else {
      // 99% reached
      const zoom = setTimeout(() => setZoomOut(true), 300);
      const fade = setTimeout(() => setFadeOut(true), 1200);
      const exit = setTimeout(() => onFinish(), 1600);

      return () => {
        clearTimeout(zoom);
        clearTimeout(fade);
        clearTimeout(exit);
      };
    }
  }, [step]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] bg-white flex items-center justify-center
        transition-opacity duration-600
        ${fadeOut ? "opacity-0" : "opacity-100"}
      `}
    >
      {/* Capsule → Fullscreen */}
      <div
        className={`
          relative overflow-hidden
          transition-all duration-[900ms] ease-in-out
          ${
            zoomOut
              ? "w-screen h-screen rounded-none"
              : "w-[260px] h-[380px] rounded-[120px]"
          }
        `}
      >
        <Image
          src={steps[step].image}
          alt="Preloader"
          fill
          priority
          className={`
            object-cover transition-transform duration-[900ms] ease-in-out
            ${zoomOut ? "scale-100" : "scale-110"}
          `}
        />

        {/* Text (hide during zoom) */}
        {!zoomOut && (
          <>
            <div className="absolute top-8 w-full text-white text-center  text-xl tracking-wide">
              Gateway to <br /> Saudi Arabia
            </div>

            <div className="absolute bottom-10 w-full text-center text-white text-5xl font-semibold">
              {displayPercent}%
            </div>
          </>
        )}
      </div>
    </div>
  );
}
