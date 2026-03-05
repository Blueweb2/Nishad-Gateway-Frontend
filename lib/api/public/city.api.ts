import { City } from "@/lib/types/city";

export const getCities = async (): Promise<City[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cities`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch cities");
  }

  const data = await res.json();
  return data.cities; // make sure backend sends { cities: [...] }
};