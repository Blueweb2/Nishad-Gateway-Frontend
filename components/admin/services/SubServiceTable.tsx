"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { adminDeleteSubService } from "@/lib/api/subservices.api";

type SubService = {
  _id: string;
  serviceId: string;
  title: string;
  slug: string;
  shortDesc: string;
  thumbnail?: string;
  order: number;
  isActive: boolean;
};

type Props = {
  serviceId: string;
  subservices: SubService[];
  loading: boolean;
  onRefresh: () => void;
};

export default function SubServiceTable({
  serviceId,
  subservices,
  loading,
  onRefresh,
}: Props) {
  const handleDelete = async (subId: string) => {
    if (!confirm("Delete this subservice?")) return;

    try {
      await adminDeleteSubService(subId);
      toast.success("Subservice deleted ");
      onRefresh();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  return (
    <div className="rounded-xl border border-gray-800 overflow-hidden">
      <div className="bg-[#0f0f0f] px-4 py-3 text-sm text-gray-300 font-semibold grid grid-cols-6">
        <span>Order</span>
        <span>Title</span>
        <span>Slug</span>
        <span>Status</span>
        <span>Content</span>
        <span className="text-right">Actions</span>
      </div>

      {loading ? (
        <div className="p-6 text-gray-400">Loading...</div>
      ) : subservices.length === 0 ? (
        <div className="p-6 text-gray-400">No subservices found.</div>
      ) : (
        subservices.map((s) => (
          <div
            key={s._id}
            className="px-4 py-4 border-t border-gray-800 grid grid-cols-6 text-sm items-center"
          >
            <span className="text-gray-300">{s.order}</span>

            <div>
              <p className="font-semibold">{s.title}</p>
              <p className="text-xs text-gray-500 line-clamp-1">
                {s.shortDesc || "No description"}
              </p>
            </div>

            <span className="text-gray-400">{s.slug}</span>

            <span
              className={`text-xs px-2 py-1 rounded-full w-fit ${
                s.isActive
                  ? "bg-green-900 text-green-200"
                  : "bg-red-900 text-red-200"
              }`}
            >
              {s.isActive ? "Active" : "Inactive"}
            </span>

            {/* Content Editor Button */}
            <Link
              href={`/admin/services/${serviceId}/content/${s._id}`}
              className="px-3 py-1 rounded-lg bg-purple-800 hover:bg-purple-700 transition w-fit"
            >
              Edit Content
            </Link>

            <div className="flex justify-end gap-3">
              <Link
                href={`/admin/services/${serviceId}/subservices/edit/${s._id}`}
                className="px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
              >
                Edit
              </Link>

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
