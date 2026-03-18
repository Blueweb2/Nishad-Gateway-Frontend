"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

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

  const { scrollY } = useScroll();

  const y = useTransform(scrollY, [0, 800], [0, speed]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute -top-5 -bottom-5 left-0 right-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="100vw"
          quality={90}
          className="object-cover will-change-transform"
        />
      </motion.div>
    </div>
  );
}