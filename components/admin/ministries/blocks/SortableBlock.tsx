"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2, Pencil } from "lucide-react";

export default function SortableBlock({
  id,
  children,
  onDelete,
  blockType,
}: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-green-700/30 rounded-xl bg-[#0b0f0b]"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-700/20">

        <div className="flex items-center gap-3">

          {/* DRAG HANDLE */}
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-gray-400 hover:text-green-400"
          >
            <GripVertical size={18} />
          </button>

          <span className="text-sm text-green-300 font-medium capitalize">
            {blockType} Block
          </span>
        </div>

        <div className="flex items-center gap-3">

          {/* EDIT ICON */}
          <button className="text-gray-400 hover:text-green-400">
            <Pencil size={16} />
          </button>

          {/* DELETE */}
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-400"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

      {/* BLOCK CONTENT */}
      <div className="p-5">{children}</div>
    </div>
  );
}