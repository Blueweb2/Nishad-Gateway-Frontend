"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";
import { cloudinaryAutoWebp } from "@/lib/utils/cloudinary";

interface Props {
  data: any;
  onChange: (data: any) => void;
}

export default function IndustriesBlockEditor({ data, onChange }: Props) {

  const updateItem = (index: number, updatedItem: any) => {
    const updated = [...data.items];
    updated[index] = updatedItem;
    onChange({ ...data, items: updated });
  };

  const addItem = () => {
    onChange({
      ...data,
      items: [
        ...data.items,
        { title: "", description: "", image: "" },
      ],
    });
  };

  const handleImageUpload = async (file: File, index: number) => {
    try {
      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/sectors/industries"
      );

      const imageUrl = cloudinaryAutoWebp(uploaded.secure_url);

      updateItem(index, {
        ...data.items[index],
        image: imageUrl,
        imagePublicId: uploaded.public_id,
      });

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="space-y-6 border border-gray-700 p-6 rounded-lg">

      <input
        placeholder="Section Label (01 | 05)"
        value={data.sectionLabel}
        onChange={(e) =>
          onChange({ ...data, sectionLabel: e.target.value })
        }
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      <input
        placeholder="Section Title"
        value={data.title}
        onChange={(e) =>
          onChange({ ...data, title: e.target.value })
        }
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      <textarea
        placeholder="Section Description"
        value={data.description}
        onChange={(e) =>
          onChange({ ...data, description: e.target.value })
        }
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      {/* Items */}
      {data.items.map((item: any, index: number) => (
        <div
          key={index}
          className="border border-gray-600 p-4 rounded space-y-3"
        >
          <input
            placeholder="Card Title"
            value={item.title}
            onChange={(e) =>
              updateItem(index, {
                ...item,
                title: e.target.value,
              })
            }
            className="w-full p-2 bg-[#111] border border-gray-700 rounded"
          />

          <textarea
            placeholder="Card Description"
            value={item.description}
            onChange={(e) =>
              updateItem(index, {
                ...item,
                description: e.target.value,
              })
            }
            className="w-full p-2 bg-[#111] border border-gray-700 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file, index);
            }}
            className="w-full"
          />

          {item.image && (
            <img
              src={item.image}
              className="h-32 rounded object-cover"
            />
          )}
        </div>
      ))}

      <button
        onClick={addItem}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        + Add Card
      </button>

    </div>
  );
}