"use client";

import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";

/* ---------------- TYPES ---------------- */

export type DocumentEntityTab = {
  label: string; // LLC, Branch, RHQ
  value: string; // llc, branch, rhq (DO NOT EDIT)
};

export type DocumentCard = {
  title: string;
  items: string[];
  icon?: string; // SVG ONLY
};

export type DocumentGroup = {
  entityValue: string;
  cards: DocumentCard[];
};

type Props = {
  documentsHeading: string;
  documentsSubheading: string;
  documentEntityTabs: DocumentEntityTab[];
  documentGroups: DocumentGroup[];
  updateField: (name: string, value: any) => void;
};

/* ---------------- COMPONENT ---------------- */

export default function DocumentsRequiredEditor({
  documentsHeading,
  documentsSubheading,
  documentEntityTabs,
  documentGroups,
  updateField,
}: Props) {
  /* ---------------- HELPERS ---------------- */

  const safeTabs = documentEntityTabs || [];
  const safeGroups = documentGroups || [];

  const setTabs = (tabs: DocumentEntityTab[]) =>
    updateField("documentEntityTabs", tabs);

  const setGroups = (groups: DocumentGroup[]) =>
    updateField("documentGroups", groups);

  const getGroup = (entityValue: string) =>
    safeGroups.find((g) => g.entityValue === entityValue);

  const ensureGroupExists = (entityValue: string) => {
    if (getGroup(entityValue)) return;

    setGroups([
      ...safeGroups,
      {
        entityValue,
        cards: [],
      },
    ]);
  };

  /* ---------------- ENTITY (TAB) HANDLERS ---------------- */

  const addTab = () => {
    const index = safeTabs.length + 1;
    const value = `entity_${index}`;

    setTabs([...safeTabs, { label: "New Entity", value }]);
    ensureGroupExists(value);
  };

  const updateTabLabel = (index: number, label: string) => {
    const updated = [...safeTabs];
    updated[index] = { ...updated[index], label };
    setTabs(updated);
  };

  const removeTab = (index: number) => {
    const removed = safeTabs[index];
    setTabs(safeTabs.filter((_, i) => i !== index));
    setGroups(safeGroups.filter((g) => g.entityValue !== removed.value));
  };

  /* ---------------- CARD HANDLERS ---------------- */

  const addCard = (entityValue: string) =>
    setGroups(
      safeGroups.map((g) =>
        g.entityValue === entityValue
          ? {
              ...g,
              cards: [...g.cards, { title: "New Card", items: [] }],
            }
          : g
      )
    );

  const removeCard = (entityValue: string, cardIndex: number) =>
    setGroups(
      safeGroups.map((g) =>
        g.entityValue === entityValue
          ? {
              ...g,
              cards: g.cards.filter((_, i) => i !== cardIndex),
            }
          : g
      )
    );

  const updateCardTitle = (
    entityValue: string,
    cardIndex: number,
    title: string
  ) =>
    setGroups(
      safeGroups.map((g) =>
        g.entityValue === entityValue
          ? {
              ...g,
              cards: g.cards.map((c, i) =>
                i === cardIndex ? { ...c, title } : c
              ),
            }
          : g
      )
    );

  const updateCardIcon = (
    entityValue: string,
    cardIndex: number,
    icon: string
  ) =>
    setGroups(
      safeGroups.map((g) =>
        g.entityValue === entityValue
          ? {
              ...g,
              cards: g.cards.map((c, i) =>
                i === cardIndex ? { ...c, icon } : c
              ),
            }
          : g
      )
    );

  /* ---------------- ITEM HANDLERS ---------------- */

  const addItem = (entityValue: string, cardIndex: number) =>
    setGroups(
      safeGroups.map((g) =>
        g.entityValue === entityValue
          ? {
              ...g,
              cards: g.cards.map((c, i) =>
                i === cardIndex
                  ? { ...c, items: [...c.items, ""] }
                  : c
              ),
            }
          : g
      )
    );

  const updateItem = (
    entityValue: string,
    cardIndex: number,
    itemIndex: number,
    value: string
  ) =>
    setGroups(
      safeGroups.map((g) =>
        g.entityValue === entityValue
          ? {
              ...g,
              cards: g.cards.map((c, i) =>
                i === cardIndex
                  ? {
                      ...c,
                      items: c.items.map((it, j) =>
                        j === itemIndex ? value : it
                      ),
                    }
                  : c
              ),
            }
          : g
      )
    );

  const removeItem = (
    entityValue: string,
    cardIndex: number,
    itemIndex: number
  ) =>
    setGroups(
      safeGroups.map((g) =>
        g.entityValue === entityValue
          ? {
              ...g,
              cards: g.cards.map((c, i) =>
                i === cardIndex
                  ? {
                      ...c,
                      items: c.items.filter((_, j) => j !== itemIndex),
                    }
                  : c
              ),
            }
          : g
      )
    );

  /* ---------------- SVG UPLOAD ---------------- */

  const uploadCardIcon = async (
    entityValue: string,
    cardIndex: number,
    file: File
  ) => {
    if (file.type !== "image/svg+xml") {
      toast.error("Only SVG icons are allowed");
      return;
    }

    const toastId = toast.loading("Uploading SVG icon...");

    try {
      const uploaded = await uploadToCloudinarySigned(
        file,
        "nishad-gateway/subservices/icons"
      );
      updateCardIcon(entityValue, cardIndex, uploaded.secure_url);
      toast.success("SVG uploaded", { id: toastId });
    } catch (err: any) {
      toast.error(err?.message || "Upload failed", { id: toastId });
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 border border-gray-800 rounded-2xl p-6 bg-black/20">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Documents Required Section
          </h3>
          <p className="text-sm text-gray-400">
            Same layout as user page • entity-based cards
          </p>
        </div>

        <button
          onClick={addTab}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold"
        >
          + Add Entity
        </button>
      </div>

      {/* HEADING */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          value={documentsHeading}
          onChange={(e) => updateField("documentsHeading", e.target.value)}
          className="px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
          placeholder="Heading"
        />
        <input
          value={documentsSubheading}
          onChange={(e) =>
            updateField("documentsSubheading", e.target.value)
          }
          className="px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
          placeholder="Subheading"
        />
      </div>

      {/* ENTITIES */}
      {safeTabs.map((tab, tabIndex) => {
        const group = getGroup(tab.value);
        if (!group) return null;

        return (
          <div
            key={tab.value}
            className="border border-gray-800 rounded-2xl p-5 space-y-5"
          >
            {/* ENTITY HEADER */}
            <div className="flex justify-between items-center">
              <input
                value={tab.label}
                onChange={(e) =>
                  updateTabLabel(tabIndex, e.target.value)
                }
                className="px-4 py-2 rounded-lg bg-black border border-gray-700 text-white font-semibold"
                placeholder="Entity name (LLC / Branch / RHQ)"
              />

              <button
                onClick={() => removeTab(tabIndex)}
                className="text-xs px-3 py-1 bg-red-800 rounded-lg"
              >
                Remove
              </button>
            </div>

            {/* CARDS */}
            {group.cards.map((card, cardIndex) => (
              <div
                key={cardIndex}
                className="border border-gray-700 rounded-xl p-4 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <input
                    value={card.title}
                    onChange={(e) =>
                      updateCardTitle(
                        tab.value,
                        cardIndex,
                        e.target.value
                      )
                    }
                    className="flex-1 px-4 py-2 rounded-lg bg-black border border-gray-700 text-white"
                    placeholder="Card title"
                  />

                  <button
                    onClick={() =>
                      removeCard(tab.value, cardIndex)
                    }
                    className="ml-3 px-3 py-1 bg-red-800 rounded-lg text-xs"
                  >
                    Remove
                  </button>
                </div>

                <input
                  type="file"
                  accept="image/svg+xml"
                  onChange={(e) =>
                    e.target.files &&
                    uploadCardIcon(
                      tab.value,
                      cardIndex,
                      e.target.files[0]
                    )
                  }
                />

                {card.icon && (
                  <img src={card.icon} className="w-10 h-10" />
                )}

                {/* ITEMS */}
                <div className="space-y-2">
                  {card.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2">
                      <input
                        value={item}
                        onChange={(e) =>
                          updateItem(
                            tab.value,
                            cardIndex,
                            itemIndex,
                            e.target.value
                          )
                        }
                        className="flex-1 px-3 py-2 bg-black border border-gray-700 rounded-lg text-white"
                        placeholder="Checklist item"
                      />
                      <button
                        onClick={() =>
                          removeItem(
                            tab.value,
                            cardIndex,
                            itemIndex
                          )
                        }
                        className="px-3 bg-red-800 rounded-lg text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() =>
                      addItem(tab.value, cardIndex)
                    }
                    className="text-sm text-green-400"
                  >
                    + Add item
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => addCard(tab.value)}
              className="text-sm text-green-400"
            >
              + Add card
            </button>
          </div>
        );
      })}
    </div>
  );
}