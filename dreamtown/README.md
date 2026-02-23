# Eli’s Dreamtown

A standalone pink pixel-art portfolio with walkable buildings and a professional reading view.

## Preview

From the repository root, run `python -m http.server 4173 --directory dreamtown`, then open http://localhost:4173.

No build step or dependencies are required. Use WASD or arrow keys to walk, E to interact, or click a destination. Each building has a walkable interior. The Portfolio button opens the reading view, and Town guide opens the building route. Mobile has touch controls.

## Content flow

About → Selected work → Skills → Background → Contact. Gallery, Interests, and Direction are optional personal sections. Every game object opens the same canonical content used by the reading view.

Project case studies cover NAMFREL BARMM election analytics, TechZone 2.0, JOSE Modules 4–6, and ongoing WAHgyu quality analysis. See `CONTENT_SOURCES.md` for the evidence behind the summaries.

Photo previews and skill logos are pixel-rendered at runtime. Original photographs can be opened at full detail.

## Edit

- `content.js`: original education, skills, favorites, and links.
- `projects.js`: project context, personal contributions, images, and source links.
- `portfolio.js`: section navigation, case studies, gallery, pixel previews, and room content.
- `portfolio.css`: professional reading view and responsive content layouts.
- `app.js`: town, room layouts, controls, collisions, and scenery.
- `style.css`: pink game theme and loading/start screen.

The original frontend and backend remain separate. This version does not connect to the original guestbook database.

Fonts: DM Sans, Playfair Display, and Press Start 2P via Google Fonts. Personal photographs and media covers come from the original portfolio; the NAMFREL team photo comes from the supplied LinkedIn post; the JOSE artwork comes from the team repository. Original generated game-art briefs are recorded in `ART.md`.
