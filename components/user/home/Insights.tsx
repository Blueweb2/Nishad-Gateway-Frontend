import BlogCardsGrid from "@/components/user/blog/BlogCardsGrid";

type BlogResponse = {
  _id: string;
  title: string;
  slug: string;
  coverImage?: {
    url: string;
  };
  tags?: string[];
  publishedAt?: string;
};

async function getBlogs() {
  const res = await fetch(
    `${process.env.API_URL}/blogs?page=1&limit=3`,
    { next: { revalidate: 60 } } // better than no-store
  );

  if (!res.ok) return [];

  const result = await res.json();

  return result.data || [];
}

export default async function Insights() {
  const blogs: BlogResponse[] = await getBlogs();

  const mapped = blogs.map((blog) => ({
    id: blog.slug,
    image: blog.coverImage?.url || "/placeholder.jpg",
    title: blog.title,
    tags: blog.tags?.slice(0, 2) || [],
    date: blog.publishedAt
      ? new Date(blog.publishedAt).toLocaleDateString()
      : "",
  }));

  return (
    <BlogCardsGrid
      blogs={mapped}
      limit={3}
      data-navbar="light"
      data-menu="dark-text"
    />
  );
}