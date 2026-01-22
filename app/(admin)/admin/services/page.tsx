"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { adminGetServices } from "@/lib/api/services.api";
import ServiceTable from "@/components/admin/services/ServiceTable";

type Service = {
  _id: string;
  index: string;
  title: string;
  slug: string;
  isActive: boolean;
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await adminGetServices();
      setServices(res.data || []);
    } catch (err: any) {
      toast.error("Failed to fetch services");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Services</h1>
            <p className="text-sm text-gray-400">
              Manage main service categories (Company Formation, Advisory, etc.)
            </p>
          </div>

          <Link
            href="/admin/services/create"
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold text-sm"
          >
            + Add Service
          </Link>
        </div>

        {/*  Table Component Here */}
        <ServiceTable
          services={services}
          loading={loading}
          onRefresh={fetchServices}
        />
      </div>
    </div>
  );
}
