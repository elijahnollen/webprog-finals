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
  return (
    <section id="education" className="education-section section-block">
      <div className="direction-container">
        <span className="direction-text">Click on a circle</span>
      </div>

      <div className="timeline-wrapper" id="wrapper">
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
    </section>
  );
}
