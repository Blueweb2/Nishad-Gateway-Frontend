"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminSectors } from "@/lib/api/admin/sectors.api";
import toast from "react-hot-toast";

interface Sector {
  _id: string;
  title: string;
  status: string;
  order: number;
}

export default function AdminSectorsPage() {
  const [sectors, setSectors] = useState<Sector[]>([]);

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
          </div>
        ))}
      </div>
    </div>
  );
}