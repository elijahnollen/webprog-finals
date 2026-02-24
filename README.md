# webprog-finals

## Projects
- `home` - React + TypeScript + Tailwind frontend
- `backend` - NestJS guestbook API for Vercel
- `introduction` - original static reference

## Full deployment (Vercel)
1. Deploy backend project with root directory `backend`.
2. Copy backend URL: `https://<backend>.vercel.app/api`.
3. Deploy frontend project with root directory `home`.
4. In frontend env vars, set:
   - `VITE_API_BASE_URL=https://<backend>.vercel.app/api`
5. In backend env vars, set:
   - `SUPABASE_URL=https://YOUR_PROJECT.supabase.co`
   - `SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY`
   - `CORS_ORIGIN=https://<frontend>.vercel.app`
6. Redeploy both projects after env updates.
