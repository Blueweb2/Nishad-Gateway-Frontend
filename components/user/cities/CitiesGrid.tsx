"use client";

import CityCard from "./CityCard";

export default function CitiesGrid({ cities }: any) {
  return (
    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {cities.map((city: any) => (
        <CityCard key={city.citySlug} city={city} />
      ))}
    </div>
  );
}