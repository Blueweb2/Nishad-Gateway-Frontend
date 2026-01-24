// src/lib/api/error.ts
export const getApiErrorMessage = (
  err: any,
  fallback: string = "Something went wrong"
) => {
  return err?.response?.data?.message || err?.message || fallback;
};