// import BlogCardsGrid from "@/components/user/blog/BlogCardsGrid";
// import { BLOGS } from "@/lib/data/blogs";
// import Image from "next/image";

// export default function BlogsPage() {
//   return (
//     <main data-navbar="white" className="bg-white">
//       <section className="pt-28">
//         <div className="max-w-6xl mx-auto px-6">
//           {/* Top Header Section */}
//           <div className="flex items-start justify-between gap-10">
//             {/* Left Title */}
//             <div>
//               <h1 className="text-[56px] leading-none font-semibold text-gray-900">
//                 Blog
//               </h1>
//             </div>

//             {/* Right Side Count + Description */}
//             <div className="flex flex-col items-end gap-6">
//               {/* All / Count */}
//               <div className="flex flex-col items-end leading-none">
//                 <p className="text-xs text-gray-400 tracking-wide">All/</p>
//                 <p className="text-3xl font-semibold text-gray-800">
//                   {BLOGS.length}
//                 </p>
//               </div>

//               {/* Description */}
//               <p className="max-w-sm text-sm text-gray-500 leading-relaxed text-right">
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry. Lorem Ipsum has been the industry standard
//               </p>
//             </div>
//           </div>

//           {/* Divider Line */}
//           <div className="mt-12 border-t border-gray-200" />

//           {/* ✅ BLOG PAGE HERO / INTRO SECTION (Static) */}
//           <div className="mt-10">
//             <div className="relative h-[420px] w-full overflow-hidden rounded-[36px] bg-gray-100">
//               {/* Background Image */}
//               <Image
//                 src="/Olaya.webp"
//                 alt="Blog Hero"
//                 fill
//                 priority
//                 className="object-cover"
//               />

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-black/25" />

//               {/* Text inside image */}
//               <div className="absolute left-10 bottom-10 right-10">
//                 {/* Small Date Style */}
//                 <p className="text-white/80 text-2xl font-medium mb-4">
//                   30<span className="text-white/60 text-lg">.5</span>
//                 </p>

//                 {/* Title */}
//                 <h2 className="text-white text-3xl md:text-4xl font-semibold leading-snug max-w-2xl">
//                   Saudi Arabia Opens Capital Market to All Foreign Investors
//                 </h2>

//                 {/* Tags (Right side) */}
//                 <div className="absolute right-0 bottom-20 hidden md:flex gap-3">
//                   <span className="px-4 py-2 rounded-full text-xs font-medium text-white bg-white/15 border border-white/25 backdrop-blur-md">
//                     Article
//                   </span>
//                   <span className="px-4 py-2 rounded-full text-xs font-medium text-white bg-white/15 border border-white/25 backdrop-blur-md">
//                     Investor Guide
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ✅ Actual Blogs Grid */}
//         <div className="mt-10">
//           <BlogCardsGrid blogs={BLOGS} />
//         </div>
//       </section>
//     </main>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
