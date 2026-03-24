"use client";



import { HeroSectionContent } from "@/lib/types/city-blog";
import MiniTextEditor from "../common/MiniTextEditor";
import ImagePicker from "../common/ImagePicker";

type Props = {
  content: HeroSectionContent;
  onChange: (content: HeroSectionContent) => void;
};

export default function HeroSectionEditor({ content, onChange }: Props) {


  /* ================= IMAGE REMOVE ================= */

  return (
    <div className="space-y-4 mt-4">

      {/* Heading */}
      <input
        placeholder="Hero heading"
        value={content.heading || ""}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* Subheading */}
      <MiniTextEditor
        value={content.subheading || ""}
        onChange={(val) =>
          onChange({ ...content, subheading: val })
        }
      />

      {/* Image Upload */}
      <div className="space-y-2">
        <p className="text-xs text-white/60">Background Image</p>

        <ImagePicker
          folder="nishad-gateway/cities/hero"
          value={
            content.backgroundImage
              ? {
                url: content.backgroundImage,
                alt: content.backgroundImageAlt || "",
                publicId: content.backgroundImagePublicId,
              }
              : null
          }
          onChange={(val) => {
            onChange({
              ...content,
              backgroundImage: val?.url ?? "",
              backgroundImagePublicId: val?.publicId ?? undefined,
              backgroundImageAlt:
                val?.alt || `${content.heading} city view` || "City hero image",
            });
          }}
        />

        <p className="text-[10px] text-white/40">
          Add alt text for SEO & accessibility
        </p>
      </div>

      {/* CTA */}
      <input
        placeholder="CTA text"
        value={content.ctaText}
        onChange={(e) =>
          onChange({ ...content, ctaText: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* CTA Link */}
      <input
        placeholder="CTA link"
        value={content.ctaLink || ""}
        onChange={(e) =>
          onChange({ ...content, ctaLink: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

    </div>
  );
}
