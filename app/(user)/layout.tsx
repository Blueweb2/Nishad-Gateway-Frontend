import Navbar from "@/components/user/shared/Navbar";
import FinalCTA from "@/components/user/home/FinalCTA";
import "../globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      {/* This is the fix */}
      <main className="flex-1">
        {children}
      </main>

      <FinalCTA />
    </div>
  );
}
