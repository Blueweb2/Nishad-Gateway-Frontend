"use client";

type Category = {
  _id: string;
  name: string;
  slug: string;
  order: number;
  isActive: boolean;
};

type Props = {
  categories: Category[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  required?: boolean;
  loading?: boolean;
};

export default function CategorySelect({
  categories,
  value,
  onChange,
  label = "Category",
  required = false,
  loading = false,
}: Props) {

  // Filter active + sort by order
  const sortedCategories = [...categories]
    .filter((cat) => cat.isActive)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">

      {/* Label */}

      <label className="text-sm text-white/70">
        {label}
      </label>

      {/* Select */}

      <select
        name="categoryId"
        value={value}
        onChange={onChange}
        required={required}
        disabled={loading}
        className="mt-1 bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
      >

        <option value="">
          {loading ? "Loading categories..." : "Select Category"}
        </option>

        {sortedCategories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}

      </select>

      {/* Empty state */}

      {!loading && sortedCategories.length === 0 && (
        <p className="text-xs text-white/40">
          No active categories available.
        </p>
      )}

    </div>
  );
}