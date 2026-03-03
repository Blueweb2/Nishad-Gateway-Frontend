"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateSectorAdmin } from "@/lib/api/admin/sectors.api";

import HeroBlockEditor from "./blocks/HeroBlockEditor";
import RichContentBlockEditor from "./blocks/RichContentBlockEditor";
import IndustriesBlockEditor from "./blocks/IndustriesBlockEditor";

import {
  SectorBlock,
  getDefaultSectorBlock,
} from "@/lib/types/sector.types";

interface Props {
  initialBlocks: SectorBlock[];
  sectorId: string;
}

export default function SectorBlocksEditor({
  initialBlocks,
  sectorId,
}: Props) {
  const [blocks, setBlocks] = useState<SectorBlock[]>(
    initialBlocks || []
  );
  const [saving, setSaving] = useState(false);

  /* ================= UPDATE BLOCK ================= */
  const updateBlock = (index: number, updatedData: any) => {
    setBlocks((prev) =>
      prev.map((block, i) =>
        i === index ? { ...block, data: updatedData } : block
      )
    );
  };

  /* ================= REMOVE BLOCK ================= */
  const removeBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  /* ================= ADD BLOCK ================= */
  const addBlock = (type: SectorBlock["type"]) => {
    setBlocks((prev) => [...prev, getDefaultSectorBlock(type)]);
  };

  /* ================= SAVE ================= */
  const saveBlocks = async () => {
    try {
      setSaving(true);
      await updateSectorAdmin(sectorId, { blocks });
      toast.success("Blocks updated successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to update blocks");
    } finally {
      setSaving(false);
    }
  };

  /* ================= BLOCK RENDER MAP ================= */
 const blockRenderers: Partial<
  Record<SectorBlock["type"], React.FC<any>>
> = {
    hero: HeroBlockEditor,
    richContent: RichContentBlockEditor,
    industries: IndustriesBlockEditor,
  };

  return (
    <div className="space-y-8">
      {blocks.map((block, index) => {
const BlockComponent = blockRenderers[block.type];

if (!BlockComponent) return null;
        return (
          <div
            key={index}
            className="border border-gray-700 rounded-lg p-6 space-y-4 bg-[#111]"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="text-sm uppercase tracking-wide text-gray-400">
                {index + 1}. {block.type} Block
              </h3>

              <button
                onClick={() => removeBlock(index)}
                className="text-red-400 text-xs hover:text-red-500"
              >
                Remove
              </button>
            </div>

            {/* Dynamic Block */}
            <BlockComponent
              data={block.data}
              onChange={(updatedData: any) =>
                updateBlock(index, updatedData)
              }
            />
          </div>
        );
      })}

      {/* ADD BUTTONS */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => addBlock("hero")}
          className="bg-blue-600 px-4 py-2 rounded text-white"
        >
          + Add Hero
        </button>

        <button
          onClick={() => addBlock("richContent")}
          className="bg-purple-600 px-4 py-2 rounded text-white"
        >
          + Add Rich Content
        </button>

        <button
          onClick={() => addBlock("industries")}
          className="bg-indigo-600 px-4 py-2 rounded text-white"
        >
          + Add Industries Section
        </button>
      </div>

      {/* SAVE */}
      <div>
        <button
          onClick={saveBlocks}
          disabled={saving}
          className="bg-green-600 px-6 py-3 rounded text-white"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}