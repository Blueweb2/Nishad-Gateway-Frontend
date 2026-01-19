"use client";

type FAQ = { q: string; a: string };

type Props = {
  faqHeading: string;
  faqs: FAQ[];
  updateField: (name: string, value: string) => void;

  addFaq: () => void;
  updateFaq: (index: number, key: keyof FAQ, value: string) => void;
  removeFaq: (index: number) => void;
};

export default function FaqEditor({
  faqHeading,
  faqs,
  updateField,
  addFaq,
  updateFaq,
  removeFaq,
}: Props) {
  return (
    <div className="space-y-5 border border-gray-800 rounded-2xl p-6 bg-black/20">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">FAQ Section</h3>

        <button
          onClick={addFaq}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add FAQ
        </button>
      </div>

      <input
        value={faqHeading}
        onChange={(e) => updateField("faqHeading", e.target.value)}
        placeholder="FAQ Heading (ex: Frequently Asked Questions)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {faqs.length === 0 ? (
        <p className="text-sm text-gray-400">No FAQs added yet.</p>
      ) : (
        <div className="space-y-5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/30"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-200">
                  FAQ {idx + 1}
                </p>

                <button
                  onClick={() => removeFaq(idx)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              <input
                value={faq.q}
                onChange={(e) => updateFaq(idx, "q", e.target.value)}
                placeholder="Question"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
              />

              <textarea
                value={faq.a}
                onChange={(e) => updateFaq(idx, "a", e.target.value)}
                placeholder="Answer"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
