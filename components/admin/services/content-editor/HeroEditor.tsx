"use client";

import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/utils/cloudinary";

type Props = {
  form: any;
  updateField: (name: string, value: string) => void;
};

export default function HeroEditor({ form, updateField }: Props) {
  const folder = "nishad-gateway/subservices"; // must match backend allowedFolders

  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-white">Hero Section</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={form.heroTitle}
          onChange={(e) => updateField("heroTitle", e.target.value)}
          placeholder="Hero Title"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <input
          value={form.heroSubtitle}
          onChange={(e) => updateField("heroSubtitle", e.target.value)}
          placeholder="Hero Subtitle"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      <textarea
        value={form.heroDescription}
        onChange={(e) => updateField("heroDescription", e.target.value)}
        placeholder="Hero Description"
        rows={3}
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={form.heroButtonText}
          onChange={(e) => updateField("heroButtonText", e.target.value)}
          placeholder="Hero Button Text"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <input
          value={form.heroButtonLink}
          onChange={(e) => updateField("heroButtonLink", e.target.value)}
          placeholder="Hero Button Link"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300 font-medium">
          Upload Hero Image (Cloudinary Signed)
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const toastId = toast.loading("Uploading image...");

            try {
              const uploaded = await uploadToCloudinarySigned(file, folder);

              if (uploaded?.secure_url) {
                updateField("heroImage", cloudinaryAutoWebp(uploaded.secure_url));
                toast.success("Uploaded", { id: toastId });

                // reset input
                e.target.value = "";
              } else {
                toast.error("Upload failed", { id: toastId });
              }
            } catch (err: any) {
              toast.error(err?.message || "Upload failed", { id: toastId });
            }
          }}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
        />

        <input
          value={form.heroImage}
          onChange={(e) => updateField("heroImage", e.target.value)}
          placeholder="Hero Background Image URL"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>
    </div>
  );
}
