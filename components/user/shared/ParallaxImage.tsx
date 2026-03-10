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

  if (!src) return null;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);

  return (
    <div
      ref={ref}
      className={`relative w-full h-full overflow-hidden ${className}`}
    >
      <motion.div style={{ y }} className="absolute inset-0">
        {/* overscan for parallax */}
        <div className="absolute inset-y-[-40px] inset-x-0">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            quality={90}
            className="object-cover will-change-transform"
          />
        </div>
      </motion.div>
    </div>
  );
}