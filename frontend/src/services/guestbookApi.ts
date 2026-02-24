import { ENDPOINTS } from "../config/env";
import {
  CreateGuestbookEntryPayload,
  GuestbookEntry,
  normalizeGuestbookEntry
} from "../models/guestbook";
import { httpGet, httpPost } from "./httpClient";

interface ApiCollection<T> {
  data?: T;
}

function normalizeCollectionResponse(payload: unknown): GuestbookEntry[] {
  const raw = payload as ApiCollection<unknown> | unknown[];
  const source = Array.isArray(raw)
    ? raw
    : Array.isArray((raw as ApiCollection<unknown>)?.data)
      ? ((raw as ApiCollection<unknown>).data as unknown[])
      : [];

  return source.map((entry, index) => normalizeGuestbookEntry(entry as Record<string, unknown>, index));
}

function normalizeSingleResponse(payload: unknown): GuestbookEntry {
  const raw = payload as ApiCollection<unknown> | unknown;
  const source = (raw as ApiCollection<unknown>)?.data ?? raw;
  return normalizeGuestbookEntry(source as Record<string, unknown>);
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  const payload = await httpGet<unknown>(ENDPOINTS.guestbook);
  return normalizeCollectionResponse(payload).sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
}

export async function createGuestbookEntry(
  body: CreateGuestbookEntryPayload
): Promise<GuestbookEntry> {
  const payload = await httpPost<unknown, CreateGuestbookEntryPayload>(ENDPOINTS.guestbook, body);
  return normalizeSingleResponse(payload);
}
