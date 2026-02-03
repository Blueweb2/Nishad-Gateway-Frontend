import Link from "next/link";

export default function CityNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          City Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          The city you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-green-600 text-white hover:bg-green-500 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
