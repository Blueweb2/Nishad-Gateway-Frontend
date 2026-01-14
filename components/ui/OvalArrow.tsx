"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

type OvalArrowProps = {
  direction?: "left" | "right";
  variant?: "white" | "gray";
  onClick?: () => void;
  className?: string;
};

export default function OvalArrow({
  direction = "right",
  variant = "white",
  onClick,
  className = "",
}: OvalArrowProps) {
  const Icon = direction === "left" ? ArrowLeft : ArrowRight;

  const isGray = variant === "gray";

  return (
    <button
      onClick={onClick}
      className={`
        group
        relative
        w-[30px]
        h-[42px]
        rounded-full
        border-2
        flex items-center justify-center
        transition
        ${
          isGray
            ? "border-gray-400 hover:border-gray-500"
            : "border-white hover:border-white/80"
        }
        ${className}
      `}
    >
      <Icon
        size={22}
        className={`
          transition-transform duration-300
          ${
            isGray
              ? "text-gray-600"
              : "text-white"
          }
          ${
            direction === "left"
              ? "group-hover:-translate-x-1"
              : "group-hover:translate-x-1"
          }
        `}
      />
    </button>
  );
}
