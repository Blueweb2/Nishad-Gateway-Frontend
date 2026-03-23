"use client";

import ImagePicker from "../../common/ImagePicker";

type Props = {
  content: {
    title: string;
    subtitle: string;
    image: string;
    imagePublicId?: string;
    imageAlt?: string;
  };
  onChange: (content: any) => void;
};

export default function HeroSectionEditor({
  content,
  onChange,
}: Props) {

  const update = (key: string, value: any) => {
    onChange({
      ...content,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">

      {/* ================= TITLE ================= */}
      <div>
        <label className="text-sm text-white/70">
          Title
        </label>

        <input
          value={content.title || ""}
          onChange={(e) =>
            update("title", e.target.value)
          }
          className="w-full mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
        />
      </div>

      {/* ================= SUBTITLE ================= */}
      <div>
        <label className="text-sm text-white/70">
          Subtitle
        </label>

        <textarea
          value={content.subtitle || ""}
          onChange={(e) =>
            update("subtitle", e.target.value)
          }
          rows={3}
          className="w-full mt-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white"
        />
      </div>

      {/* ================= IMAGE ================= */}
      <div className="space-y-2">
        <p className="text-sm text-white/70">
          Hero Image
        </p>

        <ImagePicker
          folder="nishad-gateway/cities/hero"
          value={
            content.image
              ? {
                  url: content.image,
                  alt: content.imageAlt || "",
                  publicId: content.imagePublicId,
                }
              : null
          }
          onChange={(val) => {
            onChange({
              ...content,
              image: val?.url ?? "",
              imagePublicId: val?.publicId ?? undefined,
              imageAlt:
                val?.alt ||
                content.title ||
                "Hero image",
            });
          }}
        />

        {/* ALT WARNING */}
        {!content.imageAlt && content.image && (
          <p className="text-xs text-yellow-400">
            ⚠️ Missing alt text (important for SEO)
          </p>
        )}
      </div>

    </div>
  );
}