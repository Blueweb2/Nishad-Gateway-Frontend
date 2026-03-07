import { ContentBlock as ContentBlockType } from "@/lib/types/ministry";

type Props = {
  block: ContentBlockType;
};

export default function ContentBlock({ block }: Props) {

  return (
    <div
      className="rich-text max-w-7xl"
      dangerouslySetInnerHTML={{ __html: block.content }}
    />
  );

}