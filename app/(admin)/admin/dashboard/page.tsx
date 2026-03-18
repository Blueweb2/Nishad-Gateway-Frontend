"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { adminAxios } from "@/lib/http/adminAxios";

type DashboardStats = {
  totalBlogs: number;
  totalServices: number;
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalServices: 0,
  });
[
  adminAxios.get("/blogs"),
  adminAxios.get("/services"),
];


useEffect(() => {
  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const [blogsRes, servicesRes] = await Promise.all([
        adminAxios.get("/blogs"),
        adminAxios.get("/services"),
      ]);

      console.log("BLOGS:", blogsRes.data);
      console.log("SERVICES:", servicesRes.data);

      setStats({
        totalBlogs:
          blogsRes.data?.blogs?.length ||
          blogsRes.data?.data?.length ||
          blogsRes.data?.length ||
          0,

        totalServices:
          servicesRes.data?.services?.length ||
          servicesRes.data?.data?.length ||
          servicesRes.data?.length ||
          0,
      });

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to load dashboard"
      );
    } finally {
      setLoading(false);
    }
  };

  fetchDashboardStats();
}, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-300">
          Admin Dashboard
        </h1>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Blogs */}
        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6">
          <p className="text-gray-300 text-sm">Total Blogs</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">
            {loading ? "..." : stats.totalBlogs}
          </h3>
        </div>

        {/* Total Services */}
        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6">
          <p className="text-gray-300 text-sm">Total Services</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">
            {loading ? "..." : stats.totalServices}
          </h3>
        </div>
      </div>
    </div>
  );
}
