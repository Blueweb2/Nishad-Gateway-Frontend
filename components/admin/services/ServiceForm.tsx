"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  adminCreateService,
  adminUpdateService,
} from "@/lib/api/services.api";

type ServiceFormProps = {
  mode: "create" | "edit";
  serviceId?: string;

  defaultValues?: {
    index?: string;
    title?: string;
    slug?: string;
    isActive?: boolean;
  };
};

export default function ServiceForm({
  mode,
  serviceId,
  defaultValues,
}: ServiceFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    index: "",
    title: "",
    slug: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // Prefill in edit mode
  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setForm({
        index: defaultValues.index || "",
        title: defaultValues.title || "",
        slug: defaultValues.slug || "",
        isActive: defaultValues.isActive ?? true,
      });
    }
  }, [mode, defaultValues]);

  // Auto slug generator
  useEffect(() => {
    if (mode === "create") {
      setForm((prev) => ({
        ...prev,
        slug: prev.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-"),
      }));
    }
  }, [form.title, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.index.trim()) return toast.error("Index is required");
    if (!form.title.trim()) return toast.error("Title is required");
    if (!form.slug.trim()) return toast.error("Slug is required");

    try {
      setLoading(true);

      if (mode === "create") {
        await adminCreateService(form);
        toast.success("Service created successfully");
      } else {
        if (!serviceId) return toast.error("Missing serviceId");
        await adminUpdateService(serviceId, form);
        toast.success("Service updated successfully");
      }

      router.push("/admin/services");
      router.refresh();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[650px] bg-[#0b0f0b] border border-green-700/30 rounded-2xl p-6 space-y-5"
    >
      <div>
        <h2 className="text-xl font-semibold text-green-300">
          {mode === "create" ? "Create Service" : "Edit Service"}
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Main service categories like Company Formation, Advisory, etc.
        </p>
      </div>

      {/* Index */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Index</label>
        <input
          name="index"
          value={form.index}
          onChange={handleChange}
          placeholder="Example: 1-1"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Title */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Example: Company Formation"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Slug</label>
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Example: company-formation"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
        <p className="text-xs text-gray-500">
          Used in URL: <span className="text-green-400">/services/{form.slug}</span>
        </p>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <label className="text-sm text-gray-300">Status</label>
        <select
          name="isActive"
          value={String(form.isActive)}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold disabled:opacity-50"
        >
          {loading
            ? mode === "create"
              ? "Creating..."
              : "Updating..."
            : mode === "create"
            ? "Create Service"
            : "Update Service"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          className="px-5 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition font-semibold"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
