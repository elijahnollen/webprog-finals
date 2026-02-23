import { useEffect } from "react";
import { GuestbookEntry } from "../../models/guestbook";
import { GuestbookWall } from "./GuestbookWall";

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
          <h4>Guestbook Wall</h4>
          <button type="button" className="doodle-btn modal-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
        <GuestbookWall entries={entries} loading={loading} />
      </div>
    </div>
  );
}
