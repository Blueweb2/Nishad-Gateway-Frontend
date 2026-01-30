"use client";

import Image from "next/image";
import Link from "next/link";

export type BlogHero = {
  id: string;
  image: string;
  tags: string[];
  title: string;
  date?: string;
};

type Props = {
  blog: BlogHero;
};

export default function BlogHeroCard({ blog }: Props) {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      className="group block w-full overflow-hidden rounded-[36px] bg-gray-100 relative"
    >
      <div className="relative w-full h-[420px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-black/25" />

        <div className="absolute left-10 right-10 bottom-10">
          <p className="text-white/80 text-sm mb-3">
            {blog.date || "—"}
          </p>

          <h2 className="text-white text-3xl md:text-4xl font-semibold leading-snug max-w-2xl">
            {blog.title}
          </h2>

          <div className="absolute right-0 bottom-20 hidden md:flex gap-3">
            {blog.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full text-xs font-medium text-white bg-white/15 border border-white/25 backdrop-blur-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}