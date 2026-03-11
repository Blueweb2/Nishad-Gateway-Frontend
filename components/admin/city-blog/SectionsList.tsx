"use client";

import React, { useState, useMemo } from "react";
import { Trash2, GripVertical } from "lucide-react";
import { useEffect } from "react";

import HeroSectionEditor from "./HeroSectionEditor";
import CategoriesSectionEditor from "./CategoriesSectionEditor";
import VisionSectionEditor from "./VisionSectionEditor";
import InvestmentHighlightsEditor from "./InvestmentHighlightsEditor";
import BusinessSetupOptionsEditor from "./BusinessSetupOptionsEditor";
import InfrastructureSectionEditor from "./InfrastructureSectionEditor";
import FoodGuideSectionEditor from "./FoodGuideSectionEditor";
import TransportationGuideEditor from "./TransportationGuideEditor";
import ExpandableSnapshotEditor from "./ExpandableSnapshotEditor";
import FutureOutlookEditor from "./FutureOutlookEditor";




import type {
  CityBlogSection,
  HeroSectionContent,
  CategoriesSectionContent,
  VisionSectionContent,
  InfrastructureSectionContent,
  LandmarksSectionContent,
  FoodGuideSectionContent,
  TransportationGuideSectionContent,
  ExpandableSnapshotSectionContent,
  FutureOutlookSectionContent,
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
import LandmarksSectionEditor from "./LandmarksSectionEditor";

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
  // const [collapsed, setCollapsed] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);



  useEffect(() => {
    if (sections.length && !expanded) {
      setExpanded(sections[0].id);
    }
  }, [sections, expanded]);

  /* ================= REMOVE SECTION ================= */
  const removeSection = (id: string) => {
    const sectionToDelete = sections.find((s) => s.id === id);
    if (!sectionToDelete) return;

    if (sectionToDelete.type === "HERO") return;

    if (!confirm("Remove this section?")) return;

    setSections((prev) =>
      prev
        .filter((s) => s.id !== id)
        .map((s, i) => ({ ...s, order: i + 1 }))
    );
  };

  /* ================= UPDATE CONTENT ================= */
  const updateSectionContent = (id: string, content: any) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
            ...s,
            content: { ...content }, // 🔥 force new reference
          }
          : s
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

  const sortedSections = useMemo(
    () => [...sections].sort((a, b) => a.order - b.order),
    [sections]
  );

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
              const isExpanded = expanded === section.id;
              return (
                <SortableItem key={section.id} id={section.id}>
                  {(attributes, listeners) => (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-5">

                      {/* HEADER */}
<div
  onClick={() =>
    setExpanded((prev) =>
      prev === section.id ? null : section.id
    )
  }
  className="cursor-pointer flex items-center justify-between mb-4"
>
                        <div className="flex items-center gap-3">
                          <div
                            {...attributes}
                            {...listeners}
                            onClick={(e) => e.stopPropagation()}
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
                         

                          {section.type !== "HERO" && (
                         <button
  onClick={(e) => {
    e.stopPropagation();
    removeSection(section.id);
  }}
  className="text-red-400 hover:text-red-300"
>
  <Trash2 className="w-4 h-4" />
</button>
                          )}
                        </div>
                      </div>

                      {/* EDITORS */}
                      {isExpanded && (
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

                          {section.type === "BUSINESS_SETUP_OPTIONS" && (
                            <BusinessSetupOptionsEditor
                              section={
                                section as CityBlogSection<"BUSINESS_SETUP_OPTIONS">
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

                          {section.type === "INFRASTRUCTURE" && (
                            <InfrastructureSectionEditor
                              section={
                                section as CityBlogSection<"INFRASTRUCTURE">
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
                          {section.type === "LANDMARKS" && (
                            <LandmarksSectionEditor
                              section={
                                section as CityBlogSection<"LANDMARKS">
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

                          {section.type === "FOOD_GUIDE" && (
                            <FoodGuideSectionEditor
                              section={
                                section as CityBlogSection<"FOOD_GUIDE">
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

                          {section.type === "TRANSPORTATION_GUIDE" && (
                            <TransportationGuideEditor
                              content={
                                section.content as TransportationGuideSectionContent
                              }
                              onChange={(updatedContent) =>
                                updateSectionContent(section.id, updatedContent)
                              }
                            />
                          )}

                          {section.type === "EXPANDABLE_SNAPSHOT" && (
                            <ExpandableSnapshotEditor
                              content={
                                section.content as ExpandableSnapshotSectionContent
                              }
                              onChange={(updatedContent) =>
                                updateSectionContent(section.id, updatedContent)
                              }
                            />
                          )}

                          {section.type === "FUTURE_OUTLOOK" && (
                            <FutureOutlookEditor
                              content={section.content as FutureOutlookSectionContent}
                              onChange={(updatedContent) =>
                                updateSectionContent(section.id, updatedContent)
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
