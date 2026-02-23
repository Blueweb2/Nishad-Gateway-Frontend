"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  speed?: number;
};

export default function ParallaxImage({
  src,
  alt,
  className = "",
  priority = false,
  speed = 120,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  // 🛑 Safety guard
  if (!src) {
    console.error("ParallaxImage: invalid src →", src);
    return null;
  }

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        {/* Overscan so image doesn't cut during movement */}
        <div className="absolute inset-[-60px]">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
