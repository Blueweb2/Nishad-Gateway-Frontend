"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type FAQ = { q: string; a: string };

type Props = {
  faqHeading: string;
  faqs: FAQ[];

  faqImage?: string;
  faqCtaText?: string;

  updateField: (name: string, value: string) => void;

  addFaq: () => void;
  updateFaq: (index: number, key: keyof FAQ, value: string) => void;
  removeFaq: (index: number) => void;
};

export default function FaqEditor({
  faqHeading,
  faqs,
  faqImage,
  faqCtaText,
  updateField,
  addFaq,
  updateFaq,
  removeFaq,
}: Props) {
  const [uploading, setUploading] = useState(false);

  // ✅ Use same folder structure as other editors
  const folder = "nishad-gateway/subservices";

  const handleImageUpload = async (file: File) => {
    const toastId = toast.loading("Uploading FAQ image...");

    try {
      setUploading(true);

      const uploaded = await uploadToCloudinarySigned(file, folder);

      if (uploaded?.secure_url) {
        const optimizedUrl = cloudinaryAutoWebp(uploaded.secure_url);

        updateField("faqImage", optimizedUrl);

        toast.success("Image uploaded successfully", { id: toastId });
      } else {
        toast.error("Upload failed", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err?.message || "Upload failed", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 border border-gray-800 rounded-2xl p-6 bg-black/20">
      <h3 className="text-lg font-semibold text-white">
        FAQ Section
      </h3>

      {/* FAQ Heading */}
      <input
        value={faqHeading}
        onChange={(e) => updateField("faqHeading", e.target.value)}
        placeholder="FAQ Heading"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {/* FAQ Image Upload */}
      <div className="space-y-3">
        <label className="text-xs text-gray-400">
          FAQ Left Image (Cloudinary Signed)
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            await handleImageUpload(file);

            // Clear input
            e.target.value = "";
          }}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
        />

        {uploading && (
          <p className="text-xs text-yellow-400">
            Uploading image...
          </p>
        )}

        {/* Preview */}
        {faqImage && (
          <div className="mt-3 space-y-2">
            <img
              src={faqImage}
              alt="FAQ Preview"
              className="w-40 h-40 object-cover rounded-xl border border-gray-700"
            />

            <button
              type="button"
              onClick={() => updateField("faqImage", "")}
              className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
            >
              Remove Image
            </button>
          </div>
        )}
      </div>

      {/* CTA TEXT */}
      <input
        value={faqCtaText || ""}
        onChange={(e) => updateField("faqCtaText", e.target.value)}
        placeholder="CTA Text (ex: Need clarity on your entity type?)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {/* FAQ List */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-300 font-semibold">
          Questions
        </p>

        <button
          type="button"
          onClick={addFaq}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add FAQ
        </button>
      </div>

      {faqs.map((faq, idx) => (
        <div
          key={idx}
          className="border border-gray-800 rounded-xl p-4 space-y-3 bg-black/30"
        >
          <input
            value={faq.q}
            onChange={(e) => updateFaq(idx, "q", e.target.value)}
            placeholder="Question"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />

          <textarea
            value={faq.a}
            onChange={(e) => updateFaq(idx, "a", e.target.value)}
            placeholder="Answer"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white resize-none focus:outline-none focus:border-green-500"
          />

          <button
            type="button"
            onClick={() => removeFaq(idx)}
            className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
