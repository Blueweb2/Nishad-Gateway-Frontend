"use client";

type EntityChooseQuestion = {
  question: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
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
    value: any
  ) => void;
  removeChooseQuestion: (index: number) => void;

  addChooseOption: (qIndex: number) => void;
  updateChooseOption: (
    qIndex: number,
    optIndex: number,
    key: "label" | "value",
    value: string
  ) => void;
  removeChooseOption: (qIndex: number, optIndex: number) => void;
};

export default function EntityChooseEditor({
  entityChooseHeading,
  entityChooseSubheading,
  entityChooseQuestions,
  updateField,
  addChooseQuestion,
  updateChooseQuestion,
  removeChooseQuestion,
  addChooseOption,
  updateChooseOption,
  removeChooseOption,
}: Props) {
  return (
    <div className="space-y-5 border border-gray-800 rounded-2xl p-6 bg-black/20">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">
          Entity Type Chooser (Questions)
        </h3>

        <button
          onClick={addChooseQuestion}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add Question
        </button>
      </div>

      <input
        value={entityChooseHeading}
        onChange={(e) => updateField("entityChooseHeading", e.target.value)}
        placeholder="Heading (ex: How to Choose the Right Entity Type)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      <input
        value={entityChooseSubheading}
        onChange={(e) => updateField("entityChooseSubheading", e.target.value)}
        placeholder="Subheading (small text under heading)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {entityChooseQuestions.length === 0 ? (
        <p className="text-sm text-gray-400">No questions added yet.</p>
      ) : (
        <div className="space-y-5">
          {entityChooseQuestions.map((q, qIndex) => (
            <div
              key={qIndex}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/30"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-200">
                  Question {qIndex + 1}
                </p>

                <button
                  onClick={() => removeChooseQuestion(qIndex)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              <input
                value={q.question}
                onChange={(e) =>
                  updateChooseQuestion(qIndex, "question", e.target.value)
                }
                placeholder="Question text"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400 font-medium">Options</p>

                <button
                  onClick={() => addChooseOption(qIndex)}
                  className="text-xs px-3 py-1 rounded-lg bg-green-700 hover:bg-green-800 transition"
                >
                  + Add Option
                </button>
              </div>

              {q.options?.length === 0 ? (
                <p className="text-xs text-gray-500">No options added.</p>
              ) : (
                <div className="space-y-3">
                  {q.options.map((opt, optIndex) => (
                    <div
                      key={optIndex}
                      className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center"
                    >
                      <input
                        value={opt.label}
                        onChange={(e) =>
                          updateChooseOption(
                            qIndex,
                            optIndex,
                            "label",
                            e.target.value
                          )
                        }
                        placeholder="Label (ex: Yes)"
                        className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                      />

                      <input
                        value={opt.value}
                        onChange={(e) =>
                          updateChooseOption(
                            qIndex,
                            optIndex,
                            "value",
                            e.target.value
                          )
                        }
                        placeholder="Value (ex: yes)"
                        className="w-full px-4 py-2 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                      />

                      <button
                        onClick={() => removeChooseOption(qIndex, optIndex)}
                        className="px-3 py-2 rounded-lg bg-red-800 hover:bg-red-700 transition text-xs font-semibold"
                      >
                        Remove Option
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
