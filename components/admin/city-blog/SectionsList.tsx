"use client";

import React from "react";
import { Trash2 } from "lucide-react";
import HeroSectionEditor from "./HeroSectionEditor";

import type {
  CityBlogSection,
  HeroSectionContent,
} from "@/lib/types/city-blog";

type Props = {
  sections: CityBlogSection[];
  setSections: React.Dispatch<React.SetStateAction<CityBlogSection[]>>;
};

export default function SectionsList({ sections, setSections }: Props) {
  const removeSection = (index: number) => {
    if (!confirm("Remove this section?")) return;

    setSections((prev) =>
      prev
        .filter((_, i) => i !== index)
        .map((s, i) => ({ ...s, order: i + 1 }))
    );
  };

  return (
    <div className="mt-10 space-y-4">
      {sections.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
          No blog sections added yet.
        </div>
      ) : (
        [...sections]
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <div
              key={`${section.type}-${section.order}`}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-white/50">{section.type}</p>
                  <p className="text-white font-medium">
                    {section.title || "Untitled section"}
                  </p>
                </div>

                <button
                  onClick={() => removeSection(index)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  title="Remove section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Editor */}
              {section.type === "HERO" && (
                <HeroSectionEditor
                  content={section.content as HeroSectionContent}
                  onChange={(content: HeroSectionContent) =>
                    setSections((prev) =>
                      prev.map((s, i) =>
                        i === index
                          ? { ...s, content }
                          : s
                      )
                    )
                  }
                />
              )}
            </div>
          ))
      )}
    </div>
  );
}