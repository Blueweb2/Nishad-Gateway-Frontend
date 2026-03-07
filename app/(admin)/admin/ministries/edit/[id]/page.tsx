import MinistryForm from "@/components/admin/ministries/MinistryForm";
import { getMinistryById } from "@/lib/api/admin/ministries.api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditMinistryPage({ params }: Props) {
  const { id } = await params;

  const ministry = await getMinistryById(id);

  if (!ministry) return notFound();

  return (
    <div className="p-8">
      <MinistryForm
        mode="edit"
        ministryId={id}
        initialData={ministry}
      />
    </div>
  );
}