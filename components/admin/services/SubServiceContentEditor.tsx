"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  adminGetSubServiceContent,
  adminSaveSubServiceContent,
} from "@/lib/api/content.api";

import { uploadImage } from "@/lib/api/upload.api";
import WhySliderEditor, { WhySlide } from "@/components/admin/services/content-editor/WhySliderEditor";
import EntityTableEditor, { EntityRow } from "@/components/admin/services/content-editor/EntityTableEditor";
import EntityTypesSliderEditor, { EntityTypeSlide } from "@/components/admin/services/content-editor/EntityTypesSliderEditor";



import OwnershipSliderEditor, {
  OwnershipSlide,
} from "@/components/admin/services/content-editor/OwnershipSliderEditor";

import EntityChooseEditor from "@/components/admin/services/content-editor/EntityChooseEditor";
import DocumentsRequiredEditor from "@/components/admin/services/content-editor/DocumentsRequiredEditor";

import LocationsSliderEditor, {
  LocationSlide,
} from "@/components/admin/services/content-editor/LocationsSliderEditor";

import FaqEditor from "@/components/admin/services/content-editor/FaqEditor";


type Section = {
  heading: string;
  text: string;
  image?: string;
};



type EntityChooseQuestion = {
  question: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
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

    // OWNERSHIP SLIDER
    ownershipHeading: "",
    ownershipSlides: [] as OwnershipSlide[],

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

    entityTypesHeading: "",
    entityTypesDescription: "",
    entityTypesSlides: [] as EntityTypeSlide[],

    entityChooseHeading: "",
    entityChooseSubheading: "",
    entityChooseQuestions: [] as EntityChooseQuestion[],

    // DOCUMENTS REQUIRED
    documentsHeading: "",
    documentsSubheading: "",
    documentEntityTabs: [] as { label: string; value: string }[],
    documentGroups: [] as {
      entityValue: string;
      cards: { title: string; items: string[]; icon?: string }[];
    }[],

    // LOCATIONS SLIDER
    locationsHeading: "",
    locationsSubheading: "",
    locationsSlides: [] as LocationSlide[],

    introHeading: "",
    introText: "",

    sections: [] as Section[],

    faqHeading: "Frequently Asked Questions",
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

          ownershipHeading: res.data.ownershipHeading || "",
          ownershipSlides: res.data.ownershipSlides || [],

          entityTableHeading: res.data.entityTableHeading || "",
          entityTableRows: res.data.entityTableRows || [],

          entityTypesHeading: res.data.entityTypesHeading || "",
          entityTypesDescription: res.data.entityTypesDescription || "",
          entityTypesSlides: res.data.entityTypesSlides || [],

          entityChooseHeading: res.data.entityChooseHeading || "",
          entityChooseSubheading: res.data.entityChooseSubheading || "",
          entityChooseQuestions: res.data.entityChooseQuestions || [],

          documentsHeading: res.data.documentsHeading || "",
          documentsSubheading: res.data.documentsSubheading || "",
          documentEntityTabs: res.data.documentEntityTabs || [],
          documentGroups: res.data.documentGroups || [],

          locationsHeading: res.data.locationsHeading || "",
          locationsSubheading: res.data.locationsSubheading || "",
          locationsSlides: res.data.locationsSlides || [],

          introHeading: res.data.introHeading || "",
          introText: res.data.introText || "",

          sections: res.data.sections || [],
          faqHeading: res.data.faqHeading || "Frequently Asked Questions",
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

  // WHY SLIDER HANDLERS
  const addWhySlide = () => {
    setForm((prev) => ({
      ...prev,
      whySlides: [...prev.whySlides, { title: "", description: "", image: "" }],
    }));
  };

  const updateWhySlide = (index: number, key: keyof WhySlide, value: string) => {
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

  // ENTITY TABLE HANDLERS
const addEntityRow = () => {
  setForm((prev) => ({
    ...prev,
    entityTableRows: [
      ...(prev.entityTableRows || []),
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
    const updated = [...prev.entityTableRows];
    updated[index] = { ...updated[index], [key]: value };
    return { ...prev, entityTableRows: updated };
  });
};

const removeEntityRow = (index: number) => {
  setForm((prev) => ({
    ...prev,
    entityTableRows: prev.entityTableRows.filter((_, i) => i !== index),
  }));
};


// ENTITY TYPES SLIDER HANDLERS
const addEntityTypeSlide = () => {
  setForm((prev) => ({
    ...prev,
    entityTypesSlides: [
      ...(prev.entityTypesSlides || []),
      { title: "", image: "", description: "" },
    ],
  }));
};

const updateEntityTypeSlide = (
  index: number,
  key: keyof EntityTypeSlide,
  value: string
) => {
  setForm((prev) => {
    const updated = [...prev.entityTypesSlides];
    updated[index] = { ...updated[index], [key]: value };
    return { ...prev, entityTypesSlides: updated };
  });
};

const removeEntityTypeSlide = (index: number) => {
  setForm((prev) => ({
    ...prev,
    entityTypesSlides: prev.entityTypesSlides.filter((_, i) => i !== index),
  }));
};


  // OWNERSHIP SLIDER HANDLERS
  const addOwnershipSlide = () => {
    setForm((prev) => ({
      ...prev,
      ownershipSlides: [
        ...(prev.ownershipSlides || []),
        { title: "", subtitle: "", image: "" },
      ],
    }));
  };

  const updateOwnershipSlide = (
    index: number,
    key: keyof OwnershipSlide,
    value: string
  ) => {
    setForm((prev) => {
      const updated = [...prev.ownershipSlides];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, ownershipSlides: updated };
    });
  };

  const removeOwnershipSlide = (index: number) => {
    setForm((prev) => ({
      ...prev,
      ownershipSlides: prev.ownershipSlides.filter((_, i) => i !== index),
    }));
  };

  // ENTITY CHOOSE HANDLERS
  const addChooseQuestion = () => {
    setForm((prev) => ({
      ...prev,
      entityChooseQuestions: [
        ...(prev.entityChooseQuestions || []),
        {
          question: "",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
          ],
          selectedValue: "yes",
        },
      ],
    }));
  };

  const updateChooseQuestion = (
    index: number,
    key: keyof EntityChooseQuestion,
    value: any
  ) => {
    setForm((prev) => {
      const updated = [...prev.entityChooseQuestions];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, entityChooseQuestions: updated };
    });
  };

  const removeChooseQuestion = (index: number) => {
    setForm((prev) => ({
      ...prev,
      entityChooseQuestions: prev.entityChooseQuestions.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const addChooseOption = (qIndex: number) => {
    setForm((prev) => {
      const updated = [...prev.entityChooseQuestions];
      updated[qIndex].options = [
        ...(updated[qIndex].options || []),
        { label: "", value: "" },
      ];
      return { ...prev, entityChooseQuestions: updated };
    });
  };

  const updateChooseOption = (
    qIndex: number,
    optIndex: number,
    key: "label" | "value",
    value: string
  ) => {
    setForm((prev) => {
      const updated = [...prev.entityChooseQuestions];
      const options = [...updated[qIndex].options];
      options[optIndex] = { ...options[optIndex], [key]: value };
      updated[qIndex].options = options;
      return { ...prev, entityChooseQuestions: updated };
    });
  };

  const removeChooseOption = (qIndex: number, optIndex: number) => {
    setForm((prev) => {
      const updated = [...prev.entityChooseQuestions];
      updated[qIndex].options = updated[qIndex].options.filter(
        (_, i) => i !== optIndex
      );
      return { ...prev, entityChooseQuestions: updated };
    });
  };

  // LOCATIONS SLIDER HANDLERS
  const addLocationSlide = () => {
    setForm((prev) => ({
      ...prev,
      locationsSlides: [
        ...(prev.locationsSlides || []),
        {
          title: "",
          description: "",
          image: "",
          tag: "ARTICLE",
          link: "",
        },
      ],
    }));
  };

  const updateLocationSlide = (
    index: number,
    key: keyof LocationSlide,
    value: string
  ) => {
    setForm((prev) => {
      const updated = [...prev.locationsSlides];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, locationsSlides: updated };
    });
  };

  const removeLocationSlide = (index: number) => {
    setForm((prev) => ({
      ...prev,
      locationsSlides: prev.locationsSlides.filter((_, i) => i !== index),
    }));
  };



  // ===============================
  // FAQ HANDLERS
  // ===============================
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

  if (loading) return <p className="text-gray-400">Loading content editor...</p>;

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
          placeholder="Hero Description"
          rows={3}
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500 resize-none"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={form.heroButtonText}
            onChange={(e) => updateField("heroButtonText", e.target.value)}
            placeholder="Hero Button Text"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />

          <input
            value={form.heroButtonLink}
            onChange={(e) => updateField("heroButtonLink", e.target.value)}
            placeholder="Hero Button Link"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-300 font-medium">
            Upload Hero Image (Cloudinary)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const toastId = toast.loading("Uploading image...");

              try {
                const res = await uploadImage(file);

                if (res?.data?.url) {
                  updateField("heroImage", res.data.url);
                  toast.success("Uploaded ✅", { id: toastId });
                } else {
                  toast.error("Upload failed", { id: toastId });
                }
              } catch {
                toast.error("Upload failed", { id: toastId });
              }
            }}
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
          />

          <input
            value={form.heroImage}
            onChange={(e) => updateField("heroImage", e.target.value)}
            placeholder="Hero Background Image URL"
            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
          />
        </div>
      </div>

      {/* WHY SECTION */}
<WhySliderEditor
  whyHeading={form.whyHeading}
  whySlides={form.whySlides}
  whyCtaText={form.whyCtaText}
  whyCtaLink={form.whyCtaLink}
  updateField={updateField}
  addWhySlide={addWhySlide}
  updateWhySlide={updateWhySlide}
  removeWhySlide={removeWhySlide}
/>

{/* ENTITY TABLE */}
<EntityTableEditor
  entityTableHeading={form.entityTableHeading}
  entityTableRows={form.entityTableRows}
  updateField={updateField}
  addEntityRow={addEntityRow}
  updateEntityRow={updateEntityRow}
  removeEntityRow={removeEntityRow}
/>

{/* ENTITY TYPES SLIDER */}
<EntityTypesSliderEditor
  entityTypesHeading={form.entityTypesHeading}
  entityTypesDescription={form.entityTypesDescription}
  entityTypesSlides={form.entityTypesSlides}
  updateField={updateField}
  addEntityTypeSlide={addEntityTypeSlide}
  updateEntityTypeSlide={updateEntityTypeSlide}
  removeEntityTypeSlide={removeEntityTypeSlide}
/>

      {/* OWNERSHIP SLIDER */}
      <OwnershipSliderEditor
        ownershipHeading={form.ownershipHeading}
        ownershipSlides={form.ownershipSlides}
        updateField={updateField}
        addOwnershipSlide={addOwnershipSlide}
        updateOwnershipSlide={updateOwnershipSlide}
        removeOwnershipSlide={removeOwnershipSlide}
      />

      {/* ENTITY CHOOSE */}
      <EntityChooseEditor
        entityChooseHeading={form.entityChooseHeading}
        entityChooseSubheading={form.entityChooseSubheading}
        entityChooseQuestions={form.entityChooseQuestions}
        updateField={updateField}
        addChooseQuestion={addChooseQuestion}
        updateChooseQuestion={updateChooseQuestion}
        removeChooseQuestion={removeChooseQuestion}
        addChooseOption={addChooseOption}
        updateChooseOption={updateChooseOption}
        removeChooseOption={removeChooseOption}
      />

      {/* DOCUMENTS REQUIRED */}
      <DocumentsRequiredEditor
        documentsHeading={form.documentsHeading}
        documentsSubheading={form.documentsSubheading}
        documentEntityTabs={form.documentEntityTabs}
        documentGroups={form.documentGroups}
        updateField={updateField}
      />

      {/* LOCATIONS SLIDER */}
      <LocationsSliderEditor
        locationsHeading={form.locationsHeading}
        locationsSubheading={form.locationsSubheading}
        locationsSlides={form.locationsSlides}
        updateField={updateField}
        addLocationSlide={addLocationSlide}
        updateLocationSlide={updateLocationSlide}
        removeLocationSlide={removeLocationSlide}
      />
      <FaqEditor
        faqHeading={form.faqHeading}
        faqs={form.faqs}
        updateField={updateField}
        addFaq={addFaq}
        updateFaq={updateFaq}
        removeFaq={removeFaq}
      />



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
