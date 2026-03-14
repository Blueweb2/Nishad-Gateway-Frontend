"use client";

import { motion } from "framer-motion";

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
  const baseColumns =
    entityTableColumns && entityTableColumns.length > 0
      ? entityTableColumns
      : DEFAULT_COLUMNS;

  // ✅ Keep only columns that have at least one value in rows
  const cols = baseColumns.filter((col) =>
    rows.some((row) => {
      const value = row[col.key as keyof EntityRow];
      return value && value.toString().trim() !== "";
    })
  );

  return (
    <section className="w-full bg-black text-white pt-12 pb-6 md:py-20" data-navbar="light">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <div className="text-center">
          <motion.h2 
            initial={{ x: -300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-semibold tracking-tight"
          >
            {entityTableHeading || "All Entity Types at a Glance"}
          </motion.h2>
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-sm md:text-base text-white/50 mt-2"
          >
            Compare ownership, capital, setup time and regulatory requirements.
          </motion.div>
        </div>

        {/* Table Wrapper */}
        <div className="mt-12 md:border md:border-white/10 rounded-2xl overflow-hidden bg-white/[0.02]">

          {/* Dynamic Header */}
          {cols.length > 0 && (
            <div
              className="hidden md:grid text-xs text-white/60 py-5 border-b border-white/10 bg-white/[0.02]"
              style={{
                gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))`,
              }}
            >
              {cols.map((col) => (
                <div key={col.key} className="px-6">
                  {col.label}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {rows.length === 0 ? (
            <div className="py-16 text-center text-white/50 text-sm">
              No entity table rows added yet.
            </div>
          ) : (
            <div className="border-t border-white/10">
              {rows.map((row, idx) => (
                <div key={row.id || idx}>

                  {/* ================= MOBILE CARD ================= */}
                  <div className="md:hidden border-b border-white/10 py-8">

                    <div className="flex items-start gap-4">

                      {/* ICON border border-white/10*/}
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center  shrink-0">
                        {row.icon ? (
                          <img
                            src={row.icon}
                            alt={row.entityType || "Entity"}
                            className="w-7 h-7 object-contain"
                          />
                        ) : (
                          <div className="w-7 h-7 bg-white/10 rounded" />
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="flex-1">

                        {/* ENTITY TITLE */}
                        <p className="text-lg font-semibold">
                          {row.entityType || "LLC"}
                        </p>

                        {/* DETAILS */}
                        <div className="space-y-3 text-sm">

                          <div>
                            <span className="text-teal-400 text-xs mr-2">●</span>
                            <span className="text-white/60 text-xs mr-1">Best For</span>
                            <p className="text-white/80">
                              {row.ownership || "Single or multiple GCC shareholders"}
                            </p>
                          </div>

                          <div>
                            <span className="text-teal-400 text-xs mr-2">●</span>
                            <span className="text-white/60 text-xs mr-1">Ownership</span>
                            <p className="text-white/80">
                              {row.bestFor || "SMEs and commercial businesses"}
                            </p>
                          </div>

                          <div>
                            <span className="text-teal-400 text-xs mr-2">●</span>
                            <span className="text-white/60 text-xs mr-1">Key Notes</span>
                            <p className="text-white/80">
                              {row.capital || "Fast and flexible"}
                            </p>
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>

                  {/* ================= DESKTOP TABLE ================= */}
                  <div
                    className="hidden md:grid items-center py-7 border-b border-white/10 hover:bg-white/[0.02] transition"
                    style={{
                      gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {cols.map((col, index) => {
                      const value = row[col.key as keyof EntityRow] || "-";

                      console.log(value)

                      if (index === 0) {
                        return (
                          <div key={col.key} className="flex items-center gap-4 px-6">
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

                            <p className="text-lg md:text-xl font-semibold">
                              {value}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <div key={col.key} className="text-sm text-white/70 px-6">
                          {value}
                        </div>
                      );
                    })}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
