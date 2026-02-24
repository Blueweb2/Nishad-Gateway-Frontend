import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: {
    url: string;
    alt: string;
  };
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
};

type BlogListResponse = {
  data: Blog[];
  total: number;
  page: number;
  totalPages: number;
};

/* ================= FETCH SINGLE BLOG ================= */

async function getBlog(slug: string): Promise<Blog | null> {
  const res = await fetch(
    `${process.env.API_URL}/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

/* ================= FETCH RELATED BLOGS ================= */

async function getRelated(tags: string[], currentId: string) {
  const res = await fetch(
    `${process.env.API_URL}/blogs?page=1&limit=20`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const result: BlogListResponse = await res.json();
  const blogs = result.data;

  return blogs
    .filter(
      (b) =>
        b._id !== currentId &&
        b.tags?.some((tag) => tags.includes(tag))
    )
    .slice(0, 3);
}

/* ================= METADATA ================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;   // ✅ FIX

  const blog = await getBlog(slug);

  if (!blog) return {};

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
  };
}

/* ================= PAGE ================= */

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;   // ✅ FIX

  const blog = await getBlog(slug);

  if (!blog) return notFound();

  const related = await getRelated(
    blog.tags,
    blog._id
  );

  return (
    <main className="max-w-8xl mx-auto px-6 py-28 bg-white " data-navbar="light">
      <div className="relative h-[800px] rounded-2xl overflow-hidden mb-12">
        <Image
          src={blog.coverImage.url}
          alt={blog.coverImage.alt || blog.title}
          fill
          priority
          className="object-fit-cover"
        />
      </div>

      <h1 className="text-4xl font-semibold mb-6">
        {blog.title}
      </h1>

      <p className="text-gray-600 mb-8">
        {blog.excerpt}
      </p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
            Related Topics
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link key={item._id} href={`/blogs/${item.slug}`}>
                <div className="border rounded-xl overflow-hidden hover:shadow-md transition">
                  <div className="relative h-40">
                    <Image
                      src={item.coverImage.url}
                      alt={item.coverImage.alt || item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}