# Ali Medical Complex – Website & Appointment System

Website for Ali Medical Complex, Chungi No. 1, Suraj Miani Road, Multan, with online appointment booking and a staff panel.

**Live site:** https://muhammadhaiderabbas.github.io/AliComplex/
**Staff panel:** https://muhammadhaiderabbas.github.io/AliComplex/admin.html

Runs completely free: the pages are hosted on GitHub Pages and bookings are stored in Supabase (free plan).

## Pages
| Page | What it does |
|---|---|
| `index.html` | Home: quick actions, specialties, doctors, why us, patient reviews |
| `about.html` | About the hospital, values, facilities |
| `doctors.html` | All doctors with search, specialty filter and "available today" |
| `doctor.html?id=N` | Doctor profile: qualifications, weekly timetable, leave dates, reviews, book/call/share |
| `services.html` | Each specialty, conditions treated and its doctors |
| `book.html` | 3-step booking with live free slots; confirmation with add-to-calendar, WhatsApp share and print |
| `my-booking.html` | Check status, cancel, book again, and rate the visit once completed |
| `faq.html` | Searchable FAQs |
| `contact.html` | Phone, WhatsApp, map, directions and a message form |
| `admin.html` | Staff panel (see below) |
| `404.html` | Page-not-found page |

## Staff panel
- **Dashboard:** today, pending, upcoming, new messages, reviews waiting; bookings-per-day chart; this month by doctor and by status.
- **Appointments:** date range, doctor, status and search filters; quick ranges; change status; WhatsApp the patient; export CSV (opens in Excel); print.
- **Doctors & Leave:** add/edit doctors, fees, weekly timings, slot length, hide/show; add leave days (booking is blocked those days and patients to call are flagged).
- **Enquiries:** messages from the contact form; reply on WhatsApp; mark read/replied; delete.
- **Reviews:** approve or hide patient reviews before they show on the site.
- **Settings:** announcement banner, phone numbers, WhatsApp number, email, Facebook, OPD text; change password.

## Other features
- Floating WhatsApp button, announcement banner, mobile-friendly menu.
- Search-engine friendly: page descriptions, Google hospital/FAQ data, `sitemap.xml`.
- Can be added to a phone's home screen with its own icon.
- Spam limits: 3 upcoming bookings and 3 messages per day per phone number; reviews only after a completed visit, and only shown after approval.

## How it works
- Plain HTML, CSS and JavaScript, no build step. Edit a file, push to `main`, and GitHub Pages updates the site in about a minute.
- Data lives in Supabase in a private `amc` schema that is not reachable directly from the internet. The site only calls the `amc_*` database functions (`amc_doctors`, `amc_slots`, `amc_book`, `amc_lookup`, `amc_cancel`, and the password-protected `amc_admin_*` functions).
- The Supabase URL and publishable key are in `common.js`. The publishable key is designed to be public.
- Staff login: 10 wrong attempts lock that device out for 15 minutes; sessions last 12 hours.

## Editing content
- Doctors, fees and timings: staff panel → Doctors (no code needed).
- Phone numbers, WhatsApp, announcement: staff panel → Settings.
- Hospital name and address: top of `common.js`. `404.html` assumes the site lives at `/AliComplex/`; change its `<base>` tag if you move to your own domain.
- Colours: CSS variables at the top of `styles.css`.

## Note on Supabase free plan
Free Supabase projects pause after about a week with no activity. Regular bookings keep it active; if it ever pauses, restore it from the Supabase dashboard.
