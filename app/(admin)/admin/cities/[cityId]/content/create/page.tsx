"use client";

import { useParams } from "next/navigation";
import ContentHeader from "@/components/admin/content/ContentHeader";
import ContentForm from "@/components/admin/content/ContentForm";

export default function CreateContent() {

  const { cityId } = useParams<{ cityId: string }>();

  return (
    <div className="p-10 max-w-6xl mx-auto">

      <ContentHeader
        title="Create Content"
        description="Add a new article, place, or listing for this city"
      />

      <ContentForm cityId={cityId} />

    </div>
  );
}