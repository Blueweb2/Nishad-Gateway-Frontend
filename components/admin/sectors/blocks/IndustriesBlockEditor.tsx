"use client";

import ImagePicker from "../common/ImagePicker";

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
        {
          title: "",
          description: "",
          image: "",
          imagePublicId: "",
          imageAlt: "",
        },
      ],
    });
  };

  const removeItem = (index: number) => {
    const updated = data.items.filter((_: any, i: number) => i !== index);
    onChange({ ...data, items: updated });
  };

  const moveItemUp = (index: number) => {
    if (index === 0) return;
    const updated = [...data.items];
    [updated[index - 1], updated[index]] = [
      updated[index],
      updated[index - 1],
    ];
    onChange({ ...data, items: updated });
  };

  const moveItemDown = (index: number) => {
    if (index === data.items.length - 1) return;
    const updated = [...data.items];
    [updated[index + 1], updated[index]] = [
      updated[index],
      updated[index + 1],
    ];
    onChange({ ...data, items: updated });
  };

  return (
    <div className="space-y-6 border border-gray-700 p-6 rounded-lg">

      {/* Section Title */}
      <input
        placeholder="Section Title"
        value={data.title || ""}
        onChange={(e) =>
          onChange({ ...data, title: e.target.value })
        }
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      {/* Section Description */}
      <textarea
        placeholder="Section Description"
        value={data.description || ""}
        onChange={(e) =>
          onChange({ ...data, description: e.target.value })
        }
        className="w-full p-3 bg-[#111] border border-gray-700 rounded"
      />

      {/* Cards */}
      {data.items.map((item: any, index: number) => (
        <div
          key={index}
          className="border border-gray-600 p-4 rounded space-y-3 bg-[#0f0f0f]"
        >
          {/* Counter */}
          <div className="text-xs text-gray-400">
            Card {index + 1} of {data.items.length}
          </div>

          {/* Controls */}
          <div className="flex gap-2 text-xs">
            <button
              onClick={() => moveItemUp(index)}
              className="text-blue-400"
            >
              ↑ Move Up
            </button>

            <button
              onClick={() => moveItemDown(index)}
              className="text-blue-400"
            >
              ↓ Move Down
            </button>

            <button
              onClick={() => removeItem(index)}
              className="text-red-400"
            >
              Remove
            </button>
          </div>

          {/* Title */}
          <input
            placeholder="Card Title"
            value={item.title || ""}
            onChange={(e) =>
              updateItem(index, {
                ...item,
                title: e.target.value,
              })
            }
            className="w-full p-2 bg-[#111] border border-gray-700 rounded"
          />

          {/* Description */}
          <textarea
            placeholder="Card Description"
            value={item.description || ""}
            onChange={(e) =>
              updateItem(index, {
                ...item,
                description: e.target.value,
              })
            }
            className="w-full p-2 bg-[#111] border border-gray-700 rounded"
          />

          {/* ✅ IMAGE PICKER */}
          <div className="space-y-2">
            <p className="text-xs text-white/60">Card Image</p>

            <ImagePicker
              folder="nishad-gateway/subservices"
              value={
                item.image
                  ? {
                      url: item.image,
                      alt: item.imageAlt || "",
                      publicId: item.imagePublicId,
                    }
                  : null
              }
              onChange={(val) => {
                updateItem(index, {
                  ...item,
                  image: val?.url ?? "",
                  imagePublicId: val?.publicId ?? "",
                  imageAlt:
                    val?.alt ||
                    item.title ||
                    "Industry image",
                });
              }}
            />

            {/* ALT WARNING */}
            {!item.imageAlt && item.image && (
              <p className="text-xs text-yellow-400">
                ⚠️ Missing alt text
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Add Button */}
      <button
        onClick={addItem}
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        + Add Card
      </button>

    </div>
  );
}