"use client";

import Image from "next/image";

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
};

export default function EntityTableSection({
  entityTableHeading,
  entityTableRows,
}: Props) {
  const rows = entityTableRows || [];

  return (
    <section className="w-full bg-black text-white py-20">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10">
        {/* Heading */}
        <h2 className="text-center text-2xl md:text-4xl font-semibold tracking-wide">
          {entityTableHeading || "All Entity Types at a Glance"}
        </h2>

        {/* Table Wrapper */}
        <div className="mt-10 border-t border-white/15">
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 text-xs text-white/60 py-5 border-b border-white/10">
            <div className="col-span-3 pl-6">Entity Type</div>
            <div className="col-span-2">Ownership</div>
            <div className="col-span-2">Best For</div>
            <div className="col-span-1">Capital</div>
            <div className="col-span-2">Regulatory Body</div>
            <div className="col-span-2 pr-6 text-right">Time to Setup</div>
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
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center py-8 border-b border-white/10"
                >
                  {/* Entity Type + Icon */}
                  <div className="md:col-span-3 flex items-center gap-4 pl-0 md:pl-6">
                    {/* Icon circle */}
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
                      {row.icon ? (
                        <Image
                          src={row.icon}
                          alt={row.entityType}
                          width={26}
                          height={26}
                          className="opacity-90"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded bg-white/10" />
                      )}
                    </div>

                    <div>
                      <p className="text-lg md:text-xl font-semibold">
                        {row.entityType || "Entity"}
                      </p>
                    </div>
                  </div>

                  {/* Ownership */}
                  <div className="md:col-span-2 text-sm text-white/70">
                    <span className="md:hidden text-white/40 mr-2">
                      Ownership:
                    </span>
                    {row.ownership || "-"}
                  </div>

                  {/* Best For */}
                  <div className="md:col-span-2 text-sm text-white/70">
                    <span className="md:hidden text-white/40 mr-2">
                      Best For:
                    </span>
                    {row.bestFor || "-"}
                  </div>

                  {/* Capital */}
                  <div className="md:col-span-1 text-sm text-white/70">
                    <span className="md:hidden text-white/40 mr-2">
                      Capital:
                    </span>
                    {row.capital || "-"}
                  </div>

                  {/* Regulatory Body */}
                  <div className="md:col-span-2 text-sm text-white/70">
                    <span className="md:hidden text-white/40 mr-2">
                      Regulatory:
                    </span>
                    {row.regulatoryBody || "-"}
                  </div>

                  {/* Time to Setup */}
                  <div className="md:col-span-2 text-sm text-white/70 md:text-right pr-0 md:pr-6">
                    <span className="md:hidden text-white/40 mr-2">
                      Time:
                    </span>
                    {row.timeToSetup || "-"}
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
