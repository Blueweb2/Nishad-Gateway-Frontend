import Image from "next/image";

interface Props {
  index: number;
  title: string;
  description: string;
  image: string;
}

export default function SectorSliderCard({
  index,
  title,
  description,
  image,
}: Props) {
  return (
    <div className="min-w-[600px] bg-white rounded-[40px] p-10 text-black flex justify-between items-center">

      {/* Left Content */}
      <div className="max-w-xs">
        <p className="text-sm text-gray-400 mb-6">
          {String(index + 1).padStart(2, "0")} /
        </p>

        <h3 className="text-2xl font-semibold mb-4">
          {title}
        </h3>

        <p className="text-sm text-gray-600 leading-6">
          {description}
        </p>
      </div>

      {/* Right Image */}
      <div className="relative w-[260px] h-[300px] rounded-[30px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}