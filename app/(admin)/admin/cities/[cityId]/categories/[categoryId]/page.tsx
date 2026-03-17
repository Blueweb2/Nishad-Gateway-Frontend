"use client";

import { useState } from "react";
import OverviewEditor from "@/components/admin/categoryblog/OverviewEditor";
import ListingsManager from "@/components/admin/categoryblog/ListingsManager";

export default function CategoryPageManager() {

  const [tab, setTab] = useState<"overview" | "listings">("overview");

  return (
    <div className="space-y-8">

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4">
        <button
          onClick={() => setTab("overview")}
          className={`px-4 py-2 text-sm rounded-lg ${
            tab === "overview"
              ? "bg-emerald-500 text-black"
              : "bg-white/10 text-white"
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setTab("listings")}
          className={`px-4 py-2 text-sm rounded-lg ${
            tab === "listings"
              ? "bg-emerald-500 text-black"
              : "bg-white/10 text-white"
          }`}
        >
          Listings
        </button>
      </div>

      {/* Content */}
      {tab === "overview" && <OverviewEditor />}
      {tab === "listings" && <ListingsManager />}

    </div>
  );
}