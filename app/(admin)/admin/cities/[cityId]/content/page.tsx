"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ContentManager() {

  const { cityId } = useParams<{ cityId: string }>();

  const [contents, setContents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cityId) fetchContents();
  }, [cityId]);

  const fetchContents = async () => {
    try {
      const res = await axios.get(
        `/api/admin/cities/${cityId}/contents`
      );

      setContents(res.data.data);

    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {

    if (!confirm("Delete this content?")) return;

    await axios.delete(`/api/admin/contents/${id}`);

    setContents((prev) => prev.filter(c => c._id !== id));
  };

  const filtered = useMemo(() => {
    return contents.filter((item) => {

      const matchSearch =
        item.title?.toLowerCase().includes(search.toLowerCase());

      const matchType =
        type === "all" || item.type === type;

      return matchSearch && matchType;

    });
  }, [contents, search, type]);

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold text-white">
          Content Manager
        </h1>

        <Link
          href={`/admin/cities/${cityId}/content/create`}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          + Create Content
        </Link>

      </div>

      {/* Filters */}

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="bg-black/40 border border-white/10 px-3 py-2 rounded w-60 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-black/40 border border-white/10 px-3 py-2 rounded text-white"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Types</option>
          <option value="overview">Overview</option>
          <option value="article">Article</option>
          <option value="place">Place</option>
          <option value="listing">Listing</option>
        </select>

      </div>

      {/* Table */}

      <div className="border border-white/10 rounded-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-white/5 text-white/80">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Type</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-white/50">
                  No content found
                </td>
              </tr>
            )}

            {filtered.map((content) => (

              <tr
                key={content._id}
                className="border-t border-white/10 text-white/80"
              >

                <td className="p-3">
                  {content.title}
                </td>

                <td className="p-3 capitalize">
                  {content.type}
                </td>

                <td className="p-3 flex gap-4">

                  <Link
                    href={`/admin/cities/${cityId}/content/${content._id}`}
                    className="text-blue-400"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteContent(content._id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}