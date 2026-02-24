import { useState } from "react";
import { ENDPOINTS } from "../../config/env";
import { useGuestbookController } from "../../controllers/useGuestbookController";
import { GuestbookEntriesModal } from "./GuestbookEntriesModal";
import { GuestbookForm } from "./GuestbookForm";
import { StickerBox } from "./StickerBox";

export function GuestbookSection() {
  const { entries, loading, submitting, error, refresh, submit } = useGuestbookController();
  const [selectedSticker, setSelectedSticker] = useState<string | null>(null);
  const [entriesOpen, setEntriesOpen] = useState(false);

  return (
    <section id="guestbook" className="doodle-guestbook section-block">
      <header className="guestbook-header">
        <h3 className="skills-title">Leave a little trace of yourself!</h3>
      </header>

      <p className="api-note">
        GET/POST endpoint: <code>{ENDPOINTS.guestbook}</code>
      </p>

      {error && (
        <div className="error-banner">
          {error}
          <button
            className="retry-btn"
            onClick={() => {
              void refresh();
            }}
            type="button"
          >
            Retry GET
          </button>
        </div>
      )}

      <div className="guestbook-main">
        <GuestbookForm
          submitting={submitting}
          selectedSticker={selectedSticker}
          onOpenEntries={() => setEntriesOpen(true)}
          onSubmit={async (payload) => {
            await submit(payload);
            setSelectedSticker(null);
          }}
        />
        <StickerBox
          selectedSticker={selectedSticker}
          onSelect={(nextSticker) => setSelectedSticker(nextSticker)}
        />
      </div>

      <GuestbookEntriesModal
        open={entriesOpen}
        entries={entries}
        loading={loading}
        onClose={() => setEntriesOpen(false)}
      />
    </section>
  );
}
