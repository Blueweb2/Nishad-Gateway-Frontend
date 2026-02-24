type BlogStatus = "draft" | "published";

const statusMap = {
  published: {
    label: "Published",
    className:
      "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  },
  draft: {
    label: "Draft",
    className:
      "bg-white/10 text-white/60 border border-white/10",
  },
};

export default function BlogStatusBadge({
  status,
}: {
  status: BlogStatus;
}) {
  const config = statusMap[status];

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}