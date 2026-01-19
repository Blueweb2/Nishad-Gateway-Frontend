"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import SubServiceTemplate, {
  SubServiceContent,
} from "@/components/user/services/SubServiceTemplate/SubServiceTemplate";

import { getSubServiceContentBySlug } from "@/lib/api/content.api";

export default function SubServiceDynamicPage() {
  const params = useParams();
  const subSlug = params?.subSlug as string;

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<SubServiceContent | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);

      const res = await getSubServiceContentBySlug(subSlug);

      if (!res?.data) {
        toast.error("No content found for this subservice");
        setContent(null);
        return;
      }

      // ✅ actual content is inside res.data
      setContent(res.data);
    } catch (err) {
      toast.error("Failed to load subservice content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subSlug) fetchContent();
  }, [subSlug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        No content available
      </div>
    );
  }

  return <SubServiceTemplate content={content} />;
}
