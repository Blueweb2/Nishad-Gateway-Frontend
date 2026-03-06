import { MinistryBlock } from "@/lib/types/ministry";

import ContentBlock from "./ContentBlock";
import SliderBlock from "./SliderBlock";
import CardsBlock from "./CardsBlock";
import FAQBlock from "./FAQBlock";

type Props = {
  block: MinistryBlock;
};

export default function BlockRenderer({ block }: Props) {

  switch (block.type) {

    case "content":
      return <ContentBlock block={block} />;

    case "slider":
      return <SliderBlock block={block} />;

    case "cards":
      return <CardsBlock block={block} />;

    case "faq":
      return <FAQBlock block={block} />;

    default:
      return null;
  }

}