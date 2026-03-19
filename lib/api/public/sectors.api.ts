/* ================= GET ALL ================= */

export const getPublicSectors = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sectors`,
      { next: { revalidate: 60 } } // ISR 60 seconds
    );

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Failed to fetch sectors:", error);
    return [];
  }
};

/* ================= GET BY SLUG ================= */

export const getSectorBySlugPublic = async (slug: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/sectors/${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Failed to fetch sector:", error);
    return null;
  }
};