import BusinessGrowth from "@/components/user/home/BusinessGrowth";
import Navbar from "@/components/user/shared/Navbar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <BusinessGrowth />
      <div className="pt-24">{children}</div>
    </div>
  );
}
