"use client";

import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

import BlockRenderer from "./BlockRenderer";
import toast from "react-hot-toast";

import { MinistryBlock } from "@/lib/types/ministry";

type Props = {
  ministryId: string;
};

export default function BlocksEditor({ ministryId }: Props) {
  const [blocks, setBlocks] = useState<MinistryBlock[]>([]);

  const addBlock = (type: string) => {
    if (type === "content") {
      setBlocks([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "content",
          content: "",
        },
      ]);
    }

    if (type === "slider") {
      setBlocks([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "slider",
          slides: [],
        },
      ]);
    }

    if (type === "cards") {
      setBlocks([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "cards",
          heading: "",
          subText: "",
          bottomText: "",
          cards: [],
        },
      ]);
    }

    if (type === "faq") {
      setBlocks([
        ...blocks,
        {
          id: Date.now().toString(),
          type: "faq",
          faqImage: "",
          faqImageAlt: "",
          faqs: [],
        },
      ]);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);

    setBlocks(arrayMove(blocks, oldIndex, newIndex));
  };

  const saveBlocks = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ministries/${ministryId}`,
        {
          method: "PUT", // ✅ must be PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blocks }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Blocks saved");
    } catch {
      toast.error("Failed to save blocks");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-3">
        <button onClick={() => addBlock("content")} className="btn">
          + Content
        </button>

        <button onClick={() => addBlock("slider")} className="btn">
          + Slider
        </button>

        <button onClick={() => addBlock("cards")} className="btn">
          + Cards
        </button>

        <button onClick={() => addBlock("faq")} className="btn">
          + FAQ
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={blocks.map((b) => b.id)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block, index) => (
            <BlockRenderer
              key={block.id}
              block={block}
              index={index}
              blocks={blocks}
              setBlocks={setBlocks}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        onClick={saveBlocks}
        className="px-5 py-2 bg-green-600 rounded-lg"
      >
        Save Blocks
      </button>
    </div>
  );
}