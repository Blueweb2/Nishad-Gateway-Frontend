"use client";

import { X } from "lucide-react";

type Props = {
  content: { categories: string[] };
  onChange: (content: { categories: string[] }) => void;
};

export default function CategoriesSectionEditor({ content, onChange }: Props) {
  const addCategory = () => {
    onChange({
      categories: [...content.categories, ""],
    });
  };

  const updateCategory = (index: number, value: string) => {
    const updated = [...content.categories];
    updated[index] = value;
    onChange({ categories: updated });
  };

  const removeCategory = (index: number) => {
    onChange({
      categories: content.categories.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-3">
      {content.categories.map((cat, index) => (
        <div key={index} className="flex gap-2">
          <input
            value={cat}
            onChange={(e) => updateCategory(index, e.target.value)}
            placeholder="Category name"
            className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
          />
          <button
            onClick={() => removeCategory(index)}
            className="p-2 rounded-lg bg-red-500/10 text-red-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        onClick={addCategory}
        className="text-sm text-emerald-400 hover:underline"
      >
        + Add Category
      </button>
    </div>
  );
}