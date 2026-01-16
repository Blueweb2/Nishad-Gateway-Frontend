"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { adminDeleteService } from "@/lib/api/services.api";

type Service = {
  _id: string;
  index: string;
  title: string;
  slug: string;
  isActive: boolean;
};

type Props = {
  services: Service[];
  loading: boolean;
  onRefresh: () => void;
};

export default function ServiceTable({ services, loading, onRefresh }: Props) {
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    try {
      await adminDeleteService(id);
      toast.success("Service deleted ✅");
      onRefresh();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      {/* Table Header */}
      <div className="bg-[#0f0f0f] px-4 py-3 text-sm text-gray-300 font-semibold grid grid-cols-5">
        <span>Index</span>
        <span>Title</span>
        <span>Slug</span>
        <span>Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Table Body */}
      {loading ? (
        <div className="p-6 text-gray-400">Loading...</div>
      ) : services.length === 0 ? (
        <div className="p-6 text-gray-400">No services found.</div>
      ) : (
        services.map((s) => (
          <div
            key={s._id}
            className="px-4 py-4 border-t border-gray-800 grid grid-cols-5 text-sm items-center"
          >
            {/* Index */}
            <span className="text-gray-300">{s.index}</span>

            {/* Title */}
            <span className="font-semibold">{s.title}</span>

            {/* Slug */}
            <span className="text-gray-400">{s.slug}</span>

            {/* Status */}
            <span
              className={`text-xs px-2 py-1 rounded-full w-fit ${
                s.isActive
                  ? "bg-green-900 text-green-200"
                  : "bg-red-900 text-red-200"
              }`}
            >
              {s.isActive ? "Active" : "Inactive"}
            </span>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              {/* Subservices */}
              <Link
                href={`/admin/services/${s._id}/subservices`}
                className="px-3 py-1 rounded-lg bg-purple-800 hover:bg-purple-700 transition"
              >
                Subservices
              </Link>

              {/* Edit */}
              <Link
                href={`/admin/services/edit/${s._id}`}
                className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                Edit
              </Link>

              {/* Delete */}
              <button
                onClick={() => handleDelete(s._id)}
                className="px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
