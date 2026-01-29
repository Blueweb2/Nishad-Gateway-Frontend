import { adminAxios } from "@/lib/http/adminAxios";

export const uploadToCloudinarySigned = async (
  file: File,
  folder: string
) => {
  // 1️⃣ Get signed params from backend (ADMIN)
  const signedRes = await adminAxios.get("/upload/signed", {
    params: { folder },
  });

  const signed = signedRes.data?.data;

  if (!signed) {
    throw new Error("Failed to get signed upload params");
  }

  // 2️⃣ Build form data for Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signed.apiKey);
  formData.append("timestamp", String(signed.timestamp));
  formData.append("folder", signed.folder);
  formData.append("signature", signed.signature);

  // optional
  // formData.append("format", "webp");

  // 3️ Upload directly to Cloudinary (NO AXIOS)
  const cloudinaryRes = await fetch(
    `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await cloudinaryRes.json();

  if (!cloudinaryRes.ok) {
    throw new Error(data?.error?.message || "Cloudinary upload failed");
  }

  return {
    secure_url: data.secure_url as string,
    public_id: data.public_id as string,
    format: data.format as string,
  };
};