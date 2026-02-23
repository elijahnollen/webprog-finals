import { useEffect } from "react";
import { MediaItem } from "../../models/content";

interface HobbyModalProps {
  title: string;
  open: boolean;
  items: MediaItem[];
  onClose: () => void;
}

export function HobbyModal({ title, open, items, onClose }: HobbyModalProps) {
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
        className="modal-card"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} modal`}
      >
        <div className="modal-head">
          <h4>{title}</h4>
          <button type="button" onClick={onClose} className="doodle-btn modal-close-btn">
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <p>Coming soon...</p>
        ) : (
          <div className="modal-grid">
            {items.map((item) => (
              <figure key={`${item.type}-${item.title}`} className="movie-item">
                <img src={item.image} alt={item.title} />
                <figcaption className="item-label">{item.title}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
