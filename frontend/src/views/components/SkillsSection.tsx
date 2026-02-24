import { SkillItem } from "../../models/content";

interface SkillsSectionProps {
  items: SkillItem[];
}

export function SkillsSection({ items }: SkillsSectionProps) {
  return (
    <section id="skills" className="section-block">
      <div className="skills-container">
        <h3 className="skills-title">IT Experience</h3>
        <div className="base-layer">
          {items.map((item) => (
            <img key={item.name} src={item.image} className="skills-icon" alt={item.name} />
          ))}
        </div>
      </div>
    </section>
  );
}
