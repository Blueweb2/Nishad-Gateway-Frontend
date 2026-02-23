import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Blog = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
};

async function getBlog(slug: string): Promise<Blog | null> {
  const res = await fetch(
    `${process.env.API_URL}/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  return res.json();
}

async function getRelated(tags: string[], currentId: string) {
  const res = await fetch(
    `${process.env.API_URL}/blogs`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const blogs: Blog[] = await res.json();

  return blogs
    .filter(
      (b) =>
        b._id !== currentId &&
        b.tags?.some((tag) => tags.includes(tag))
    )
    .slice(0, 3);
}

export async function generateMetadata({ params }: any) {
  const blog = await getBlog(params.slug);

  if (!blog) return {};

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function SingleBlogPage({
  params,
}: any) {
  const blog = await getBlog(params.slug);

  if (!blog) return notFound();

  const related = await getRelated(
    blog.tags,
    blog._id
  );

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.slug}`;

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Hero Image */}
      <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
        <Image
          src={blog.coverImage}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-semibold mb-6">
        {blog.title}
      </h1>

      {/* Excerpt */}
      <p className="text-gray-600 mb-8">
        {blog.excerpt}
      </p>

      {/* Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: blog.content,
        }}
      />

      {/* Share Section */}
      <div className="mt-12 border-t pt-8">
        <p className="mb-4 font-medium">
          Share this article:
        </p>

        <div className="flex gap-4">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              blog.title + " " + shareUrl
            )}`}
            target="_blank"
          >
            WhatsApp
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}`}
            target="_blank"
          >
            X
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Related Blogs */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">
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
                      src={item.coverImage}
                      alt={item.title}
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