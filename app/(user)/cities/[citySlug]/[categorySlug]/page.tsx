import Image from "next/image";
import Link from "next/link";
import { getCategoryBlogs } from "@/lib/api/public/categoryBlogs.api";

export default async function CategoryPage({
  params,
}: {
  params: { citySlug: string; categorySlug: string };
}) {
  const data = await getCategoryBlogs(
    params.citySlug,
    params.categorySlug
  );

  if (!data || !data.blogs || data.blogs.length === 0) {
    return (
      <main className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h1 className="text-3xl font-semibold">
          No blogs found
        </h1>
      </main>
    );
  }

  const { blogs, featured } = data;

  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <div className="space-y-20">

        {/* ================= FEATURED BLOG ================= */}
        {featured && (
          <div>
            <Link
              href={`/cities/${params.citySlug}/${params.categorySlug}/${featured.slug}`}
            >
              <div className="relative w-full h-[460px] rounded-3xl overflow-hidden mb-8 cursor-pointer">
                <Image
                  src={featured.coverImage || "/placeholder.jpg"}
                  alt={featured.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </Link>

            <Link
              href={`/cities/${params.citySlug}/${params.categorySlug}/${featured.slug}`}
            >
              <h2 className="text-4xl font-semibold mb-4 hover:text-emerald-600 transition-colors">
                {featured.title}
              </h2>
            </Link>

            {featured.excerpt && (
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {featured.excerpt}
              </p>
            )}

            <Link
              href={`/cities/${params.citySlug}/${params.categorySlug}/${featured.slug}`}
              className="text-emerald-600 font-medium inline-block"
            >
              Read Featured →
            </Link>

            <div className="mt-20 border-t border-gray-200" />
          </div>
        )}

        {/* ================= NORMAL BLOGS ================= */}
        {blogs.map((blog, index) => (
          <div key={blog._id}>
            {/* COVER */}
            <Link
              href={`/cities/${params.citySlug}/${params.categorySlug}/${blog.slug}`}
            >
              <div className="relative w-full h-[420px] rounded-3xl overflow-hidden mb-8 cursor-pointer">
                <Image
                  src={blog.coverImage || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </Link>

            {/* TITLE */}
            <Link
              href={`/cities/${params.citySlug}/${params.categorySlug}/${blog.slug}`}
            >
              <h2 className="text-3xl font-semibold mb-4 hover:text-emerald-600 transition-colors">
                {blog.title}
              </h2>
            </Link>

            {/* EXCERPT */}
            {blog.excerpt && (
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {blog.excerpt}
              </p>
            )}

            {/* READ MORE */}
            <Link
              href={`/cities/${params.citySlug}/${params.categorySlug}/${blog.slug}`}
              className="text-emerald-600 font-medium inline-block"
            >
              Read More →
            </Link>

            {/* DIVIDER */}
            {index !== blogs.length - 1 && (
              <div className="mt-16 border-t border-gray-200" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
