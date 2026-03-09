import ImageUploader from "./ImageUploader";
import CategorySelect from "@/components/admin/categories/CategorySelect";

export default function ContentSidebar({
    form,
    handleChange,
    categories,
    places,
    imagePreview,
    setImagePreview,
    setForm
}: any) {

    return (
        <div className="space-y-6">

            <div className="bg-black/40 border border-white/10 rounded-xl p-5">

                <label className="text-sm text-white/70">
                    Content Type
                </label>

                <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="mt-2 bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white"
                >
                    <option value="overview">Overview</option>
                    <option value="article">Article</option>
                    <option value="place">Place</option>
                    <option value="listing">Listing</option>
                </select>

            </div>

            <div className="bg-black/40 border border-white/10 rounded-xl p-5">

                <label className="text-sm text-white/70">
                    Category
                </label>

                <CategorySelect
                    categories={categories}
                    value={form.categoryId}
                    onChange={handleChange}
                    required
                />


            </div>

            {form.type === "listing" && (

                <div className="bg-black/40 border border-white/10 rounded-xl p-5">

                    <label className="text-sm text-white/70">
                        Place
                    </label>

                    <select
                        name="placeId"
                        value={form.placeId}
                        onChange={handleChange}
                        className="mt-2 bg-black/40 border border-white/10 rounded-lg w-full p-2 text-white"
                    >
                        <option value="">Select Place</option>

                        {places.map((place: any) => (
                            <option key={place._id} value={place._id}>
                                {place.title}
                            </option>
                        ))}

                    </select>

                </div>

            )}

            <ImageUploader
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                setForm={setForm}
            />

        </div>
    );
}