# Interactive Portfolio Frontend

The live portfolio is built with HTML, CSS, and vanilla JavaScript. The game world and characters use the browser Canvas API. Its source lives in `../dreamtown/`.

This folder is the Vercel deployment wrapper for the portfolio. `npm run build` copies the site from `../dreamtown/` into `dist/`. The serverless route in `api/guestbook.js` forwards guestbook requests to the NestJS backend using a server-side environment variable. The browser calls only `/api/guestbook`.

The older React and TypeScript files under `src/` are retained as an earlier version and are not part of the live build.

## Preview locally

From the repository root, serve the portfolio source with a static file server, for example:

```bash
python -m http.server 4173 --directory dreamtown
```

Open `http://localhost:4173/`. The portfolio itself needs no JavaScript build step. The guestbook requires the deployed API or an equivalent local backend route.

## Build and deploy

```bash
cd frontend
npm install
npm run build
```

The Vercel project uses `frontend/` as its root and `dist/` as its output directory. The guestbook function reads its backend address from the server-side `GUESTBOOK_API_BASE_URL` setting, with `VITE_API_BASE_URL` supported for the existing deployment. Supabase credentials belong only in the backend's environment settings, never in browser code.
