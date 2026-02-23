export function LoadingScreen() {
  return (
    <section className="loading-screen" aria-label="Loading page" role="status" aria-live="polite">
      <span className="loading-pink-glow loading-pink-glow-a" aria-hidden="true" />
      <span className="loading-pink-glow loading-pink-glow-b" aria-hidden="true" />

      <div className="loading-stage" aria-hidden="true">
        <span className="loading-track" />
        <div className="loading-walker">
          <span className="loading-head" />
          <span className="loading-body" />
          <span className="loading-arm loading-arm-left" />
          <span className="loading-arm loading-arm-right" />
          <span className="loading-leg loading-leg-left" />
          <span className="loading-leg loading-leg-right" />
        </div>
      </div>

      <p className="loading-text">loading..</p>
    </section>
  );
}
