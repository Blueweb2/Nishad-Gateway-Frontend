"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import slugify from "slugify";
import { useRouter } from "next/navigation";

import ContentMainFields from "./ContentMainFields";
import ContentSidebar from "./ContentSidebar";
import { log } from "console";

export default function ContentForm({ cityId }: any) {

  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [places, setPlaces] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const [form, setForm] = useState({
    categoryId: "",
    placeId: "",
    title: "",
    slug: "",
    type: "article",
    description: "",
    address: "",
    phone: "",
    website: "",
    image: ""
  });

  useEffect(() => {
    fetchCategories();
    fetchPlaces();
  }, []);

const fetchCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/cities/${cityId}/categories`,
      { credentials: "include" }
    );

    const data = await res.json();
   
    console.log("CATEGORY API RESPONSE:", data);

    setCategories(data.categories || []);
  } catch (err) {
    console.error("Failed to load categories");
  }
};
  const fetchPlaces = async () => {
    const res = await axios.get(`/api/admin/cities/${cityId}/places`);
    setPlaces(res.data.data);
  };

  const handleChange = (e: any) => {

    const { name, value } = e.target;

    setForm(prev => {

      if (name === "title") {
        return {
          ...prev,
          title: value,
          slug: slugify(value, { lower: true })
        };
      }

      return {
        ...prev,
        [name]: value
      };

    });

  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    await axios.post(
      `/api/admin/categories/${form.categoryId}/contents`,
      form
    );

    router.push(`/admin/cities/${cityId}/content`);
  };

  return (
    <form onSubmit={handleSubmit}>

      <div className="grid grid-cols-3 gap-8">

        <ContentMainFields
          form={form}
          handleChange={handleChange}
        />

        <ContentSidebar
          form={form}
          handleChange={handleChange}
          categories={categories}
          places={places}
          imagePreview={imagePreview}
          setImagePreview={setImagePreview}
          setForm={setForm}
        />

      </div>

      <div className="mt-8 flex justify-end">

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-lg"
        >
          Create Content
        </button>

      </div>

    </form>
  );
}