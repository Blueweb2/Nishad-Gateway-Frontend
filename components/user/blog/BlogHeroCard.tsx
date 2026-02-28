"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  const handleClick = (id:string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <div 
      onClick={()=>handleClick(blog.id)}
      className="flex flex-col items-center justify-between px-3 pt-5 group border-r border-gray-200"
    >
      
      {/* Tags */}
      <div className="flex gap-2 mb-20 justify-end w-full">
        {blog.tags?.map((tag, index) => (
          <span
            key={index}
            className="text-[13px] font-medium px-3 py-0.5 rounded-full border border-gray-300 bg-white text-gray-700 transition"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Image */}
      <div className="relative w-[220px] h-[280px] mb-20 overflow-hidden rounded-[80px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Title */}
      <div className="w-full flex items-start justify-start mb-3">
        <h3 className="pl-3 font-extrabold text-[18px] leading-5 w-[60%] text-gray-800 group-hover:text-gray-500    pb-3"
        >
          {blog.title}
        </h3>
      </div>
    </div>
  );
};