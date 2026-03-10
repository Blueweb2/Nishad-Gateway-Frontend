export default function BusinessFields({ form, handleChange }: any) {

  return (
    <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">

      <h2 className="text-sm font-semibold text-white">
        Business Details
      </h2>

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white"
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white"
      />

      <input
        name="website"
        placeholder="Website"
        value={form.website}
        onChange={handleChange}
        className="bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white"
      />

    </div>
  );
}