import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

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

                    <div className="flex flex-wrap gap-x-6 gap-y-4 text-sm text-gray-700">
                        {categories.map((cat, index) => (
                            <div key={cat.slug} className="flex items-center gap-4">

                                <Link
                                    href={`/cities/${citySlug}/${cat.slug}`}
                                    className="relative pb-1 border-b border-gray-300 hover:border-black hover:text-black transition-all duration-300"
                                >
                                    {cat.name}
                                </Link>

                                {/* Arrow separator (except last) */}
                                {index !== categories.length - 1 && (
                                    <span className="text-gray-400 text-xs">→</span>
                                )}

                            </div>
                        ))}
                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div
                    className="rich-text text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(introText),
                    }}
                />



            </div>
        </section>
    );
}
