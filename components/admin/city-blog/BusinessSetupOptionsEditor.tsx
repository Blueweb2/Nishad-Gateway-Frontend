"use client";

import { Plus, Trash } from "lucide-react";
import { CityBlogSection } from "@/lib/types/city-blog";

type Props = {
  section: CityBlogSection<"BUSINESS_SETUP_OPTIONS">;
  onChange: (updated: CityBlogSection) => void;
};

export default function BusinessSetupOptionsEditor({
  section,
  onChange,
}: Props) {
  const content = section.content;

  const updateContent = (newContent: any) => {
    onChange({ ...section, content: newContent });
  };

  const updateOption = (
    index: number,
    field: "title" | "isFeatured",
    value: any
  ) => {
    const updated = [...content.options];
    updated[index] = { ...updated[index], [field]: value };

    updateContent({ ...content, options: updated });
  };

  const addOption = () => {
    updateContent({
      ...content,
      options: [
        ...content.options,
        { title: "", isFeatured: false },
      ],
    });
  };

  const removeOption = (index: number) => {
    updateContent({
      ...content,
      options: content.options.filter(
        (_: any, i: number) => i !== index
      ),
    });
  };

  return (
    <div className="space-y-6 mt-6">

      <input
        placeholder="Section Heading"
        value={content.heading}
        onChange={(e) =>
          updateContent({
            ...content,
            heading: e.target.value,
          })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      <textarea
        placeholder="Short Description"
        value={content.description}
        onChange={(e) =>
          updateContent({
            ...content,
            description: e.target.value,
          })
        }
        rows={3}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white font-medium">
            Business Options
          </h3>

          <button
            onClick={addOption}
            className="flex items-center gap-2 text-emerald-400 text-sm"
          >
            <Plus size={16} />
            Add Option
          </button>
        </div>

        {content.options.map((item: any, index: number) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-3"
          >
            <div className="flex justify-between">
              <span className="text-sm text-white/60">
                Option {index + 1}
              </span>

              <button
                onClick={() => removeOption(index)}
                className="text-red-400"
              >
                <Trash size={16} />
              </button>
            </div>

            <input
              placeholder="Option Title"
              value={item.title}
              onChange={(e) =>
                updateOption(index, "title", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
            />

            <label className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={item.isFeatured}
                onChange={(e) =>
                  updateOption(
                    index,
                    "isFeatured",
                    e.target.checked
                  )
                }
              />
              Highlight this card
            </label>
          </div>
        ))}
      </div>

      <textarea
        placeholder="Decision Flow Text"
        value={content.decisionFlow}
        onChange={(e) =>
          updateContent({
            ...content,
            decisionFlow: e.target.value,
          })
        }
        rows={2}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      <textarea
        placeholder="Bottom Paragraph"
        value={content.bottomText}
        onChange={(e) =>
          updateContent({
            ...content,
            bottomText: e.target.value,
          })
        }
        rows={3}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />
    </div>
  );
}
