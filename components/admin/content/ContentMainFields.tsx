import RichTextEditor from "../common/RichTextEditor";
import BusinessFields from "./BusinessFields";

export default function ContentMainFields({ form, handleChange, setForm }: any) {

  return (
    <div className="col-span-2 space-y-6">

      {/* Title */}

      <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">

        <label className="text-sm text-white/70">
          Title
        </label>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white"
          required
        />

      </div>

      {/* Description */}

      <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">

        <label className="text-sm text-white/70">
          Short Description
        </label>

        <textarea
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          className="bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white"
        />

      </div>

      {/* Rich Content */}

      <div className="bg-black/40 border border-white/10 rounded-xl p-5 space-y-3">

        <label className="text-sm text-white/70">
          Content
        </label>

        <RichTextEditor
          value={form.content}
          onChange={(value) =>
            setForm((prev: any) => ({
              ...prev,
              content: value
            }))
          }
        />

      </div>

      {/* Listing Fields */}

      {form.type === "listing" && (
        <BusinessFields
          form={form}
          handleChange={handleChange}
        />
      )}

    </div>
  );
}