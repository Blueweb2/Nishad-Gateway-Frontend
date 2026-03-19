"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import RichTextEditor from "../common/RichTextEditor";
import ImagePicker from "../common/ImagePicker";

export default function OverviewEditor() {

    const { cityId, categoryId } = useParams();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [coverImagePublicId, setCoverImagePublicId] = useState("");
    const [coverImageAlt, setCoverImageAlt] = useState("");

    /* -------------------------------------------------------
       Fetch existing overview
    ------------------------------------------------------- */

    useEffect(() => {

        if (!cityId || !categoryId) return;

        const fetchOverview = async () => {

            try {

                const res = await fetch(
                    `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/overview`,
                    { credentials: "include" }
                );

                const data = await res.json();

                if (data?.overview) {
                    setContent(data.overview.content || "");
                    setCoverImage(data.overview.coverImage || "");
                    setCoverImagePublicId(data.overview.coverImagePublicId || "");
                }

            } catch (err) {
                toast.error("Failed to load overview");
            }

        };

        fetchOverview();

    }, [cityId, categoryId]);



    /* -------------------------------------------------------
       Save Overview
    ------------------------------------------------------- */

    const saveOverview = async () => {

        try {

            const res = await fetch(
                `${API_URL}/admin/cities/${cityId}/categories/${categoryId}/overview`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content,
                        coverImage,
                    }),
                }
            );

            if (res.ok) {
                toast.success("Overview saved");
            } else {
                toast.error("Failed to save overview");
            }

        } catch (err) {
            toast.error("Save failed");
        }

    };

    const deleteImage = async () => {

        if (!coverImagePublicId) return;

        try {

            const res = await fetch(
                `${API_URL}/admin/upload/${encodeURIComponent(coverImagePublicId)}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            if (!res.ok) throw new Error();

            setCoverImage("");
            setCoverImagePublicId("");
            setCoverImageAlt("");

            toast.success("Image removed");

        } catch {
            toast.error("Failed to delete image");
        }
    };

    /* -------------------------------------------------------
       UI
    ------------------------------------------------------- */

    return (
        <div className="space-y-6">

            {/* Cover Image Upload */}
            <div className="space-y-3">

                <label className="text-sm font-medium text-white/80">
                    Cover Image
                </label>

                <ImagePicker
                    value={
                        coverImage
                            ? {
                                url: coverImage,
                                alt: coverImageAlt,
                                publicId: coverImagePublicId,
                            }
                            : null
                    }
                    folder="nishad-gateway/cities/categories/overview"
                    onChange={(img) => {
                        setCoverImage(img?.url || "");
                        setCoverImageAlt(img?.alt || "");
                        setCoverImagePublicId(img?.publicId || "");
                    }}
                />
            </div>

            {/* Rich Text Editor */}

            <RichTextEditor
                value={content}
                onChange={(val) => setContent(val)}
            />

            {/* Save Button */}

            <button
                onClick={saveOverview}
                className="px-6 py-2 bg-emerald-500 text-black rounded-lg hover:bg-emerald-400"
            >
                Save Overview
            </button>

        </div>
    );
}