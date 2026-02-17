"use client";

import { Plus, Trash } from "lucide-react";
import type {
  CityBlogSection,
  LandmarksSectionContent,
} from "@/lib/types/city-blog";
import RichTextEditor from "../common/RichTextEditor";

type Props = {
  section: CityBlogSection<"LANDMARKS">;
  onChange: (updated: CityBlogSection) => void;
};

export default function LandmarksSectionEditor({
  section,
  onChange,
}: Props) {
  const content = section.content as LandmarksSectionContent;

  const updateContent = (newContent: LandmarksSectionContent) => {
    onChange({ ...section, content: newContent });
  };

  const updateItem = (index: number, updates: any) => {
    const updated = [...content.items];
    updated[index] = { ...updated[index], ...updates };
    updateContent({ ...content, items: updated });
  };

  const addItem = () => {
    updateContent({
      ...content,
      items: [...content.items, { title: "", description: "" ,link: ""}, ],
    });
  };

  const removeItem = (index: number) => {
    updateContent({
      ...content,
      items: content.items.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 mt-6">

      {/* Heading */}
      <input
        placeholder="Section Heading"
        value={content.heading}
        onChange={(e) =>
          updateContent({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* CTA */}
      <input
        placeholder="CTA Text"
        value={content.ctaText || ""}
        onChange={(e) =>
          updateContent({ ...content, ctaText: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      <input
        placeholder="CTA Link"
        value={content.ctaLink || ""}
        onChange={(e) =>
          updateContent({ ...content, ctaLink: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* Items */}
      <div className="flex justify-between items-center pt-4">
        <h3 className="text-white">Landmarks</h3>

        <button
          onClick={addItem}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-white"
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

    {content.items.map((item, index) => (
  <div
    key={index}
    className="bg-black/30 p-5 rounded-xl border border-white/10 space-y-3"
  >
    <div className="flex justify-between items-center">
      <span className="text-white/60 text-sm">
        Item {index + 1}
      </span>

      <button
        onClick={() => removeItem(index)}
        className="text-red-400"
      >
        <Trash size={16} />
      </button>
    </div>

    <input
      placeholder="Title"
      value={item.title}
      onChange={(e) =>
        updateItem(index, { title: e.target.value })
      }
      className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
    />

<div className="space-y-2">
  <p className="text-sm text-white/60">Description</p>

  <RichTextEditor
    value={item.description}
    onChange={(val) =>
      updateItem(index, { description: val })
    }
  />
</div>

    {/* ✅ NEW LINK FIELD */}
    <input
      placeholder="Link"
      value={item.link || ""}
      onChange={(e) =>
        updateItem(index, { link: e.target.value })
      }
      className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
    />
  </div>
))}


    </div>
  );
}
