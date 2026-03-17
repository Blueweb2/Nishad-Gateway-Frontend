export default function Loading() {

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">

      <div className="animate-pulse space-y-6">

        <div className="h-10 bg-white/10 rounded w-1/3" />

        <div className="h-32 bg-white/10 rounded" />

        <div className="grid grid-cols-3 gap-6">

          <div className="h-48 bg-white/10 rounded" />
          <div className="h-48 bg-white/10 rounded" />
          <div className="h-48 bg-white/10 rounded" />

        </div>

      </div>

    </div>
  );
}