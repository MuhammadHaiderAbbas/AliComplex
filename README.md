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
| `team.html` | Organisation chart (edited in the staff panel) |
| `verify.html` | Anyone can check a payslip or letter is genuine using its verification code |
| `letterhead.html` | Blank printable A4 letterhead (print or save as PDF) |
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
- **Settings:** announcement banner, phone numbers, WhatsApp number, email, Facebook, OPD text; booking alerts; change password.

## Payroll, payslips and letters (staff panel, separate payroll password)
- **Org Chart tab:** add, edit, move or hide people; who reports to whom. Shown on the website and used in reference letters.
- **Payroll → Employees:** employee code, designation, department, CNIC, joining/leaving date, bank account, basic salary, allowances, Provident Fund %, tax (from slabs, fixed, or none).
- **Payroll → Payslips:** pick a month, create drafts for all employees, edit lines (overtime, deductions, leave days), then **Issue**. Issued payslips are locked and get a verification code; correct mistakes by **Void** and creating a new one. Export CSV for the bank, print one or all.
- Each payslip shows: name, designation, organisation, financial year (July–June), salary period, gross income, allowances, withholding tax, Provident Fund contribution, net income and amount in words.
- **Payroll → Tax & PF settings:** yearly tax slabs (pre-filled with 2025-26 salaried rates; **check against the current Finance Act each July**), default PF %, change payroll password.
- **Letters:** general letters and employment reference letters on the letterhead, with reference numbers (AMC/YYYY/NNNN) and verification codes; reference letters fill in from employee records and the org chart, and can attach the org chart. Issued letters are kept in a register and can be voided.

## Photos, gallery and design
- **Profile photos:** Staff panel → Doctors (Edit) or Org Chart (Edit) → choose a photo. It is cropped square and resized automatically. Until a photo is added, an illustrated avatar is shown.
- **Gallery:** Staff panel → Settings → Website photo gallery (up to 24 real photos of the hospital). Shown on the Home and About pages, with a full-screen viewer.
- **Charts:** weekly timetable (Home), team by department and weekly OPD hours by service (About), hours per day (doctor profiles), all built from live data.
- **Provisional timings:** the starter timetable is marked provisional; the notice text is in Staff panel → Settings. Clear it once real timings are entered.

## Urdu version
Every public page has an **English / اردو** button (top right). Urdu switches the layout to right-to-left with an Urdu (Nastaliq) font and remembers the choice on that device. Translations live in `i18n.js`: to change a wording, edit the Urdu text next to its English sentence. Doctor names, qualifications and bios entered in the staff panel are shown as typed. The staff panel stays in English.

## Booking alerts for staff
- **Live alerts:** while the staff panel is open, new bookings and messages play a sound, show a notification and update the counts (checked every 30 seconds).
- **Telegram alerts (free):** staff panel → Settings → Telegram alerts. Create a bot with @BotFather, paste its token, press Start in the bot (or add it to a staff group), click *Find my chat*, Save, Send test. New bookings, cancellations, messages and reviews then arrive on staff phones even when the panel is closed.

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
