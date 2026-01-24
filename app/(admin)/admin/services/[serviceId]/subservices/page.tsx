"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { adminGetSubServices } from "@/lib/api";
import SubServiceTable from "@/components/admin/services/SubServiceTable";

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

export default function AdminSubServicesPage() {
  const params = useParams();
  const router = useRouter();

  const serviceId = params?.serviceId as string;

  const [subservices, setSubservices] = useState<SubService[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubServices = async () => {
    try {
      setLoading(true);
      const res = await adminGetSubServices(serviceId);
      setSubservices(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch subservices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceId) fetchSubServices();
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Subservices</h1>
            <p className="text-sm text-gray-400">
              Manage subservices inside this service category
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/admin/services")}
              className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition text-sm font-semibold"
            >
              ← Back
            </button>

            <Link
              href={`/admin/services/${serviceId}/subservices/create`}
              className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold text-sm"
            >
              + Add Subservice
            </Link>
          </div>
        </div>

        {/* Table Component */}
        <SubServiceTable
          serviceId={serviceId}
          subservices={subservices}
          loading={loading}
          onRefresh={fetchSubServices}
        />
      </div>
    </div>
  );
}
