# Home Frontend (React + TypeScript + Tailwind, MVC)

## Stack
- React + TypeScript + Vite
- TailwindCSS
- MVC-style structure inside `src/`
- REST API calls to NestJS backend on Vercel
- React Router (`/` and `/resources`)

## Migrated Content
All original `home` content was migrated into React views:
- About
- Education
- Skills
- Hobbies (movies/books/blogs modal)
- Goals
- Guestbook (GET/POST API)
- Picture Gallery
- Resources/Attributions page

## Structure
- `src/models` - domain models and normalizers
- `src/services` - HTTP and API service layer
- `src/controllers` - UI/controller hooks and orchestration
- `src/views` - pages/components (responsive mobile + desktop)
- `src/config` - environment-based endpoint config

## API Contract (default)
- `GET /guestbook`
- `POST /guestbook`

Expected POST payload:
```json
{
  "name": "Eli",
  "message": "Hello world",
  "sticker": "/img/star.png"
}
```

`name` and `message` are required. `sticker` is optional.

## Environment
Create `.env` from `.env.example` and set:

`VITE_API_BASE_URL=https://your-nest-api.vercel.app/api`

The frontend will call:

`$VITE_API_BASE_URL/guestbook`

## Run
```bash
npm install
npm run dev
```

## Deploy (Vercel)
`vercel.json` is included with SPA rewrite support.

Set Vercel project root directory to `home`.

Add env var:

`VITE_API_BASE_URL=https://<your-backend-project>.vercel.app/api`

## Build
```bash
npm run build
npm run preview
```
