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
  const [nameError, setNameError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitSuccess("");

    const cleanName = name.trim();
    const cleanMessage = message.trim();

    const nextNameError = cleanName ? "" : "Please enter your name.";
    const nextMessageError = cleanMessage ? "" : "Please enter your message.";
    setNameError(nextNameError);
    setMessageError(nextMessageError);

    if (nextNameError || nextMessageError) {
      return;
    }

    setSubmitError("");

    try {
      await onSubmit({ name: cleanName, message: cleanMessage, sticker: selectedSticker });
      setName("");
      setMessage("");
      setNameError("");
      setMessageError("");
      setSubmitSuccess("Submission successful! Your guestbook entry was added.");
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
            onChange={(event) => {
              setName(event.target.value);
              if (nameError) {
                setNameError("");
              }
              if (submitSuccess) {
                setSubmitSuccess("");
              }
            }}
            placeholder="Your Name"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? "guestbook-name-error" : undefined}
          />
          {nameError ? (
            <p id="guestbook-name-error" className="form-error field-error" role="alert">
              {nameError}
            </p>
          ) : null}
          <div className="message-area">
            <textarea
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                if (messageError) {
                  setMessageError("");
                }
                if (submitSuccess) {
                  setSubmitSuccess("");
                }
              }}
              placeholder="Say something"
              aria-invalid={Boolean(messageError)}
              aria-describedby={messageError ? "guestbook-message-error" : undefined}
            />
            <div className="sticker-dropzone">
              {selectedSticker ? (
                <img src={selectedSticker} alt="Selected sticker preview" className="active-sticker-preview" />
              ) : (
                <p>Sticker here</p>
              )}
            </div>
          </div>
          {messageError ? (
            <p id="guestbook-message-error" className="form-error field-error" role="alert">
              {messageError}
            </p>
          ) : null}

          {submitError ? (
            <p className="form-error" role="alert">
              {submitError}
            </p>
          ) : null}
          {submitSuccess ? (
            <p className="form-success" role="status" aria-live="polite">
              {submitSuccess}
            </p>
          ) : null}

          <button type="submit" className="doodle-submit" disabled={submitting}>
            {submitting ? "SUBMITTING..." : "SUBMIT"}
          </button>
        </form>
      </div>
    </div>
  );
}
