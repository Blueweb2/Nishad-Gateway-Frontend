"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type Option = {
  label: string;
  value: string;
};

type Group = {
  label: string;
  options: Option[];
};

type SelectProps = {
  options: Group[];
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
};

export default function Select({
  options,
  placeholder = "Select",
  onChange,
  className = "",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between border-b border-gray-600 py-2 text-sm text-left"
      >
        <span className={selected ? "text-gray-900" : "text-gray-400"}>
          {selected?.label || placeholder}
        </span>

        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
    {open && (
  <div className="absolute left-0 right-0 mt-3 bg-gray-100 rounded-2xl shadow-lg z-50 p-3 max-h-64 hide-scrollbar">
    {options.map((group) => (
      <div key={group.label} className="mb-3">
        
        {/* Group Title */}
        <p className="text-xs text-gray-400 px-2 mb-2">
          {group.label}
        </p>

        {/* Options */}
        <ul className="bg-white rounded-xl overflow-hidden border border-gray-200">
          {group.options.map((option, index) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`
                px-4 py-3 text-sm text-gray-700 cursor-pointer
                hover:bg-gray-50 transition
                ${index !== group.options.length - 1 ? "border-b border-gray-200" : ""}
              `}
            >
              {option.label}
            </li>
          ))}
        </ul>

      </div>
    ))}
  </div>
)}
    </div>
  );
}