export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  sticker: string | null;
  createdAt: string;
}

export interface CreateGuestbookEntryPayload {
  name: string;
  message: string;
  sticker?: string | null;
}

interface RawGuestbookEntry {
  id?: string | number;
  _id?: string;
  name?: string;
  message?: string;
  sticker?: string | null;
  createdAt?: string;
  created_at?: string;
}

export function normalizeGuestbookEntry(raw: RawGuestbookEntry, index = 0): GuestbookEntry {
  return {
    id: String(raw.id ?? raw._id ?? `entry-${index}`),
    name: raw.name?.trim() || "Anonymous",
    message: raw.message?.trim() || "",
    sticker: raw.sticker?.trim() || null,
    createdAt: raw.createdAt ?? raw.created_at ?? new Date().toISOString()
  };
}
