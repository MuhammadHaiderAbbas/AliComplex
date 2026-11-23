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
  website: 'https://alimedicalcomplex.health/',
  legal_name: 'Ali Medical Complex',
  signatory_name: 'Dr. Shahid Javed Ch.',
  signatory_title: 'Director',
  provisional_note: '',
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
  { key: 'Diabetes & Hormone', name: 'Diabetes & Hormones', icon: 'drop', short: 'Diabetes (including in pregnancy), thyroid, hormonal disorders, infertility, obesity and puberty problems.',
    conditions: ['Diabetes and its complications', 'Diabetes during pregnancy', 'Thyroid disorders', 'Deficiency or excess of hormones', 'Male and female infertility', 'Obesity and related problems', 'Excessive facial and body hair', 'Early or delayed puberty', 'Hormonal problems in children', 'Menstrual and reproductive hormonal problems'] },
  { key: 'Ophthalmologist', name: 'Eye Care', icon: 'eye', short: 'Eye check-ups, vision problems, eye infections, cataract and glaucoma assessment.',
    conditions: ['Blurred or weak vision', 'Red, itchy or watery eyes', 'Eye infections and allergies', 'Cataract assessment', 'Glaucoma screening', 'Diabetic eye check-ups'] },
  { key: 'ENT Specialist', name: 'ENT (Ear, Nose & Throat)', icon: 'ear', short: 'Ear, nose, throat and sinus problems in adults and children.',
    conditions: ['Ear pain, discharge and wax', 'Hearing problems', 'Sinusitis and nasal blockage', 'Tonsils and sore throat', 'Allergic rhinitis', 'Voice and swallowing problems'] },
  { key: 'Cardiologist', name: 'Cardiology', icon: 'heart', short: 'Heart health, chest pain, blood pressure and cholesterol.',
    conditions: ['Chest pain and palpitations', 'High blood pressure', 'High cholesterol', 'Heart failure follow-up', 'Shortness of breath', 'Heart check-ups before surgery'] },
  { key: 'Gynecologist', name: 'Gynecology & Obstetrics', icon: 'pregnant', short: 'Pregnancy care and women’s health at every age.',
    conditions: ['Antenatal (pregnancy) check-ups', 'Irregular or painful periods', 'PCOS', 'Infertility consultation', 'Family planning', 'Menopause problems'] },
  { key: 'Dermatologist', name: 'Dermatology', icon: 'skin', short: 'Skin, hair and nail problems.',
    conditions: ['Acne and scars', 'Eczema and allergies', 'Fungal infections', 'Hair fall', 'Pigmentation and melasma', 'Psoriasis'] },
  { key: 'Pediatrician', name: 'Pediatrics', icon: 'baby', short: 'Newborn care, vaccination, child nutrition, growth and childhood illnesses.',
    conditions: ['Newborn check-ups', 'Vaccination schedule', 'Fever, cough, diarrhoea and infections', 'Growth and development concerns', 'Child nutrition and feeding advice', 'Asthma and allergies in children'] },
  { key: 'Dentist', name: 'Dental Care', icon: 'tooth', short: 'Check-ups, fillings, extractions and gum care.',
    conditions: ['Toothache and cavities', 'Fillings', 'Tooth extraction', 'Scaling and gum problems', 'Children’s dental care', 'Bad breath'] },
  { key: 'Physiotherapist', name: 'Physiotherapy', icon: 'activity', short: 'Rehabilitation for pain, injuries, stroke and after surgery.',
    conditions: ['Back and neck pain', 'Knee and joint pain', 'Sports injuries', 'Stroke rehabilitation', 'Frozen shoulder', 'Rehab after fractures and surgery'] },
  { key: 'Nutritionist', name: 'Nutrition & Diet', icon: 'apple', short: 'Diet plans for weight, diabetes, pregnancy and children.',
    conditions: ['Weight loss and weight gain', 'Diet for diabetes and blood pressure', 'Pregnancy and breastfeeding nutrition', 'Child nutrition', 'High cholesterol diet'] },
  { key: 'Psychologist', name: 'Psychology', icon: 'brain', short: 'Anxiety, depression, stress, family counselling and child behaviour.',
    conditions: ['Anxiety and panic attacks', 'Depression and low mood', 'OCD', 'Stress and anger management', 'Family and marriage counselling', 'Child behaviour and learning problems'] },
  { key: null, name: 'Laboratory', icon: 'flask', short: 'Blood and urine tests under a qualified pathologist.',
    conditions: ['Blood tests (CBC, sugar, cholesterol, thyroid)', 'Urine and stool tests', 'Liver and kidney function tests', 'Tests ordered by our doctors'] },
  { key: null, name: 'Pharmacy', icon: 'pill', short: 'In-house pharmacy run by a qualified pharmacist (Pharm-D).',
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

// ---------- icons (simple line icons, 24x24) ----------
const ICON_PATHS = {
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  ear: '<path d="M6 8.5a6 6 0 1 1 12 0c0 6-6 6-6 10a3.5 3.5 0 0 1-7 0"/><path d="M15 8.5a3 3 0 0 0-6 0c0 2 2 2.5 2 4.5"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/>',
  pregnant: '<circle cx="12" cy="4" r="2"/><path d="M10 21v-5l-1.5-1.5a3 3 0 0 1 0-4.2L10 9h2.5a5 5 0 0 1 4.5 5 3.5 3.5 0 0 1-3.5 3.5H13V21"/>',
  skin: '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/><circle cx="12" cy="12" r="3.5"/>',
  baby: '<circle cx="12" cy="9" r="5"/><path d="M10 8.5h.01M14 8.5h.01M10.5 11a2 2 0 0 0 3 0"/><path d="M7 21a5 5 0 0 1 10 0"/>',
  tooth: '<path d="M12 5.5C10 3.5 7 3 5.5 4.5 3.5 6.5 4.5 10 6 12.5c1 1.8.8 4 1.3 6.2.3 1.6 2.2 1.8 2.6.2L11 15h2l1.1 3.9c.4 1.6 2.3 1.4 2.6-.2.5-2.2.3-4.4 1.3-6.2 1.5-2.5 2.5-6-.5-8-1.5-1.5-4.5-1-6.5 1z"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  apple: '<path d="M12 7c-1.5-1-5-1.5-6.5 1.5S5 16 7 19s3.5 2.5 5 1.5c1.5 1 3 1.5 5-1.5s2.5-7.5 1-10.5S13.5 6 12 7z"/><path d="M12 7c0-2 1-3.5 3-4"/>',
  brain: '<path d="M9.5 3a3 3 0 0 0-3 3 3 3 0 0 0-2.5 4.5A3.5 3.5 0 0 0 5.5 17a3 3 0 0 0 4 3 2.5 2.5 0 0 0 2.5-2.5V5.5A2.5 2.5 0 0 0 9.5 3z"/><path d="M14.5 3a3 3 0 0 1 3 3 3 3 0 0 1 2.5 4.5 3.5 3.5 0 0 1-1.5 6.5 3 3 0 0 1-4 3 2.5 2.5 0 0 1-2.5-2.5"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3"/><path d="M7 15h10"/>',
  pill: '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M8.5 8.5l7 7"/>',
  calendar: '<rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M8 14h2M14 14h2M8 18h2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
  clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2.5h6v3H9zM8.5 12l2.5 2.5 4.5-4.5"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  wallet: '<rect x="2.5" y="5.5" width="19" height="14" rx="2.5"/><path d="M16 12.5h.01M2.5 9.5h19"/>',
  shield: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="M8.5 12l2.5 2.5 4.5-4.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5a4.5 4.5 0 0 1 4.5 4.5"/>',
  stethoscope: '<path d="M5 3v5a5 5 0 0 0 10 0V3"/><path d="M10 13v2a5 5 0 0 0 10 0v-2"/><circle cx="20" cy="11" r="2"/>',
  star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z"/>',
  check: '<path d="M4.5 12.5l5 5 10-11"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/>',
  hospital: '<path d="M3 21h18M5 21V7l7-4 7 4v14"/><path d="M10 21v-4h4v4M12 8v4M10 10h4"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  drop: '<path d="M12 2.5s6.5 7.2 6.5 12a6.5 6.5 0 0 1-13 0c0-4.8 6.5-12 6.5-12z"/><path d="M9 15a3 3 0 0 0 3 3"/>'
};
function icon(name, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ICON_PATHS.info}</svg>`;
}

// ---------- avatars: real photo if uploaded, otherwise an illustrated portrait ----------
const AVATAR_TINTS = [['#dde9fb', '#1257b8'], ['#e3e9f7', '#3a5a9b'], ['#f6e6dc', '#a4572b'], ['#e4f1e4', '#2f7a3a'], ['#f3e2ec', '#9b3f6c'], ['#efe9dc', '#7a6230']];
function hashStr(s) { let h = 0; for (const c of String(s)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }
function avatarHTML(p, cls = '') {
  const alt = esc(p.name || '');
  if (p.photo) return `<img class="avatar-img ${cls}" src="${esc(p.photo)}" alt="Photo of ${alt}" loading="lazy">`;
  const [bg, fg] = AVATAR_TINTS[hashStr(p.name) % AVATAR_TINTS.length];
  const clinical = /^(Dr|Dt)\.?\s/i.test(p.name || '') || /doctor|specialist|ologist|dentist|therapist|pharmacist|nurse/i.test((p.role || p.specialty || ''));
  const id = 'c' + hashStr(p.name) + cls.length;
  return `<svg class="avatar-svg ${cls}" viewBox="0 0 80 80" role="img" aria-label="${alt}">
    <defs><clipPath id="${id}"><circle cx="40" cy="40" r="40"/></clipPath></defs>
    <circle cx="40" cy="40" r="40" fill="${bg}"/>
    <g clip-path="url(#${id})">
      <path d="M10 84c1-19 13-28 30-28s29 9 30 28z" fill="${clinical ? '#ffffff' : fg}" ${clinical ? 'stroke="#d5e3e5" stroke-width="1.2"' : 'opacity=".9"'}/>
      ${clinical ? `<path d="M33.5 56.5L40 68l6.5-11.5" fill="${fg}" opacity=".9"/><path d="M28 59c-1 8 1 13 5 15M52 59c1 8-1 13-5 15" fill="none" stroke="#3b4a52" stroke-width="1.8" stroke-linecap="round"/><circle cx="47" cy="74.5" r="2.4" fill="#3b4a52"/>` : ''}
      <path d="M35 46h10v10a5 5 0 0 1-10 0z" fill="#e2b48f"/>
      <circle cx="40" cy="33" r="14" fill="#eac19c"/>
      <path d="M26 33c-1-11 6-18 14-18s15 7 14 18c-3-6-8-9-14-9s-11 3-14 9z" fill="${fg}"/>
    </g>
  </svg>`;
}

function provisionalNote(small = false) {
  return HOSPITAL.provisional_note ? `<div class="prov ${small ? 'small' : ''}">${icon('info')}<span>${esc(HOSPITAL.provisional_note)}</span></div>` : '';
}

// Doctor card used on Home and Doctors pages
function doctorCard(d) {
  const today = isBookable(d) && worksToday(d);
  return `<article class="card doc-card reveal">
    <div class="doc-top"><a href="doctor.html?id=${d.id}" class="plain">${avatarHTML(d, 'avatar-lg')}</a>
      <div><h3><a href="doctor.html?id=${d.id}" class="plain">${esc(d.name)}</a></h3><span class="tag">${esc(d.specialty)}</span>
      ${d.title ? `<div class="muted small">${esc(d.title)}</div>` : ''}</div></div>
    ${d.review_count ? `<div class="rating-line">${stars(d.rating)} <b>${d.rating}</b> <span class="muted">(${d.review_count} review${d.review_count > 1 ? 's' : ''})</span></div>` : ''}
    ${d.qualifications ? `<p class="quals">${esc(d.qualifications)}</p>` : ''}
    <div class="doc-facts">
      ${d.fee ? `<div>${icon('wallet')}<span>Fee</span><b>Rs. ${d.fee.toLocaleString()}</b></div>` : ''}
      ${d.experience ? `<div>${icon('star')}<span>Experience</span><b>${d.experience} yrs</b></div>` : ''}
    </div>
    <div class="timing">${icon('clock')}<span>${esc(scheduleText(d.schedule))}</span>${today ? '<span class="pill green">Available today</span>' : ''}</div>
    <div class="card-actions">
      <a class="btn outline" href="doctor.html?id=${d.id}">View Profile</a>
      ${isBookable(d) ? `<a class="btn" href="book.html?doctor=${d.id}">Book</a>` : `<a class="btn" href="${tel(HOSPITAL.phone1)}">Call to Book</a>`}
    </div>
  </article>`;
}

// ---------- fade-in on scroll ----------
function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.shown)');
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach(e => e.classList.add('shown')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -40px 0px' });
  els.forEach(e => io.observe(e));
}
new MutationObserver(() => initReveal()).observe(document.documentElement, { childList: true, subtree: true });

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
      <a class="brand" href="index.html"><img class="logo-svg" src="brand/logo-mark.svg" alt="" width="44" height="46"><span>${HOSPITAL.name}<small>Suraj Miani Road, Multan</small></span></a>
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
        <div><h4 class="foot-brand"><img class="logo-svg sm" src="brand/logo-mark-white.svg" alt="" width="34" height="36">${HOSPITAL.name}</h4><p>Specialists, allied health, laboratory and pharmacy under one roof for families in Multan.</p>
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

// Replace <span class="ic-slot" data-icon="name"></span> placeholders with icons
function fillIcons(root = document) {
  root.querySelectorAll('.ic-slot[data-icon]').forEach(el => { el.outerHTML = icon(el.dataset.icon); });
}
document.addEventListener('DOMContentLoaded', () => fillIcons());
