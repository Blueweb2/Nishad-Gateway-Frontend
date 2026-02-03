import Link from "next/link";

type Props = {
  citySlug: string;
  heading: string;
  introText: string;
  categories: {
    name: string;
    slug: string;
  }[];
};

export default function CategoriesSection({
  citySlug,
  heading,
  introText,
  categories,
}: Props) {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            {heading}
          </h2>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/cities/${citySlug}/${cat.slug}`}
                className="hover:text-black transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="text-gray-600 leading-relaxed">
          {introText}
        </div>

      </div>
    </section>
  );
}
