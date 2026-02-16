import { CityBlogSection } from "@/lib/types/city-blog";

export function normalizeSections(
  sections: CityBlogSection[]
) {
  return [...sections]
    .sort((a, b) => a.order - b.order)
    .map((s, index) => ({
      ...s,
      order: index + 1,
    }));
}
