"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2, Plus, Layout } from "lucide-react";

import {
    adminGetMinistries,
    adminDeleteMinistry,
} from "@/lib/api/admin/ministries.api";

type Ministry = {
    _id: string;
    title: string;
    slug: string;
    shortDesc?: string;
    logo?: string;
    coverImage?: string;
    isActive: boolean;
};

export default function MinistriesAdminPage() {
    const [ministries, setMinistries] = useState<Ministry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMinistries = async () => {
        try {
            setLoading(true);

            const res = await adminGetMinistries();
            const list = res?.data || res || [];

            setMinistries(list);
        } catch {
            toast.error("Failed to load ministries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMinistries();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this ministry?")) return;

        try {
            await adminDeleteMinistry(id);

            toast.success("Ministry deleted");

            setMinistries((prev) => prev.filter((m) => m._id !== id));
        } catch {
            toast.error("Failed to delete ministry");
        }
    };

    if (loading) {
        return (
            <div className="p-10 text-gray-400">
                Loading ministries...
            </div>
        );
    }

    return (
        <div className="p-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold text-green-300">
                    Ministries
                </h1>

                <Link
                    href="/admin/ministries/create"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium"
                >
                    <Plus size={16} />
                    Create Ministry
                </Link>
            </div>

            {/* Table */}
            <div className="border border-green-700/30 rounded-xl overflow-hidden">
                <table className="w-full text-sm">

                    <thead className="bg-[#0f140f] text-green-400">
                        <tr>
                            <th className="p-4 text-left">Logo</th>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Slug</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {ministries.map((ministry) => (
                            <tr
                                key={ministry._id}
                                className="border-t border-green-700/20 hover:bg-green-900/10"
                            >
                                {/* Logo */}
                                <td className="p-4">
                                    {ministry.logo ? (
                                        <img
                                            src={ministry.logo}
                                            alt={ministry.title}
                                            className="w-10 h-10 object-contain"
                                        />
                                    ) : (
                                        <span className="text-gray-500 text-xs">
                                            —
                                        </span>
                                    )}
                                </td>

                                {/* Title */}
                                <td className="p-4 font-medium">
                                    {ministry.title}
                                </td>

                                {/* Slug */}
                                <td className="p-4 text-gray-400">
                                    {ministry.slug}
                                </td>

                                {/* Status */}
                                <td className="p-4">
                                    {ministry.isActive ? (
                                        <span className="text-green-400">Active</span>
                                    ) : (
                                        <span className="text-red-400">Inactive</span>
                                    )}
                                </td>

                                {/* Actions */}
                                <td className="p-4 flex justify-end gap-3">

                                    {/* Edit Ministry */}
                                    <Link
                                        href={`/admin/ministries/edit/${ministry._id}`}
                                        className="p-2 rounded-lg border border-green-700/30 hover:bg-green-900/20"
                                    >
                                        <Pencil size={16} />
                                    </Link>

                                    {/* Edit Blocks */}
                                    <Link
                                        href={`/admin/ministries/${ministry._id}/blocks`}
                                        className="p-2 rounded-lg border border-blue-700/30 hover:bg-blue-900/20"
                                    >
                                        <Layout size={16} />
                                    </Link>

                                    {/* Delete */}
                                    <button
                                        onClick={() => handleDelete(ministry._id)}
                                        className="p-2 rounded-lg border border-red-700/30 hover:bg-red-900/20"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                {ministries.length === 0 && (
                    <div className="p-6 text-gray-400 text-sm">
                        No ministries found.
                    </div>
                )}

            </div>
        </div>
    );
}