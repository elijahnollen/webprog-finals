import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { SkillItem } from "../../models/content";

interface SkillsSectionProps {
  items: SkillItem[];
}

const codeSnippets = [
  "SELECT insight FROM portfolio_data WHERE impact = 'high';",
  "python analyze_patterns.py --focus anomaly-detection",
  "WITH clean AS (SELECT * FROM entries) SELECT * FROM clean;",
  "PowerBI.refresh(dataset='guestbook_wall')",
  "git commit -m 'ship meaningful progress'",
  "if (curiosity) { keepLearning(); }",
  "ssh eli@server 'sudo systemctl status api-service'",
  "for point in data: transform(point) -> insight"
];

function rotateSnippets(snippets: string[], offset: number): string[] {
  const safeOffset = ((offset % snippets.length) + snippets.length) % snippets.length;
  return snippets.slice(safeOffset).concat(snippets.slice(0, safeOffset));
}

function orbitStyle(index: number, total: number): CSSProperties {
  return {
    ["--orbit-index" as "--orbit-index"]: index,
    ["--orbit-total" as "--orbit-total"]: total
  } as CSSProperties;
}

export function SkillsSection({ items }: SkillsSectionProps) {
  const orbitItems = items;
  const [snippetOffset, setSnippetOffset] = useState(0);

  useEffect(() => {
    if (codeSnippets.length === 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setSnippetOffset((previous) => (previous + 1) % codeSnippets.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  const marqueeTop = useMemo(() => rotateSnippets(codeSnippets, snippetOffset), [snippetOffset]);
  const marqueeBottom = useMemo(
    () => rotateSnippets(codeSnippets, snippetOffset + 3),
    [snippetOffset]
  );

  return (
    <section id="skills" className="section-block skills-section">
      <div className="skills-radar">
        <h3 className="skills-title">IT Experience</h3>

        <div className="skills-code-rail">
          <div className="skills-code-track">
            {[...marqueeTop, ...marqueeTop].map((line, index) => (
              <span key={`top-${index}`}>{line}</span>
            ))}
          </div>
        </div>

        <div className="skills-orbit-stage">
          <ul className="skills-orbit-list" aria-label="Skill icons around center">
            {orbitItems.map((item, index) => (
              <li key={item.name} className="skills-orbit-slot" style={orbitStyle(index, orbitItems.length)}>
                <span className="skills-target-grid" aria-hidden="true" />
                <div className="skills-node">
                  <img
                    src={item.image}
                    className={`skills-icon${item.name === "Power BI" ? " is-powerbi" : ""}`}
                    alt={item.name}
                  />
                </div>
              </li>
            ))}
          </ul>

          <div className="skills-center-node">
            <div className="skills-center-core">
              <span className="skills-center-symbol" aria-hidden="true">
                {"</>"}
              </span>
            </div>
          </div>
        </div>

        <div className="skills-code-rail is-reverse">
          <div className="skills-code-track">
            {[...marqueeBottom, ...marqueeBottom].map((line, index) => (
              <span key={`bottom-${index}`}>{line}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
