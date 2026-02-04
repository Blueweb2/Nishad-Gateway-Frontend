"use client";

import { CategoriesSectionContent } from "@/lib/types/city-blog";
import RichTextEditor from "@/components/admin/common/RichTextEditor";

type Props = {
  content: CategoriesSectionContent;
  onChange: (content: CategoriesSectionContent) => void;
};

export default function CategoriesSectionEditor({
  content,
  onChange,
}: Props) {
  return (
    <div className="space-y-4 mt-4">

      {/* Section Heading */}
      <input
        placeholder="Left side heading (e.g. The Capital Built for Investors)"
        value={content.heading}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* ✅ Rich Text Editor Instead of Textarea */}
      <RichTextEditor
        value={content.introText}
        onChange={(value) =>
          onChange({ ...content, introText: value })
        }
      />

      <p className="text-xs text-white/50">
        Categories will be automatically loaded from this city's category list.
      </p>

    </div>
  );
}
