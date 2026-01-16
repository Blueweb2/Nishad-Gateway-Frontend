"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import ServiceForm from "@/components/admin/services/ServiceForm";
import { adminGetServices } from "@/lib/api/services.api";

type Service = {
  _id: string;
  index: string;
  title: string;
  slug: string;
  isActive: boolean;
};

export default function EditServicePage() {
  const params = useParams();
  const id = params?.id as string;

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchService = async () => {
    try {
      setLoading(true);

      // We already have GET /services (all services)
      // So we fetch all and find the service by id
      const res = await adminGetServices();
      const list: Service[] = res.data || [];

      const found = list.find((s) => s._id === id);

      if (!found) {
        toast.error("Service not found");
        setService(null);
        return;
      }

      setService(found);
    } catch (err) {
      toast.error("Failed to load service");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading service...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Service not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto">
        <ServiceForm
          mode="edit"
          serviceId={service._id}
          defaultValues={{
            index: service.index,
            title: service.title,
            slug: service.slug,
            isActive: service.isActive,
          }}
        />
      </div>
    </div>
  );
}
