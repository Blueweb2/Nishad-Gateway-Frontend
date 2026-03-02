"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminSectors } from "@/lib/api/admin/sectors.api";
import toast from "react-hot-toast";
import { deleteSectorAdmin } from "@/lib/api/admin/sectors.api";

interface Sector {
  _id: string;
  title: string;
  status: string;
  order: number;
}

export default function AdminSectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminSectors();
        setSectors(data);
      } catch {
        toast.error("Failed to load sectors");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sector?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);

      await deleteSectorAdmin(id);

      // Remove from state immediately
      setSectors((prev) =>
        prev.filter((sector) => sector._id !== id)
      );

      toast.success("Sector deleted successfully");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to delete sector"
      );
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-semibold">Sectors</h1>

        <Link
          href="/admin/sectors/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add Sector
        </Link>
      </div>

      <div className="bg-[#111] rounded-lg p-4">
        {sectors.map((sector) => (
          <div
            key={sector._id}
            className="flex justify-between items-center py-3 border-b border-gray-700"
          >
            <div>
              <p className="font-medium">{sector.title}</p>
              <p className="text-xs text-gray-400">
                Status: {sector.status} | Order: {sector.order}
              </p>
            </div>

            <div className="flex gap-4 items-center">
              <Link
                href={`/admin/sectors/${sector._id}/edit`}
                className="text-green-400 text-sm"
              >
                Edit
              </Link>

              <Link
                href={`/admin/sectors/${sector._id}/blocks`}
                className="text-blue-400 text-sm"
              >
                Manage Blocks
              </Link>

              <button
                onClick={() => handleDelete(sector._id)}
                disabled={deletingId === sector._id}
                className="text-red-400 text-sm hover:text-red-500"
              >
                {deletingId === sector._id
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}