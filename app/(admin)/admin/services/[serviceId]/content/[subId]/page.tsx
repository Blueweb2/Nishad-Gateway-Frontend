"use client";

import { useParams, useRouter } from "next/navigation";
import SubServiceContentEditor from "@/components/admin/services/SubServiceContentEditor";

export default function SubServiceContentEditorPage() {
  const params = useParams();
  const router = useRouter();

  const serviceId = params?.serviceId as string;
  const subId = params?.subId as string;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Edit Subservice Content</h1>
            <p className="text-sm text-gray-400">
              Manage full page content for this subservice.
            </p>
          </div>

          <button
            onClick={() => router.push(`/admin/services/${serviceId}/subservices`)}
            className="px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition text-sm font-semibold"
          >
            ← Back
          </button>
        </div>

        <SubServiceContentEditor subId={subId} />
      </div>
    </div>
  );
}
