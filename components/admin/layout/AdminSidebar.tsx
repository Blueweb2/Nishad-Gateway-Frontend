"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  PlusCircle,
  LogOut,
  Users,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Add Service", href: "/admin/services/create", icon: PlusCircle },
  { name: "Leads", href: "/admin/leads", icon: Users },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL; 


const handleLogout = async () => {
  try {
    if (!API_URL) {
      toast.error("API URL missing ");
      return;
    }

    const res = await fetch(`${API_URL}/admin/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      toast.error(data?.message || "Logout failed");
      return;
    }

    toast.success("Logout success");
    router.replace("/admin/login");
  } catch (err) {
    toast.error("Logout failed");
  }
};



  return (
    <aside className="w-[260px] bg-[#0b0f0b] border-r border-green-700/30 p-6 flex flex-col">
      <h2 className="text-xl font-bold text-green-400 mb-10">Nishad Admin</h2>

      {/* Links */}
      <nav className="flex flex-col gap-3 flex-1">
        {links.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  active
                    ? "bg-green-600/20 border border-green-600 text-green-300"
                    : "text-gray-300 hover:bg-green-600/10 hover:text-green-200"
                }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center gap-3 px-4 py-3 rounded-lg border border-red-600/40 text-red-300 hover:bg-red-600/10 transition"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </aside>
  );
}
