import Image from "next/image";
import Link from "next/link";
import { getCategoryBlogs } from "@/lib/api/public/categoryBlogs.api";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ citySlug: string; categorySlug: string }>;
}) {
  const { citySlug, categorySlug } = await params;

  const data = await getCategoryBlogs(citySlug, categorySlug);

  if (!data) {
    return (
      <main className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-semibold">Category not found</h1>
      </main>
    );
  }

  const blogs = data.blogs ?? [];
  const featured = data.featured;

  if (blogs.length === 0 && !featured) {
    return (
      <main className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-semibold">No blogs found in category</h1>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <div className="space-y-20">

        {/* Featured */}
        {featured && (
          <div>
            <Link href={`/cities/${citySlug}/${categorySlug}/${featured.slug}`}>
              <div className="relative w-full h-[460px] rounded-3xl overflow-hidden mb-8">
                <Image
                  src={featured.coverImage || "/placeholder.jpg"}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </Link>

            <Link href={`/cities/${citySlug}/${categorySlug}/${featured.slug}`}>
              <h2 className="text-4xl font-semibold mb-4 hover:text-emerald-600">
                {featured.title}
              </h2>
            </Link>
          </div>
        )}

        {/* Blog list */}
        {blogs.map((blog) => (
          <div key={blog._id}>
            <Link href={`/cities/${citySlug}/${categorySlug}/${blog.slug}`}>
              <div className="relative w-full h-[420px] rounded-3xl overflow-hidden mb-8">
                <Image
                  src={blog.coverImage || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <Link href={`/cities/${citySlug}/${categorySlug}/${blog.slug}`}>
              <h2 className="text-3xl font-semibold mb-4 hover:text-emerald-600">
                {blog.title}
              </h2>
            </Link>

            {blog.excerpt && (
              <p className="text-gray-600 text-lg">{blog.excerpt}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}