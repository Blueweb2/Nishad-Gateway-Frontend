"use client";

import { Plus, Trash2 } from "lucide-react";

import { useState, useMemo } from "react";

import type {
  CityBlogSection,
  FoodGuideSectionContent,
} from "@/lib/types/city-blog";

import RichTextEditor from "../common/RichTextEditor";
import ImagePicker from "../common/ImagePicker";

type Props = {
  section: CityBlogSection<"FOOD_GUIDE">;
  onChange: (updated: CityBlogSection) => void;
};

export default function FoodGuideSectionEditor({
  section,
  onChange,
}: Props) {
  const content = section.content as FoodGuideSectionContent;

  /* =====================================================
     SAFETY NORMALIZATION (VERY IMPORTANT)
     Prevents crash if old DB structure exists
  ====================================================== */

  const safeFilters = useMemo(() => {
    return (content.filters || []).map((f) => ({
      ...f,
      items: f.items || [],
    }));
  }, [content]);



  const updateContent = (newContent: FoodGuideSectionContent) => {
    onChange({ ...section, content: newContent });
  };

  /* =====================================================
     FILTERS
  ====================================================== */

  const addFilter = () => {
    updateContent({
      ...content,
      filters: [...safeFilters, { label: "", items: [] }],
    });
  };

  const updateFilter = (index: number, updates: any) => {
    const updated = [...safeFilters];
    updated[index] = { ...updated[index], ...updates };
    updateContent({ ...content, filters: updated });
  };

  const removeFilter = (index: number) => {
    updateContent({
      ...content,
      filters: safeFilters.filter((_, i) => i !== index),
    });
  };

  /* =====================================================
     ITEMS
  ====================================================== */

  const addItem = (filterIndex: number) => {
    const updated = [...safeFilters];
    updated[filterIndex].items = [
      ...updated[filterIndex].items,
      {
        imageUrl: "",
        imagePublicId: undefined,
        imageAlt: "",
        title: "",
        description: "",
        link: "",
      }
    ];

    updateContent({ ...content, filters: updated });
  };

  const updateItem = (filterIndex: number, itemIndex: number, updates: any) => {
    updateContent({
      ...content,
      filters: safeFilters.map((f, fi) => {
        if (fi !== filterIndex) return f;

        return {
          ...f,
          items: f.items.map((item, ii) =>
            ii === itemIndex ? { ...item, ...updates } : item
          ),
        };
      }),
    });
  };

const removeItem = (filterIndex: number, itemIndex: number) => {
  updateContent({
    ...content,
    filters: safeFilters.map((f, fi) => {
      if (fi !== filterIndex) return f;

      return {
        ...f,
        items: f.items.filter((_, i) => i !== itemIndex),
      };
    }),
  });
};

  /* =====================================================
     IMAGE UPLOAD
  ====================================================== */





  /* =====================================================
     UI
  ====================================================== */

  return (
    <div className="space-y-10 mt-6">

      {/* SECTION HEADING */}
      <input
        placeholder="Section Heading"
        value={content.heading || ""}
        onChange={(e) =>
          updateContent({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* FILTERS */}
      {safeFilters.map((filter, filterIndex) => (
        <div
          key={filterIndex}
          className="bg-black/30 p-6 rounded-xl border border-white/10 space-y-6"
        >
          {/* FILTER HEADER */}
          <div className="flex justify-between items-center">
            <input
              placeholder="Filter Label"
              value={filter.label || ""}
              onChange={(e) =>
                updateFilter(filterIndex, {
                  label: e.target.value,
                })
              }
              className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            <button
              onClick={() => removeFilter(filterIndex)}
              className="text-red-400 ml-4"
            >
              <Trash2 size={16} />
            </button>
          </div>

          {/* ITEMS */}
          <div className="space-y-6">

            <div className="flex justify-between items-center">
              <h4 className="text-white/70 text-sm">
                Items ({filter.items.length})
              </h4>

              <button
                onClick={() => addItem(filterIndex)}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-white/10 rounded-lg text-white"
              >
                <Plus size={14} /> Add Item
              </button>
            </div>

            {filter.items.map((item, itemIndex) => {


              return (
                <div
                  key={itemIndex}
                  className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-4 hover:border-white/20 transition"                >
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-xs">
                      Item {itemIndex + 1}
                    </span>

                    <button
                      onClick={() =>
                        removeItem(filterIndex, itemIndex)
                      }
                      className="text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <input
                    placeholder="Title"
                    value={item.title || ""}
                    onChange={(e) =>
                      updateItem(filterIndex, itemIndex, {
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-black/30 border border-white/10 text-white"
                  />

                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">Description</p>

                    <RichTextEditor
                      value={item.description || ""}
                      onChange={(val) =>
                        updateItem(filterIndex, itemIndex, {
                          description: val,
                        })
                      }
                    />
                  </div>


                  <input
                    placeholder="Link"
                    value={item.link || ""}
                    onChange={(e) =>
                      updateItem(filterIndex, itemIndex, {
                        link: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded bg-black/30 border border-white/10 text-white"
                  />

                  {/* IMAGE UPLOAD */}
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">Image</p>

                    <ImagePicker
                      folder="nishad-gateway/cities/food-guide"
                      value={
                        item.imageUrl
                          ? {
                            url: item.imageUrl,
                            alt: item.imageAlt || "",
                            publicId: item.imagePublicId,
                          }
                          : null
                      }
                      onChange={(val) => {
                        updateItem(filterIndex, itemIndex, {
                          imageUrl: val?.url ?? "",
                          imagePublicId: val?.publicId ?? undefined,
                          imageAlt: val?.alt || item.title || "Food image",
                        });
                      }}
                    />
                    <p className="text-[10px] text-white/40">
  Add alt text for SEO & accessibility
</p>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ADD FILTER BUTTON */}
      <button
        onClick={addFilter}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-white"
      >
        <Plus size={16} /> Add Filter
      </button>

    </div>
  );
}
