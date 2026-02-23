import { GoalItem } from "../../models/content";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

interface GoalsSectionProps {
  items: GoalItem[];
}

interface HoverEmoji {
  x: string;
  y: string;
  dx: string;
  dy: string;
  rz: string;
  delayMs: number;
}

const panelVariants = ["goals-panel-hero", "goals-panel-left", "goals-panel-right", "goals-panel-foot"];
const hoverEmojiSet = [
  ":)",
  ":D",
  ";)",
  "^_^",
  ":3",
  "xD"
];

const emojiFlightPath: HoverEmoji[] = [
  { x: "22%", y: "70%", dx: "-34px", dy: "-58px", rz: "-24deg", delayMs: 0 },
  { x: "38%", y: "64%", dx: "-8px", dy: "-72px", rz: "18deg", delayMs: 60 },
  { x: "55%", y: "68%", dx: "16px", dy: "-66px", rz: "-14deg", delayMs: 120 },
  { x: "70%", y: "66%", dx: "34px", dy: "-56px", rz: "22deg", delayMs: 180 },
  { x: "31%", y: "80%", dx: "-20px", dy: "-48px", rz: "-18deg", delayMs: 240 },
  { x: "64%", y: "80%", dx: "24px", dy: "-44px", rz: "14deg", delayMs: 300 }
];

function panelDelay(index: number): CSSProperties {
  return { ["--goal-delay" as "--goal-delay"]: `${index * 130}ms` } as CSSProperties;
}

function emojiStyle(path: HoverEmoji): CSSProperties {
  return {
    left: path.x,
    top: path.y,
    ["--emoji-dx" as "--emoji-dx"]: path.dx,
    ["--emoji-dy" as "--emoji-dy"]: path.dy,
    ["--emoji-rz" as "--emoji-rz"]: path.rz,
    animationDelay: `${path.delayMs}ms`
  } as CSSProperties;
}

export function GoalsSection({ items }: GoalsSectionProps) {
  const shellRef = useRef<HTMLDivElement | null>(null);
  const hasPlayedRef = useRef(false);
  const pulseTimeoutRef = useRef<number | null>(null);
  const [autoEmojiPulse, setAutoEmojiPulse] = useState(false);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const triggerPulse = () => {
      setAutoEmojiPulse(true);

      if (pulseTimeoutRef.current !== null) {
        window.clearTimeout(pulseTimeoutRef.current);
      }

      pulseTimeoutRef.current = window.setTimeout(() => {
        setAutoEmojiPulse(false);
        pulseTimeoutRef.current = null;
      }, 1200);
    };

    if (!("IntersectionObserver" in window)) {
      if (!hasPlayedRef.current) {
        hasPlayedRef.current = true;
        triggerPulse();
      }
      return;
    }

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasPlayedRef.current) {
            return;
          }

          hasPlayedRef.current = true;
          triggerPulse();
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.35
      }
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (pulseTimeoutRef.current !== null) {
        window.clearTimeout(pulseTimeoutRef.current);
      }
    },
    []
  );

  return (
    <section id="goals" className="goals-awards-page section-block">
      <div
        ref={shellRef}
        className={`goals-awards-shell${autoEmojiPulse ? " is-emoji-pulse" : ""}`}
      >
        <div className="goals-warp-lines" aria-hidden="true" />

        <header className="goals-awards-head">
          <h3>Goals & Dreams</h3>
          <p>What I am aiming for next</p>
        </header>

        <p className="goals-awards-ribbon">GOALS</p>

        <ul className="goals-awards-grid">
          {items.map((goal, index) => (
            <li
              key={goal.id}
              className={`goals-panel ${panelVariants[index] ?? "goals-panel-left"}${goal.dark ? " is-dark" : ""}`}
              style={panelDelay(index)}
            >
              <div className="goals-emoji-hover-layer" aria-hidden="true">
                {emojiFlightPath.map((path, emojiIndex) => (
                  <span
                    key={`${goal.id}-emoji-${emojiIndex}`}
                    className="goals-hover-emoji"
                    style={emojiStyle(path)}
                  >
                    {hoverEmojiSet[(index + emojiIndex) % hoverEmojiSet.length]}
                  </span>
                ))}
              </div>

              <p className="goals-panel-id">{goal.id}</p>
              <p className="goals-panel-title">{goal.title.toUpperCase()}</p>
              <p className="goals-panel-description">{goal.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
