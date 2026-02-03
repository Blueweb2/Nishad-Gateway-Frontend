"use client";

import Image from "next/image";

type Props = {
  images: string[];
};

export default function BlogImageCollage({ images }: Props) {
  if (!images || images.length === 0) return null;

  /* ================= 1 IMAGE ================= */
  if (images.length === 1) {
    return (
      <div className="relative w-full h-[450px] rounded-2xl overflow-hidden mb-10">
        <Image
          src={images[0]}
          alt="Blog image"
          fill
          className="object-cover"
        />
      </div>
    );
  }

  /* ================= 2 IMAGES ================= */
  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-4 mb-10">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`Blog image ${i}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  /* ================= 3+ IMAGES ================= */
  return (
    <div className="grid grid-cols-3 gap-4 mb-10">
      {/* Large Left Image */}
      <div className="relative col-span-2 h-[500px] rounded-2xl overflow-hidden">
        <Image
          src={images[0]}
          alt="Main blog image"
          fill
          className="object-cover"
        />
      </div>

      {/* Right Stacked */}
      <div className="flex flex-col gap-4">
        {images.slice(1, 3).map((img, i) => (
          <div
            key={i}
            className="relative flex-1 rounded-2xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`Blog image ${i}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
