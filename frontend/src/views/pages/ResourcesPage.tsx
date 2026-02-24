import { Link } from "react-router-dom";
import { attributions } from "../../models/content";

export function ResourcesPage() {
  return (
    <main className="resources-page">
      <section className="resources-card">
        <h1>Site Credits & Attributions</h1>
        <p>This website was developed using open-source tools and creative assets.</p>

        <div className="resources-list">
          {attributions.map((item) => (
            <article key={item.label}>
              <h2>{item.label}</h2>
              <p>
                {item.text}{" "}
                <a href={item.linkUrl} target="_blank" rel="noreferrer">
                  {item.linkLabel}
                </a>
                {item.extra ? (
                  <>
                    {" "}and{" "}
                    <a href={item.extra.url} target="_blank" rel="noreferrer">
                      {item.extra.label}
                    </a>
                  </>
                ) : null}
                .
              </p>
            </article>
          ))}
        </div>

        <div className="resources-footer">
          <Link to="/" className="doodle-btn back-link">Return to Home</Link>
          <small>© 2026 Elijah Nollen</small>
        </div>
      </section>
    </main>
  );
}
