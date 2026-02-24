import Link from "next/link";
import Image from "next/image";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: {
    url: string;
    alt: string;
  };
  publishedAt: string;
};

type BlogListResponse = {
  data: Blog[];
  total: number;
  page: number;
  totalPages: number;
};

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=1&limit=9`,
    {
      cache: "no-store", // ISR
    }
  );

  if (!res.ok) return [];

  const result: BlogListResponse = await res.json();

  return result.data || [];
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="max-w-6xl mx-auto px-4 py-32" data-navbar="light">
      <h1 className="text-4xl font-semibold mb-12">
        Blog
      </h1>

      {blogs.length === 0 && (
        <p className="text-gray-500">
          No blogs available.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog._id}
            href={`/blogs/${blog.slug}`}
            className="group"
          >
            <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
              <div className="relative h-60">
                <Image
                  src={cloudinaryAutoWebp(
                    blog.coverImage.url
                  )}
                  alt={
                    blog.coverImage.alt ||
                    blog.title
                  }
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3">
                  {blog.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-3">
                  {blog.excerpt}
                </p>

                <p className="text-xs text-gray-400 mt-4">
                  {new Date(
                    blog.publishedAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}