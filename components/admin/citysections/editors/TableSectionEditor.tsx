"use client";

import { Plus, Trash2 } from "lucide-react";

type Props = {
  content: {
    headers: string[];
    rows: string[][];
  };
  onChange: (content: any) => void;
};

export default function TableSectionEditor({
  content,
  onChange,
}: Props) {

  const headers = content.headers || [];
  const rows = content.rows || [];

  const updateHeader = (i: number, value: string) => {
    const updated = [...headers];
    updated[i] = value;
    onChange({ headers: updated, rows });
  };

  const updateCell = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const updated = [...rows];
    updated[rowIndex][colIndex] = value;
    onChange({ headers, rows: updated });
  };

  const addColumn = () => {
    const newHeaders = [...headers, "Column"];

    const newRows = rows.map((row) => [...row, ""]);

    onChange({
      headers: newHeaders,
      rows: newRows,
    });
  };

  const addRow = () => {
    const newRow = new Array(headers.length).fill("");

    onChange({
      headers,
      rows: [...rows, newRow],
    });
  };

  const removeRow = (index: number) => {
    const updated = rows.filter((_, i) => i !== index);

    onChange({
      headers,
      rows: updated,
    });
  };

  return (
    <div className="space-y-6">

      {/* Headers */}
      <div className="flex gap-2">
        {headers.map((header, i) => (
          <input
            key={i}
            value={header}
            onChange={(e) =>
              updateHeader(i, e.target.value)
            }
            className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm"
          />
        ))}

        <button
          onClick={addColumn}
          className="text-xs bg-white/10 px-2 rounded"
        >
          + Column
        </button>
      </div>

      {/* Rows */}
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex gap-2 items-center"
        >
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              value={cell}
              onChange={(e) =>
                updateCell(
                  rowIndex,
                  colIndex,
                  e.target.value
                )
              }
              className="px-3 py-2 bg-white/5 border border-white/10 rounded text-sm"
            />
          ))}

          <button
            onClick={() => removeRow(rowIndex)}
            className="text-red-400"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button
        onClick={addRow}
        className="flex items-center gap-2 text-sm bg-white/10 px-3 py-2 rounded"
      >
        <Plus size={14} />
        Add Row
      </button>

    </div>
  );
}