type Props = {
  listing: any;
};

export default function ListingCard({ listing }: Props) {

  return (

    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition">

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
  );
}