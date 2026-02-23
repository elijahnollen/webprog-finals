interface StickerBoxProps {
  selectedSticker: string | null;
  onSelect: (sticker: string | null) => void;
}

const stickerAssets = [
  "/img/star.png",
  "/img/thinking.png",
  "/img/surprised.png",
  "/img/lol.png",
  "/img/in-love.png",
  "/img/dizzy.png"
];

export function StickerBox({ selectedSticker, onSelect }: StickerBoxProps) {
  return (
    <div className="sticker-container">
      <div className="hand-drawn-box sticker-board sticker-box-compact">
        <h3>Sticker Box</h3>
        <div className="sticker-grid">
          {stickerAssets.map((src) => (
            <button
              key={src}
              type="button"
              className={`sticker-select-btn ${selectedSticker === src ? "is-selected" : ""}`}
              onClick={() => onSelect(selectedSticker === src ? null : src)}
              aria-label={`Select ${src.split("/").pop()?.replace(".png", "")} sticker`}
              aria-pressed={selectedSticker === src}
            >
              <img src={src} className="doodle-sticker" alt="" />
            </button>
          ))}
        </div>
        <p className="hint-text">(Click a sticker to add it)</p>
      </div>
    </div>
  );
}
