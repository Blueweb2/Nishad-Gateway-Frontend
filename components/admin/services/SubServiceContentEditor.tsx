"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  adminGetSubServiceContent,
  adminSaveSubServiceContent,
} from "@/lib/api/content.api";

type Section = {
  heading: string;
  text: string;
  image?: string;
};

type WhySlide = {
  title: string;
  description: string;
  image: string;
};


type FAQ = {
  q: string;
  a: string;
};

type Props = {
  subId: string;
};

export default function SubServiceContentEditor({ subId }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    heroTitle: "",
    heroSubtitle: "",
    heroDescription: "",
    heroButtonText: "",
    heroButtonLink: "",
    heroImage: "",

    // WHY SECTION
    whyHeading: "",
    whySlides: [] as WhySlide[],
    whyCtaText: "",
    whyCtaLink: "",


    entityTableHeading: "",
    entityTableRows: [] as {
      entityType: string;
      ownership: string;
      bestFor: string;
      capital: string;
      regulatoryBody: string;
      timeToSetup: string;
      icon?: string;
    }[],


    introHeading: "",
    introText: "",

    sections: [] as Section[],
    faqs: [] as FAQ[],
  });


  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await adminGetSubServiceContent(subId);

      if (res.data) {
        setForm({
          heroTitle: res.data.heroTitle || "",
          heroSubtitle: res.data.heroSubtitle || "",
          heroDescription: res.data.heroDescription || "",
          heroButtonText: res.data.heroButtonText || "",
          heroButtonLink: res.data.heroButtonLink || "",
          heroImage: res.data.heroImage || "",

          whyHeading: res.data.whyHeading || "",
          whySlides: res.data.whySlides || [],
          whyCtaText: res.data.whyCtaText || "",
          whyCtaLink: res.data.whyCtaLink || "",

          entityTableHeading: res.data.entityTableHeading || "",
          entityTableRows: res.data.entityTableRows || [],


          introHeading: res.data.introHeading || "",
          introText: res.data.introText || "",

          sections: res.data.sections || [],
          faqs: res.data.faqs || [],
        });

      }
    } catch (err) {
      toast.error("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [subId]);

  const updateField = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addSection = () => {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, { heading: "", text: "", image: "" }],
    }));
  };

  const updateSection = (index: number, key: keyof Section, value: string) => {
    setForm((prev) => {
      const updated = [...prev.sections];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, sections: updated };
    });
  };

  const removeSection = (index: number) => {
    setForm((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  // why slide handlers
  const addWhySlide = () => {
    setForm((prev) => ({
      ...prev,
      whySlides: [
        ...prev.whySlides,
        { title: "", description: "", image: "" },
      ],
    }));
  };

  const updateWhySlide = (
    index: number,
    key: keyof WhySlide,
    value: string
  ) => {
    setForm((prev) => {
      const updated = [...prev.whySlides];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, whySlides: updated };
    });
  };

  const removeWhySlide = (index: number) => {
    setForm((prev) => ({
      ...prev,
      whySlides: prev.whySlides.filter((_, i) => i !== index),
    }));
  };



  type EntityRow = {
    entityType: string;
    ownership: string;
    bestFor: string;
    capital: string;
    regulatoryBody: string;
    timeToSetup: string;
    icon?: string;
  };

  const addEntityRow = () => {
    setForm((prev) => ({
      ...prev,
      entityTableRows: [
        ...(prev as any).entityTableRows,
        {
          entityType: "",
          ownership: "",
          bestFor: "",
          capital: "",
          regulatoryBody: "",
          timeToSetup: "",
          icon: "",
        },
      ],
    }));
  };

  const updateEntityRow = (
    index: number,
    key: keyof EntityRow,
    value: string
  ) => {
    setForm((prev) => {
      const updated = [...(prev as any).entityTableRows];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, entityTableRows: updated };
    });
  };

  const removeEntityRow = (index: number) => {
    setForm((prev) => ({
      ...prev,
      entityTableRows: (prev as any).entityTableRows.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };



  const addFaq = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: "", a: "" }],
    }));
  };

  const updateFaq = (index: number, key: keyof FAQ, value: string) => {
    setForm((prev) => {
      const updated = [...prev.faqs];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, faqs: updated };
    });
  };

  const removeFaq = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await adminSaveSubServiceContent(subId, form);
      toast.success("Content saved successfully ✅");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-gray-400">Loading content editor...</p>;
  }

  return (
    <div className="w-full max-w-[950px] bg-[#0b0f0b] border border-green-700/30 rounded-2xl p-8 md:p-10 space-y-10">
      {/* HEADER */}
      <div className="space-y-2 border-b border-gray-800 pb-6">
        <h2 className="text-2xl font-semibold text-green-300">
          Subservice Content Editor
        </h2>
        <p className="text-sm text-gray-400">
          This content will appear in the user page template.
        </p>
      </div>

      {/* HERO */}
      {/* HERO */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-white">Hero Section</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.heroTitle}
            onChange={(e) => updateField("heroTitle", e.target.value)}
            placeholder="Hero Title"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />

          <input
            value={form.heroSubtitle}
            onChange={(e) => updateField("heroSubtitle", e.target.value)}
            placeholder="Hero Subtitle"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />
        </div>

        <textarea
          value={form.heroDescription}
          onChange={(e) => updateField("heroDescription", e.target.value)}
          placeholder="Hero Description (small text under subtitle)"
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.heroButtonText}
            onChange={(e) => updateField("heroButtonText", e.target.value)}
            placeholder="Hero Button Text (ex: Get Personalized Setup Advice)"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />

          <input
            value={form.heroButtonLink}
            onChange={(e) => updateField("heroButtonLink", e.target.value)}
            placeholder="Hero Button Link (ex: /contact)"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />
        </div>

        <input
          value={form.heroImage}
          onChange={(e) => updateField("heroImage", e.target.value)}
          placeholder="Hero Background Image URL"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>


      {/* WHY SECTION */}
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">
            Why Section (Slider)
          </h3>

          <button
            onClick={addWhySlide}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
          >
            + Add Slide
          </button>
        </div>

        <input
          value={form.whyHeading}
          onChange={(e) => updateField("whyHeading", e.target.value)}
          placeholder="Why Heading (ex: Why Entity Type Matters)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.whyCtaText}
            onChange={(e) => updateField("whyCtaText", e.target.value)}
            placeholder="CTA Text (ex: Calculate Your KSA Expansion Cost)"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />

          <input
            value={form.whyCtaLink}
            onChange={(e) => updateField("whyCtaLink", e.target.value)}
            placeholder="CTA Link (ex: /calculator)"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />
        </div>

        {form.whySlides.length === 0 ? (
          <p className="text-sm text-gray-400">No slides added yet.</p>
        ) : (
          <div className="space-y-5">
            {form.whySlides.map((slide, idx) => (
              <div
                key={idx}
                className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/20"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-200">
                    Slide {idx + 1}
                  </p>

                  <button
                    onClick={() => removeWhySlide(idx)}
                    className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>

                <input
                  value={slide.title}
                  onChange={(e) => updateWhySlide(idx, "title", e.target.value)}
                  placeholder="Slide Title (ex: Ownership Rights)"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />

                <textarea
                  value={slide.description}
                  onChange={(e) =>
                    updateWhySlide(idx, "description", e.target.value)
                  }
                  placeholder="Slide Description"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
                />

                <input
                  value={slide.image}
                  onChange={(e) => updateWhySlide(idx, "image", e.target.value)}
                  placeholder="Slide Image URL"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>



      {/* ENTITY TYPES TABLE */}
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">
            Entity Types Table (At a Glance)
          </h3>

          <button
            onClick={addEntityRow}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
          >
            + Add Row
          </button>
        </div>

        <input
          value={(form as any).entityTableHeading || ""}
          onChange={(e) => updateField("entityTableHeading", e.target.value)}
          placeholder="Table Heading (ex: All Entity Types at a Glance)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        {(form as any).entityTableRows?.length === 0 ? (
          <p className="text-sm text-gray-400">No table rows added yet.</p>
        ) : (
          <div className="space-y-5">
            {(form as any).entityTableRows.map((row: any, idx: number) => (
              <div
                key={idx}
                className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/20"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-200">
                    Row {idx + 1}
                  </p>

                  <button
                    onClick={() => removeEntityRow(idx)}
                    className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={row.entityType}
                    onChange={(e) =>
                      updateEntityRow(idx, "entityType", e.target.value)
                    }
                    placeholder="Entity Type (ex: LLC)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />

                  <input
                    value={row.ownership}
                    onChange={(e) =>
                      updateEntityRow(idx, "ownership", e.target.value)
                    }
                    placeholder="Ownership (ex: Up to 100%)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={row.bestFor}
                    onChange={(e) => updateEntityRow(idx, "bestFor", e.target.value)}
                    placeholder="Best For (ex: SMEs, ops)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />

                  <input
                    value={row.capital}
                    onChange={(e) => updateEntityRow(idx, "capital", e.target.value)}
                    placeholder="Capital (ex: Moderate)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={row.regulatoryBody}
                    onChange={(e) =>
                      updateEntityRow(idx, "regulatoryBody", e.target.value)
                    }
                    placeholder="Regulatory Body (ex: MISA / MoC)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />

                  <input
                    value={row.timeToSetup}
                    onChange={(e) =>
                      updateEntityRow(idx, "timeToSetup", e.target.value)
                    }
                    placeholder="Time to Setup (ex: 2–6 weeks)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />
                </div>

                <input
                  value={row.icon || ""}
                  onChange={(e) => updateEntityRow(idx, "icon", e.target.value)}
                  placeholder="Icon URL (optional)"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>




      {/* INTRO */}
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-white">Intro Section</h3>

        <input
          value={form.introHeading}
          onChange={(e) => updateField("introHeading", e.target.value)}
          placeholder="Intro Heading"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <textarea
          value={form.introText}
          onChange={(e) => updateField("introText", e.target.value)}
          placeholder="Intro Text"
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
        />
      </div>

      {/* SECTIONS */}
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">Sections</h3>

          <button
            onClick={addSection}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
          >
            + Add Section
          </button>
        </div>

        {form.sections.length === 0 ? (
          <p className="text-sm text-gray-400">No sections added yet.</p>
        ) : (
          <div className="space-y-5">
            {form.sections.map((sec, idx) => (
              <div
                key={idx}
                className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/20"
              >
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold text-gray-200">
                    Section {idx + 1}
                  </p>

                  <button
                    onClick={() => removeSection(idx)}
                    className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>

                <input
                  value={sec.heading}
                  onChange={(e) =>
                    updateSection(idx, "heading", e.target.value)
                  }
                  placeholder="Section Heading"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />

                <textarea
                  value={sec.text}
                  onChange={(e) => updateSection(idx, "text", e.target.value)}
                  placeholder="Section Text"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
                />

                <input
                  value={sec.image || ""}
                  onChange={(e) => updateSection(idx, "image", e.target.value)}
                  placeholder="Section Image URL (optional)"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-white">FAQs</h3>

          <button
            onClick={addFaq}
            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
          >
            + Add FAQ
          </button>
        </div>

        {form.faqs.length === 0 ? (
          <p className="text-sm text-gray-400">No FAQs added yet.</p>
        ) : (
          <div className="space-y-5">
            {form.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/20"
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

      {/* SAVE */}
      <div className="flex justify-end pt-4 border-t border-gray-800">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition font-semibold disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Content"}
        </button>
      </div>
    </div>
  );
}
