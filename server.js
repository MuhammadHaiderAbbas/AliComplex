const express = require('express');
const crypto = require('crypto');
const path = require('path');
const db = require('./db');

const app = express();
app.use(express.json({ limit: '50kb' }));
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
if (!process.env.ADMIN_PASSWORD) console.warn('WARNING: using default admin password "admin123". Set ADMIN_PASSWORD before going live.');

const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'];

// ---------- helpers ----------
const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
const toHHMM = m => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

// Current date/time in Pakistan, regardless of server timezone
function nowPK() {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false
  }).formatToParts(new Date()).map(x => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, minutes: (Number(p.hour) % 24) * 60 + Number(p.minute) };
}
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s + 'T00:00:00Z'));
const dayKey = date => DAYS[new Date(date + 'T00:00:00Z').getUTCDay()];

function publicDoctor(d) {
  return { ...d, schedule: JSON.parse(d.schedule || '{}'), active: !!d.active };
}

function getSlots(doctor, date) {
  const sched = JSON.parse(doctor.schedule || '{}')[dayKey(date)];
  if (!sched) return [];
  const step = doctor.slot_minutes || 20;
  const booked = new Set(db.prepare(`SELECT time FROM appointments WHERE doctor_id=? AND date=? AND status!='cancelled'`)
    .all(doctor.id, date).map(r => r.time));
  const now = nowPK();
  const slots = [];
  for (let m = toMin(sched[0]); m + step <= toMin(sched[1]) + (sched[1] === '23:59' ? 1 : 0); m += step) {
    if (date === now.date && m <= now.minutes) continue;
    slots.push({ time: toHHMM(m), available: !booked.has(toHHMM(m)) });
  }
  return slots;
}

const clean = (v, max = 200) => String(v ?? '').trim().slice(0, max);

// ---------- public API ----------
app.get('/api/doctors', (req, res) => {
  const rows = db.prepare('SELECT * FROM doctors WHERE active=1 ORDER BY sort_order, id').all();
  res.json(rows.map(publicDoctor));
});

app.get('/api/slots', (req, res) => {
  const { doctorId, date } = req.query;
  if (!isDate(date)) return res.status(400).json({ error: 'Invalid date' });
  const doc = db.prepare('SELECT * FROM doctors WHERE id=? AND active=1').get(Number(doctorId));
  if (!doc) return res.status(404).json({ error: 'Doctor not found' });
  if (date < nowPK().date) return res.json({ slots: [] });
  res.json({ slots: getSlots(doc, date) });
});

app.post('/api/appointments', (req, res) => {
  const b = req.body || {};
  const name = clean(b.name, 80), phone = clean(b.phone, 20).replace(/[\s-]/g, ''), reason = clean(b.reason, 500);
  const gender = ['Male', 'Female', 'Other'].includes(b.gender) ? b.gender : null;
  const age = b.age === '' || b.age == null ? null : Number(b.age);
  const date = clean(b.date, 10), time = clean(b.time, 5);

  if (name.length < 2) return res.status(400).json({ error: 'Please enter the patient name.' });
  if (!/^(\+92|0)3\d{9}$|^(\+92|0)\d{9,10}$/.test(phone)) return res.status(400).json({ error: 'Please enter a valid Pakistani phone number, e.g. 03001234567.' });
  if (age !== null && (!Number.isInteger(age) || age < 0 || age > 120)) return res.status(400).json({ error: 'Please enter a valid age.' });
  if (!isDate(date)) return res.status(400).json({ error: 'Please choose a date.' });

  const doc = db.prepare('SELECT * FROM doctors WHERE id=? AND active=1').get(Number(b.doctorId));
  if (!doc) return res.status(400).json({ error: 'Please choose a doctor.' });
  const slot = getSlots(doc, date).find(s => s.time === time);
  if (!slot) return res.status(400).json({ error: 'That time is not available. Please pick another slot.' });
  if (!slot.available) return res.status(409).json({ error: 'Sorry, that slot was just booked. Please pick another.' });

  const ref = 'AMC-' + crypto.randomBytes(3).toString('hex').toUpperCase();
  try {
    db.prepare(`INSERT INTO appointments (ref,doctor_id,date,time,patient_name,phone,age,gender,reason)
                VALUES (?,?,?,?,?,?,?,?,?)`).run(ref, doc.id, date, time, name, phone, age, gender, reason);
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) return res.status(409).json({ error: 'Sorry, that slot was just booked. Please pick another.' });
    throw e;
  }
  res.status(201).json({ ref, doctor: doc.name, date, time, fee: doc.fee, status: 'pending' });
});

// Patients check their booking with reference + phone
app.get('/api/appointments/lookup', (req, res) => {
  const ref = clean(req.query.ref, 20).toUpperCase(), phone = clean(req.query.phone, 20).replace(/[\s-]/g, '');
  const a = db.prepare(`SELECT a.ref,a.date,a.time,a.status,a.patient_name,d.name AS doctor,d.specialty,d.fee
                        FROM appointments a JOIN doctors d ON d.id=a.doctor_id WHERE a.ref=? AND a.phone=?`).get(ref, phone);
  if (!a) return res.status(404).json({ error: 'No booking found with that reference and phone number.' });
  res.json(a);
});

app.post('/api/appointments/cancel', (req, res) => {
  const ref = clean(req.body?.ref, 20).toUpperCase(), phone = clean(req.body?.phone, 20).replace(/[\s-]/g, '');
  const r = db.prepare(`UPDATE appointments SET status='cancelled' WHERE ref=? AND phone=? AND status IN ('pending','confirmed')`).run(ref, phone);
  if (!r.changes) return res.status(400).json({ error: 'This booking cannot be cancelled.' });
  res.json({ ok: true });
});

// ---------- admin ----------
const sessions = new Map(); // token -> expiry
function auth(req, res, next) {
  const t = (req.headers.authorization || '').replace('Bearer ', '');
  const exp = sessions.get(t);
  if (!exp || exp < Date.now()) { sessions.delete(t); return res.status(401).json({ error: 'Please log in again.' }); }
  next();
}

app.post('/api/admin/login', (req, res) => {
  const pw = String(req.body?.password || '');
  const ok = pw.length === ADMIN_PASSWORD.length && crypto.timingSafeEqual(Buffer.from(pw), Buffer.from(ADMIN_PASSWORD));
  if (!ok) return res.status(401).json({ error: 'Wrong password.' });
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, Date.now() + 12 * 3600 * 1000);
  res.json({ token });
});

app.get('/api/admin/stats', auth, (req, res) => {
  const today = nowPK().date;
  const q = sql => db.prepare(sql).get(today).n;
  res.json({
    today: q(`SELECT COUNT(*) n FROM appointments WHERE date=? AND status!='cancelled'`),
    pending: db.prepare(`SELECT COUNT(*) n FROM appointments WHERE status='pending' AND date>=?`).get(today).n,
    upcoming: q(`SELECT COUNT(*) n FROM appointments WHERE date>=? AND status IN ('pending','confirmed')`),
    total: db.prepare('SELECT COUNT(*) n FROM appointments').get().n,
    todayDate: today
  });
});

app.get('/api/admin/appointments', auth, (req, res) => {
  const where = [], args = [];
  if (isDate(req.query.date || '')) { where.push('a.date=?'); args.push(req.query.date); }
  if (STATUSES.includes(req.query.status)) { where.push('a.status=?'); args.push(req.query.status); }
  if (req.query.doctorId) { where.push('a.doctor_id=?'); args.push(Number(req.query.doctorId)); }
  if (req.query.q) { where.push('(a.patient_name LIKE ? OR a.phone LIKE ? OR a.ref LIKE ?)'); const s = `%${clean(req.query.q, 50)}%`; args.push(s, s, s); }
  const rows = db.prepare(`SELECT a.*, d.name AS doctor, d.specialty FROM appointments a JOIN doctors d ON d.id=a.doctor_id
                           ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY a.date DESC, a.time ASC LIMIT 500`).all(...args);
  res.json(rows);
});

app.patch('/api/admin/appointments/:id', auth, (req, res) => {
  const status = req.body?.status;
  if (!STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  try {
    const r = db.prepare('UPDATE appointments SET status=? WHERE id=?').run(status, Number(req.params.id));
    if (!r.changes) return res.status(404).json({ error: 'Not found' });
  } catch (e) {
    if (String(e.message).includes('UNIQUE')) return res.status(409).json({ error: 'That slot has since been booked by someone else.' });
    throw e;
  }
  res.json({ ok: true });
});

app.get('/api/admin/doctors', auth, (req, res) => {
  res.json(db.prepare('SELECT * FROM doctors ORDER BY sort_order, id').all().map(publicDoctor));
});

function doctorFields(b) {
  const sched = {};
  for (const d of DAYS) {
    const v = b.schedule?.[d];
    if (Array.isArray(v) && /^\d{2}:\d{2}$/.test(v[0]) && /^\d{2}:\d{2}$/.test(v[1]) && toMin(v[0]) < toMin(v[1])) sched[d] = [v[0], v[1]];
  }
  const f = {
    name: clean(b.name, 80), title: clean(b.title, 80), specialty: clean(b.specialty, 60),
    qualifications: clean(b.qualifications, 400), experience: Math.max(0, parseInt(b.experience) || 0),
    fee: Math.max(0, parseInt(b.fee) || 0), bio: clean(b.bio, 1000), schedule: JSON.stringify(sched),
    slot_minutes: [10, 15, 20, 30, 45, 60].includes(Number(b.slot_minutes)) ? Number(b.slot_minutes) : 20,
    active: b.active === false ? 0 : 1, sort_order: parseInt(b.sort_order) || 0
  };
  if (!f.name || !f.specialty) return null;
  return f;
}

app.post('/api/admin/doctors', auth, (req, res) => {
  const f = doctorFields(req.body || {});
  if (!f) return res.status(400).json({ error: 'Name and specialty are required.' });
  const r = db.prepare(`INSERT INTO doctors (name,title,specialty,qualifications,experience,fee,bio,schedule,slot_minutes,active,sort_order)
    VALUES (?,?,?,?,?,?,?,?,?,?,?)`).run(...Object.values(f));
  res.status(201).json({ id: Number(r.lastInsertRowid) });
});

app.put('/api/admin/doctors/:id', auth, (req, res) => {
  const f = doctorFields(req.body || {});
  if (!f) return res.status(400).json({ error: 'Name and specialty are required.' });
  db.prepare(`UPDATE doctors SET name=?,title=?,specialty=?,qualifications=?,experience=?,fee=?,bio=?,schedule=?,slot_minutes=?,active=?,sort_order=? WHERE id=?`)
    .run(...Object.values(f), Number(req.params.id));
  res.json({ ok: true });
});

app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: 'Something went wrong. Please try again.' }); });

app.listen(PORT, () => console.log(`Ali Medical Complex site running at http://localhost:${PORT}`));
