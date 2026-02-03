import { notFound } from "next/navigation";
import BlogCardsGrid from "@/components/user/blog/BlogCardsGrid";

async function getCategoryBlogs(citySlug: string, categorySlug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/cities/${citySlug}/${categorySlug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function CategoryPage({
  params,
}: {
  params: { citySlug: string; categorySlug: string };
}) {
  const data = await getCategoryBlogs(
    params.citySlug,
    params.categorySlug
  );

  if (!data) return notFound();

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-12 capitalize">
          {params.categorySlug.replace(/-/g, " ")}
        </h1>

        <BlogCardsGrid blogs={data.blogs} />
      </div>
    </main>
  );
}
