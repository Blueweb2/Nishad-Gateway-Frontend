"use client";

import { useEffect, useState } from "react";
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
  const [saving, setSaving] = useState(false);
   const [loading, setLoading] = useState(true);

    // ⭐ Load existing blocks
  useEffect(() => {
    const loadBlocks = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ministries/id/${ministryId}`,
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data?.data?.blocks) {
          setBlocks(data.data.blocks);
        }
      } catch {
        toast.error("Failed to load blocks");
      } finally {
        setLoading(false);
      }
    };

    loadBlocks();
  }, [ministryId]);

const addBlock = (type: string) => {
  let newBlock: MinistryBlock;

  if (type === "content") {
    newBlock = {
      id: Date.now().toString(),
      type: "content",
      content: "",
    };
  } else if (type === "slider") {
    newBlock = {
      id: Date.now().toString(),
      type: "slider",
      slides: [],
    };
  } else if (type === "cards") {
    newBlock = {
      id: Date.now().toString(),
      type: "cards",
      heading: "",
      subText: "",
      bottomText: "",
      cards: [],
    };
  } else {
    newBlock = {
      id: Date.now().toString(),
      type: "faq",
      faqImage: "",
      faqImageAlt: "",
      faqs: [],
    };
  }

  setBlocks((prev) => [...prev, newBlock]);
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
    setSaving(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/ministries/${ministryId}`,
      {
        method: "PUT",
        credentials: "include",
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
  } finally {
    setSaving(false);
  }
};

if (loading) {
  return (
    <div className="text-gray-400 text-sm">
      Loading blocks...
    </div>
  );
}
  return (
    <div className="space-y-6">
      
   
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


<button
  onClick={saveBlocks}
  disabled={saving}
  className="px-5 py-2 bg-green-600 rounded-lg"
>
  {saving ? "Saving..." : "Save Blocks"}
</button>
    </div>
  );
}