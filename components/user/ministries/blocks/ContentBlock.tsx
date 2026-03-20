import { ContentBlock as ContentBlockType } from "@/lib/types/ministry";

type Props = {
  block: ContentBlockType;
};

export default function ContentBlock({ block }: Props) {

  return (
    <div
      className="rich-text-light max-w-6xl mx-auto px-6"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );

}