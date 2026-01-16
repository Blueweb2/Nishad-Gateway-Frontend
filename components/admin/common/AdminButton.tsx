"use client";

import React from "react";

type AdminButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export default function AdminButton({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
}: AdminButtonProps) {
  const base =
    "px-4 py-2 rounded-lg font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed";

  const variants: Record<string, string> = {
    primary: "bg-green-600 hover:bg-green-700 text-white",
    secondary: "bg-gray-800 hover:bg-gray-700 text-white",
    danger: "bg-red-800 hover:bg-red-700 text-white",
    outline: "border border-gray-700 hover:bg-gray-800 text-white",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
