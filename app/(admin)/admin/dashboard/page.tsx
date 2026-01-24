"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Phone, Calendar, ArrowRight } from "lucide-react";

type Lead = {
  _id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  activity: string;
  createdAt: string;
  estimate?: {
    min?: number;
    max?: number;
  };
};

type LeadsResponse = {
  success: boolean;
  message?: string;
  leads?: Lead[];
};

export default function AdminDashboardPage() {
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL; 

  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);
  const [todayLeads, setTodayLeads] = useState(0);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  const fetchLeadStats = useCallback(async () => {
    try {
      setLoading(true);

      if (!API_URL) {
        toast.error("Missing NEXT_PUBLIC_API_URL in .env.local");
        return;
      }

      const res = await fetch(`${API_URL}/leads`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      //  if session invalid -> redirect to login
      if (res.status === 401 || res.status === 403) {
        toast.error("Session expired. Please login again.");
        router.replace("/admin/login");
        return;
      }

      const data: LeadsResponse = await res.json();

      if (!data?.success) {
        toast.error(data?.message || "Failed to load leads");
        return;
      }

      const leads = data.leads || [];

      // total
      setTotalLeads(leads.length);

      // today
      const todayStr = new Date().toDateString();
      const todayCount = leads.filter(
        (l) => new Date(l.createdAt).toDateString() === todayStr
      ).length;
      setTodayLeads(todayCount);

      // recent 5 (latest first)
      const sorted = [...leads].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setRecentLeads(sorted.slice(0, 5));
    } catch (err) {
      console.log(err);
      toast.error("Failed to load lead stats");
    } finally {
      setLoading(false);
    }
  }, [API_URL, router]);

  useEffect(() => {
    fetchLeadStats();
  }, [fetchLeadStats]);

  

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-300">Admin Dashboard</h1>

        <button
          onClick={fetchLeadStats}
          disabled={loading}
          className="px-4 py-2 rounded-lg border border-green-700/30 text-green-200 hover:bg-green-600/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6 md:col-span-1">
          <p className="text-gray-300 text-sm">Total Blogs</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">0</h3>
        </div>

        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6 md:col-span-1">
          <p className="text-gray-300 text-sm">Total Services</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">0</h3>
        </div>

        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6 md:col-span-1">
          <p className="text-gray-300 text-sm">Visitors</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">0</h3>
        </div>

        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6 md:col-span-1">
          <p className="text-gray-300 text-sm">Total Leads</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">
            {loading ? "..." : totalLeads}
          </h3>
        </div>

        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6 md:col-span-1">
          <p className="text-gray-300 text-sm">Leads Today</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">
            {loading ? "..." : todayLeads}
          </h3>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="mt-10 bg-[#0b0f0b] border border-green-700/30 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-700/20">
          <div>
            <h2 className="text-lg font-semibold text-green-200">
              Recent Leads
            </h2>
            <p className="text-sm text-gray-400">
              Latest users who calculated expansion cost
            </p>
          </div>

          <Link
            href="/admin/leads"
            className="text-sm text-green-300 hover:text-green-200 flex items-center gap-2"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="text-gray-400 border-b border-green-700/20">
              <tr>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">City</th>
                <th className="text-left px-6 py-3">Activity</th>
                <th className="text-left px-6 py-3">Estimate</th>
                <th className="text-left px-6 py-3">Date</th>
                <th className="text-left px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-gray-400">
                    Loading recent leads...
                  </td>
                </tr>
              ) : recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-6 text-gray-400">
                    No leads yet.
                  </td>
                </tr>
              ) : (
                recentLeads.map((lead) => {
                  const waNumber = lead.mobile?.replace(/\D/g, "") || "";

                  return (
                    <tr
                      key={lead._id}
                      className="border-b border-green-700/10 hover:bg-green-600/5 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-green-200">
                        {lead.fullName}
                      </td>

                      <td className="px-6 py-4">{lead.city}</td>

                      <td className="px-6 py-4">{lead.activity}</td>

                      <td className="px-6 py-4 text-green-300 font-semibold">
                        SAR{" "}
                        {lead.estimate?.min?.toLocaleString?.() || "-"} –{" "}
                        {lead.estimate?.max?.toLocaleString?.() || "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-400">
                        <span className="flex items-center gap-2">
                          <Calendar size={14} className="text-gray-500" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {waNumber ? (
                          <a
                            href={`https://wa.me/${waNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
                          >
                            <Phone size={16} />
                            WhatsApp
                          </a>
                        ) : (
                          <span className="text-gray-500">No number</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
