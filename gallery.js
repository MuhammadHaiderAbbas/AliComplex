// Photo gallery (photos uploaded by staff); hidden until there are photos
function showGallery(gridId, sectionId, limit = 24) {
  rpc('amc_gallery').then(list => {
    if (!list.length) return;
    document.getElementById(sectionId).classList.remove('hidden');
    const grid = document.getElementById(gridId);
    grid.innerHTML = list.slice(0, limit).map((g, i) => `<figure class="reveal" tabindex="0" data-i="${i}"><img src="${esc(g.image)}" alt="${esc(g.caption || 'Ali Medical Complex')}" loading="lazy">${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}</figure>`).join('');
    const open = i => {
      const g = list[i], box = document.createElement('div');
      box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', g.caption || 'Photo');
      box.innerHTML = `<button aria-label="Close">✕</button><div><img src="${esc(g.image)}" alt="${esc(g.caption)}">${g.caption ? `<p>${esc(g.caption)}</p>` : ''}</div>`;
      const close = () => box.remove();
      box.onclick = e => { if (e.target === box || e.target.tagName === 'BUTTON') close(); };
      document.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', k); } });
      document.body.appendChild(box); box.querySelector('button').focus();
    };
    grid.onclick = e => { const f = e.target.closest('figure'); if (f) open(+f.dataset.i); };
    grid.onkeydown = e => { const f = e.target.closest('figure'); if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(+f.dataset.i); } };
  }).catch(() => {});
}
