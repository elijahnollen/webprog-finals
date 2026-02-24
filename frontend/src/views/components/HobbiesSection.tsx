import { HobbyItem } from "../../models/content";

interface HobbiesSectionProps {
  items: HobbyItem[];
  onOpen: (key: HobbyItem["key"]) => void;
}

export function HobbiesSection({ items, onOpen }: HobbiesSectionProps) {
  return (
    <section id="hobbies" className="hobbies-section section-block">
      <div className="hobbies-stage">
        <p className="hobbies-kicker">Personal Space // Creativity + Curiosity</p>
        <h3 className="hobbies-title">My Hobbies</h3>
        <p className="hobbies-watermark" aria-hidden="true">
          Hobby
        </p>

        <div className="hobbies-grid">
          {items.map((hobby, index) => (
            <button
              className={`hobby-card hobby-card-${index + 1} hobby-${hobby.key}`}
              type="button"
              key={hobby.key}
              onClick={() => onOpen(hobby.key)}
              aria-label={`Open ${hobby.title}`}
            >
              <span className="hobby-card-frame">
                <span className="hobby-card-top">
                  <strong>{hobby.title}</strong>
                  <em>{hobby.description}</em>
                </span>
                <span className="hobby-card-media">
                  <img src={hobby.icon} alt="" />
                </span>
                <span className="hobby-card-footer">Open Collection</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
