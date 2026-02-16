import { notFound } from "next/navigation";
import Link from "next/link";
import BlogImageCollage from "@/components/user/blog/BlogImageCollage";

/* ================= TYPES ================= */

type Props = {
  params: Promise<{
    citySlug: string;
    categorySlug: string;
    blogSlug: string;
  }>;
};

/* ================= FETCH BLOG ================= */

async function getBlog(
  citySlug: string,
  categorySlug: string,
  blogSlug: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cities/${citySlug}/${categorySlug}/${blogSlug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* ================= SEO ================= */

export async function generateMetadata({ params }: Props) {
  const { citySlug, categorySlug, blogSlug } = await params;

  const data = await getBlog(citySlug, categorySlug, blogSlug);

  if (!data?.blog) return {};

  const blog = data.blog;

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      images: blog.ogImage
        ? [blog.ogImage]
        : blog.coverImage
        ? [blog.coverImage]
        : [],
    },
  };
}

/* ================= PAGE ================= */

export default async function BlogDetailPage({ params }: Props) {
  const { citySlug, categorySlug, blogSlug } = await params;

  const data = await getBlog(citySlug, categorySlug, blogSlug);

  if (!data?.blog) return notFound();

  const blog = data.blog;

  const images =
    blog.gallery?.length > 0
      ? blog.gallery
      : blog.coverImage
      ? [blog.coverImage]
      : [];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        <div className="text-sm text-gray-500 mb-6 capitalize">
          <Link
            href={`/cities/${citySlug}`}
            className="hover:text-black transition"
          >
            {citySlug}
          </Link>{" "}
          /{" "}
          <Link
            href={`/cities/${citySlug}/${categorySlug}`}
            className="hover:text-black transition"
          >
            {categorySlug}
          </Link>{" "}
          / {blog.title}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          {blog.title}
        </h1>

        {images.length > 0 && (
          <BlogImageCollage images={images} />
        )}

        <article
          className="prose prose-lg max-w-none mt-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </main>
  );
}
