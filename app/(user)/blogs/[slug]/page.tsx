import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

/* ================= TYPES ================= */

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "image"; url: string; alt: string }
  | { type: "table"; headers: string[]; rows: string[][] };

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
      next: { revalidate: 60 }, // ISR
    }
  );

  if (!res.ok) return null;

  return res.json();
}

/* ================= FETCH RELATED ================= */

async function getRelated(
  tags: string[],
  currentId: string
) {
  const res = await fetch(
    `${process.env.API_URL}/blogs?page=1&limit=20`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return [];

  const result: BlogListResponse =
    await res.json();

  return result.data
    .filter(
      (b) =>
        b._id !== currentId &&
        b.tags?.some((tag) =>
          tags.includes(tag)
        )
    )
    .slice(0, 3);
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

function renderBlock(
  block: Block | undefined,
  index: number
) {
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
        <p
          key={index}
          className="text-gray-700 leading-relaxed mb-6"
        >
          {block.text}
        </p>
      );

    case "image":
      return (
        <div
          key={index}
          className="relative w-full h-[500px] my-10 rounded-2xl overflow-hidden"
        >
          <Image
            src={block.url || "/placeholder.jpg"}
            alt={block.alt || ""}
            fill
            className="object-cover"
          />
        </div>
      );

    case "table":
      return (
        <div
          key={index}
          className="overflow-x-auto my-10"
        >
          <table className="w-full border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead>
              <tr>
                {block.headers?.map(
                  (header, i) => (
                    <th
                      key={i}
                      className="bg-black text-white px-5 py-4 text-sm tracking-wide text-left"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {block.rows?.map((row, r) => (
                <tr
                  key={r}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="px-5 py-4 text-gray-700"
                    >
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

  const related = await getRelated(
    blog.tags,
    blog._id
  );

  const coverImageUrl =
    blog.coverImage?.url || "/placeholder.jpg";

  return (
    <main
      className="max-w-4xl mx-auto px-6 py-28 bg-white"
      data-navbar="light"
    >
      {/* COVER IMAGE */}
      <div className="relative h-[600px] rounded-2xl overflow-hidden mb-12">
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

      {/* TITLE */}
      <h1 className="text-4xl font-semibold mb-6">
        {blog.title}
      </h1>

      {/* EXCERPT */}
      <p className="text-gray-600 mb-10">
        {blog.excerpt}
      </p>

      {/* BLOCK CONTENT */}
      <div>
        {blog.blocks?.map((blockObj, i) =>
          renderBlock(blockObj?.data, i)
        )}
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-semibold mb-8">
            Related Topics
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {related.map((item) => (
              <Link
                key={item._id}
                href={`/blogs/${item.slug}`}
              >
                <div className="border rounded-xl overflow-hidden hover:shadow-md transition">
                  <div className="relative h-40">
                    <Image
                      src={
                        item.coverImage?.url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        item.coverImage?.alt ||
                        item.title
                      }
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