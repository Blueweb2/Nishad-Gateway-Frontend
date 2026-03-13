"use client";

import { Plus, Trash } from "lucide-react";
import type {
  CityBlogSection,
  BusinessSetupOptionsContent,
} from "@/lib/types/city-blog";
import MiniTextEditor from "../common/MiniTextEditor";

type Props = {
  section: CityBlogSection<"BUSINESS_SETUP_OPTIONS">;
  onChange: (updated: CityBlogSection) => void;
};

export default function BusinessSetupOptionsEditor({
  section,
  onChange,
}: Props) {
  const content = section.content as BusinessSetupOptionsContent;
  const options = content.options ?? [];

  const updateContent = (newContent: BusinessSetupOptionsContent) => {
    onChange({ ...section, content: newContent });
  };

  const updateOption = (
    index: number,
    field: "title" | "link",
    value: string
  ) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };

    updateContent({ ...content, options: updated });
  };

  const addOption = () => {
    updateContent({
      ...content,
      options: [
        ...options,
        { title: "", link: "" },
      ],
    });
  };

  const removeOption = (index: number) => {
    if (options.length === 1) return; // prevent invalid state

    updateContent({
      ...content,
      options: options.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6 mt-6">

      {/* Heading */}
      <input
        placeholder="Section Heading"
        value={content.heading || ""}
        onChange={(e) =>
          updateContent({
            ...content,
            heading: e.target.value,
          })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* Description */}
      <MiniTextEditor
        value={content.description || ""}
        onChange={(val) =>
          updateContent({
            ...content,
            description: val,
          })
        }
      />

      {/* Options */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">
            Business Options
          </h3>

          <button
            type="button"
            onClick={addOption}
            className="flex items-center gap-2 text-emerald-400 text-sm"
          >
            <Plus size={16} />
            Add Option
          </button>
        </div>

        {options.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3"
          >
            <div className="flex justify-between">
              <span className="text-sm text-white/60">
                Option {index + 1}
              </span>

              <button
                type="button"
                disabled={options.length === 1}
                onClick={() => removeOption(index)}
                className={`text-red-400 ${options.length === 1
                    ? "opacity-40 cursor-not-allowed"
                    : ""
                  }`}
              >
                <Trash size={16} />
              </button>
            </div>

            <input
              placeholder="Option Title"
              value={item.title || ""}
              onChange={(e) =>
                updateOption(index, "title", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            <input
              placeholder="Navigation Link (e.g. /company-setup)"
              value={item.link || ""}
              onChange={(e) =>
                updateOption(index, "link", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />
          </div>
        ))}
      </div>

      {/* Optional Decision Flow */}
      <textarea
        placeholder="Decision Flow Text (Optional)"
        value={content.decisionFlow ?? ""}
        onChange={(e) =>
          updateContent({
            ...content,
            decisionFlow: e.target.value,
          })
        }
        rows={2}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* Optional Bottom Text */}
    <MiniTextEditor
  value={content.bottomText ?? ""}
  onChange={(val) =>
    updateContent({
      ...content,
      bottomText: val,
    })
  }
/>
    </div>
  );
}
