import CityCard from "./CityCard";

export default function CitiesGrid({ cities }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      {cities.map((city: any, index: number) => {
        const isLastColumn = index % 3 === 2;
        const hasBottomRow = index + 3 < cities.length;

        return (
          <div
            key={city.citySlug}
            className="relative px-4 py-4"
          >
            {/* vertical divider */}
            {!isLastColumn && (
              <span className="absolute right-0 top-10 bottom-10 w-px bg-gray-200" />
            )}

            {/* horizontal divider */}
            {hasBottomRow && (
              <span className="absolute left-10 right-10 bottom-0 h-px bg-gray-200" />
            )}

            <CityCard city={city} />
          </div>
        );
      })}
    </div>
  );
}