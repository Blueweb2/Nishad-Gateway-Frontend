import { api } from "@/lib/axios";

export const uploadToCloudinarySigned = async (file: File, folder: string) => {
  // 1) get signed params from backend
  const signedRes = await api.get(`/upload/signed`, {
    params: { folder },
  });

  const signed = signedRes.data?.data;

  if (!signed) {
    throw new Error("Failed to get signed upload params");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signed.apiKey);
  formData.append("timestamp", String(signed.timestamp));
  formData.append("folder", signed.folder);
  formData.append("signature", signed.signature);

  // optional: force format
  formData.append("format", "webp");

  // 2) upload directly to cloudinary
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
