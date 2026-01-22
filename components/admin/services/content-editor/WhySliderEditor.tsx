"use client";

import toast from "react-hot-toast";
import { uploadImage } from "@/lib/api/upload.api";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";


export type WhySlide = {
  title: string;
  description: string;
  image: string;
};

type Props = {
  whyHeading: string;
  whySlides: WhySlide[];
  whyCtaText: string;
  whyCtaLink: string;

  updateField: (name: string, value: string) => void;

  addWhySlide: () => void;
  updateWhySlide: (index: number, key: keyof WhySlide, value: string) => void;
  removeWhySlide: (index: number) => void;
};

export default function WhySliderEditor({
  whyHeading,
  whySlides,
  whyCtaText,
  whyCtaLink,
  updateField,
  addWhySlide,
  updateWhySlide,
  removeWhySlide,
}: Props) {
  return (
    <div className="space-y-5 py-20">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Why Section (Slider)
        </h3>

        <button
          onClick={addWhySlide}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add Slide
        </button>
      </div>

      <input
        value={whyHeading}
        onChange={(e) => updateField("whyHeading", e.target.value)}
        placeholder="Why Heading (ex: Why Entity Type Matters)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={whyCtaText}
          onChange={(e) => updateField("whyCtaText", e.target.value)}
          placeholder="CTA Text (ex: Calculate Your KSA Expansion Cost)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <input
          value={whyCtaLink}
          onChange={(e) => updateField("whyCtaLink", e.target.value)}
          placeholder="CTA Link (ex: /calculator)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {whySlides.length === 0 ? (
        <p className="text-sm text-gray-400">No slides added yet.</p>
      ) : (
        <div className="space-y-5">
          {whySlides.map((slide, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/20"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-200">
                  Slide {idx + 1}
                </p>

                <button
                  onClick={() => removeWhySlide(idx)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              <input
                value={slide.title}
                onChange={(e) => updateWhySlide(idx, "title", e.target.value)}
                placeholder="Slide Title (ex: Ownership Rights)"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              <textarea
                value={slide.description}
                onChange={(e) =>
                  updateWhySlide(idx, "description", e.target.value)
                }
                placeholder="Slide Description"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
              />

              {/* Upload Slide Image */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  Slide Image (Cloudinary)
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const toastId = toast.loading("Uploading slide image...");

                    try {
                      const res = await uploadImage(file);

                      if (res?.data?.url) {
                        updateWhySlide(idx, "image", cloudinaryAutoWebp(res.data.url));

                        toast.success("Uploaded ", { id: toastId });

                        e.target.value = "";
                      } else {
                        toast.error("Upload failed", { id: toastId });
                      }
                    } catch {
                      toast.error("Upload failed", { id: toastId });
                    }
                  }}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
                />

                <input
                  value={slide.image}
                  onChange={(e) => updateWhySlide(idx, "image", e.target.value)}
                  placeholder="Slide Image URL"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
