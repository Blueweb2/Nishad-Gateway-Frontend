// "use client";

// import { useMemo, useState } from "react";
// import { Trash2, GripVertical } from "lucide-react";

// import { Section } from "@/lib/types/section";
// import { SECTION_EDITORS } from "./sectionRegistry";
// import AddSection from "./AddSection";
// import SortableItem from "./SortableItem";

// import {
//   DndContext,
//   closestCenter,
//   DragEndEvent,
// } from "@dnd-kit/core";

// import {
//   SortableContext,
//   verticalListSortingStrategy,
//   arrayMove,
// } from "@dnd-kit/sortable";

// type Props = {
//   sections: Section[];
//   setSections: React.Dispatch<React.SetStateAction<Section[]>>;
// };

// export default function SectionsList({
//   sections,
//   setSections,
// }: Props) {
//   const [collapsed, setCollapsed] = useState<string[]>([]);

//   const sortedSections = useMemo(
//     () => [...sections].sort((a, b) => a.order - b.order),
//     [sections]
//   );

//   /* ---------------- REMOVE ---------------- */

//   const removeSection = (id: string) => {
//     if (!confirm("Delete this section?")) return;

//     setSections((prev) =>
//       prev
//         .filter((s) => s.id !== id)
//         .map((s, i) => ({ ...s, order: i + 1 }))
//     );
//   };

//   /* ---------------- UPDATE ---------------- */

//   const updateContent = (id: string, content: any) => {
//     setSections((prev) =>
//       prev.map((s) =>
//         s.id === id ? { ...s, content } : s
//       )
//     );
//   };

//   /* ---------------- DRAG ---------------- */

//   const handleDragEnd = (event: DragEndEvent) => {
//     const { active, over } = event;

//     if (!over || active.id === over.id) return;

//     setSections((prev) => {
//       const oldIndex = prev.findIndex(
//         (s) => s.id === active.id
//       );

//       const newIndex = prev.findIndex(
//         (s) => s.id === over.id
//       );

//       const reordered = arrayMove(prev, oldIndex, newIndex);

//       return reordered.map((s, i) => ({
//         ...s,
//         order: i + 1,
//       }));
//     });
//   };

//   return (
//     <div className="space-y-6 mt-10">

//       {/* ADD SECTION */}
//       <AddSection
//         sections={sections}
//         setSections={setSections}
//       />

//       {sections.length === 0 && (
//         <div className="p-10 text-center text-white/60 border border-white/10 rounded-xl">
//           No sections added yet
//         </div>
//       )}

//       <DndContext
//         collisionDetection={closestCenter}
//         onDragEnd={handleDragEnd}
//       >
//         <SortableContext
//           items={sortedSections.map((s) => s.id)}
//           strategy={verticalListSortingStrategy}
//         >
//           {sortedSections.map((section) => {
//             const Editor =
//               SECTION_EDITORS[section.type];

//             const isCollapsed =
//               collapsed.includes(section.id);

//             return (
//               <SortableItem
//                 key={section.id}
//                 id={section.id}
//               >
//                 {(attributes: any, listeners: any) => (
//                   <div className="border border-white/10 bg-white/5 rounded-xl p-5">

//                     {/* HEADER */}

//                     <div className="flex justify-between mb-4">

//                       <div className="flex items-center gap-3">

//                         <div
//                           {...attributes}
//                           {...listeners}
//                           className="cursor-grab text-white/40"
//                         >
//                           <GripVertical size={16} />
//                         </div>

//                         <div>
//                           <p className="text-xs text-white/50">
//                             {section.type}
//                           </p>

//                           <p className="text-white font-medium">
//                             {section.title}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-3">

//                         <button
//                           onClick={() =>
//                             setCollapsed((prev) =>
//                               prev.includes(section.id)
//                                 ? prev.filter(
//                                     (i) => i !== section.id
//                                   )
//                                 : [...prev, section.id]
//                             )
//                           }
//                           className="text-xs text-white/60"
//                         >
//                           {isCollapsed
//                             ? "Expand"
//                             : "Collapse"}
//                         </button>

//                         <button
//                           onClick={() =>
//                             removeSection(section.id)
//                           }
//                           className="text-red-400"
//                         >
//                           <Trash2 size={16} />
//                         </button>

//                       </div>
//                     </div>

//                     {/* EDITOR */}

//                     {!isCollapsed && Editor && (
//                       <Editor
//                         content={section.content}
//                         onChange={(content: any) =>
//                           updateContent(
//                             section.id,
//                             content
//                           )
//                         }
//                       />
//                     )}
//                   </div>
//                 )}
//               </SortableItem>
//             );
//           })}
//         </SortableContext>
//       </DndContext>
//     </div>
//   );
// }


import React from 'react'

export default function SectionsList() {
  return (
    <div>SectionsList</div>
  )
}
