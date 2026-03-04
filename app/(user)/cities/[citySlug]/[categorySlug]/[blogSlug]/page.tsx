import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBlog } from "@/lib/api/public/categoryBlogs.api";

export default async function BlogPage({
  params,
}: {
  params: Promise<{
    citySlug: string;
    categorySlug: string;
    blogSlug: string;
  }>;
}) {
  const { citySlug, categorySlug, blogSlug } = await params;

  const data = await getCategoryBlog(citySlug, categorySlug, blogSlug);

  if (!data) notFound();

  const { blog, related = [], recommended = [] } = data;

  return (
    <main className="bg-[#f6f7f5] min-h-screen">

      {/* HERO */}
      <section className="max-w-5xl mx-auto pt-16 px-6">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/">Ultimate Guide</Link> {" > "}
          <Link href={`/cities/${citySlug}`}>
            {citySlug}
          </Link>{" "}
          {" > "}
          <span className="text-gray-800">
            {categorySlug}
          </span>
        </div>

        {/* Image */}
        <div className="relative w-full h-[480px] rounded-3xl overflow-hidden mb-10">
          <Image
            src={blog.coverImage || "/placeholder.jpg"}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Category */}
        <p className="text-xs uppercase tracking-widest text-gray-500 mb-3">
          {categorySlug.replace("-", " ")}
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
          {blog.title}
        </h1>

        {/* Content */}
        <div
          className="rich-text prose-lg max-w-none prose-headings:font-semibold prose-a:text-emerald-600"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </section>

      {/* RECOMMENDED */}
      {recommended.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-2xl font-semibold mb-10">
            Recommended Reads
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {recommended.map((item: any) => (
              <Link
                key={item._id}
                href={`/cities/${citySlug}/${categorySlug}/${item.slug}`}
                className="group"
              >
                <div className="relative h-56 rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="font-medium group-hover:text-emerald-600 transition">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* RELATED */}
      {related.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="text-xl font-semibold mb-6">
            Related Topics
          </h2>

          <div className="flex flex-wrap gap-3">
            {related.map((item: any) => (
              <Link
                key={item._id}
                href={`/cities/${citySlug}/${categorySlug}/${item.slug}`}
                className="px-4 py-2 rounded-full bg-white shadow-sm text-sm hover:bg-emerald-50 transition"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}