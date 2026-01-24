import { postData } from "./request";

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return postData("/upload/image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};