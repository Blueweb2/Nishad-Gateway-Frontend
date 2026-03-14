"use client";

import RichTextEditor from "@/components/admin/common/RichTextEditor";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoryOverviewEditor() {

    const { cityId, categoryId } = useParams<{
        cityId: string;
        categoryId: string;
    }>();

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {

        try {

            setLoading(true);

            const res = await fetch(
                `${API_URL}/admin/categories/${categoryId}/overview`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        cityId,
                        categoryId,
                        title,
                        content
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                toast.error(data?.message || "Failed to save overview");
                return;
            }

            toast.success("Overview saved successfully");

        } catch (error) {

            toast.error("Something went wrong");

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="max-w-5xl space-y-8">

            {/* Header */}

            <div>
                <h1 className="text-3xl font-semibold text-white">
                    Category Overview
                </h1>

                <p className="text-sm text-white/60 mt-2">
                    Edit the overview content shown at the top of the category page.
                </p>
            </div>

            {/* Editor Card */}

            <div className="bg-white/5 border border-white/10 rounded-xl p-8 space-y-6">

                {/* Title */}

                <div>
                    <label className="block text-sm text-white/70 mb-2">
                        Title
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Food in Riyadh"
                        className="w-full px-4 py-2 rounded-lg bg-black border border-white/20 text-white focus:outline-none focus:border-emerald-500"
                    />
                </div>

                {/* Content */}

                <div>
                    <label className="block text-sm text-white/70 mb-2">
                        Overview Content
                    </label>

                    <RichTextEditor
                        value={content}
                        onChange={(html: string) => setContent(html)}
                        placeholder="Write the overview content..."
                    />
                </div>

                {/* Save Button */}

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 disabled:opacity-50"
                >
                    {loading ? "Saving..." : "Save Overview"}
                </button>

            </div>

        </div>

    );
}