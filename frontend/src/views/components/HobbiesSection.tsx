import { HobbyItem } from "../../models/content";

interface HobbiesSectionProps {
  items: HobbyItem[];
  onOpen: (key: HobbyItem["key"]) => void;
}

export function HobbiesSection({ items, onOpen }: HobbiesSectionProps) {
  return (
    <section id="hobbies" className="hobbies-section section-block">
      <div className="container-lite">
        <h3 className="skills-title">My Hobbies</h3>
        <div className="hobbies-grid">
          {items.map((hobby) => (
            <div className={`hobby-item hobby-${hobby.key}`} key={hobby.key}>
              <div className="hobby-icon-box">
                <img src={hobby.icon} alt={hobby.title} />
              </div>
              <button className="doodle-btn" type="button" onClick={() => onOpen(hobby.key)}>
                {hobby.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
