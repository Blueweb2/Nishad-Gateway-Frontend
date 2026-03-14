import { notFound } from "next/navigation";

type Props = {
  params: {
    citySlug: string;
    categorySlug: string;
  };
};

async function getCategoryContent(citySlug: string, categorySlug: string) {

  const API = process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(
    `${API}/cities/${citySlug}/categories/${categorySlug}/contents`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;

  const data = await res.json();

  return data.data;
}

export default async function CategoryPage({ params }: Props) {

  const data = await getCategoryContent(
    params.citySlug,
    params.categorySlug
  );

  if (!data) {
    return notFound();
  }

  const { city, category, overview, listings } = data;

  return (

    <main className="max-w-6xl mx-auto px-6 py-16 space-y-16" data-nav="light">

      {/* Category Title */}

      <header>

        <h1 className="text-4xl font-bold text-white">

          {category.name} in {city.cityName}

        </h1>

      </header>

      {/* Overview */}

      {overview && (

        <section>

          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: overview.description,
            }}
          />

        </section>

      )}

      {/* Listings */}

      {listings?.length > 0 && (

        <section>

          <h2 className="text-2xl font-semibold text-white mb-8">

            Listings

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {listings.map((listing: any) => (

              <div
                key={listing._id}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >

                {listing.image && (

                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />

                )}

                <div className="p-5">

                  <h3 className="text-lg font-semibold text-white">
                    {listing.title}
                  </h3>

                  {listing.address && (
                    <p className="text-sm text-white/60 mt-2">
                      {listing.address}
                    </p>
                  )}

                </div>

              </div>

            ))}

          </div>

        </section>

      )}

    </main>
  );
}