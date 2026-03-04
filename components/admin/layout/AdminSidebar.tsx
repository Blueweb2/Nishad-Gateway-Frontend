"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  LayoutDashboard,
  FileText,
  Briefcase,
  LogOut,
  MapPin,
  Shield,
  Trash2,
  Building2,
  Landmark,
} from "lucide-react";

import { adminMe, adminLogout } from "@/lib/api";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [role, setRole] = useState<string | null>(null);

  // ✅ Fetch logged-in admin safely
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const data = await adminMe();

        if (data?.success) {
          setRole(data.data.role);
        }
      } catch {
        // Interceptor handles redirect if session expired
        console.log("Session check failed");
      }
    };

    fetchAdmin();
  }, []);

  const baseLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Cities", href: "/admin/cities", icon: MapPin },
    { name: "Services", href: "/admin/services", icon: Briefcase },
     { name: "Sectors", href: "/admin/sectors", icon: Building2  },
     { name: "Ministries", href: "/admin/ministries", icon: Landmark },
  ];

  const links =
    role === "superadmin"
      ? [
          baseLinks[0],
          {
            name: "Manage Admins",
            href: "/admin/manage-admins",
            icon: Shield,
          },
          {
            name: "Media Cleanup",
            href: "/admin/media-cleanup",
            icon: Trash2,
          },
          ...baseLinks.slice(1),
        ]
      : baseLinks;

  const handleLogout = async () => {
    try {
      await adminLogout();
      toast.success("Logout successful");
      router.replace("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="w-[260px] bg-[#0b0f0b] border-r border-green-700/30 p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-green-400">
          Nishad Admin
        </h2>

        {role && (
          <p className="text-xs text-green-500 mt-1">
            {role === "superadmin" ? "Super Admin" : "Admin"}
          </p>
        )}
      </div>

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
