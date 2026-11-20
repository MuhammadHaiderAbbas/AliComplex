// Database setup (uses Node's built-in SQLite, no extra install needed)
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(path.join(DATA_DIR, 'hospital.db'));
db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;');

db.exec(`
CREATE TABLE IF NOT EXISTS doctors (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  name           TEXT NOT NULL,
  title          TEXT DEFAULT '',
  specialty      TEXT NOT NULL,
  qualifications TEXT DEFAULT '',
  experience     INTEGER DEFAULT 0,
  fee            INTEGER DEFAULT 0,
  bio            TEXT DEFAULT '',
  -- schedule: JSON like {"mon":["16:00","21:00"], ...}; empty = booking by phone only
  schedule       TEXT DEFAULT '{}',
  slot_minutes   INTEGER DEFAULT 20,
  active         INTEGER DEFAULT 1,
  sort_order     INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS appointments (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  ref          TEXT UNIQUE NOT NULL,
  doctor_id    INTEGER NOT NULL REFERENCES doctors(id),
  date         TEXT NOT NULL,   -- YYYY-MM-DD
  time         TEXT NOT NULL,   -- HH:MM
  patient_name TEXT NOT NULL,
  phone        TEXT NOT NULL,
  age          INTEGER,
  gender       TEXT,
  reason       TEXT DEFAULT '',
  status       TEXT NOT NULL DEFAULT 'pending', -- pending | confirmed | completed | cancelled | no-show
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

-- One active booking per doctor per time slot
CREATE UNIQUE INDEX IF NOT EXISTS uniq_slot
  ON appointments(doctor_id, date, time) WHERE status NOT IN ('cancelled');
`);

// Seed doctors on first run (data from the hospital's Marham listing)
const count = db.prepare('SELECT COUNT(*) AS n FROM doctors').get().n;
if (count === 0) {
  const sixDays = (s, e) => ({ mon: [s, e], tue: [s, e], wed: [s, e], thu: [s, e], fri: [s, e], sat: [s, e] });
  const fiveDays = (s, e) => ({ mon: [s, e], tue: [s, e], wed: [s, e], thu: [s, e], fri: [s, e] });
  const seed = [
    {
      name: 'Dr. Mehboob Qadir', title: 'Assistant Professor', specialty: 'Endocrinologist',
      qualifications: 'MBBS, FCPS (Medicine), FCPS (Endocrinology), MRCP-SCE Endocrinology (RCP UK), EBEEDM (European Board of Endocrinology)',
      experience: 6, fee: 2500,
      bio: 'Specialist in diabetes, thyroid disorders, hormonal problems, hypertension and weight management. Former Senior Registrar, Nishtar Hospital Multan.',
      schedule: sixDays('16:00', '21:00')
    },
    {
      name: 'Dr. Aamir Iqbal', title: '', specialty: 'Pediatrician',
      qualifications: 'MBBS, MD (Pediatrics)', experience: 7, fee: 1000,
      bio: 'Child specialist covering newborn care, vaccination, childhood nutrition, growth and development. Former Registrar, Nishtar Hospital Multan.',
      schedule: sixDays('12:00', '23:30')
    },
    {
      name: 'Ms. Nadia Saif', title: 'Head of Department', specialty: 'Psychologist',
      qualifications: 'MS Clinical Psychology, M.Sc Applied Psychology, PMDCP', experience: 4, fee: 2000,
      bio: 'Clinical psychologist for depression, anxiety, OCD, addiction and family problems. Offers therapy, counselling and psychological assessment.',
      schedule: fiveDays('12:00', '19:00')
    },
    {
      name: 'Ms. Perwasha Kanwal', title: '', specialty: 'Psychologist',
      qualifications: 'MS Clinical Psychology (Riphah, 2018)', experience: 8, fee: 2000,
      bio: 'Clinical psychologist for anxiety, depression, trauma, OCD, anger management, child behaviour issues and counselling.',
      schedule: sixDays('13:00', '18:00')
    },
    {
      name: 'Dr. Hareesh Kumar', title: '', specialty: 'Pediatrician',
      qualifications: '', experience: 0, fee: 0,
      bio: 'Child specialist. Please call the hospital to confirm timings and book.',
      schedule: {}
    }
  ];
  const ins = db.prepare(`INSERT INTO doctors (name,title,specialty,qualifications,experience,fee,bio,schedule,sort_order)
                          VALUES (?,?,?,?,?,?,?,?,?)`);
  seed.forEach((d, i) => ins.run(d.name, d.title, d.specialty, d.qualifications, d.experience, d.fee, d.bio, JSON.stringify(d.schedule), i));
}

module.exports = db;
