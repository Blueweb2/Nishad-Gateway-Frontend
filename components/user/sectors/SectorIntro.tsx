"use client";

interface Props {
  content: string;
}

export default function SectorIntro({ content }: Props) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div
          className="
            rich-text fade-up
            text-gray-700
            space-y-6
            leading-tight
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />

      </div>
    </section>
  );
}