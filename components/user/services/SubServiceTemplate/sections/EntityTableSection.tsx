"use client";

export type EntityRow = {
  id?: string;
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
  entityTableColumns?: EntityTableColumn[];
  entityTableRows: EntityRow[];
};

// ✅ Default fallback columns
const DEFAULT_COLUMNS: EntityTableColumn[] = [
  { key: "entityType", label: "Entity Type" },
  { key: "ownership", label: "Ownership" },
  { key: "bestFor", label: "Best For" },
  { key: "capital", label: "Capital" },
  { key: "regulatoryBody", label: "Regulatory Body" },
  { key: "timeToSetup", label: "Time to Setup" },
];

export default function EntityTableSection({
  entityTableHeading,
  entityTableColumns,
  entityTableRows,
}: Props) {
  const rows = entityTableRows || [];

  // ✅ Use backend columns if available else fallback
  const cols =
    entityTableColumns && entityTableColumns.length > 0
      ? entityTableColumns
      : DEFAULT_COLUMNS;

  return (
    <section className="w-full bg-black text-white py-20">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
            {entityTableHeading || "All Entity Types at a Glance"}
          </h2>
          <p className="text-sm md:text-base text-white/50 mt-2">
            Compare ownership, capital, setup time and regulatory requirements.
          </p>
        </div>

        {/* Table Wrapper */}
        <div className="mt-12 border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">

          {/* ✅ Dynamic Header Row */}
          <div className="hidden md:grid grid-cols-12 text-xs text-white/60 py-5 border-b border-white/10 bg-white/[0.02]">
            {cols.map((col, index) => (
              <div
                key={col.key}
                className={`${
                  index === 0
                    ? "col-span-3 pl-6"
                    : index === cols.length - 1
                    ? "col-span-2 pr-6 text-right"
                    : "col-span-2"
                }`}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Empty */}
          {rows.length === 0 ? (
            <div className="py-16 text-center text-white/50 text-sm">
              No entity table rows added yet.
            </div>
          ) : (
            <div>
              {rows.map((row, idx) => (
                <div
                  key={row.id || idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-start md:items-center py-7 px-5 md:px-0 border-b border-white/10 hover:bg-white/[0.02] transition"
                >
                  {cols.map((col, index) => {
                    const value =
                      row[col.key as keyof EntityRow] || "-";

                    // First column = entity type with icon
                    if (index === 0) {
                      return (
                        <div
                          key={col.key}
                          className="md:col-span-3 flex items-center gap-4 md:pl-6"
                        >
                          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                            {row.icon ? (
                              <img
                                src={row.icon}
                                alt={row.entityType || "Entity"}
                                className="w-[26px] h-[26px] object-contain opacity-90"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded bg-white/10" />
                            )}
                          </div>

                          <div>
                            <p className="text-lg md:text-xl font-semibold leading-tight">
                              {value}
                            </p>
                            <p className="text-xs text-white/40 mt-1 md:hidden">
                              {col.label}
                            </p>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={col.key}
                        className={`text-sm text-white/70 ${
                          index === cols.length - 1
                            ? "md:col-span-2 md:text-right md:pr-6"
                            : "md:col-span-2"
                        }`}
                      >
                        <span className="md:hidden text-white/40 mr-2">
                          {col.label}:
                        </span>
                        {value}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
