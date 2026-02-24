import { useEffect } from "react";
import { GuestbookEntry } from "../../models/guestbook";

interface GuestbookEntriesModalProps {
  open: boolean;
  entries: GuestbookEntry[];
  loading: boolean;
  onClose: () => void;
}

export function GuestbookEntriesModal({
  open,
  entries,
  loading,
  onClose
}: GuestbookEntriesModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card entries-modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Guestbook entries modal"
      >
        <div className="modal-head">
          <h4>Guestbook Entries</h4>
          <button type="button" className="doodle-btn modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        {loading ? (
          <p>Loading entries...</p>
        ) : entries.length === 0 ? (
          <p>No entries yet. Be the first to sign.</p>
        ) : (
          <ul className="guest-entry-list modal-entry-list">
            {entries.map((entry) => (
              <li key={entry.id} className="guest-entry-item">
                <div className="guest-entry-content">
                  <p className="guest-entry-name">
                    <strong>{entry.name}</strong>
                  </p>
                  <p className="guest-entry-message">{entry.message}</p>
                </div>
                {entry.sticker ? (
                  <img
                    src={entry.sticker}
                    alt={`${entry.name}'s sticker`}
                    className="guest-entry-sticker"
                  />
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
