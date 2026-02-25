"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  const tags = [
    "Food",
    "Adventure",
    "Culture",
    "Relaxation",
    "Outdoor Leisure",
    "Entertainment",
    "Sports",
    "Family",
    "Lifestyle",
    "Arts",
    "Community",
    "Business Travel",
    "Shopping",
  ];

  return (
    <section className="bg-[#f3f3f3] mt-24 py-20 px-6 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-semibold mb-4">
          Stay Updated
        </h2>

        <p className="text-gray-600 mb-8">
          Get the latest updates on things to do in Riyadh
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-4 mb-10">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-5 py-2 bg-white rounded-xl border text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* EMAIL FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-full p-1 max-w-xl shadow-sm"
        >
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="flex-1 px-5 py-3 rounded-full outline-none"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}