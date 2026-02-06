"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  speed?: number; // parallax intensity
  className?: string;
};

export default function ParallaxFade({
  children,
  speed = 0.3,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = 1 - rect.top / windowHeight;

        const translateY = (1 - progress) * 80 * speed;
        const opacity = Math.min(progress * 1.2, 1);

        element.style.transform = `translateY(${translateY}px)`;
        element.style.opacity = opacity.toString();
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
