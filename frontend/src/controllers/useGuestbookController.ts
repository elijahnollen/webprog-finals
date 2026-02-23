import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CreateGuestbookEntryPayload,
  GuestbookEntry
} from "../models/guestbook";
import {
  createGuestbookEntry,
  getGuestbookEntries
} from "../services/guestbookApi";

interface GuestbookController {
  entries: GuestbookEntry[];
  loading: boolean;
  submitting: boolean;
  error: string;
  refresh: () => Promise<void>;
  submit: (payload: CreateGuestbookEntryPayload) => Promise<void>;
}

export function useGuestbookController(): GuestbookController {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const data = await getGuestbookEntries();
      setEntries(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load guestbook entries.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const submit = useCallback(async (payload: CreateGuestbookEntryPayload) => {
    try {
      setError("");
      setSubmitting(true);
      const entry = await createGuestbookEntry(payload);
      setEntries((previous) => [entry, ...previous]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to submit entry.";
      setError(message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return useMemo(
    () => ({ entries, loading, submitting, error, refresh, submit }),
    [entries, loading, submitting, error, refresh, submit]
  );
}
