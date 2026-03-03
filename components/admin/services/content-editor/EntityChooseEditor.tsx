"use client";

import RichTextEditor from "@/components/admin/common/RichTextEditor";
import { EntityChooseQuestion } from "@/lib/types/entityChoose.types";

type Props = {
  entityChooseHeading: string;
  entityChooseSubheading: string;
  entityChooseQuestions: EntityChooseQuestion[];

  updateField: (name: string, value: string) => void;

  addChooseQuestion: () => void;
  updateChooseQuestion: (
    index: number,
    key: keyof EntityChooseQuestion,
    value: string
  ) => void;
  removeChooseQuestion: (index: number) => void;
};

export default function EntityChooseEditor({
  entityChooseHeading,
  entityChooseSubheading,
  entityChooseQuestions,
  updateField,
  addChooseQuestion,
  updateChooseQuestion,
  removeChooseQuestion,
}: Props) {
  return (
    <div className="space-y-6 border border-gray-800 rounded-2xl p-6 bg-black/20">

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">
          Entity Choose Section
        </h3>

        <button
          onClick={addChooseQuestion}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-sm font-semibold"
        >
          + Add Card
        </button>
      </div>

      {/* Heading */}
      <input
        value={entityChooseHeading}
        onChange={(e) =>
          updateField("entityChooseHeading", e.target.value)
        }
        placeholder="Section Heading"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
      />

      {/* Subheading */}
      <input
        value={entityChooseSubheading}
        onChange={(e) =>
          updateField("entityChooseSubheading", e.target.value)
        }
        placeholder="Section Subheading"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
      />

      {/* Cards */}
      <div className="space-y-8">
        {entityChooseQuestions.map((q, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-2xl p-6 space-y-4 bg-black/30"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm font-semibold text-gray-300">
                Card {index + 1}
              </p>

              <button
                onClick={() => removeChooseQuestion(index)}
                className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700"
              >
                Remove
              </button>
            </div>

            {/* Description (Rich Text) */}
         <RichTextEditor
  value={q.description}
  onChange={(value) =>
    updateChooseQuestion(index, "description", value)
  }
/>

            {/* Link URL */}
            <input
              value={q.linkUrl}
              onChange={(e) =>
                updateChooseQuestion(index, "linkUrl", e.target.value)
              }
              placeholder="Link URL (ex: /services/free-zone-company)"
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
            />
          </div>
        ))}
      </div>
    </div>
  );
}