"use client";

export type EntityRow = {
  entityType: string;
  ownership: string;
  bestFor: string;
  capital: string;
  regulatoryBody: string;
  timeToSetup: string;
  icon?: string;
};

type Props = {
  entityTableHeading: string;
  entityTableRows: EntityRow[];

  updateField: (name: string, value: string) => void;

  addEntityRow: () => void;
  updateEntityRow: (index: number, key: keyof EntityRow, value: string) => void;
  removeEntityRow: (index: number) => void;
};

export default function EntityTableEditor({
  entityTableHeading,
  entityTableRows,
  updateField,
  addEntityRow,
  updateEntityRow,
  removeEntityRow,
}: Props) {
  return (
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
        value={entityTableHeading || ""}
        onChange={(e) => updateField("entityTableHeading", e.target.value)}
        placeholder="Table Heading (ex: All Entity Types at a Glance)"
        className="w-full px-4 py-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:border-green-500"
      />

      {entityTableRows?.length === 0 ? (
        <p className="text-sm text-gray-400">No table rows added yet.</p>
      ) : (
        <div className="space-y-5">
          {entityTableRows.map((row, idx) => (
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
  );
}
