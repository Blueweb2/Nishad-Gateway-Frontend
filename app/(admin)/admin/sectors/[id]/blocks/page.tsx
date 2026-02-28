import SectorBlocksEditor from "@/components/admin/sectors/SectorBlocksEditor";
import { getSectorByIdAdmin } from "@/lib/api/admin/sectors.api";

interface Props {
  params: {
    id: string;
  };
}

export default async function SectorBlocksPage({ params }: Props) {
  const sector = await getSectorByIdAdmin(params.id);

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