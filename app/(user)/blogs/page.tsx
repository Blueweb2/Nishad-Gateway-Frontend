import BlogCardsGrid from "@/components/user/blog/BlogCardsGrid";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

/* ================= TYPES ================= */

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: {
    url: string;
    alt?: string;
  };
  tags?: string[];
  publishedAt?: string;
};

type BlogListResponse = {
  data: Blog[];
  total: number;
  page: number;
  totalPages: number;
};

/* ================= FETCH ================= */

async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(
    `${process.env.API_URL}/blogs?page=1&limit=9`,
    {
      next: { revalidate: 60 }, // 🔥 better than no-store
    }
  );

  if (!res.ok) return [];

  const result: BlogListResponse = await res.json();

  return result.data ?? [];
}

/* ================= PAGE ================= */

export default async function BlogsPage() {
  const blogs = await getBlogs();

  const mapped = blogs.map((blog) => ({
    id: blog.slug,
    image: blog.coverImage?.url
      ? cloudinaryAutoWebp(blog.coverImage.url)
      : "/placeholder.jpg",
    title: blog.title,
    tags: blog.tags?.slice(0, 2) || [],
    date: blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString()
      : "",
  }));

  return (
    <main
      className="max-w-8xl mx-auto py-28 bg-white"
      data-navbar="light"
      data-menu="dark-text"
    >
      <div className="px-8 mb-20">
        <h1 className="text-5xl font-semibold">
          Insights
        </h1>
      </div>

      {mapped.length === 0 ? (
        <p className="text-gray-500 px-8">
          No blogs available.
        </p>
      ) : (
        <BlogCardsGrid blogs={mapped} />
      )}
    </main>
  );
}