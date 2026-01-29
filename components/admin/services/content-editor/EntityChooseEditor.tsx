"use client";

type EntityChooseQuestion = {
  question: string;
  knowMoreLabel?: string;
  knowMoreUrl?: string;
};

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
    <div className="space-y-5 border border-gray-800 rounded-2xl p-6 bg-black/20">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Entity Type Chooser (Cards)
        </h3>

        <button
          onClick={addChooseQuestion}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add Card
        </button>
      </div>

      {/* Heading */}
      <input
        value={entityChooseHeading}
        onChange={(e) => updateField("entityChooseHeading", e.target.value)}
        placeholder="Heading (ex: How to Choose the Right Entity Type)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {/* Subheading */}
      <input
        value={entityChooseSubheading}
        onChange={(e) => updateField("entityChooseSubheading", e.target.value)}
        placeholder="Subheading (small text under heading)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {/* Questions */}
      {entityChooseQuestions.length === 0 ? (
        <p className="text-sm text-gray-400">No cards added yet.</p>
      ) : (
        <div className="space-y-5">
          {entityChooseQuestions.map((q, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/30"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-200">
                  Card {index + 1}
                </p>

                <button
                  onClick={() => removeChooseQuestion(index)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              {/* Question */}
              <input
                value={q.question}
                onChange={(e) =>
                  updateChooseQuestion(index, "question", e.target.value)
                }
                placeholder="Question text (ex: Do you want 100% ownership?)"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              {/* Know More Label */}
              <input
                value={q.knowMoreLabel || ""}
                onChange={(e) =>
                  updateChooseQuestion(
                    index,
                    "knowMoreLabel",
                    e.target.value
                  )
                }
                placeholder='Link Label (ex: "Know more")'
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              {/* Know More URL */}
              <input
                value={q.knowMoreUrl || ""}
                onChange={(e) =>
                  updateChooseQuestion(index, "knowMoreUrl", e.target.value)
                }
                placeholder="Link URL (ex: /services/entity-types)"
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}