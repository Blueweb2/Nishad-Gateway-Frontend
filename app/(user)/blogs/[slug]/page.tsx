import BlogCardsGrid from "@/components/user/blog/BlogCardsGrid";
import BlogShare from "@/components/user/blog/BlogShare";
import NewsletterSection from "@/components/user/shared/NewsletterSection";
import Image from "next/image";
import { notFound } from "next/navigation";

/* ================= TYPES ================= */

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "list"; style: "unordered" | "ordered"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "gallery"; images: { url: string; alt?: string }[] };

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;

  blocks: {
    type: string;
    data: Block;
  }[];

  coverImage?: {
    url: string;
    alt?: string;
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

async function getBlog(
  slug: string
): Promise<Blog | null> {
  const res = await fetch(
    `${process.env.API_URL}/blogs/${slug}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;

  const result = await res.json();
  return result.data ?? null;
}

/* ================= FETCH RELATED ================= */

async function getRelated(slug: string) {
  const res = await fetch(
    `${process.env.API_URL}/blogs/${slug}/related`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return [];

  const result = await res.json();
  return result.data ?? [];
}

/* ================= METADATA ================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) return {};

  return {
    title: blog.metaTitle || blog.title,
    description:
      blog.metaDescription || blog.excerpt,
  };
}

/* ================= BLOCK RENDERER ================= */
function renderBlock(block: Block | undefined, index: number) {
  if (!block) return null;

  switch (block.type) {
    case "heading":
      if (block.level === 1)
        return (
          <h1 key={index} className="text-4xl font-semibold my-6">
            {block.text}
          </h1>
        );

      if (block.level === 2)
        return (
          <h2 key={index} className="text-2xl font-semibold my-5">
            {block.text}
          </h2>
        );

      return (
        <h3 key={index} className="text-xl font-semibold my-4">
          {block.text}
        </h3>
      );
    case "paragraph":
      return (
        <div
          key={index}
          className="rich-text max-w-none prose-gray mb-8"
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case "image":
      return (
        <div key={index} className="relative w-full h-[500px] my-10 rounded-2xl overflow-hidden">
          <Image
            src={block.url || "/placeholder.jpg"}
            alt={block.alt || ""}
            fill
            className="object-cover"
          />
        </div>
      );

    case "gallery":
      return (
        <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
          {block.images.map((img, i) => (
            <div key={i} className="relative h-80 rounded-2xl overflow-hidden">
              <Image
                src={img.url}
                alt={img.alt || ""}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );

    case "list":
      if (block.style === "ordered") {
        return (
          <ol key={index} className="list-decimal pl-6 my-6 space-y-2 text-gray-700">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }

      return (
        <ul key={index} className="list-disc pl-6 my-6 space-y-2 text-gray-700">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div key={index} className="overflow-x-auto my-10">
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr>
                {block.headers?.map((header, i) => (
                  <th
                    key={i}
                    className="bg-black text-white px-5 py-4 text-sm tracking-wide text-left"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {block.rows?.map((row, r) => (
                <tr key={r} className="border-b last:border-0 hover:bg-gray-50">
                  {row.map((cell, c) => (
                    <td key={c} className="px-5 py-4 text-gray-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}

/* ================= PAGE ================= */

export default async function SingleBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) return notFound();

  const related = await getRelated(slug);

  const coverImageUrl =
    blog.coverImage?.url || "/placeholder.jpg";

  return (
    <main
      className="max-w-8xl mx-auto px-6 py-28 bg-white"
      data-navbar="light" data-menu="light"
    >

      {/* COVER IMAGE */}
      <div className="flex items-center justify-center">
        <div className="relative h-[450px] w-[1000px] rounded-2xl overflow-hidden mb-12">
          <Image
            src={coverImageUrl}
            alt={
              blog.coverImage?.alt ||
              blog.title
            }
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>

      <div className="lg:px-40 xl:px-60 flex flex-col lg:flex-row gap-10">

        {/* SHARE SECTION */}
        <div className="lg:w-[120px]">
          <BlogShare title={blog.title} />
        </div>

        <div className="flex-1">
          
          {/* TITLE */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
            {blog.title}
          </h1>

          {/* EXCERPT */}
          <div
            className="rich-text max-w-none prose-gray mb-10"
            dangerouslySetInnerHTML={{ __html: blog.excerpt }}
          />

          {/* BLOCK CONTENT */}
          <div>
            {blog.blocks?.map((blockObj, i) =>
              renderBlock(blockObj?.data, i)
            )}
          </div>
        </div>

      </div>

      {/* RELATED */}
      {Array.isArray(related) && related.length > 0 && (
        <div
          className="mt-32"
          data-navbar="light"
          data-menu="dark-text"
        >
          <h2 className="text-3xl font-semibold mb-14">
            Related Insights
          </h2>

          <BlogCardsGrid
            blogs={related.map((item) => ({
              id: item.slug,
              image:
                item.coverImage?.url ||
                "/placeholder.jpg",
              title: item.title,
              tags: item.tags?.slice(0, 2) ?? [],
            }))}
          />
        </div>
      )}

    </main>
  );
}