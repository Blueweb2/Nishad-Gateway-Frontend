"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Search, Phone, Mail, Calendar, MapPin } from "lucide-react";

type Lead = {
    _id: string;
    fullName: string;
    email: string;
    mobile: string;
    investorType: string;
    activity: string;
    city: string;
    timeline: string;
    visas: number;
    status?: "new" | "contacted" | "converted";

    supports?: {
        bankSupport?: boolean;
        accountingSupport?: boolean;
        vroSupport?: boolean;
    };

    estimate?: {
        min?: number;
        max?: number;
        timelineText?: string;
        recommendedSetup?: string;
        suggestedCity?: string;
    };

    source?: string;
    createdAt: string;
};


export default function AdminLeadsPage() {
    const [loading, setLoading] = useState(true);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [q, setQ] = useState("");

    async function fetchLeads() {
        try {
            setLoading(true);

            // 🔥 change base url if needed (use your API base)
            const res = await fetch("http://localhost:5000/api/leads", {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();

            if (!data?.success) {
                toast.error(data?.message || "Failed to load leads");
                return;
            }

            setLeads(data.leads || []);
        } catch (err) {
            console.log(err);
            toast.error("Failed to load leads");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLeads();
    }, []);

    const filtered = useMemo(() => {
        if (!q.trim()) return leads;

        const s = q.toLowerCase();
        return leads.filter((l) => {
            return (
                l.fullName?.toLowerCase().includes(s) ||
                l.email?.toLowerCase().includes(s) ||
                l.mobile?.toLowerCase().includes(s) ||
                l.city?.toLowerCase().includes(s) ||
                l.activity?.toLowerCase().includes(s)
            );
        });
    }, [q, leads]);

    async function updateStatus(id: string, status: "new" | "contacted" | "converted") {
        try {
            const res = await fetch(`http://localhost:5000/api/leads/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (!data?.success) {
                toast.error(data?.message || "Status update failed");
                return;
            }

            toast.success("Status updated ✅", {
                style: {
                    backgroundColor: "#0f5132",
                    color: "#d1e7dd",
                    border: "1px solid #2f9e44",
                    borderRadius: "8px",
                },
            });

            fetchLeads();
        } catch (err) {
            console.log(err);
            toast.error("Status update failed");
        }
    }

    function getStatusBadge(status?: "new" | "contacted" | "converted") {
        const s = status || "new";

        if (s === "converted") {
            return "bg-green-600/20 text-green-300 border border-green-600/40";
        }

        if (s === "contacted") {
            return "bg-blue-600/20 text-blue-300 border border-blue-600/40";
        }

        // new
        return "bg-yellow-600/20 text-yellow-300 border border-yellow-600/40";
    }



    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-green-300">Leads</h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Users who calculated KSA Expansion Cost (high priority enquiries)
                    </p>
                </div>

                <button
                    onClick={fetchLeads}
                    className="px-4 py-2 rounded-lg border border-green-600/40 text-green-200 hover:bg-green-600/10 transition"
                >
                    Refresh
                </button>
            </div>

            {/* Search */}
            <div className="mt-6 flex items-center gap-3 bg-[#0b0f0b] border border-green-700/30 rounded-xl px-4 py-3">
                <Search size={18} className="text-gray-400" />
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by name, email, mobile, city, activity..."
                    className="w-full bg-transparent outline-none text-gray-200 placeholder:text-gray-500"
                />
            </div>

            {/* Table */}
            <div className="mt-6 rounded-xl border border-green-700/30 bg-[#0b0f0b] overflow-hidden">
                <div className="px-5 py-4 border-b border-green-700/20 flex items-center justify-between">
                    <p className="text-sm text-gray-300">
                        Total Leads:{" "}
                        <span className="text-green-300 font-semibold">{filtered.length}</span>
                    </p>

                    {loading && (
                        <p className="text-sm text-gray-400 animate-pulse">Loading...</p>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-[900px] w-full text-sm">
                        <thead className="text-gray-400 border-b border-green-700/20">
                            <tr>
                                <th className="text-left px-5 py-3">Client</th>
                                <th className="text-left px-5 py-3">Business</th>
                                <th className="text-left px-5 py-3">Estimate</th>
                                <th className="text-left px-5 py-3">Date</th>
                                <th className="text-left px-5 py-3">Status</th>
                                <th className="text-left px-5 py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-gray-200">
                            {!loading && filtered.length === 0 ? (
                                <tr>
                                    <td className="px-5 py-6 text-gray-400" colSpan={6}>
                                        No leads found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((lead) => (
                                    <tr
                                        key={lead._id}
                                        className="border-b border-green-700/10 hover:bg-green-600/5 transition"
                                    >
                                        {/* Client */}
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-green-200">
                                                {lead.fullName}
                                            </p>

                                            <div className="mt-2 space-y-1 text-gray-300">
                                                <p className="flex items-center gap-2">
                                                    <Mail size={14} className="text-gray-500" />
                                                    {lead.email}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <Phone size={14} className="text-gray-500" />
                                                    {lead.mobile}
                                                </p>
                                            </div>
                                        </td>

                                        {/* Business */}
                                        <td className="px-5 py-4">
                                            <p className="text-gray-200">{lead.activity}</p>
                                            <p className="text-gray-400 mt-1 flex items-center gap-2">
                                                <MapPin size={14} className="text-gray-500" />
                                                {lead.city} • {lead.timeline}
                                            </p>
                                            <p className="text-gray-500 mt-1">
                                                Investor: {lead.investorType} • Visas: {lead.visas}
                                            </p>
                                        </td>

                                        {/* Estimate */}
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-green-300">
                                                SAR{" "}
                                                {lead.estimate?.min?.toLocaleString?.() || "-"} –{" "}
                                                {lead.estimate?.max?.toLocaleString?.() || "-"}
                                            </p>
                                            <p className="text-gray-400 mt-1">
                                                {lead.estimate?.recommendedSetup || "—"}
                                            </p>
                                        </td>

                                        {/* Date */}
                                        <td className="px-5 py-4 text-gray-400">
                                            <p className="flex items-center gap-2">
                                                <Calendar size={14} className="text-gray-500" />
                                                {new Date(lead.createdAt).toLocaleString()}
                                            </p>
                                            <p className="text-gray-500 mt-1">
                                                Source: {lead.source || "calculator"}
                                            </p>
                                        </td>

                                        {/* status */}

                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Badge */}
                                                <span
                                                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusBadge(
                                                        lead.status
                                                    )}`}
                                                >
                                                    {lead.status || "new"}
                                                </span>

                                                {/* Dropdown */}
                                                <select
                                                    value={lead.status || "new"}
                                                    onChange={(e) =>
                                                        updateStatus(
                                                            lead._id,
                                                            e.target.value as "new" | "contacted" | "converted"
                                                        )
                                                    }
                                                    className="bg-[#0b0f0b] border border-green-700/30 text-gray-200 rounded-lg px-3 py-2 outline-none"
                                                >
                                                    <option value="new">New</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="converted">Converted</option>
                                                </select>
                                            </div>
                                        </td>



                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex flex-col gap-2">
                                                <a
                                                    href={`https://wa.me/${lead.mobile.replace(/\D/g, "")}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="px-4 py-2 rounded-lg bg-green-700 text-white text-center hover:bg-green-800 transition"
                                                >
                                                    WhatsApp
                                                </a>

                                                <a
                                                    href={`mailto:${lead.email}`}
                                                    className="px-4 py-2 rounded-lg border border-green-600/40 text-green-200 text-center hover:bg-green-600/10 transition"
                                                >
                                                    Email
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
