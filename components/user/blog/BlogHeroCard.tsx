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
      className="group block w-full h-[600px] overflow-hidden relative bg-white border-r border-gray-200"
    >
      <div className="relative w-full h-full bg-white">

        <div className="">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="transition-all duration-700 scale-30 group-hover:scale-50 rounded-[170px] overflow-hidden"
          />
        </div>

        <div className="absolute left-10 right-10 bottom-10">
          <h2 className="text-black transition-colors duration-500 group-hover:text-gray-500">
            {blog.title}
          </h2>
        </div>

        <div className="absolute top-12 right-6 hidden md:flex gap-3">
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full text-xs font-medium text-black  border border-gray-400 backdrop-blur-md "
            >
              {tag}
            </span>
          ))}
        </div>

      </div>
    </Link>
  );
};