"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove
} from "@dnd-kit/sortable";

import BlockRenderer from "./BlockRenderer";

export default function BlocksEditor() {

  const [blocks, setBlocks] = useState<any[]>([]);

  const addBlock = (type: string) => {

    if (type === "content")
      setBlocks([...blocks, { id: Date.now(), type: "content", content: "" }]);

    if (type === "slider")
      setBlocks([...blocks, { id: Date.now(), type: "slider", slides: [] }]);

    if (type === "cards")
      setBlocks([...blocks, { id: Date.now(), type: "cards", cards: [] }]);
  };

  const handleDragEnd = (event: any) => {

    const { active, over } = event;

    if (active.id !== over.id) {

      const oldIndex = blocks.findIndex(b => b.id === active.id);
      const newIndex = blocks.findIndex(b => b.id === over.id);

      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    }
  };

  return (
    <div className="space-y-6">

      {/* Add Buttons */}

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

      </div>

      {/* Blocks */}

      {/* <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >

        <SortableContext
          items={blocks}
          strategy={verticalListSortingStrategy}
        >

          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              blocks={blocks}
              setBlocks={setBlocks}
            />
          ))}

        </SortableContext>

      </DndContext> */}

    </div>
  );
}