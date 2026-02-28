"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SectorBlocksEditor from "@/components/admin/sectors/SectorBlocksEditor";
import { getSectorByIdAdmin } from "@/lib/api/admin/sectors.api";
import toast from "react-hot-toast";

export default function SectorBlocksPage() {
  const params = useParams();
  const id = params?.id as string;

  const [sector, setSector] = useState<any>(null);

  useEffect(() => {
    if (!id) return; // prevent undefined call

    const fetchData = async () => {
      try {
        const data = await getSectorByIdAdmin(id);
        setSector(data);
      } catch {
        toast.error("Failed to load sector");
      }
    };

    fetchData();
  }, [id]);

  if (!sector) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">
        Manage Blocks – {sector.title}
      </h1>

      <SectorBlocksEditor
        initialBlocks={sector.blocks || []}
        sectorId={sector._id}
      />
    </div>
  );
}