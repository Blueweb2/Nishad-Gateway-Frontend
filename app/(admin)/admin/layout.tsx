import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminTopbar from "@/components/admin/layout/AdminTopbar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <main className="p-6">{children}</main>

        {/* ✅ Toasts */}
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
