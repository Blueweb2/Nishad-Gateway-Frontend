"use client";

import ContentBlockEditor from "./ContentBlockEditor";
import SliderBlockEditor from "./SliderBlockEditor";
import CardsBlockEditor from "./CardsBlockEditor";
import FAQBlockEditor from "./FAQBlockEditor";
import SortableBlock from "./SortableBlock";

import { MinistryBlock } from "@/lib/types/ministry";

type Props = {
  block: MinistryBlock;
  index: number;
  blocks: MinistryBlock[];
  setBlocks: React.Dispatch<React.SetStateAction<MinistryBlock[]>>;
};

export default function BlockRenderer({
  block,
  index,
  blocks,
  setBlocks,
}: Props) {

  const deleteBlock = () => {
    const updated = blocks.filter((_, i) => i !== index);
    setBlocks(updated);
  };

  const renderBlock = () => {

    if (block.type === "content") {
      return (
        <ContentBlockEditor
          block={block}
          index={index}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      );
    }

    if (block.type === "slider") {
      return (
        <SliderBlockEditor
          block={block}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      );
    }

    if (block.type === "cards") {
      return (
        <CardsBlockEditor
          block={block}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      );
    }

    if (block.type === "faq") {
      return (
        <FAQBlockEditor
          block={block}
          blocks={blocks}
          setBlocks={setBlocks}
        />
      );
    }

    return null;
  };

  return (
    <SortableBlock
      id={block.id}
      blockType={block.type}
      onDelete={deleteBlock}
    >
      {renderBlock()}
    </SortableBlock>
  );
}