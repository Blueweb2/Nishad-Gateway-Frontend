"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MinistryForm from "@/components/admin/ministries/MinistryForm";
import { getMinistryById } from "@/lib/api/admin/ministries.api";

export default function EditMinistryPage() {

  const params = useParams();
  const ministryId = params.ministryId as string;

  const [ministry, setMinistry] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getMinistryById(ministryId);
        setMinistry(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [ministryId]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!ministry) {
    return <div className="p-8">Ministry not found</div>;
  }

  return (
    <div className="p-8">
      <MinistryForm
        mode="edit"
        ministryId={ministryId}
        initialData={ministry}
      />
    </div>
  );
}