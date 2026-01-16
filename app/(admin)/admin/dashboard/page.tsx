export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-green-300 mb-4">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6">
          <p className="text-gray-300 text-sm">Total Blogs</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">0</h3>
        </div>

        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6">
          <p className="text-gray-300 text-sm">Total Services</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">0</h3>
        </div>

        <div className="bg-[#0b0f0b] border border-green-700/30 rounded-xl p-6">
          <p className="text-gray-300 text-sm">Visitors</p>
          <h3 className="text-3xl font-bold text-green-400 mt-2">0</h3>
        </div>
      </div>
    </div>
  );
}
