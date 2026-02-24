import { PointerEvent, useEffect, useRef } from "react";
import { aboutText, socialLinks } from "../../models/content";

const SVG_VIEWBOX_WIDTH = 748;
const SVG_VIEWBOX_HEIGHT = 350;

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<SVGCircleElement | null>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const energyRef = useRef(0);

  const updateTouchPoint = (clientX: number, clientY: number) => {
    const section = sectionRef.current;
    const circle = circleRef.current;
    if (!section || !circle) {
      return;
    }

    const bounds = section.getBoundingClientRect();
    const relativeX = clamp((clientX - bounds.left) / bounds.width, 0, 1);
    const relativeY = clamp((clientY - bounds.top) / bounds.height, 0, 1);

    const x = relativeX * SVG_VIEWBOX_WIDTH;
    const y = relativeY * SVG_VIEWBOX_HEIGHT;

    circle.setAttribute("cx", x.toFixed(2));
    circle.setAttribute("cy", y.toFixed(2));
    energyRef.current = Math.min(1, energyRef.current + 0.35);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    updateTouchPoint(event.clientX, event.clientY);
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    updateTouchPoint(event.clientX, event.clientY);
    energyRef.current = 1;
  };

  useEffect(() => {
    const animate = () => {
      const turbulence = turbulenceRef.current;
      const displacement = displacementRef.current;
      const circle = circleRef.current;

      if (!turbulence || !displacement || !circle) {
        rafRef.current = window.requestAnimationFrame(animate);
        return;
      }

      const energy = energyRef.current;
      const now = performance.now() * 0.003;

      const baseX = 0.007 + energy * 0.006 + Math.sin(now) * 0.0015;
      const baseY = 0.02 + energy * 0.008 + Math.cos(now * 1.13) * 0.0015;
      const scale = 28 * energy;
      const radius = 4 + energy * 170;

      turbulence.setAttribute("baseFrequency", `${baseX.toFixed(4)} ${baseY.toFixed(4)}`);
      displacement.setAttribute("scale", scale.toFixed(2));
      circle.setAttribute("r", radius.toFixed(2));

      energyRef.current = Math.max(0, energy * 0.93 - 0.004);
      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="background-container section-block"
      id="about"
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      style={{
        backgroundImage:
          "linear-gradient(rgba(242,224,214,0.34), rgba(242,224,214,0.34)), url('/svg/background.svg')"
      }}
    >
      <svg
        className="interactive-lines-overlay"
        viewBox={`0 0 ${SVG_VIEWBOX_WIDTH} ${SVG_VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="about-lines-warp" x="-25%" y="-25%" width="150%" height="150%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.007 0.020"
              numOctaves={2}
              seed={7}
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale={0}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <radialGradient id="about-touch-falloff" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity={1} />
            <stop offset="100%" stopColor="black" stopOpacity={0} />
          </radialGradient>

          <mask id="about-touch-mask">
            <rect width={SVG_VIEWBOX_WIDTH} height={SVG_VIEWBOX_HEIGHT} fill="black" />
            <circle
              ref={circleRef}
              cx={SVG_VIEWBOX_WIDTH / 2}
              cy={SVG_VIEWBOX_HEIGHT / 2}
              r={0}
              fill="url(#about-touch-falloff)"
            />
          </mask>
        </defs>

        <image
          href="/svg/background-lines.svg"
          x={0}
          y={0}
          width={SVG_VIEWBOX_WIDTH}
          height={SVG_VIEWBOX_HEIGHT}
          preserveAspectRatio="none"
          opacity={0.78}
          filter="url(#about-lines-warp)"
          mask="url(#about-touch-mask)"
        />
      </svg>

      <img src="/img/me-nobg.png" alt="Eli" className="left-character body-behind" />
      <img src="/img/me-nobg.png" alt="Eli" className="left-character head-overlap" />

      <div className="content-area">
        <blockquote className="custom-quote">{aboutText}</blockquote>

        <div className="social-links">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}
              className="social-icon"
              aria-label={social.label}
            >
              <img src={social.icon} alt={social.label} />
              <span className="scribble-line" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
