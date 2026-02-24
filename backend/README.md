# Backend (NestJS on Vercel)

## Stack
- NestJS + TypeScript
- REST API (`GET`/`POST`)
- Vercel serverless function entry in `api/[...all].ts`

## Endpoints
- `GET /api/health`
- `GET /api/guestbook`
- `POST /api/guestbook`

### POST body
```json
{
  "name": "Eli",
  "message": "Hello from Vercel",
  "sticker": "/img/star.png"
}
```

## Run locally
```bash
npm install
npm run start:dev
```

Default URL:
- `http://localhost:3000/api/guestbook`

## Environment
Copy `.env.example` to `.env`:

```bash
PORT=3000
CORS_ORIGIN=http://localhost:5173,https://your-frontend.vercel.app
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

`CORS_ORIGIN` supports comma-separated origins.

## Supabase table
Create this table in Supabase SQL editor:

```sql
create table if not exists public.guestbook_entries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  sticker text null,
  created_at timestamptz not null default now()
);
```

## Deploy on Vercel
1. Create a new Vercel project.
2. Set **Root Directory** to `backend`.
3. Add env var:
   - `CORS_ORIGIN=https://your-frontend.vercel.app`
   - `SUPABASE_URL=https://YOUR_PROJECT.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY`
4. Deploy.

Your backend base URL becomes:
- `https://your-backend-project.vercel.app/api`
