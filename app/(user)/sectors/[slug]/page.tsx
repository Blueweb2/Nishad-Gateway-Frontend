// // app/sectors/[slug]/page.tsx

// import { notFound } from "next/navigation";
// import { getSectorBySlug } from "@/lib/api/public/sectors.api";

// import SectorHero from "@/components/user/sectors/SectorHero";
// import SectorSliderSection from "@/components/user/sectors/SectorSliderSection";

// interface Props {
//   params: { slug: string };
// }

// /* ================= SEO ================= */

// export async function generateMetadata({ params }: Props) {
//   const sector = await getSectorBySlug(params.slug);

//   if (!sector) {
//     return {};
//   }

//   return {
//     title: sector.metaTitle || sector.title,
//     description:
//       sector.metaDescription || sector.excerpt,

//     openGraph: {
//       title: sector.metaTitle || sector.title,
//       description:
//         sector.metaDescription || sector.excerpt,
//       images: [
//         {
//           url:
//             sector.ogImage ||
//             sector.coverImage?.url ||
//             "/default-og.jpg",
//         },
//       ],
//     },
//   };
// }

// /* ================= PAGE ================= */

// export default async function SectorDetailPage({
//   params,
// }: Props) {
//   const sector = await getSectorBySlug(params.slug);

//   if (!sector) {
//     notFound();
//   }

//   return (
//     <main className="bg-white">

//       {/* HERO */}
//       <SectorHero sector={sector} />

//       case "hero":
//   return (
//     <section
//       key={index}
//       className="relative h-[80vh] rounded-3xl overflow-hidden"
//       style={{
//         backgroundImage: `url(${block.data.backgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="absolute inset-0 bg-black/50 flex items-center">
//         <div className="max-w-5xl mx-auto px-6 text-white">
//           <h1 className="text-5xl font-bold mb-4">
//             {block.data.title}
//           </h1>
//           <p className="text-lg max-w-2xl">
//             {block.data.description}
//           </p>
//         </div>
//       </div>
//     </section>
//   );

//   case "richContent":
//   return (
//     <section
//       key={index}
//       className="max-w-6xl mx-auto px-6 py-20"
//     >
//       <div
//         className="prose prose-lg max-w-none prose-headings:text-black prose-p:text-gray-700"
//         dangerouslySetInnerHTML={{
//           __html: block.data.content,
//         }}
//       />
//     </section>
//   );

//   case "industries":
//   return (
//     <section key={index} className="py-20 bg-gray-100 rounded-3xl">

//       <div className="max-w-6xl mx-auto px-6 mb-10">
//         <p className="text-sm text-gray-400">
//           {block.data.sectionLabel}
//         </p>

//         <h2 className="text-3xl font-bold mb-4">
//           {block.data.title}
//         </h2>

//         <p className="text-gray-600 max-w-xl">
//           {block.data.description}
//         </p>
//       </div>

//       <div className="flex gap-6 overflow-x-auto px-6">
//         {block.data.items.map((item: any, i: number) => (
//           <div
//             key={i}
//             className="min-w-[300px] bg-white rounded-2xl p-4 shadow"
//           >
//             <img
//               src={item.image}
//               className="h-40 w-full object-cover rounded-xl mb-4"
//             />

//             <h3 className="font-semibold mb-2">
//               {item.title}
//             </h3>

//             <p className="text-sm text-gray-600">
//               {item.description}
//             </p>
//           </div>
//         ))}
//       </div>

//     </section>
//   );

//       {/* BLOCK CONTENT */}
//       <SectorSliderSection
//   sectionNumber={1}
//   totalSections={5}
//   title="Type of Manufacturing and Industrials"
//   subtitle="When taking a break from work, even business-minded investors find they have time to enjoy nature."
//   cards={[
//     {
//       id: 1,
//       title: "Wadi Hanifah",
//       description:
//         "A natural valley 120 km long...",
//       image: "/images/wadi.jpg",
//     },
//     {
//       id: 2,
//       title: "Edge of the World",
//       description:
//         "One of the most stunning desert cliffs...",
//       image: "/images/edge.jpg",
//     },
//   ]}
// />
    

//     </main>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
