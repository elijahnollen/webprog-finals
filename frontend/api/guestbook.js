/* Same-origin browser route. The backend origin is configured in Vercel, not shipped to visitors. */
export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST');
    return response.status(405).json({message: 'Method not allowed.'});
  }
  const configured = process.env.GUESTBOOK_API_BASE_URL || process.env.VITE_API_BASE_URL;
  if (!configured) return response.status(503).json({message: 'Guestbook is temporarily unavailable.'});
  let endpoint;
  try {
    const base = new URL(configured);
    if (base.protocol !== 'https:') throw new Error('HTTPS required');
    endpoint = base.pathname.endsWith('/guestbook') ? base : new URL(`${base.pathname.replace(/\/$/, '')}/guestbook`, base);
  } catch (_) {
    return response.status(503).json({message: 'Guestbook is temporarily unavailable.'});
  }
  const payload = request.method === 'POST' ? JSON.stringify(request.body ?? {}) : undefined;
  if (payload && payload.length > 1800) return response.status(413).json({message: 'Note is too long.'});
  try {
    const upstream = await fetch(endpoint, {
      method: request.method,
      headers: request.method === 'POST' ? {'Content-Type': 'application/json'} : undefined,
      body: payload,
      signal: AbortSignal.timeout(16000),
      cache: 'no-store'
    });
    response.setHeader('Cache-Control', 'no-store');
    const data = await upstream.json();
    return response.status(upstream.status).json(data);
  } catch (_) {
    return response.status(502).json({message: 'Guestbook is temporarily unavailable.'});
  }
}
