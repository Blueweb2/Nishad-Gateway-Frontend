import dynamic from "next/dynamic";
import { MinistryBlock } from "@/lib/types/ministry";

const ContentBlock = dynamic(() => import("./ContentBlock"), {
  loading: () => <p>Loading ContentBlock</p>,
});

const SliderBlock = dynamic(() => import("./SliderBlock"), {
  loading: () => <p>Loading SliderBlock</p>,
});

const CardsBlock = dynamic(() => import("./CardsBlock"), {
  loading: () => <p>Loading CardsBlock</p>,
});

const FAQBlock = dynamic(() => import("./FAQBlock"), {
  loading: () => <p>Loading FAQBlock</p>,
});

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