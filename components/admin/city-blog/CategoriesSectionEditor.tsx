"use client";

import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import type { CategoriesSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: CategoriesSectionContent;
  onChange: (content: CategoriesSectionContent) => void;
};

export default function CategoriesSectionEditor({
  content,
  onChange,
}: Props) {
  const categories = content.categories ?? [];

  /* ======================================================
     UPDATE CATEGORY FIELD
  ====================================================== */
  const updateCategory = (
    index: number,
    field: "label" | "link",
    value: string
  ) => {
    const updated = [...categories];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    onChange({
      ...content,
      categories: updated,
    });
  };

  /* ======================================================
     ADD CATEGORY
  ====================================================== */
  const addCategory = () => {
    onChange({
      ...content,
      categories: [
        ...categories,
        { label: "", link: "" },
      ],
    });
  };

  /* ======================================================
     REMOVE CATEGORY
  ====================================================== */
  const removeCategory = (index: number) => {
    const updated = categories.filter((_, i) => i !== index);

    onChange({
      ...content,
      categories: updated,
    });
  };

  /* ======================================================
     REORDER CATEGORY
  ====================================================== */
  const moveCategory = (index: number, direction: "up" | "down") => {
    const updated = [...categories];

    const targetIndex =
      direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= updated.length) return;

    [updated[index], updated[targetIndex]] = [
      updated[targetIndex],
      updated[index],
    ];

    onChange({
      ...content,
      categories: updated,
    });
  };

  return (
    <div className="space-y-6 mt-4">
      {/* ==========================
          CATEGORY LIST
      ========================== */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-white font-medium">
            Categories
          </p>

          <button
            type="button"
            onClick={addCategory}
            className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        </div>

        {categories.length === 0 && (
          <p className="text-xs text-white/50">
            No categories added yet.
          </p>
        )}

        <div className="space-y-3">
          {categories.map((cat, index) => (
            <div
              key={`${cat.label}-${index}`}
              className="flex gap-3 items-center"
            >
              {/* Label */}
              <input
                placeholder="Label"
                value={cat.label}
                onChange={(e) =>
                  updateCategory(index, "label", e.target.value)
                }
                className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
              />

              {/* Link */}
              <input
                placeholder="/section-link"
                value={cat.link}
                onChange={(e) =>
                  updateCategory(index, "link", e.target.value)
                }
                className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
              />

              {/* Move Up */}
              <button
                type="button"
                onClick={() => moveCategory(index, "up")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              {/* Move Down */}
              <button
                type="button"
                onClick={() => moveCategory(index, "down")}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeCategory(index)}
                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================
          INTRO TEXT
      ========================== */}
      <div>
        <p className="text-sm text-white font-medium mb-2">
          Intro Text
        </p>

        <textarea
          rows={6}
          placeholder="Write introductory paragraph..."
          value={content.introText ?? ""}
          onChange={(e) =>
            onChange({
              ...content,
              introText: e.target.value,
            })
          }
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm"
        />
      </div>
    </div>
  );
}