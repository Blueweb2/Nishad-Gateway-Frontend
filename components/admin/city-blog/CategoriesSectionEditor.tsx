"use client";

import { CategoriesSectionContent } from "@/lib/types/city-blog";

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

      {/* Right Side Intro Text */}
      <textarea
        placeholder="Right side detailed content"
        value={content.introText}
        onChange={(e) =>
          onChange({ ...content, introText: e.target.value })
        }
        rows={5}
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      <p className="text-xs text-white/50">
        Categories will be automatically loaded from this city's category list.
      </p>

    </div>
  );
}
