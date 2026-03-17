import dynamic from "next/dynamic";
import { getCities } from "@/lib/api/public/city.api";
import Loading from "../ksa-expansion-cost-calculator/loading";

const CitiesGrid = dynamic(
  () => import("@/components/user/cities/CitiesGrid"),
  { loading: () => <Loading /> }
);

export const metadata = {
  title: "Cities & Business Zones in Saudi Arabia",
  description:
    "Explore major business cities in Saudi Arabia including Riyadh, Jeddah, and Dammam. Learn about investment opportunities and business zones.",
};

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <main className="bg-white min-h-screen pt-28 pb-20" data-navbar="light">
      <div className="max-w-8xl mx-auto ">

        <h1 className="text-6xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-center mb-14">
          Cities & Business Zones in Saudi Arabia
        </h1>

        <CitiesGrid cities={cities} />
      </div>
    </main>
  );
}