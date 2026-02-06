"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Shield, Trash2, Plus } from "lucide-react";

interface Admin {
  _id: string;
  email: string;
  role: "admin" | "superadmin";
  createdAt: string;
}

export default function ManageAdminsPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Fetch admins
  const fetchAdmins = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/list`, {
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setAdmins(data.data);
      }
    } catch {
      toast.error("Failed to fetch admins");
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Add Admin
  const handleAddAdmin = async () => {
    if (!form.email || !form.password) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed");
        return;
      }

      toast.success("Admin created");
      setShowModal(false);
      setForm({ email: "", password: "" });
      fetchAdmins();
    } catch {
      toast.error("Error creating admin");
    } finally {
      setLoading(false);
    }
  };

  // Delete Admin
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this admin?");
    if (!confirm) return;

    try {
      const res = await fetch(`${API_URL}/admin/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Delete failed");
        return;
      }

      toast.success("Admin deleted");
      fetchAdmins();
    } catch {
      toast.error("Error deleting admin");
    }
  };

  return (
    <div className="p-8 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-400">
          Manage Admins
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
        >
          <Plus size={16} />
          Add Admin
        </button>
      </div>

      {/* Table */}
      <div className="bg-[#0f1410] border border-green-700/30 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-600/10 text-green-300">
            <tr>
              <th className="text-left px-6 py-4">Email</th>
              <th className="text-left px-6 py-4">Role</th>
              <th className="text-left px-6 py-4">Created</th>
              <th className="text-right px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin._id}
                className="border-t border-green-700/20 hover:bg-green-600/5 transition"
              >
                <td className="px-6 py-4">{admin.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium
                      ${
                        admin.role === "superadmin"
                          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                          : "bg-green-600/20 text-green-400 border border-green-500/30"
                      }`}
                  >
                    {admin.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right">
                  {admin.role !== "superadmin" && (
                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {admins.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-400">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#0f1410] p-6 rounded-xl w-[400px] border border-green-700/30">
            <h2 className="text-lg font-semibold mb-4 text-green-400">
              Add New Admin
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full mb-3 px-4 py-2 bg-black border border-green-700/30 rounded-lg text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="w-full mb-4 px-4 py-2 bg-black border border-green-700/30 rounded-lg text-white"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300"
              >
                Cancel
              </button>

              <button
                onClick={handleAddAdmin}
                disabled={loading}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
