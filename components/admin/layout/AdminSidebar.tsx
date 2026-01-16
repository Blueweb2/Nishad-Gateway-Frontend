"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  PlusCircle,
  LogOut,
} from "lucide-react";

const links = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },

  // ✅ Services Module
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Add Service", href: "/admin/services/create", icon: PlusCircle },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; max-age=0";
    router.push("/admin/login");
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
