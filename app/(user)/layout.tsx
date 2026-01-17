import Navbar from "@/components/user/shared/Navbar";
import FinalCTA from "@/components/user/home/FinalCTA";
import "../globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Navbar is fixed */}
      <div className="pt-24">{children}</div>

      {/* Common footer CTA */}
      <FinalCTA />
    </div>
  );
}
