"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SectorForm from "@/components/admin/sectors/SectorForm";
import { getSectorByIdAdmin } from "@/lib/api/admin/sectors.api";

export default function EditSectorPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSectorByIdAdmin(id as string);
      setData(res);
    };

    fetchData();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        Edit Sector
      </h1>

      <SectorForm initialData={data} isEdit />
    </div>
  );
}