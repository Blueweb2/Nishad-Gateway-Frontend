"use client";

import React, { useState, useMemo } from "react";
import { Trash2, GripVertical, Copy } from "lucide-react";

import HeroSectionEditor from "./HeroSectionEditor";
import CategoriesSectionEditor from "./CategoriesSectionEditor";
import VisionSectionEditor from "./VisionSectionEditor";
import InvestmentHighlightsEditor from "./InvestmentHighlightsEditor";

import type {
  CityBlogSection,
  HeroSectionContent,
  CategoriesSectionContent,
  VisionSectionContent,
} from "@/lib/types/city-blog";

import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { v4 as uuid } from "uuid";

/* =========================================================
   SORTABLE ITEM
========================================================= */
function SortableItem({
  id,
  children,
}: {
  id: string;
  children: (
    attributes: any,
    listeners: any
  ) => React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children(attributes, listeners)}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */
type Props = {
  sections: CityBlogSection[];
  setSections: React.Dispatch<React.SetStateAction<CityBlogSection[]>>;
};

export default function SectionsList({
  sections,
  setSections,
}: Props) {
  const [collapsed, setCollapsed] = useState<string[]>([]);

  /* ================= REMOVE ================= */
  const removeSection = (id: string) => {
    if (!confirm("Remove this section?")) return;

    setSections((prev) =>
      prev
        .filter((s) => s.id !== id)
        .map((s, i) => ({ ...s, order: i + 1 }))
    );
  };

  /* ================= DUPLICATE ================= */
  const duplicateSection = (id: string) => {
    setSections((prev) => {
      const sectionToCopy = prev.find((s) => s.id === id);
      if (!sectionToCopy) return prev;

      const duplicated: CityBlogSection = {
        ...sectionToCopy,
        id: uuid(),
        order: prev.length + 1,
        title: `${sectionToCopy.title || sectionToCopy.type} (Copy)`,
      };

      return [...prev, duplicated];
    });
  };

  /* ================= UPDATE CONTENT ================= */
  const updateSectionContent = (id: string, content: any) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, content } : s
      )
    );
  };

  /* ================= DRAG END ================= */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setSections((prev) => {
      const oldIndex = prev.findIndex(
        (s) => s.id === active.id
      );
      const newIndex = prev.findIndex(
        (s) => s.id === over.id
      );

      const reordered = arrayMove(prev, oldIndex, newIndex);

      return reordered.map((s, i) => ({
        ...s,
        order: i + 1,
      }));
    });
  };

  /* ================= STABLE SORT ================= */
  const sortedSections = useMemo(
    () => [...sections].sort((a, b) => a.order - b.order),
    [sections]
  );

  /* ================= RENDER ================= */
  return (
    <div className="mt-10 space-y-4">
      {sortedSections.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
          No blog sections added yet.
        </div>
      ) : (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedSections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sortedSections.map((section) => {
              const isCollapsed = collapsed.includes(section.id);

              return (
                <SortableItem
                  key={section.id}
                  id={section.id}
                >
                  {(attributes, listeners) => (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">

                      {/* HEADER */}
                      <div className="flex items-center justify-between mb-4">

                        <div className="flex items-center gap-3">
                          <div
                            {...attributes}
                            {...listeners}
                            className="cursor-grab text-white/40 hover:text-white"
                          >
                            <GripVertical className="w-4 h-4" />
                          </div>

                          <div>
                            <p className="text-xs text-white/50">
                              {section.type}
                            </p>
                            <p className="text-white font-medium">
                              {section.title || "Untitled section"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              setCollapsed((prev) =>
                                prev.includes(section.id)
                                  ? prev.filter((i) => i !== section.id)
                                  : [...prev, section.id]
                              )
                            }
                            className="text-xs text-white/60 hover:text-white"
                          >
                            {isCollapsed ? "Expand" : "Collapse"}
                          </button>

                          <button
                            onClick={() => duplicateSection(section.id)}
                            className="text-white/40 hover:text-white"
                          >
                            <Copy className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => removeSection(section.id)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* EDITORS */}
                      {!isCollapsed && (
                        <>
                          {section.type === "HERO" && (
                            <HeroSectionEditor
                              content={section.content as HeroSectionContent}
                              onChange={(content) =>
                                updateSectionContent(section.id, content)
                              }
                            />
                          )}

                          {section.type === "CATEGORIES" && (
                            <CategoriesSectionEditor
                              content={section.content as CategoriesSectionContent}
                              onChange={(content) =>
                                updateSectionContent(section.id, content)
                              }
                            />
                          )}

                          {section.type === "VISION" && (
                            <VisionSectionEditor
                              content={section.content as VisionSectionContent}
                              onChange={(content) =>
                                updateSectionContent(section.id, content)
                              }
                            />
                          )}

                          {section.type === "INVESTMENT_HIGHLIGHTS" && (
                            <InvestmentHighlightsEditor
                              section={
                                section as CityBlogSection<"INVESTMENT_HIGHLIGHTS">
                              }
                              onChange={(updatedSection) =>
                                setSections((prev) =>
                                  prev.map((s) =>
                                    s.id === section.id ? updatedSection : s
                                  )
                                )
                              }
                            />
                          )}
                        </>
                      )}
                    </div>
                  )}
                </SortableItem>
              );
            })}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
