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
      className="group block w-full h-[830px] overflow-hidden relative bg-white border-r border-gray-200"
    >
      <div className="relative w-full h-full bg-white">

        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover transition-all duration-700 scale-40 group-hover:scale-100 rounded-[200px] group-hover:rounded-none"
        />

        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

        <div className="absolute left-10 right-10 bottom-10">
          <h2 className="text-black transition-colors duration-500 group-hover:text-white">
            {blog.title}
          </h2>
        </div>

        <div className="absolute top-12 right-6 hidden md:flex gap-3">
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full text-xs font-medium text-black  bg-black/15 border border-black/25 backdrop-blur-md group-hover:text-white group-hover:bg-white/15 group-hover:border-white/25"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
};