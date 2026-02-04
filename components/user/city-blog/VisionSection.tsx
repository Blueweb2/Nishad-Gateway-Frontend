import DOMPurify from "isomorphic-dompurify";

type Props = {
  heading: string;
  content: string;
  imageUrl: string;
};

export default function VisionSection({
  heading,
  content,
  imageUrl,
}: Props) {
  return (
    <section className="bg-black py-24 text-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
            {heading}
          </h2>

          <div
            className="rich-text text-gray-300 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}
          />
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={imageUrl}
              alt="Vision Image"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
