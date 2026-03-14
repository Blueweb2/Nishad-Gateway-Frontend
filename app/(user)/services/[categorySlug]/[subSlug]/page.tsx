"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

import SubServiceTemplate, {
  SubServiceContent,
} from "@/components/user/services/SubServiceTemplate/SubServiceTemplate";

import { getSubServiceContentBySlug } from "@/lib/api/public/subserviceContent.api";
import { getCities } from "@/lib/api/public/city.api";
import { City } from "@/lib/types/city";

export default function SubServiceDynamicPage() {
  const params = useParams();
  const subSlug = params?.subSlug as string;

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<SubServiceContent | null>(null);
  const [cities, setCities] = useState<City[]>([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [contentRes, citiesRes] = await Promise.all([
        getSubServiceContentBySlug(subSlug),
        getCities(),
      ]);

      // ✅ correct


      if (!contentRes?.data) {
        toast.error("No content found for this subservice");
        setContent(null);
        return;
      }

      setContent(contentRes.data);
      setCities(citiesRes);


      console.log("CITIES RAW:", citiesRes); // important
      console.log("content response:", contentRes.data);
      

    } catch (err) {
      toast.error("Failed to load subservice content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (subSlug) fetchData();
  }, [subSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  };

  if (!content) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        No content available
      </div>
    );
  }

  return <SubServiceTemplate content={content} cities={cities} />;
}
