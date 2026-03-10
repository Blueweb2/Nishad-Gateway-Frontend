import { getCities } from "@/lib/api/public/city.api";
import CitiesGrid from "@/components/user/cities/CitiesGrid";

export const metadata = {
  title: "Cities & Business Zones in Saudi Arabia",
  description:
    "Explore major business cities in Saudi Arabia including Riyadh, Jeddah, and Dammam. Learn about investment opportunities and business zones.",
};

export default async function CitiesPage() {
  const cities = await getCities();

  return (
    <main className="bg-white min-h-screen pt-28 pb-20" data-navbar="light">
      <div className="max-w-8xl mx-auto px-6">

        <h1 className="text-6xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-14">
          Cities & Business Zones in Saudi Arabia
        </h1>

        <CitiesGrid cities={cities} />
      </div>
    </main>
  );
}