import { notFound } from "next/navigation";
import Link from "next/link";
import BlogImageCollage from "@/components/user/blog/BlogImageCollage";

type Props = {
  params: {
    citySlug: string;
    categorySlug: string;
    blogSlug: string;
  };
};

/* ================= FETCH BLOG ================= */

async function getBlog(
  citySlug: string,
  categorySlug: string,
  blogSlug: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/public/cities/${citySlug}/${categorySlug}/${blogSlug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

/* ================= SEO ================= */

export async function generateMetadata({ params }: Props) {
  const data = await getBlog(
    params.citySlug,
    params.categorySlug,
    params.blogSlug
  );

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
  const data = await getBlog(
    params.citySlug,
    params.categorySlug,
    params.blogSlug
  );

  if (!data?.blog) return notFound();

  const blog = data.blog;

  // Prepare images safely
  const images =
    blog.gallery?.length > 0
      ? blog.gallery
      : blog.coverImage
      ? [blog.coverImage]
      : [];

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 capitalize">
          <Link
            href={`/cities/${params.citySlug}`}
            className="hover:text-black transition"
          >
            {params.citySlug}
          </Link>{" "}
          /{" "}
          <Link
            href={`/cities/${params.citySlug}/${params.categorySlug}`}
            className="hover:text-black transition"
          >
            {params.categorySlug}
          </Link>{" "}
          / {blog.title}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-10">
          {blog.title}
        </h1>

        {/* Image Collage */}
        {images.length > 0 && (
          <BlogImageCollage images={images} />
        )}

        {/* Article Content */}
        <article
          className="prose prose-lg max-w-none mt-12"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

      </div>
    </main>
  );
}
