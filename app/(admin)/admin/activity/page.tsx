"use client";

import { useEffect, useState } from "react";

export default function AdminActivityPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/admin/logs`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setLogs(data.data);
      });
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold text-green-400 mb-6">
        Admin Activity Logs
      </h1>

      <div className="bg-[#0f1410] border border-green-700/30 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-600/10 text-green-300">
            <tr>
              <th className="px-6 py-4 text-left">Admin</th>
              <th className="px-6 py-4 text-left">Action</th>
              <th className="px-6 py-4 text-left">Target</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className="border-t border-green-700/20">
                <td className="px-6 py-4">
                  {log.adminId?.email}
                </td>
                <td className="px-6 py-4 text-yellow-400">
                  {log.action}
                </td>
                <td className="px-6 py-4">
                  {log.targetType}
                </td>
                <td className="px-6 py-4 text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
