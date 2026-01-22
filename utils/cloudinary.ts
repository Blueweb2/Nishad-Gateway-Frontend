export function cloudinaryAutoWebp(url: string) {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) return url;

  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}
