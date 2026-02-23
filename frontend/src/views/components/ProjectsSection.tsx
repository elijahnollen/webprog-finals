const wordmarkLetters = ["P", "R", "O", "J", "E", "C", "T", "S"];

export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section section-block">
      <article className="projects-frame projects-frame-intro projects-frame-intro-only">
        <div className="projects-intro-wrap">
          <div className="projects-pill" aria-hidden="true">
            {wordmarkLetters.map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </div>
          <p className="projects-intro-caption">Soon</p>
        </div>
      </article>
    </section>
  );
}
