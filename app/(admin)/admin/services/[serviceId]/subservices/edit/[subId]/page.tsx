"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import SubServiceForm from "@/components/admin/services/SubServiceForm";
import { adminGetSubServices } from "@/lib/api/subservices.api";

type SubService = {
  _id: string;
  title: string;
  slug: string;
  shortDesc: string;
  thumbnail?: string;
  order: number;
  isActive: boolean;
};

export default function EditSubServicePage() {
  const params = useParams();

  const serviceId = params?.serviceId as string;
  const subId = params?.subId as string;

  const [subservice, setSubservice] = useState<SubService | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubService = async () => {
    try {
      setLoading(true);

      const res = await adminGetSubServices(serviceId);
      const list: SubService[] = res.data || [];

      const found = list.find((s) => s._id === subId);

      if (!found) {
        toast.error("Subservice not found");
        setSubservice(null);
        return;
      }

      setSubservice(found);
    } catch (err) {
      toast.error("Failed to load subservice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (serviceId && subId) fetchSubService();
  }, [serviceId, subId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Loading subservice...</p>
      </div>
    );
  }

  if (!subservice) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400">Subservice not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto">
        <SubServiceForm
          mode="edit"
          serviceId={serviceId}
          subId={subservice._id}
          defaultValues={{
            title: subservice.title,
            slug: subservice.slug,
            shortDesc: subservice.shortDesc,
            thumbnail: subservice.thumbnail,
            order: subservice.order,
            isActive: subservice.isActive,
          }}
        />
      </div>
    </div>
  );
}
