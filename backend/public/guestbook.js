/* The public guestbook talks only to the existing server; Supabase keys stay there. */
(() => {
  'use strict';
  const endpoint = '/api/guestbook';
  const stickers = ['star', 'thinking', 'surprised', 'lol', 'in-love', 'dizzy'];
  const panel = document.querySelector('#panel');
  const body = document.querySelector('#panelBody');
  let selected = 'star';

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  }
  function imageFor(value) {
    const name = String(value ?? '').split('/').pop()?.replace(/\.png$/i, '');
    return stickers.includes(name) ? `img/${name}.png` : null;
  }
  async function request(method, payload) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), method === 'GET' ? 12000 : 18000);
    try {
      const response = await fetch(endpoint, {
        method,
        headers: method === 'POST' ? {'Content-Type':'application/json'} : undefined,
        body: payload ? JSON.stringify(payload) : undefined,
        signal: controller.signal,
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`Guestbook unavailable (${response.status})`);
      return await response.json();
    } finally { clearTimeout(timer); }
  }
  async function getEntries() {
    try { return await request('GET'); }
    catch (_) {
      await new Promise(resolve => setTimeout(resolve, 900));
      return request('GET');
    }
  }
  function drawEntries(entries) {
    const wall = body.querySelector('#guestbookEntries');
    if (!wall) return;
    wall.replaceChildren();
    if (!Array.isArray(entries) || !entries.length) {
      wall.innerHTML = '<p class="guestbook-empty">The noticeboard is ready for its first note.</p>';
      return;
    }
    entries.slice(0, 60).forEach(entry => {
      const note = document.createElement('article');
      note.className = 'guestbook-note';
      const date = new Date(entry.createdAt);
      const dateText = Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString(undefined, {year:'numeric',month:'short',day:'numeric'});
      const icon = imageFor(entry.sticker);
      note.innerHTML = `<span class="guestbook-pin" aria-hidden="true"></span><div class="guestbook-note-head"><strong>${escapeHtml(entry.name)}</strong><time>${escapeHtml(dateText)}</time></div><p>${escapeHtml(entry.message)}</p>${icon?`<img src="${icon}" alt="" class="guestbook-note-sticker">`:''}`;
      wall.append(note);
    });
  }
  async function refresh() {
    const status = body.querySelector('#guestbookStatus');
    if (!status) return;
    status.textContent = 'Fetching notes from the Post Office…';
    try {
      const entries = await getEntries();
      if (!body.contains(status)) return;
      drawEntries(entries);
      status.textContent = `${entries.length} ${entries.length === 1 ? 'note' : 'notes'} on the board`;
    } catch (_) {
      if (!body.contains(status)) return;
      status.innerHTML = 'Notes are temporarily unavailable. <button type="button" id="guestbookRetry">Try again</button>';
      status.querySelector('button').onclick = refresh;
    }
  }
  function open() {
    show('POST OFFICE / GUESTBOOK', `<div class="guestbook-screen"><div class="guestbook-heading"><p class="section-kicker">A NOTE FOR ELI</p><h2>Sign the guestbook</h2><p>Leave a thoughtful note and read what others have shared.</p></div><div class="guestbook-columns"><form id="guestbookForm"><label for="guestbookName">Your name</label><input id="guestbookName" name="name" maxlength="80" required autocomplete="name" placeholder="Name or nickname"><label for="guestbookMessage">Your message</label><textarea id="guestbookMessage" name="message" maxlength="1000" required rows="5" placeholder="Write your note here…"></textarea><span class="guestbook-label">Choose a sticker</span><div class="guestbook-stickers" role="group" aria-label="Choose a sticker">${stickers.map(name=>`<button type="button" data-sticker="${name}" aria-label="${name} sticker" aria-pressed="${selected===name}"><img src="img/${name}.png" alt=""></button>`).join('')}</div><p class="guestbook-privacy">Your name and message appear publicly on this guestbook. Please do not include private information.</p><p id="guestbookFormStatus" role="status" aria-live="polite"></p><button type="submit" class="portfolio-action">Post your note ↗</button></form><section class="guestbook-board" aria-label="Guestbook messages"><div class="guestbook-board-top"><h3>Visitors’ notes</h3><button type="button" id="guestbookRefresh">Refresh ↻</button></div><p id="guestbookStatus" role="status" aria-live="polite">Fetching notes…</p><div id="guestbookEntries" class="guestbook-entries"></div></section></div><button type="button" class="guestbook-back">← Back to contact</button></div>`);
    body.classList.remove('portfolio-body','guide-body');
    panel.classList.add('portfolio-panel');
    body.querySelector('.guestbook-back').onclick = () => window.Portfolio.showSection('contact');
    body.querySelector('#guestbookRefresh').onclick = refresh;
    body.querySelectorAll('[data-sticker]').forEach(button => button.onclick = () => {
      selected = button.dataset.sticker;
      body.querySelectorAll('[data-sticker]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    });
    body.querySelector('#guestbookForm').onsubmit = async event => {
      event.preventDefault();
      const form = event.currentTarget;
      const name = form.elements.name.value.trim();
      const message = form.elements.message.value.trim();
      const status = body.querySelector('#guestbookFormStatus');
      const submit = form.querySelector('[type="submit"]');
      if (!name || !message) {status.textContent='Please enter a name and message.';return;}
      submit.disabled = true;
      status.textContent = 'Posting your note…';
      try {
        await request('POST', {name, message, sticker:`/img/${selected}.png`});
        form.reset();
        status.textContent = 'Your note is on the board. Thank you!';
        await refresh();
      } catch (_) {
        status.textContent = 'We could not confirm whether your note was posted. Refresh the board before trying again.';
      } finally { submit.disabled = false; }
    };
    refresh();
  }
  window.Guestbook = {open};
})();
