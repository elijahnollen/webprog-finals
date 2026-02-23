# Elijah Crisehea Nollen | Portfolio

An interactive portfolio built around an explorable pixel-art town. Visitors can enter portfolio sections, view selected work and photographs, and leave a message in the guestbook.

**Live site:** https://webprog-finals-nbji.vercel.app/

## Technology

- Frontend: HTML, CSS, vanilla JavaScript, and Canvas
- Guestbook API: NestJS and TypeScript
- Database: Supabase
- Hosting: Vercel

## Repository structure

- `portfolio/`: source for the interactive site
- `frontend/`: Vercel build and same-origin guestbook route
- `backend/`: NestJS guestbook API and static portfolio copy
- `introduction/`: earlier static site

Run `npm run build` from `frontend/` to prepare the static site in `frontend/dist/`. The guestbook proxy uses a server-side environment variable for the backend address. Credentials and database access keys belong in deployment settings, not in the repository.
