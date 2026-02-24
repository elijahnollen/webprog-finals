import { FormEvent, useState } from "react";
import { CreateGuestbookEntryPayload } from "../../models/guestbook";

interface GuestbookFormProps {
  submitting: boolean;
  selectedSticker: string | null;
  onOpenEntries: () => void;
  onSubmit: (payload: CreateGuestbookEntryPayload) => Promise<void>;
}

export function GuestbookForm({
  submitting,
  selectedSticker,
  onOpenEntries,
  onSubmit
}: GuestbookFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [localError, setLocalError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanMessage) {
      setLocalError("Name and message are required.");
      return;
    }

    setLocalError("");
    setSubmitError("");

    try {
      await onSubmit({ name: cleanName, message: cleanMessage, sticker: selectedSticker });
      setName("");
      setMessage("");
    } catch (error) {
      const messageText = error instanceof Error ? error.message : "Failed to submit.";
      setSubmitError(messageText);
    }
  };

  return (
    <div className="form-container">
      <div className="hand-drawn-box">
        <h3>Sign the Guestbook</h3>
        <button type="button" className="doodle-btn guestbook-view-btn" onClick={onOpenEntries}>
          View Guestbook Entries
        </button>

        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your Name"
          />
          <div className="message-area">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Say something"
            />
            <div className="sticker-dropzone">
              {selectedSticker ? (
                <img src={selectedSticker} alt="Selected sticker preview" className="active-sticker-preview" />
              ) : (
                <p>Sticker here</p>
              )}
            </div>
          </div>

          {localError ? <p className="form-error">{localError}</p> : null}
          {submitError ? <p className="form-error">{submitError}</p> : null}

          <button type="submit" className="doodle-submit" disabled={submitting}>
            {submitting ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
