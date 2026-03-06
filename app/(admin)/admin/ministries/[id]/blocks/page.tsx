import BlocksEditor from "@/components/admin/ministries/blocks/BlockEditor";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MinistryBlocksPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="p-8">
      <BlocksEditor ministryId={id} />
    </div>
  );
}