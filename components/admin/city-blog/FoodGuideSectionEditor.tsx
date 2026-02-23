"use client";

import { Plus, Trash2, UploadCloud } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";

import type {
  CityBlogSection,
  FoodGuideSectionContent,
} from "@/lib/types/city-blog";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import RichTextEditor from "../common/RichTextEditor";

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
  }, [content.filters]);

  const [uploading, setUploading] = useState<{
    filterIndex: number;
    itemIndex: number;
  } | null>(null);

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
        title: "",
        description: "",
        link: "",
      },
    ];

    updateContent({ ...content, filters: updated });
  };

  const updateItem = (
    filterIndex: number,
    itemIndex: number,
    updates: any
  ) => {
    const updated = [...safeFilters];
    const items = [...updated[filterIndex].items];

    items[itemIndex] = {
      ...items[itemIndex],
      ...updates,
    };

    updated[filterIndex].items = items;

    updateContent({ ...content, filters: updated });
  };

  const removeItem = (filterIndex: number, itemIndex: number) => {
    const updated = [...safeFilters];

    updated[filterIndex].items =
      updated[filterIndex].items.filter((_, i) => i !== itemIndex);

    updateContent({ ...content, filters: updated });
  };

  /* =====================================================
     IMAGE UPLOAD
  ====================================================== */

  const handleImageUpload = async (
    file: File,
    filterIndex: number,
    itemIndex: number
  ) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    try {
      setUploading({ filterIndex, itemIndex });
      toast.loading("Uploading...", { id: "food-upload" });

      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/cities/food-guide"
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      updateItem(filterIndex, itemIndex, {
        imageUrl,
        imagePublicId: uploaded.public_id,
      });

      toast.success("Uploaded", { id: "food-upload" });
    } catch {
      toast.error("Upload failed", { id: "food-upload" });
    } finally {
      setUploading(null);
    }
  };

  const removeImage = (filterIndex: number, itemIndex: number) => {
    updateItem(filterIndex, itemIndex, {
      imageUrl: "",
      imagePublicId: undefined,
    });
  };

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
              const isUploading =
                uploading?.filterIndex === filterIndex &&
                uploading?.itemIndex === itemIndex;

              return (
                <div
                  key={itemIndex}
                  className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-4"
                >
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
                  <label className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded text-sm text-white cursor-pointer">
                    <UploadCloud size={14} />
                    {isUploading ? "Uploading..." : "Upload Image"}

                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      disabled={isUploading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file)
                          handleImageUpload(
                            file,
                            filterIndex,
                            itemIndex
                          );
                        e.target.value = "";
                      }}
                    />
                  </label>

                  {item.imageUrl && (
                    <div className="relative mt-3 w-full h-40 rounded overflow-hidden border border-white/10">
                      <Image
                        src={item.imageUrl}
                        alt="preview"
                        fill
                        className="object-cover"
                      />

                      <button
                        onClick={() =>
                          removeImage(filterIndex, itemIndex)
                        }
                        className="absolute top-2 right-2 bg-black/70 p-2 rounded-full"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
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
