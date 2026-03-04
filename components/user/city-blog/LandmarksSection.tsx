import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LandmarksSectionContent } from "@/lib/types/city-blog";

type Props = {
  content: LandmarksSectionContent;
};

export default function LandmarksSection({ content }: Props) {
  return (
    <section className="py-[clamp(60px,8vw,120px)] bg-[#f3f3f3]">
      <div className=" grid grid-cols-1 lg:grid-cols-2 max-w-[1400px] mx-auto px-[clamp(16px,4vw,40px)] gap-[clamp(32px,6vw,80px)]">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-between">
          <h2 className="text-5xl font-semibold leading-tight max-w-md">
            {content.heading}
          </h2>

          {content.ctaText && content.ctaLink && (
            <Link
              href={content.ctaLink}
              className="mt-12 inline-flex items-center justify-center bg-green-700 text-white px-8 py-4 rounded-full hover:bg-green-600 transition w-fit"
            >
              {content.ctaText}
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div>
          {content.items.map((item, index) => {
            const hasLink = item.link && item.link.trim() !== "";

            const Wrapper: any = hasLink ? Link : "div";

            return (
              <Wrapper
                key={index}
                {...(hasLink ? { href: item.link } : {})}
                className="
                  group
                  flex
                  justify-between
                  items-start
                  gap-6
                  py-6
                  border-b
                  border-black/10
                  transition-all
                  duration-300
                  hover:bg-black/5
                "
              >
                {/* LEFT CONTENT */}
                <div className="flex gap-6">
                  {/* Number */}
                  <span className="text-sm text-black/50 mt-1">
                    {String(index + 1).padStart(2, "0")} /
                  </span>

                  {/* Text */}
                  <div>
                    <h3 className="
                      text-xl
                      font-medium
                      mb-2
                      transition-colors
                      duration-300
                      group-hover:text-emerald-600
                    ">
                      {item.title}
                    </h3>

                    {/* 🔥 RICH TEXT RENDER */}
                    <div
                      className="
                        text-sm
                        text-black/60
                        max-w-xl
                        leading-relaxed
                        prose
                        prose-sm
                        max-w-none
                      "
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                    />
                  </div>
                </div>

                {/* HOVER ARROW */}
                {hasLink && (
                  <div
                    className="
                      opacity-0
                      translate-x-2
                      transition-all
                      duration-300
                      group-hover:opacity-100
                      group-hover:translate-x-0
                    "
                  >
                    <div className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>

      </div>
    </section>
  );
}
