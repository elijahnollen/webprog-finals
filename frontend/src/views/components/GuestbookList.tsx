import { GuestbookEntry } from "../../models/guestbook";

interface GuestbookListProps {
  entries: GuestbookEntry[];
  loading: boolean;
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }
  return date.toLocaleString();
}

export function GuestbookList({ entries, loading }: GuestbookListProps) {
  return (
    <div className="sticker-container">
      <div className="hand-drawn-box sticker-board">
        <h3>Guestbook Entries</h3>

        {loading ? (
          <p>Loading entries...</p>
        ) : entries.length === 0 ? (
          <p>No entries yet. Be the first to sign.</p>
        ) : (
          <ul className="guest-entry-list">
            {entries.map((entry) => (
              <li key={entry.id} className="guest-entry-item">
                <p className="guest-entry-head">
                  <strong>{entry.name}</strong>
                  <span>{formatDate(entry.createdAt)}</span>
                </p>
                <p className="guest-entry-message">{entry.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
