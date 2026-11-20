# Ali Medical Complex – Website & Appointment System

Website for Ali Medical Complex, Chungi No. 1, Suraj Miani Road, Multan, with online appointment booking and a staff panel.

**Live site:** https://muhammadhaiderabbas.github.io/AliComplex/
**Staff panel:** https://muhammadhaiderabbas.github.io/AliComplex/admin.html

Runs completely free: the pages are hosted on GitHub Pages and bookings are stored in Supabase (free plan).

## Pages
- `index.html`: home, specialties, doctors with timings and fees, about, FAQ, contact and directions.
- `book.html`: patient picks a doctor, date and free time slot, enters details, and gets a reference number (e.g. `AMC-6C8DC1`). Taken slots can't be double-booked; past times are hidden (Pakistan time); one phone number can hold at most 3 upcoming bookings.
- `my-booking.html`: patient checks status or cancels with reference + phone number.
- `admin.html`: staff login; today / pending / upcoming counts; filter and search appointments; change status (pending, confirmed, completed, cancelled, no-show); print; add or edit doctors, fees and weekly timings, or hide a doctor; change the staff password.

## How it works
- Plain HTML, CSS and JavaScript, no build step. Edit a file, push to `main`, and GitHub Pages updates the site in about a minute.
- Data lives in Supabase in a private `amc` schema that is not reachable directly from the internet. The site only calls the `amc_*` database functions (`amc_doctors`, `amc_slots`, `amc_book`, `amc_lookup`, `amc_cancel`, and the password-protected `amc_admin_*` functions).
- The Supabase URL and publishable key are in `common.js`. The publishable key is designed to be public.
- Staff login: 10 wrong attempts lock login for 15 minutes; sessions last 12 hours.

## Editing content
- Doctors, fees and timings: staff panel → Doctors (no code needed).
- Hospital name, address and phone numbers: top of `common.js` and in `index.html`.
- Colours: CSS variables at the top of `styles.css`.

## Note on Supabase free plan
Free Supabase projects pause after about a week with no activity. Regular bookings keep it active; if it ever pauses, restore it from the Supabase dashboard.
