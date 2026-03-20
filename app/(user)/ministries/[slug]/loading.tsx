'use client'

export default function Loading() {
  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto space-y-6">
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
      <div className="h-[320px] bg-gray-200 rounded-3xl animate-pulse" />
      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
      <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
    </div>
  );
}

