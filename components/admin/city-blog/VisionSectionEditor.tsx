"use client";


import RichTextEditor from "@/components/admin/common/RichTextEditor";
import { VisionSectionContent } from "@/lib/types/city-blog";
import ImagePicker from "../common/ImagePicker";


type Props = {
  content: VisionSectionContent;
  onChange: (content: VisionSectionContent) => void;
};

export default function VisionSectionEditor({
  content,
  onChange,
}: Props) {


  /* ================= IMAGE REMOVE ================= */
  const handleRemoveImage = () => {
    if (!content.imageUrl) return;

    onChange({
      ...content,
      imageUrl: "",
      imagePublicId: undefined,
    });
  };

  return (
    <div className="space-y-6 mt-6">

      {/* ================= HEADING ================= */}
      <input
        placeholder="Section Heading"
        value={content.heading || ""}
        onChange={(e) =>
          onChange({ ...content, heading: e.target.value })
        }
        className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
      />

      {/* ================= RICH TEXT ================= */}
      <RichTextEditor
        value={content.content || ""}
        onChange={(value) =>
          onChange({ ...content, content: value })
        }
      />

      {/* ================= IMAGE SECTION ================= */}
<div className="space-y-2">
  <p className="text-xs text-white/60">Vision Image</p>

  <ImagePicker
  folder="nishad-gateway/cities/vision"
  value={
    content.imageUrl
      ? {
          url: content.imageUrl,
          alt: content.imageAlt || "",
          publicId: content.imagePublicId,
        }
      : null
  }
  onChange={(val) => {
    onChange({
      ...content,
      imageUrl: val?.url ?? "",
      imagePublicId: val?.publicId ?? undefined,
      imageAlt:
        val?.alt?.trim() ||
        content.heading?.trim() ||
        "Vision image",
    });
  }}
/>

  <p className="text-[10px] text-white/40">
    Add alt text for SEO & accessibility
  </p>

  {!content.imageAlt && content.imageUrl && (
    <p className="text-xs text-yellow-400">
      ⚠️ Missing alt text
    </p>
  )}
</div>
    </div>
  );
}