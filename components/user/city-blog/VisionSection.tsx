"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type Props = {
  heading: string;
  content: string;
  imageUrl: string;
};

export default function VisionSection({
  heading,
  content,
  imageUrl,
}: Props) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const anchor = target.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const isInternal = href.startsWith("/");

      if (isInternal) {
        e.preventDefault();
        router.push(href);
      }
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [router]);

  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-8xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            {heading}
          </h2>

          <div
            ref={contentRef}
            className="rich-text text-gray-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />
        </div>

        {/* RIGHT IMAGE */}
        {imageUrl && (
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={cloudinaryAutoWebp(imageUrl)}
                alt={heading || "Vision Image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}