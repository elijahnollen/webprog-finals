import { GoalItem } from "../../models/content";

interface GoalsSectionProps {
  items: GoalItem[];
}

const emojiSets = [
  ["\u263A", "\u263B", "\u263A"],
  ["\u30C4", "\u263A"],
  ["\u2665", "\u263A"],
  ["\u2605", "\u263A"],
  ["\u2600", "\u263A", "\u30C4"]
];

export function GoalsSection({ items }: GoalsSectionProps) {
  return (
    <section id="goals" className="goal-page section-block">
      <div className="goal-grid">
        <div className="goal-card card-manifesto">
          <div className="emoji-pop">
            {emojiSets[0].map((emoji, index) => (
              <span key={`manifesto-${index}`}>{emoji}</span>
            ))}
          </div>
          <h3 className="skills-title">Goals & Dreams</h3>
        </div>

        {items.map((goal, index) => {
          const classes = ["goal-card"];
          if (index === 0) classes.push("card-skills");
          if (index === 1) classes.push("card-vibe");
          if (index === 2 || goal.dark) classes.push("dark-theme");
          if (index === 3) classes.push("wide-theme");

          return (
            <div key={goal.id} className={classes.join(" ")}>
              <div className="emoji-pop">
                {(emojiSets[index + 1] ?? ["\u263A"]).map((emoji, emojiIndex) => (
                  <span key={`${goal.id}-${emojiIndex}`}>{emoji}</span>
                ))}
              </div>
              <span className="goal-id">{goal.id} // {goal.title.toUpperCase()}</span>
              <p>{goal.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
