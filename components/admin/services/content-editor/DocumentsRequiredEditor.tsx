"use client";

import toast from "react-hot-toast";
import { uploadImage } from "@/lib/api/upload.api";

export type DocumentEntityTab = {
  label: string; // LLC
  value: string; // llc
};

export type DocumentCard = {
  title: string; // Individual Shareholder
  items: string[]; // Passport copy, etc
  icon?: string; // optional icon url
};

export type DocumentGroup = {
  entityValue: string; // link to tab.value
  cards: DocumentCard[];
};

type Props = {
  documentsHeading: string;
  documentsSubheading: string;

  documentEntityTabs: DocumentEntityTab[];
  documentGroups: DocumentGroup[];

  updateField: (name: string, value: any) => void;
};

export default function DocumentsRequiredEditor({
  documentsHeading,
  documentsSubheading,
  documentEntityTabs,
  documentGroups,
  updateField,
}: Props) {
  // -------------------------
  // Helpers
  // -------------------------
  const safeTabs = documentEntityTabs || [];
  const safeGroups = documentGroups || [];

  const setTabs = (tabs: DocumentEntityTab[]) => {
    updateField("documentEntityTabs", tabs);
  };

  const setGroups = (groups: DocumentGroup[]) => {
    updateField("documentGroups", groups);
  };

  const getGroupByEntityValue = (entityValue: string) => {
    return safeGroups.find((g) => g.entityValue === entityValue);
  };

  const ensureGroupExists = (entityValue: string) => {
    const exists = getGroupByEntityValue(entityValue);
    if (exists) return;

    setGroups([
      ...safeGroups,
      {
        entityValue,
        cards: [
          { title: "Individual Shareholder", items: [] },
          { title: "Corporate Shareholder", items: [] },
          { title: "Additional", items: [] },
        ],
      },
    ]);
  };

  // -------------------------
  // Tabs Handlers
  // -------------------------
  const addTab = () => {
    const newTab: DocumentEntityTab = {
      label: `Entity ${safeTabs.length + 1}`,
      value: `entity_${safeTabs.length + 1}`,
    };

    setTabs([...safeTabs, newTab]);
    ensureGroupExists(newTab.value);
  };

  const updateTab = (
    index: number,
    key: keyof DocumentEntityTab,
    value: string
  ) => {
    const updated = [...safeTabs];
    updated[index] = { ...updated[index], [key]: value };

    // If value changed, we must also update group entityValue
    if (key === "value") {
      const oldValue = safeTabs[index]?.value;
      const newValue = value;

      const groupsUpdated = safeGroups.map((g) => {
        if (g.entityValue === oldValue) {
          return { ...g, entityValue: newValue };
        }
        return g;
      });

      setGroups(groupsUpdated);
    }

    setTabs(updated);
  };

  const removeTab = (index: number) => {
    const removed = safeTabs[index];
    const updatedTabs = safeTabs.filter((_, i) => i !== index);
    setTabs(updatedTabs);

    // remove linked group too
    if (removed?.value) {
      setGroups(safeGroups.filter((g) => g.entityValue !== removed.value));
    }
  };

  // -------------------------
  // Group/Card Handlers
  // -------------------------
  const addCard = (entityValue: string) => {
    const updatedGroups = safeGroups.map((g) => {
      if (g.entityValue !== entityValue) return g;

      return {
        ...g,
        cards: [...(g.cards || []), { title: "New Card", items: [] }],
      };
    });

    setGroups(updatedGroups);
  };

  const removeCard = (entityValue: string, cardIndex: number) => {
    const updatedGroups = safeGroups.map((g) => {
      if (g.entityValue !== entityValue) return g;

      return {
        ...g,
        cards: (g.cards || []).filter((_, i) => i !== cardIndex),
      };
    });

    setGroups(updatedGroups);
  };

  const updateCardTitle = (
    entityValue: string,
    cardIndex: number,
    title: string
  ) => {
    const updatedGroups = safeGroups.map((g) => {
      if (g.entityValue !== entityValue) return g;

      const cards = [...(g.cards || [])];
      cards[cardIndex] = { ...cards[cardIndex], title };

      return { ...g, cards };
    });

    setGroups(updatedGroups);
  };

  const updateCardIcon = (
    entityValue: string,
    cardIndex: number,
    icon: string
  ) => {
    const updatedGroups = safeGroups.map((g) => {
      if (g.entityValue !== entityValue) return g;

      const cards = [...(g.cards || [])];
      cards[cardIndex] = { ...cards[cardIndex], icon };

      return { ...g, cards };
    });

    setGroups(updatedGroups);
  };

  const addItem = (entityValue: string, cardIndex: number) => {
    const updatedGroups = safeGroups.map((g) => {
      if (g.entityValue !== entityValue) return g;

      const cards = [...(g.cards || [])];
      const items = [...(cards[cardIndex]?.items || [])];

      items.push("");

      cards[cardIndex] = { ...cards[cardIndex], items };

      return { ...g, cards };
    });

    setGroups(updatedGroups);
  };

  const updateItem = (
    entityValue: string,
    cardIndex: number,
    itemIndex: number,
    value: string
  ) => {
    const updatedGroups = safeGroups.map((g) => {
      if (g.entityValue !== entityValue) return g;

      const cards = [...(g.cards || [])];
      const items = [...(cards[cardIndex]?.items || [])];

      items[itemIndex] = value;

      cards[cardIndex] = { ...cards[cardIndex], items };

      return { ...g, cards };
    });

    setGroups(updatedGroups);
  };

  const removeItem = (
    entityValue: string,
    cardIndex: number,
    itemIndex: number
  ) => {
    const updatedGroups = safeGroups.map((g) => {
      if (g.entityValue !== entityValue) return g;

      const cards = [...(g.cards || [])];
      const items = (cards[cardIndex]?.items || []).filter(
        (_, i) => i !== itemIndex
      );

      cards[cardIndex] = { ...cards[cardIndex], items };

      return { ...g, cards };
    });

    setGroups(updatedGroups);
  };

  // -------------------------
  // Upload icon helper
  // -------------------------
  const uploadCardIcon = async (
    entityValue: string,
    cardIndex: number,
    file: File
  ) => {
    const toastId = toast.loading("Uploading icon...");

    try {
      const res = await uploadImage(file);

      if (res?.data?.url) {
        updateCardIcon(entityValue, cardIndex, res.data.url);
        toast.success("Uploaded ", { id: toastId });
      } else {
        toast.error("Upload failed", { id: toastId });
      }
    } catch {
      toast.error("Upload failed", { id: toastId });
    }
  };

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="space-y-6 border border-gray-800 rounded-2xl p-6 bg-black/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Documents Required Section
          </h3>
          <p className="text-sm text-gray-400">
            Tabs + Cards + Check-list items (like your screenshot)
          </p>
        </div>

        <button
          onClick={addTab}
          className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
        >
          + Add Entity Tab
        </button>
      </div>

      {/* Heading/Subheading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={documentsHeading}
          onChange={(e) => updateField("documentsHeading", e.target.value)}
          placeholder="Heading (ex: Documents Required to Set Up Your Company)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />

        <input
          value={documentsSubheading}
          onChange={(e) => updateField("documentsSubheading", e.target.value)}
          placeholder="Subheading (short description)"
          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Tabs */}
      {safeTabs.length === 0 ? (
        <p className="text-sm text-gray-400">No entity tabs added yet.</p>
      ) : (
        <div className="space-y-6">
          {safeTabs.map((tab, tabIndex) => {
            const group = getGroupByEntityValue(tab.value);

            return (
              <div
                key={tabIndex}
                className="border border-gray-800 rounded-2xl p-5 bg-black/20 space-y-5"
              >
                {/* Tab Header */}
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-gray-200">
                    Entity Tab {tabIndex + 1}
                  </p>

                  <button
                    onClick={() => removeTab(tabIndex)}
                    className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                  >
                    Remove Tab
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={tab.label}
                    onChange={(e) =>
                      updateTab(tabIndex, "label", e.target.value)
                    }
                    placeholder="Tab Label (ex: LLC)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />

                  <input
                    value={tab.value}
                    onChange={(e) =>
                      updateTab(tabIndex, "value", e.target.value)
                    }
                    placeholder="Tab Value (ex: llc)"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                  />
                </div>

                {/* Cards */}
                <div className="flex items-center justify-between gap-4">
                  <h4 className="text-sm font-semibold text-white">
                    Cards for:{" "}
                    <span className="text-green-300">{tab.label}</span>
                  </h4>

                  <button
                    onClick={() => {
                      ensureGroupExists(tab.value);
                      addCard(tab.value);
                    }}
                    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
                  >
                    + Add Card
                  </button>
                </div>

                {!group || group.cards?.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No cards added for this entity.
                  </p>
                ) : (
                  <div className="space-y-5">
                    {group.cards.map((card, cardIndex) => (
                      <div
                        key={cardIndex}
                        className="border border-gray-800 rounded-2xl p-5 bg-black/30 space-y-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-semibold text-gray-200">
                            Card {cardIndex + 1}
                          </p>

                          <button
                            onClick={() => removeCard(tab.value, cardIndex)}
                            className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                          >
                            Remove Card
                          </button>
                        </div>

                        <input
                          value={card.title}
                          onChange={(e) =>
                            updateCardTitle(tab.value, cardIndex, e.target.value)
                          }
                          placeholder="Card Title (ex: Individual Shareholder)"
                          className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                        />

                        {/* Icon Upload */}
                        <div className="space-y-2">
                          <label className="text-xs text-gray-400">
                            Card Icon (optional - Cloudinary)
                          </label>

                          <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              await uploadCardIcon(tab.value, cardIndex, file);
                            }}
                            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white"
                          />

                          <input
                            value={card.icon || ""}
                            onChange={(e) =>
                              updateCardIcon(tab.value, cardIndex, e.target.value)
                            }
                            placeholder="Icon URL (optional)"
                            className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                          />
                        </div>

                        {/* Items */}
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-semibold text-white">
                            Checklist Items
                          </p>

                          <button
                            onClick={() => addItem(tab.value, cardIndex)}
                            className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-sm font-semibold"
                          >
                            + Add Item
                          </button>
                        </div>

                        {(card.items || []).length === 0 ? (
                          <p className="text-sm text-gray-400">
                            No items added yet.
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {card.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center gap-3"
                              >
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
                                  placeholder={`Item ${itemIndex + 1} (ex: Passport copy)`}
                                  className="flex-1 px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
                                />

                                <button
                                  onClick={() =>
                                    removeItem(tab.value, cardIndex, itemIndex)
                                  }
                                  className="text-xs px-3 py-2 rounded-lg bg-red-800 hover:bg-red-700 transition"
                                >
                                  Remove
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
          })}
        </div>
      )}
    </div>
  );
}
