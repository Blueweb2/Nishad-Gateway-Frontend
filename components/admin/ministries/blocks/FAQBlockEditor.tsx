"use client";

import { Plus, Trash2, Upload } from "lucide-react";
import toast from "react-hot-toast";

import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

import {
  FAQBlock,
  MinistryBlock,
  FAQItem,
} from "@/lib/types/ministry";

type Props = {
  block: FAQBlock;
  blocks: MinistryBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<MinistryBlock[]>>;
};

export default function FAQBlockEditor({
  block,
  blocks,
  setBlocks,
}: Props) {

  const faqs: FAQItem[] = block.faqs || [];

  const updateBlock = (data: Partial<FAQBlock>) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === block.id && b.type === "faq") {
          return { ...b, ...data };
        }
        return b;
      })
    );
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const handleImageUpload = async (file: File) => {
    try {
      const upload = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/ministries/faq"
      );

      updateBlock({
        faqImage: upload.secure_url,
        faqImagePublicId: upload.public_id,
      });

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  const deleteImage = async () => {
    if (!block.faqImagePublicId) return;

    try {
      await fetch("/api/delete-cloudinary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicId: block.faqImagePublicId,
        }),
      });

      updateBlock({
        faqImage: "",
        faqImagePublicId: "",
      });

      toast.success("Image deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  /* ---------------- FAQ FUNCTIONS ---------------- */

  const addFAQ = () => {
    updateBlock({
      faqs: [...faqs, { q: "", a: "" }],
    });
  };

  const removeFAQ = (index: number) => {
    updateBlock({
      faqs: faqs.filter((_, i) => i !== index),
    });
  };

  const updateField = (
    index: number,
    field: "q" | "a",
    value: string
  ) => {
    const updated = [...faqs];
    updated[index][field] = value;

    updateBlock({ faqs: updated });
  };

  return (
    <div className="border border-green-700/30 rounded-xl p-6 space-y-6 bg-[#0b0f0b]">

      <h3 className="text-lg font-semibold text-green-300">
        FAQ Block
      </h3>

      {/* FAQ IMAGE */}
      <div className="space-y-3">

        <label className="text-sm text-gray-400">
          FAQ Image
        </label>

        <div className="flex items-center gap-4">

          {block.faqImage && (
            <img
              src={cloudinaryAutoWebp(block.faqImage)}
              alt={block.faqImageAlt || "FAQ image"}
              className="w-32 h-20 object-cover rounded-lg border border-green-700/20"
            />
          )}

          <label className="flex items-center gap-2 px-4 py-2 border border-green-700/40 rounded-lg cursor-pointer hover:bg-green-900/20">
            <Upload size={16} />
            Upload Image

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>

          {block.faqImage && (
            <button
              onClick={deleteImage}
              className="flex items-center gap-2 text-red-400 text-sm"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}

        </div>

        {/* ALT TEXT */}
        <input
          type="text"
          placeholder="Image Alt Text"
          value={block.faqImageAlt || ""}
          onChange={(e) =>
            updateBlock({ faqImageAlt: e.target.value })
          }
          className="input w-full"
        />

      </div>

      {/* FAQ LIST */}

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-green-700/20 p-4 rounded-lg space-y-3 bg-[#0f150f]"
        >

          <input
            placeholder="Question"
            value={faq.q}
            onChange={(e) =>
              updateField(index, "q", e.target.value)
            }
            className="input w-full"
          />

          <textarea
            placeholder="Answer"
            value={faq.a}
            onChange={(e) =>
              updateField(index, "a", e.target.value)
            }
            rows={3}
            className="input w-full"
          />

          <button
            onClick={() => removeFAQ(index)}
            className="flex items-center gap-2 text-red-400 text-sm"
          >
            <Trash2 size={14} />
            Remove FAQ
          </button>

        </div>
      ))}

      <button
        onClick={addFAQ}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
      >
        <Plus size={16} />
        Add FAQ
      </button>

    </div>
  );
}