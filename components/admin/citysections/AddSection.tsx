"use client";

import { createSection } from "./sectionTemplates";

const TYPES = [
  "HERO",
  "TEXT",
  "IMAGE",
  "GALLERY",
  "CARDS",
  "TABLE",
  "LISTINGS",
  "CALLOUT",
];

export default function AddSection({
  sections,
  setSections,
}: any) {
  const add = (type: string) => {
    const newSection = createSection(type, sections.length + 1);
    setSections((prev: any) => [...prev, newSection]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => add(type)}
          className="px-3 py-1 text-xs rounded bg-white/10 hover:bg-white/20"
        >
          + {type}
        </button>
      ))}
    </div>
  );
}
