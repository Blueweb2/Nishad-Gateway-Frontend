import Navbar from "@/components/user/shared/Navbar";
import FinalCTA from "@/components/user/home/FinalCTA";
import "../globals.css";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />

      {/* Navbar is fixed */}
      <div >{children}</div>

      {/* Common footer CTA */}
      <FinalCTA />
    </div>
  );
}
