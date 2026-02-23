# Eli’s Portfolio Town

A standalone pink pixel-art portfolio with walkable buildings and a professional reading view.

## Preview

From the repository root, run `python -m http.server 4173 --directory dreamtown`, then open http://localhost:4173.

No build step or dependencies are required. Use WASD or arrow keys to walk, E to interact, or click a destination. Each building has a walkable interior. The Portfolio button opens the reading view, and Town guide opens the building route. Mobile has touch controls.

## Content flow

About → Selected work → Skills → Background → Contact. Gallery, Interests, and Direction are optional personal sections. Every game object opens the same canonical content used by the reading view.

Project case studies cover NAMFREL BARMM election analytics, TechZone 2.0, JOSE documentation, and ongoing WAHgyu quality analysis. See `CONTENT_SOURCES.md` for the evidence behind the summaries.

Photographs display clearly in the portfolio and can be opened at full detail. Skill logos use a pixel treatment to match the game world.

## Edit

- `content.js`: original education, skills, favorites, and links.
- `projects.js`: project context, personal contributions, images, and source links.
- `portfolio.js`: section navigation, case studies, gallery, and room content.
- `portfolio.css`: professional reading view and responsive content layouts.
- `app.js`: town, room layouts, controls, collisions, and scenery.
- `style.css`: pink game theme and loading/start screen.

The Post Office guestbook uses the existing NestJS API and Supabase entries when served from the Vercel backend. The browser calls the same-origin `/api/guestbook` route; database credentials remain server-side.

Fonts: DM Sans, Playfair Display, and Press Start 2P via Google Fonts. Personal photographs and media covers come from the original portfolio; the NAMFREL team photo comes from the supplied LinkedIn post; the JOSE artwork comes from the team repository. Original generated game-art briefs are recorded in `ART.md`.


## Town residents and open rooms
The map uses roofless cutaway rooms with readable section signs and visible entrances. Four fictional NPC hosts offer wayfinding via click, E, or the Meet residents menu. Each of the eight rooms has three distinct furniture types, with no shared main-object type across rooms. Seventeen bespoke pixel illustrations in room-art.js complement the original atlas furniture. Room-specific floor designs distinguish the library, studio, cinema, garden, gallery, workshop, and post office. Personal information remains in the canonical portfolio content.


## Visual polish
DetailedProps in scene-polish.js loads the v2 furnishing atlas with explicit crops and retains procedural fallbacks. Scene dressing adds room-specific wall features, stepped sunlight, architectural edging, vines, garden patches, and subtle reduced-motion-aware ambient particles. Desktop camera framing shows the full portfolio route. NPC designs and matching portraits are drawn individually by npc-art.js.
