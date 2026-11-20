// Shared helpers + header/footer injected into every public page
const HOSPITAL = {
  name: 'Ali Medical Complex',
  address: 'Chungi No. 1, Suraj Miani Road, Multan',
  phones: ['061-2039965', '0300-0270600'],
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Ali Medical Complex, Chungi No 1, Suraj Miani Road, Multan')
};
const tel = p => 'tel:' + p.replace(/-/g, '');

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function initials(name) {
  return name.replace(/^(Dr|Ms|Mr|Mrs|Prof|Asst)\.?\s+/gi, '').replace(/^(Dr|Ms|Mr|Mrs|Prof)\.?\s+/gi, '')
    .split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function fmtTime(t) {
  let [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}
function fmtDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}
const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_NAMES = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' };

// Turns {"mon":["16:00","21:00"],...} into "Mon – Sat, 4:00 PM – 9:00 PM"
function scheduleText(s) {
  const days = DAY_ORDER.filter(d => s[d]);
  if (!days.length) return 'Call to confirm timings';
  const groups = {};
  days.forEach(d => { const k = s[d].join('-'); (groups[k] = groups[k] || []).push(d); });
  return Object.entries(groups).map(([k, ds]) => {
    const [a, b] = k.split('-');
    const idx = ds.map(d => DAY_ORDER.indexOf(d));
    const contiguous = idx.every((v, i) => i === 0 || v === idx[i - 1] + 1);
    const label = ds.length > 2 && contiguous ? `${DAY_NAMES[ds[0]]} – ${DAY_NAMES[ds[ds.length - 1]]}` : ds.map(d => DAY_NAMES[d]).join(', ');
    return `${label}, ${fmtTime(a)} – ${fmtTime(b)}`;
  }).join(' · ');
}

// Supabase backend. The publishable key is meant to be public: the database only
// allows the specific amc_* functions, and staff functions need a login token.
const SUPABASE_URL = 'https://iemfjnspqlobfjvucdsi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XmC893WTfmjviOz7HNUGKA_MLBIdrKF';

async function rpc(fn, args = {}) {
  let res;
  try {
    res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: SUPABASE_KEY },
      body: JSON.stringify(args)
    });
  } catch {
    throw new Error('Network problem. Please check your internet and try again.');
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.message || 'Something went wrong. Please try again.';
    throw Object.assign(new Error(msg), { status: data?.code === '28000' ? 401 : data?.code === '23505' ? 409 : res.status });
  }
  return data;
}

function renderChrome() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const link = (href, text) => `<a href="${href}"${here === href ? ' style="color:var(--primary)"' : ''}>${text}</a>`;
  document.getElementById('site-header').innerHTML = `
    <div class="topbar"><div class="container">
      <span>📍 ${HOSPITAL.address}</span>
      <span>📞 <a href="${tel(HOSPITAL.phones[0])}">${HOSPITAL.phones[0]}</a><span class="hide-sm"> · <a href="${tel(HOSPITAL.phones[1])}">${HOSPITAL.phones[1]}</a></span></span>
    </div></div>
    <header class="site"><div class="container">
      <a class="brand" href="index.html"><span class="logo">+</span><span>${HOSPITAL.name}<small>Suraj Miani Road, Multan</small></span></a>
      <button class="menu-btn" aria-label="Menu" onclick="document.querySelector('nav.main').classList.toggle('open')">☰</button>
      <nav class="main">
        ${link('index.html', 'Home')}
        <a href="index.html#doctors">Doctors</a>
        <a href="index.html#services">Services</a>
        <a href="index.html#contact">Contact</a>
        ${link('my-booking.html', 'My Booking')}
        <a class="btn small" href="book.html">Book Appointment</a>
      </nav>
    </div></header>`;
  document.getElementById('site-footer').innerHTML = `
    <footer class="site"><div class="container">
      <div class="cols">
        <div><h4>${HOSPITAL.name}</h4><p>Qualified specialists in endocrinology, child health, internal medicine and psychology, serving families in Multan.</p></div>
        <div><h4>Quick Links</h4><ul>
          <li><a href="index.html#doctors">Our Doctors</a></li><li><a href="index.html#services">Services</a></li>
          <li><a href="book.html">Book Appointment</a></li><li><a href="my-booking.html">Check Booking</a></li></ul></div>
        <div><h4>Patients</h4><ul><li><a href="index.html#faq">FAQs</a></li><li><a href="index.html#contact">Contact Us</a></li><li><a href="${HOSPITAL.mapsUrl}" target="_blank" rel="noopener">Get Directions</a></li></ul></div>
        <div><h4>Contact</h4><ul>
          <li>${HOSPITAL.address}</li>
          ${HOSPITAL.phones.map(p => `<li><a href="${tel(p)}">${p}</a></li>`).join('')}</ul></div>
      </div>
      <div class="copy">© ${new Date().getFullYear()} ${HOSPITAL.name}, Multan. All rights reserved. · <a href="admin.html">Staff Login</a></div>
    </div></footer>`;
}
document.addEventListener('DOMContentLoaded', renderChrome);
