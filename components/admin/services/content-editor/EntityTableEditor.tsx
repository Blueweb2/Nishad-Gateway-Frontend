"use client";

import toast from "react-hot-toast";
import { uploadToCloudinarySigned } from "@/lib/cloudinarySignedUpload";

export type EntityRow = {
  id: string;
  entityType: string;
  ownership: string;
  bestFor: string;
  capital: string;
  regulatoryBody: string;
  timeToSetup: string;
  icon?: string;
};

export type EntityTableColumn = {
  key: string;
  label: string;
};

type Props = {
  entityTableHeading: string;
  entityTableColumns: EntityTableColumn[];
  entityTableRows: EntityRow[];

  updateField: (name: string, value: string) => void;

  addEntityRow: () => void;
  updateEntityRow: (
    rowId: string,
    key: keyof EntityRow,
    value: string
  ) => void;
  removeEntityRow: (rowId: string) => void;

  updateColumnLabel: (key: string, value: string) => void;
};

export default function EntityTableEditor({
  entityTableHeading,
  entityTableColumns,
  entityTableRows,
  updateField,
  addEntityRow,
  updateEntityRow,
  removeEntityRow,
  updateColumnLabel,
}: Props) {

  return (
    <div className="space-y-6">
      {/* HEADER */}
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

      {/* TABLE HEADING */}
      <input
        value={entityTableHeading || ""}
        onChange={(e) =>
          updateField("entityTableHeading", e.target.value)
        }
        placeholder="Table Heading (ex: All Entity Types at a Glance)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {/* COLUMN HEADINGS */}
      <div className="border border-gray-800 rounded-2xl p-5 bg-black/20 space-y-4">
        <p className="text-sm font-semibold text-gray-300">
          Column Headings
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entityTableColumns.map((col) => (
            <input
              key={col.key}
              value={col.label}
              onChange={(e) =>
                updateColumnLabel(col.key, e.target.value)
              }
              placeholder={`${col.key} label`}
              className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
            />
          ))}
        </div>
      </div>

      {/* ROWS */}
      {entityTableRows?.length === 0 ? (
        <p className="text-sm text-gray-400">
          No table rows added yet.
        </p>
      ) : (
        <div className="space-y-5">
          {entityTableRows.map((row, idx) => (
            <div
              key={row.id}
              className="border border-gray-800 rounded-2xl p-5 space-y-4 bg-black/20"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-gray-200">
                  Row {idx + 1}
                </p>

                <button
                  onClick={() => removeEntityRow(row.id)}
                  className="text-xs px-3 py-1 rounded-lg bg-red-800 hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>

              {/* INPUT GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={row.entityType}
                  onChange={(e) =>
                    updateEntityRow(
                      row.id,
                      "entityType",
                      e.target.value
                    )
                  }
                  placeholder="Entity Type (ex: LLC)"
                  className="input-style"
                />

                <input
                  value={row.ownership}
                  onChange={(e) =>
                    updateEntityRow(
                      row.id,
                      "ownership",
                      e.target.value
                    )
                  }
                  placeholder="Ownership"
                  className="input-style"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={row.bestFor}
                  onChange={(e) =>
                    updateEntityRow(
                      row.id,
                      "bestFor",
                      e.target.value
                    )
                  }
                  placeholder="Best For"
                  className="input-style"
                />

                <input
                  value={row.capital}
                  onChange={(e) =>
                    updateEntityRow(
                      row.id,
                      "capital",
                      e.target.value
                    )
                  }
                  placeholder="Capital"
                  className="input-style"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  value={row.regulatoryBody}
                  onChange={(e) =>
                    updateEntityRow(
                      row.id,
                      "regulatoryBody",
                      e.target.value
                    )
                  }
                  placeholder="Regulatory Body"
                  className="input-style"
                />

                <input
                  value={row.timeToSetup}
                  onChange={(e) =>
                    updateEntityRow(
                      row.id,
                      "timeToSetup",
                      e.target.value
                    )
                  }
                  placeholder="Time to Setup"
                  className="input-style"
                />
              </div>

              {/* ICON UPLOAD */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  Icon (SVG / Image)
                </label>

                <input
                  type="file"
                  accept="image/*,.svg"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const toastId = toast.loading(
                      "Uploading icon..."
                    );

                    try {
                      const result =
                        await uploadToCloudinarySigned(
                          file,
                          "nishad-gateway/subservices/icons"
                        );

                      updateEntityRow(
                        row.id,
                        "icon",
                        result.secure_url
                      );

                      toast.success("Icon uploaded", {
                        id: toastId,
                      });

                      e.target.value = "";
                    } catch (error: any) {
                      toast.error(
                        error?.message ||
                          "Upload failed",
                        { id: toastId }
                      );
                    }
                  }}
                  className="input-style"
                />

                <input
                  value={row.icon || ""}
                  onChange={(e) =>
                    updateEntityRow(
                      row.id,
                      "icon",
                      e.target.value
                    )
                  }
                  placeholder="Icon URL (optional)"
                  className="input-style"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
