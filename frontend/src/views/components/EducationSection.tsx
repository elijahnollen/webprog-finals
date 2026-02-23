import { useEffect, useRef, useState } from "react";
import { EducationItem } from "../../models/content";

interface EducationSectionProps {
  items: EducationItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function extractStartYear(yearRange: string): string {
  const match = yearRange.match(/\d{4}/);
  return match ? match[0] : yearRange;
}

export function EducationSection({ items, activeIndex, onSelect }: EducationSectionProps) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const wrapper = timelineRef.current;
    if (!wrapper) {
      return;
    }

    const updateScrollState = () => {
      const overflow = wrapper.scrollWidth > wrapper.clientWidth + 1;
      const nextCanScrollLeft = wrapper.scrollLeft > 1;
      const nextCanScrollRight = wrapper.scrollLeft + wrapper.clientWidth < wrapper.scrollWidth - 1;

      setHasOverflow(overflow);
      setCanScrollLeft(overflow && nextCanScrollLeft);
      setCanScrollRight(overflow && nextCanScrollRight);
    };

    updateScrollState();
    const rafId = window.requestAnimationFrame(updateScrollState);
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(wrapper);
    wrapper.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.cancelAnimationFrame(rafId);
      observer.disconnect();
      wrapper.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length]);

  const scrollTimeline = (direction: "left" | "right"): void => {
    const wrapper = timelineRef.current;
    if (!wrapper) {
      return;
    }

    const distance = Math.max(180, Math.round(wrapper.clientWidth * 0.6));
    wrapper.scrollBy({
      left: direction === "right" ? distance : -distance,
      behavior: "smooth"
    });
  };

  return (
    <section id="education" className="education-section section-block">
      <div className="direction-container">
        <span className="direction-text">Click on a circle</span>
      </div>

      <div className="timeline-wrapper" id="wrapper" ref={timelineRef} data-overflow={hasOverflow}>
        <div className="timeline-line" id="line">
          {items.map((item, index) => (
            <div key={`${item.school}-${item.yearRange}`} className={`item ${index === activeIndex ? "active" : ""}`}>
              <span className="item-year-stamp" aria-hidden="true">
                {extractStartYear(item.yearRange)}
              </span>

              <div className="content">
                <h2>{item.school}</h2>
                <p>{item.description}</p>
              </div>

              <button
                className="dot"
                type="button"
                onClick={() => onSelect(index)}
                aria-label={`Show ${item.school}`}
              />

              <span className="date">{item.yearRange}</span>
              {item.badges?.length ? (
                <div className="item-badges">
                  {item.badges.map((badge) => (
                    <span key={`${item.school}-${badge}`} className="item-badge">
                      {badge}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {hasOverflow ? (
        <div className="timeline-mobile-controls" aria-label="Timeline navigation controls">
          <button
            type="button"
            className="timeline-mobile-btn"
            onClick={() => scrollTimeline("left")}
            aria-label="Scroll timeline left"
            disabled={!canScrollLeft}
          >
            <span aria-hidden="true">&larr;</span>
          </button>
          <button
            type="button"
            className="timeline-mobile-btn"
            onClick={() => scrollTimeline("right")}
            aria-label="Scroll timeline right"
            disabled={!canScrollRight}
          >
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      ) : null}
    </section>
  );
}
