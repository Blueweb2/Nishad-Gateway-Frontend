"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

import {
  adminGetSubServiceContent,
  adminSaveSubServiceContent,
} from "@/lib/api/content.api";

import HeroEditor from "@/components/admin/services/content-editor/HeroEditor";
import WhySliderEditor, {
  WhySlide,
} from "@/components/admin/services/content-editor/WhySliderEditor";
import EntityTableEditor, {
  EntityRow,
} from "@/components/admin/services/content-editor/EntityTableEditor";
import EntityTypesSliderEditor, {
  EntityTypeSlide,
} from "@/components/admin/services/content-editor/EntityTypesSliderEditor";

import OwnershipSliderEditor, {
  OwnershipSlide,
} from "@/components/admin/services/content-editor/OwnershipSliderEditor";

import EntityChooseEditor from "@/components/admin/services/content-editor/EntityChooseEditor";
import DocumentsRequiredEditor from "@/components/admin/services/content-editor/DocumentsRequiredEditor";

import LocationsSliderEditor, {
  LocationSlide,
} from "@/components/admin/services/content-editor/LocationsSliderEditor";

import FaqEditor from "@/components/admin/services/content-editor/FaqEditor";
import AdminAccordion from "../ui/AdminAccordion";

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

const DEFAULT_SECTION_ORDER = [
  "hero",
  "why",
  "entityTable",
  "entityTypes",
  "ownership",
  "entityChoose",
  "documents",
  "locations",
  "faq",
] as const;

export default function SubServiceContentEditor({ subId }: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Accordion open state (only one open)
  const [openSection, setOpenSection] = useState<string>("hero");

  const [form, setForm] = useState({
    sectionOrder: [...DEFAULT_SECTION_ORDER] as string[],

    // HERO
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

    // ENTITY TABLE
    entityTableHeading: "",
    entityTableRows: [] as EntityRow[],


    // ENTITY TYPES SLIDER
    entityTypesHeading: "",
    entityTypesDescription: "",
    entityTypesSlides: [] as EntityTypeSlide[],

    // ENTITY CHOOSE
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

    // INTRO
    introHeading: "",
    introText: "",

    // SECTIONS
    sections: [] as Section[],

    // FAQ
    faqHeading: "Frequently Asked Questions",
    faqs: [] as FAQ[],
  });

  const sectionLabels: Record<string, string> = {
    hero: "Hero Section",
    why: "Why Section",
    entityTable: "Entity Table",
    entityTypes: "Entity Types Slider",
    ownership: "Ownership Slider",
    entityChoose: "Entity Choose",
    documents: "Documents Required",
    locations: "Locations Slider",
    faq: "FAQ Section",
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    setForm((prev) => {
      const updated = [...prev.sectionOrder];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return { ...prev, sectionOrder: updated };
    });
  };

  const fetchContent = async () => {
    try {
      setLoading(true);

      const res = await adminGetSubServiceContent(subId);

      if (res.data) {
        setForm({
          sectionOrder: res.data.sectionOrder || [...DEFAULT_SECTION_ORDER],

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
    } catch {
      toast.error("Failed to fetch content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [subId]);

  const updateField = (name: string, value: any) => {
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
          id: crypto.randomUUID(), // ✅ stable unique key
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
    rowId: string,
    key: keyof EntityRow,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      entityTableRows: prev.entityTableRows.map((row) =>
        row.id === rowId ? { ...row, [key]: value } : row
      ),
    }));
  };

  const removeEntityRow = (rowId: string) => {
    setForm((prev) => ({
      ...prev,
      entityTableRows: prev.entityTableRows.filter((row) => row.id !== rowId),
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
      entityChooseQuestions: prev.entityChooseQuestions.filter((_, i) => i !== index),
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
      updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== optIndex);
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

  // FAQ HANDLERS
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
      toast.success("Content saved successfully ");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-400">Loading content editor...</p>;

  // ✅ Accordion wrapper UI component
  const AccordionItem = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const open = openSection === id;

    return (
      <div className="border border-gray-800 rounded-2xl overflow-hidden bg-black/30">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setOpenSection(open ? "" : id);
          }} className="w-full flex items-center justify-between px-5 py-4 text-left"
        >
          <p className="text-white font-semibold">{title}</p>

          <ChevronDown
            className={`w-5 h-5 text-gray-300 transition ${open ? "rotate-180" : ""
              }`}
          />
        </button>

        {open && (
          <div className="px-5 pb-6 pt-2 border-t border-gray-800">
            {children}
          </div>
        )}
      </div>
    );
  };

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

      {/* REORDER UI */}
      <div className="space-y-4 border border-green-700/30 rounded-xl p-5 bg-black">
        <h3 className="text-lg font-semibold text-white">Reorder Sections</h3>
        <p className="text-sm text-gray-400">
          Move sections Up / Down. This order will reflect on the user page.
        </p>

        <div className="space-y-2">
          {form.sectionOrder.map((key, index) => (
            <div
              key={key}
              className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-800 bg-[#0b0f0b]"
            >
              <p className="text-white text-sm font-medium">
                {index + 1}. {sectionLabels[key] || key}
              </p>

              <div className="flex gap-2">
                <button
                  disabled={index === 0}
                  onClick={() => moveSection(index, index - 1)}
                  className="px-3 py-1 rounded bg-gray-800 text-white text-xs disabled:opacity-40"
                >
                  Up
                </button>

                <button
                  disabled={index === form.sectionOrder.length - 1}
                  onClick={() => moveSection(index, index + 1)}
                  className="px-3 py-1 rounded bg-gray-800 text-white text-xs disabled:opacity-40"
                >
                  Down
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  ACCORDION SECTIONS */}
    <div className="space-y-4">
  {form.sectionOrder.map((sectionKey) => {
    const isOpen = openSection === sectionKey;

    const toggle = () =>
      setOpenSection(isOpen ? "" : sectionKey);

    switch (sectionKey) {
      case "hero":
        return (
          <AdminAccordion
            key="hero"
            title="Hero Section"
            isOpen={isOpen}
            onToggle={toggle}
          >
            <HeroEditor form={form} updateField={updateField} />
          </AdminAccordion>
        );

      case "why":
        return (
          <AdminAccordion
            key="why"
            title="Why Section (Slider)"
            isOpen={isOpen}
            onToggle={toggle}
          >
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
          </AdminAccordion>
        );

      case "entityTable":
        return (
          <AdminAccordion
            key="entityTable"
            title="Entity Types Table"
            isOpen={isOpen}
            onToggle={toggle}
          >
            <EntityTableEditor
              entityTableHeading={form.entityTableHeading}
              entityTableRows={form.entityTableRows}
              updateField={updateField}
              addEntityRow={addEntityRow}
              updateEntityRow={updateEntityRow}
              removeEntityRow={removeEntityRow}
            />
          </AdminAccordion>
        );

      case "entityTypes":
        return (
          <AdminAccordion
            key="entityTypes"
            title="Entity Types Slider"
            isOpen={isOpen}
            onToggle={toggle}
          >
            <EntityTypesSliderEditor
              entityTypesHeading={form.entityTypesHeading}
              entityTypesDescription={form.entityTypesDescription}
              entityTypesSlides={form.entityTypesSlides}
              updateField={updateField}
              addEntityTypeSlide={addEntityTypeSlide}
              updateEntityTypeSlide={updateEntityTypeSlide}
              removeEntityTypeSlide={removeEntityTypeSlide}
            />
          </AdminAccordion>
        );

      case "ownership":
        return (
          <AdminAccordion
            key="ownership"
            title="Ownership Slider"
            isOpen={isOpen}
            onToggle={toggle}
          >
            <OwnershipSliderEditor
              ownershipHeading={form.ownershipHeading}
              ownershipSlides={form.ownershipSlides}
              updateField={updateField}
              addOwnershipSlide={addOwnershipSlide}
              updateOwnershipSlide={updateOwnershipSlide}
              removeOwnershipSlide={removeOwnershipSlide}
            />
          </AdminAccordion>
        );

      case "entityChoose":
        return (
          <AdminAccordion
            key="entityChoose"
            title="Entity Choose Section"
            isOpen={isOpen}
            onToggle={toggle}
          >
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
          </AdminAccordion>
        );

      case "documents":
        return (
          <AdminAccordion
            key="documents"
            title="Documents Required"
            isOpen={isOpen}
            onToggle={toggle}
          >
            <DocumentsRequiredEditor
              documentsHeading={form.documentsHeading}
              documentsSubheading={form.documentsSubheading}
              documentEntityTabs={form.documentEntityTabs}
              documentGroups={form.documentGroups}
              updateField={updateField}
            />
          </AdminAccordion>
        );

      case "locations":
        return (
          <AdminAccordion
            key="locations"
            title="Locations Slider"
            isOpen={isOpen}
            onToggle={toggle}
          >
            <LocationsSliderEditor
              locationsHeading={form.locationsHeading}
              locationsSubheading={form.locationsSubheading}
              locationsSlides={form.locationsSlides}
              updateField={updateField}
              addLocationSlide={addLocationSlide}
              updateLocationSlide={updateLocationSlide}
              removeLocationSlide={removeLocationSlide}
            />
          </AdminAccordion>
        );

      case "faq":
        return (
          <AdminAccordion
            key="faq"
            title="FAQ Section"
            isOpen={isOpen}
            onToggle={toggle}
          >
            <FaqEditor
              faqHeading={form.faqHeading}
              faqs={form.faqs}
              updateField={updateField}
              addFaq={addFaq}
              updateFaq={updateFaq}
              removeFaq={removeFaq}
            />
          </AdminAccordion>
        );

      default:
        return null;
    }
  })}
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
