import { GalleryItem } from "../../models/content";

interface GallerySectionProps {
  items: GalleryItem[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
}

export function GallerySection({
  items,
  activeIndex,
  onNext,
  onPrev,
  onSelect
}: GallerySectionProps) {
  const wheelRotation = activeIndex * -60;

  return (
    <section id="gallery" className="gallery-section section-block">
      <button className="nav-btn btn-prev" onClick={onPrev} type="button">
        <span className="arrow">&lt;</span>
        <small>BACK</small>
      </button>

      <div className="gallery-container">
        <div className="gallery-wheel" style={{ transform: `rotate(${wheelRotation}deg)` }}>
          {items.map((item, index) => (
            <div
              key={`${item.image}-${item.alt}`}
              className={`gallery-item item-${index + 1} ${item.orientation} ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img src={item.image} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>

      <button className="nav-btn btn-next" onClick={onNext} type="button">
        <span className="arrow">&gt;</span>
        <small>NEXT</small>
      </button>

      <h3 className="gallery-caption">Picture Gallery</h3>

      <div className="gallery-dots" aria-label="Gallery image selectors">
        {items.map((item, index) => (
          <button
            key={`dot-${item.image}-${item.alt}`}
            type="button"
            onClick={() => onSelect(index)}
            className={`gallery-dot ${index === activeIndex ? "active" : ""}`}
            aria-label={`Show gallery image ${index + 1}`}
            aria-current={index === activeIndex}
          />
        ))}
      </div>
    </section>
  );
}
