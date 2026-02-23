const DEFAULT_API_BASE_URL = "https://your-nest-api.vercel.app/api";

function normalizeApiBase(rawValue: string): string {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return DEFAULT_API_BASE_URL;
  }

  const withoutTrailingSlash = trimmed.replace(/\/+$/, "");

  if (!/^https?:\/\//i.test(withoutTrailingSlash)) {
    return withoutTrailingSlash;
  }

  try {
    const url = new URL(withoutTrailingSlash);
    const path = url.pathname.replace(/\/+$/, "");
    const normalizedPath = !path || path === "/" ? "/api" : path;
    return `${url.origin}${normalizedPath}`;
  } catch {
    return withoutTrailingSlash;
  }
}

export const API_BASE_URL = normalizeApiBase(import.meta.env.VITE_API_BASE_URL ?? "");

export const ENDPOINTS = {
  guestbook: `${API_BASE_URL}/guestbook`
};
