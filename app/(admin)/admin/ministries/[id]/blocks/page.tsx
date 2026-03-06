import BlocksEditor from "@/components/admin/ministries/blocks/BlockEditor";

type Props = {
  params: {
    id: string;
  };
};

export default function MinistryBlocksPage({ params }: Props) {
  return (
    <div className="p-8">
      <BlocksEditor ministryId={params.id} />
    </div>
  );
}