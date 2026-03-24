"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import MediaPicker from "./MediaPicker"; // reuse your modal

type Props = {
    value?: {
        url: string;
        alt?: string;
        publicId?: string;
    } | null;
    folder: string;
    onChange: (val: any) => void;
};

export default function ImagePicker({
    value,
    folder,
    onChange,
}: Props) {
    const [uploading, setUploading] = useState(false);
    const [showLibrary, setShowLibrary] = useState(false);

    // ✅ ADD THIS
    const [urlInput, setUrlInput] = useState("");;

    /* ================= UPLOAD ================= */
    const handleUpload = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            toast.error("Only images allowed");
            return;
        }

        try {
            setUploading(true);

            const uploaded = await uploadToCloudinarySigned(
                file,
                folder
            );

            onChange({
                url: cloudinaryAutoWebp(uploaded.secure_url),
                alt: "",
                publicId: uploaded.public_id,
            });

            toast.success("Uploaded");
        } catch {
            toast.error("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    /* ================= DELETE ================= */
    const handleRemove = () => {
        onChange(null);
    };

    return (
        <div className="space-y-3">

            {/* ================= PREVIEW ================= */}
            {value?.url ? (
                <div className="relative h-48 rounded overflow-hidden border border-white/10">
                    <Image
                        src={value.url}
                        alt={value.alt || ""}
                        fill
                        className="object-cover"
                    />

                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <div className="h-32 border border-dashed border-white/20 flex items-center justify-center text-white/40 text-sm rounded">
                    No image selected
                </div>
            )}

            {/* ================= ACTIONS ================= */}
            <div className="flex gap-2 flex-wrap">

                {/* Upload */}
                <label className="px-3 py-2 bg-emerald-600 rounded text-sm cursor-pointer">
                    {uploading
                        ? "Uploading..."
                        : value?.url
                            ? "Replace"
                            : "Upload"}

                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUpload(file);
                        }}
                    />
                </label>

                {/* Library */}
                <button
                    type="button"
                    onClick={() => setShowLibrary(true)}
                    className="px-3 py-2 bg-white/10 rounded text-sm"
                >
                    Choose from Library
                </button>

                {/* URL */}
                <input
                    type="text"
                    placeholder="Paste URL..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="px-3 py-2 bg-black border border-white/10 rounded text-sm flex-1"
                />

                <button
                    type="button"
                    onClick={() => {
                        if (!urlInput) return;

                        onChange({
                            url: urlInput,
                            alt: "",
                        });

                        setUrlInput("");
                        toast.success("Image added");
                    }}
                    className="px-3 py-2 bg-blue-600 text-white rounded text-sm"
                >
                    Add
                </button>
            </div>

            {/* ALT TEXT */}
            {value?.url && (
                <input
                    placeholder="Alt text (SEO)"
                    value={value.alt || ""}
                    onChange={(e) =>
                        onChange({
                            ...value,
                            alt: e.target.value,
                        })
                    }
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded text-sm"
                />
            )}

            {/* ================= MEDIA MODAL ================= */}
            {showLibrary && (
                <MediaPicker
                    onSelect={(url) => {
                        onChange({
                            url,
                            alt: "",
                        });
                        setShowLibrary(false);
                    }}
                    onClose={() => setShowLibrary(false)}
                />
            )}
        </div>
    );
}