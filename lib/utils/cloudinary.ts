export function cloudinaryAutoWebp(url: string) {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) return url;

  // ✅ if svg, return as-is
  if (url.endsWith(".svg")) return url;

  // ✅ only non-svg images get auto webp
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}