"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import RichTextEditor from "@/components/admin/common/RichTextEditor";

type Overview = {
  _id?: string;
  title: string;
  content: string;
};

export default function CategoryOverviewEditor() {

  const params = useParams();

  const cityId = params.cityId as string;
  const categoryId = params.categoryId as string;

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  const [overview, setOverview] = useState<Overview>({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ======================================================
     FETCH EXISTING OVERVIEW
  ====================================================== */

  const fetchOverview = async () => {

    try {

      const res = await fetch(
        `${API_URL}/admin/categories/${categoryId}/overview`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) {
        return;
      }

      if (data?.data) {
        setOverview({
          _id: data.data._id,
          title: data.data.title || "",
          content: data.data.content || "",
        });
      }

    } catch {

      toast.error("Failed to load overview");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (!categoryId) return;

    fetchOverview();

  }, [categoryId]);



  /* ======================================================
     SAVE OVERVIEW (CREATE OR UPDATE)
  ====================================================== */

  const handleSave = async () => {

    if (!overview.title.trim()) {
      toast.error("Title is required");
      return;
    }

    try {

      setSaving(true);

      const res = await fetch(
        `${API_URL}/admin/categories/${categoryId}/overview`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cityId,
            title: overview.title,
            content: overview.content,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to save overview");
        return;
      }

      toast.success("Overview saved successfully");

      setOverview({
        _id: data.data._id,
        title: data.data.title,
        content: data.data.content,
      });

    } catch {

      toast.error("Something went wrong");

    } finally {

      setSaving(false);

    }

  };



  /* ======================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <div className="p-8 text-white/70">
        Loading overview...
      </div>
    );
  }



  /* ======================================================
     PAGE
  ====================================================== */

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
            value={overview.title}
            onChange={(e) =>
              setOverview((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
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
            value={overview.content}
            onChange={(html: string) =>
              setOverview((prev) => ({
                ...prev,
                content: html,
              }))
            }
          />

        </div>


        {/* Save Button */}

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Overview"}
        </button>

      </div>

    </div>

  );

}