// ===== Ali Medical Complex – shared code for every page =====

// Supabase backend. The publishable key is meant to be public: the database only
// allows the specific amc_* functions, and staff functions need a login token.
const SUPABASE_URL = 'https://iemfjnspqlobfjvucdsi.supabase.co';
const SUPABASE_KEY = 'sb_publishable_XmC893WTfmjviOz7HNUGKA_MLBIdrKF';

// Defaults; overwritten by Site Settings saved in the staff panel
const HOSPITAL = {
  name: 'Ali Medical Complex',
  address: 'Chungi No. 1, Suraj Miani Road, Multan',
  phone1: '061-2039965',
  phone2: '0300-0270600',
  whatsapp: '923000270600',
  email: '',
  facebook: '',
  opd_note: 'Monday – Saturday (timings vary by doctor)',
  website: 'https://muhammadhaiderabbas.github.io/AliComplex/',
  legal_name: 'Ali Medical Complex',
  signatory_name: 'Dr. Shahid Javed Ch.',
  signatory_title: 'Director',
  announcement: ''
};
HOSPITAL.mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Ali Medical Complex, Chungi No 1, Suraj Miani Road, Multan');
HOSPITAL.mapEmbed = 'https://maps.google.com/maps?q=' + encodeURIComponent('Chungi No 1, Suraj Miani Road, Multan') + '&z=15&output=embed';

const tel = p => 'tel:' + String(p).replace(/[^\d+]/g, '');
const waLink = (text = '') => `https://wa.me/${HOSPITAL.whatsapp}${text ? '?text=' + encodeURIComponent(text) : ''}`;

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function initials(name) {
  return name.replace(/^((Asst|Assoc|Prof|Dr|Ms|Mr|Mrs)\.?\s+)+/i, '').split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
}
function fmtTime(t) {
  let [h, m] = t.split(':').map(Number);
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')} ${ap}`;
}
function fmtDate(d) {
  return new Date(String(d).slice(0, 10) + 'T00:00:00').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}
function todayPK() { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Karachi' }).format(new Date()); }
function stars(r, size = '') {
  const full = Math.round(Number(r) || 0);
  return `<span class="stars ${size}" aria-label="${r} out of 5">${'★'.repeat(full)}<span class="off">${'★'.repeat(5 - full)}</span></span>`;
}
function storeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function storeSet(k, v) { try { localStorage.setItem(k, v); } catch {} }

const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const DAY_NAMES = { mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat', sun: 'Sun' };
const DAY_FULL = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };

// {"mon":["16:00","21:00"],...} -> "Mon – Sat, 4:00 PM – 9:00 PM"
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
function worksToday(d) {
  const key = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date(todayPK() + 'T00:00:00').getDay()];
  return !!d.schedule[key];
}
const isBookable = d => Object.keys(d.schedule || {}).length > 0;

// Specialty info used on Home, Services and Doctors pages
const SPECIALTIES = [
  { key: 'Ophthalmologist', name: 'Eye Care', icon: '👁️', short: 'Eye check-ups, vision problems, eye infections, cataract and glaucoma assessment.',
    conditions: ['Blurred or weak vision', 'Red, itchy or watery eyes', 'Eye infections and allergies', 'Cataract assessment', 'Glaucoma screening', 'Diabetic eye check-ups'] },
  { key: 'ENT Specialist', name: 'ENT (Ear, Nose & Throat)', icon: '👂', short: 'Ear, nose, throat and sinus problems in adults and children.',
    conditions: ['Ear pain, discharge and wax', 'Hearing problems', 'Sinusitis and nasal blockage', 'Tonsils and sore throat', 'Allergic rhinitis', 'Voice and swallowing problems'] },
  { key: 'Cardiologist', name: 'Cardiology', icon: '❤️', short: 'Heart health, chest pain, blood pressure and cholesterol.',
    conditions: ['Chest pain and palpitations', 'High blood pressure', 'High cholesterol', 'Heart failure follow-up', 'Shortness of breath', 'Heart check-ups before surgery'] },
  { key: 'Gynecologist', name: 'Gynecology & Obstetrics', icon: '🤰', short: 'Pregnancy care and women’s health at every age.',
    conditions: ['Antenatal (pregnancy) check-ups', 'Irregular or painful periods', 'PCOS', 'Infertility consultation', 'Family planning', 'Menopause problems'] },
  { key: 'Dermatologist', name: 'Dermatology', icon: '🧴', short: 'Skin, hair and nail problems.',
    conditions: ['Acne and scars', 'Eczema and allergies', 'Fungal infections', 'Hair fall', 'Pigmentation and melasma', 'Psoriasis'] },
  { key: 'Pediatrician', name: 'Pediatrics', icon: '👶', short: 'Newborn care, vaccination, child nutrition, growth and childhood illnesses.',
    conditions: ['Newborn check-ups', 'Vaccination schedule', 'Fever, cough, diarrhoea and infections', 'Growth and development concerns', 'Child nutrition and feeding advice', 'Asthma and allergies in children'] },
  { key: 'Dentist', name: 'Dental Care', icon: '🦷', short: 'Check-ups, fillings, extractions and gum care.',
    conditions: ['Toothache and cavities', 'Fillings', 'Tooth extraction', 'Scaling and gum problems', 'Children’s dental care', 'Bad breath'] },
  { key: 'Physiotherapist', name: 'Physiotherapy', icon: '🦵', short: 'Rehabilitation for pain, injuries, stroke and after surgery.',
    conditions: ['Back and neck pain', 'Knee and joint pain', 'Sports injuries', 'Stroke rehabilitation', 'Frozen shoulder', 'Rehab after fractures and surgery'] },
  { key: 'Nutritionist', name: 'Nutrition & Diet', icon: '🥗', short: 'Diet plans for weight, diabetes, pregnancy and children.',
    conditions: ['Weight loss and weight gain', 'Diet for diabetes and blood pressure', 'Pregnancy and breastfeeding nutrition', 'Child nutrition', 'High cholesterol diet'] },
  { key: 'Psychologist', name: 'Psychology', icon: '🧠', short: 'Anxiety, depression, stress, family counselling and child behaviour.',
    conditions: ['Anxiety and panic attacks', 'Depression and low mood', 'OCD', 'Stress and anger management', 'Family and marriage counselling', 'Child behaviour and learning problems'] },
  { key: null, name: 'Laboratory', icon: '🔬', short: 'Blood and urine tests under a qualified pathologist.',
    conditions: ['Blood tests (CBC, sugar, cholesterol, thyroid)', 'Urine and stool tests', 'Liver and kidney function tests', 'Tests ordered by our doctors'] },
  { key: null, name: 'Pharmacy', icon: '💊', short: 'In-house pharmacy run by a qualified pharmacist (Pharm-D).',
    conditions: ['Prescription medicines', 'Advice on how to take your medicines', 'Medicines prescribed by our doctors'] }
];

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
    throw Object.assign(new Error(msg), { status: data?.code === '28000' ? 401 : data?.code === '23505' ? 409 : res.status, code: data?.code });
  }
  return data;
}

// Doctor card used on Home and Doctors pages
function doctorCard(d) {
  const today = isBookable(d) && worksToday(d);
  return `<article class="card doc-card">
    <div class="doc-top"><div class="avatar">${esc(initials(d.name))}</div>
      <div><h3><a href="doctor.html?id=${d.id}" class="plain">${esc(d.name)}</a></h3><span class="tag">${esc(d.specialty)}</span>
      ${d.title ? `<div class="muted small">${esc(d.title)}</div>` : ''}</div></div>
    ${d.review_count ? `<div class="rating-line">${stars(d.rating)} <b>${d.rating}</b> <span class="muted">(${d.review_count} review${d.review_count > 1 ? 's' : ''})</span></div>` : ''}
    ${d.qualifications ? `<p class="quals">${esc(d.qualifications)}</p>` : ''}
    <div class="doc-meta">
      ${d.experience ? `<span>Experience: <b>${d.experience} yrs</b></span>` : ''}
      ${d.fee ? `<span>Fee: <b>Rs. ${d.fee.toLocaleString()}</b></span>` : ''}
    </div>
    <div class="timing">🕒 ${esc(scheduleText(d.schedule))}${today ? ' <span class="pill green">Available today</span>' : ''}</div>
    <div class="card-actions">
      <a class="btn outline" href="doctor.html?id=${d.id}">View Profile</a>
      ${isBookable(d) ? `<a class="btn" href="book.html?doctor=${d.id}">Book</a>` : `<a class="btn" href="${tel(HOSPITAL.phone1)}">Call to Book</a>`}
    </div>
  </article>`;
}

// ---------- site settings ----------
let siteReady;
function loadSite() {
  if (siteReady) return siteReady;
  let cached = null;
  try { cached = JSON.parse(sessionStorage.getItem('amc_site') || 'null'); } catch {}
  if (cached) Object.entries(cached).forEach(([k, v]) => { if (v || k === 'announcement') HOSPITAL[k] = v; });
  siteReady = rpc('amc_site').then(s => {
    Object.entries(s).forEach(([k, v]) => { if (v || k === 'announcement') HOSPITAL[k] = v; });
    try { sessionStorage.setItem('amc_site', JSON.stringify(s)); } catch {}
  }).catch(() => {});
  return siteReady;
}

// Fill elements like <a data-site="phone1"></a>
function fillSite() {
  document.querySelectorAll('[data-site]').forEach(el => {
    const k = el.dataset.site, v = HOSPITAL[k];
    if (k === 'phone1' || k === 'phone2') { el.textContent = v; if (el.tagName === 'A') el.href = tel(v); }
    else if (k === 'whatsapp') { if (el.tagName === 'A') el.href = waLink('Assalam o Alaikum, I want to ask about an appointment at Ali Medical Complex.'); }
    else if (k === 'maps') { el.href = HOSPITAL.mapsUrl; }
    else el.textContent = v;
  });
}

// ---------- header / footer ----------
function renderChrome() {
  const here = location.pathname.split('/').pop() || 'index.html';
  const nav = [['index.html', 'Home'], ['about.html', 'About'], ['team.html', 'Our Team'], ['doctors.html', 'Doctors'], ['services.html', 'Services'], ['faq.html', 'FAQs'], ['contact.html', 'Contact'], ['my-booking.html', 'My Booking']];
  const header = document.getElementById('site-header');
  if (header) header.innerHTML = `
    <a class="skip" href="#main">Skip to content</a>
    ${HOSPITAL.announcement ? `<div class="announce" role="status">📢 ${esc(HOSPITAL.announcement)}</div>` : ''}
    <div class="topbar"><div class="container">
      <span>📍 ${esc(HOSPITAL.address)}</span>
      <span>📞 <a href="${tel(HOSPITAL.phone1)}">${esc(HOSPITAL.phone1)}</a>${HOSPITAL.phone2 ? `<span class="hide-sm"> · <a href="${tel(HOSPITAL.phone2)}">${esc(HOSPITAL.phone2)}</a></span>` : ''}</span>
    </div></div>
    <header class="site"><div class="container">
      <a class="brand" href="index.html"><img src="favicon.svg" alt="" class="logo-img"><span>${HOSPITAL.name}<small>Suraj Miani Road, Multan</small></span></a>
      <div class="head-right">
        <button type="button" class="lang-btn" data-no-tr onclick="setLang(typeof LANG !== 'undefined' && LANG === 'ur' ? 'en' : 'ur')" aria-label="${typeof LANG !== 'undefined' && LANG === 'ur' ? 'Switch to English' : 'اردو میں دیکھیں'}">${typeof LANG !== 'undefined' && LANG === 'ur' ? 'English' : 'اردو'}</button>
        <button class="menu-btn" aria-label="Open menu" aria-expanded="false">☰</button>
      </div>
      <nav class="main" aria-label="Main">
        ${nav.map(([h, t]) => `<a href="${h}"${here === h ? ' class="active" aria-current="page"' : ''}>${t}</a>`).join('')}
        <a class="btn small" href="book.html">Book Appointment</a>
      </nav>
    </div></header>`;
  const mb = document.querySelector('.menu-btn');
  if (mb) mb.onclick = () => { const n = document.querySelector('nav.main'); n.classList.toggle('open'); mb.setAttribute('aria-expanded', n.classList.contains('open')); };

  const footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML = `
    <footer class="site"><div class="container">
      <div class="cols">
        <div><h4>${HOSPITAL.name}</h4><p>Specialists, allied health, laboratory and pharmacy under one roof for families in Multan.</p>
          <p>${HOSPITAL.facebook ? `<a href="${esc(HOSPITAL.facebook)}" target="_blank" rel="noopener">Facebook</a> · ` : ''}<a href="${waLink()}" target="_blank" rel="noopener">WhatsApp</a></p></div>
        <div><h4>Hospital</h4><ul>
          <li><a href="about.html">About Us</a></li><li><a href="team.html">Our Team</a></li><li><a href="doctors.html">Our Doctors</a></li>
          <li><a href="services.html">Services</a></li><li><a href="contact.html">Contact</a></li></ul></div>
        <div><h4>Patients</h4><ul>
          <li><a href="book.html">Book Appointment</a></li><li><a href="my-booking.html">Check / Cancel Booking</a></li>
          <li><a href="my-booking.html#review">Leave a Review</a></li><li><a href="faq.html">FAQs</a></li><li><a href="verify.html">Verify a Document</a></li></ul></div>
        <div><h4>Contact</h4><ul>
          <li>${esc(HOSPITAL.address)}</li>
          <li><a href="${tel(HOSPITAL.phone1)}">${esc(HOSPITAL.phone1)}</a></li>
          ${HOSPITAL.phone2 ? `<li><a href="${tel(HOSPITAL.phone2)}">${esc(HOSPITAL.phone2)}</a></li>` : ''}
          ${HOSPITAL.email ? `<li><a href="mailto:${esc(HOSPITAL.email)}">${esc(HOSPITAL.email)}</a></li>` : ''}
          <li><a href="${HOSPITAL.mapsUrl}" target="_blank" rel="noopener">Get Directions</a></li></ul></div>
      </div>
      <div class="copy">© ${new Date().getFullYear()} ${HOSPITAL.name}, Multan. All rights reserved. · <a href="admin.html">Staff Login</a></div>
    </div></footer>
    <a class="wa-float" href="${waLink('Assalam o Alaikum, I want to ask about an appointment at Ali Medical Complex.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true"><path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.3.6 4.5 1.8 6.5L3 29l6.9-1.8c1.9 1 4 1.6 6.1 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3zm0 23.4c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1.1-1.7-1.6-3.6-1.6-5.6 0-5.9 4.9-10.6 10.8-10.6s10.8 4.8 10.8 10.6S21.9 26.4 16 26.4zm5.9-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1c-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2s0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.8 5 .8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
    </a>`;
  fillSite();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('site-header')) return;
  loadSite();
  renderChrome();                         // render immediately with cached/default info
  siteReady.then(renderChrome);           // re-render once latest settings arrive
});
