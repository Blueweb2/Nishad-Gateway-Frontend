"use client";

interface Props {
  content: string;
}

export default function SectorIntro({ content }: Props) {
  const cleanedContent = content.replace(/<p><\/p>/g, "");
  return (
    <section className="bg-white py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div
className="rich-text  text-gray-700 leading-relaxed"
dangerouslySetInnerHTML={{ __html: cleanedContent }}        />

      </div>
    </section>
  );
}