const rawApiBase = import.meta.env.VITE_API_BASE_URL?.trim() ?? "";

export const API_BASE_URL = rawApiBase
  ? rawApiBase.replace(/\/$/, "")
  : "https://your-nest-api.vercel.app/api";

export const ENDPOINTS = {
  guestbook: `${API_BASE_URL}/guestbook`
};
