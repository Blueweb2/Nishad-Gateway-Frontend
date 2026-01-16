"use client";

import { useParams } from "next/navigation";
import SubServiceForm from "@/components/admin/services/SubServiceForm";

export default function CreateSubServicePage() {
  const params = useParams();
  const serviceId = params?.serviceId as string;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto">
        <SubServiceForm mode="create" serviceId={serviceId} />
      </div>
    </div>
  );
}
