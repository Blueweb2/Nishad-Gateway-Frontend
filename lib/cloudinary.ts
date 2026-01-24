// export async function uploadToCloudinary(file: File, folder: string) {
//   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
//   const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", uploadPreset);
//   formData.append("folder", folder);

//   //  Force stored format as WEBP
//   formData.append("format", "webp");

//   const res = await fetch(
//     `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
//     {
//       method: "POST",
//       body: formData,
//     }
//   );

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data?.error?.message || "Cloudinary upload failed");
//   }

//   return data as {
//     secure_url: string;
//     public_id: string;
//     format: string;
//   };
// }
