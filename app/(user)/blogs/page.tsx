import dynamic from "next/dynamic";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";
import Loading from "./loading";

const BlogCardsGrid = dynamic(
  () => import("@/components/user/blog/BlogCardsGrid"),
  { loading: () => <Loading /> }
);

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
    `${process.env.API_URL}/blogs?page=1&limit=100`,
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

  if (!blogs.length) {
    return (
      <main className="max-w-8xl mx-auto py-28 bg-white">
        <p className="text-gray-500 px-8">No blogs available.</p>
      </main>
    );
  }

  const heroBlog = blogs[0]; // ⭐ first blog as hero
  const restBlogs = blogs.slice(1); // remaining blogs

  const mapped = restBlogs.map((blog) => ({
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
      <h1 className="text-3xl sm:text-4xl md:text-5xl px-8 mb-3 lg:mb-20 font-semibold">
        Blogs
      </h1>

      {/* HERO BLOG */}
      <div className="px-8 mb-12">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={
              heroBlog.coverImage?.url
                ? cloudinaryAutoWebp(heroBlog.coverImage.url)
                : "/placeholder.jpg"
            }
            className="w-full h-[660px] object-cover"
          />

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-10 text-white">
            <p className="text-sm mb-2">
              {heroBlog.publishedAt
                ? new Date(heroBlog.publishedAt).toLocaleDateString()
                : ""}
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold max-w-xl">
              {heroBlog.title}
            </h2>
          </div>
        </div>
      </div>

      {/* BLOG GRID */}
      <BlogCardsGrid blogs={mapped} />
    </main>
  );
}