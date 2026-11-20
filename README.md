# Ali Medical Complex – Website & Appointment System

A simple, professional hospital website with online appointment booking and a staff panel.

## What's included
- **Public website** (`/`): home, specialties, doctors with timings and fees, about, FAQ, contact and directions.
- **Online booking** (`/book.html`): patient picks a doctor, date and free time slot, enters details, gets a reference number (e.g. `AMC-6C8DC1`). Taken slots can't be double-booked; past times are hidden (Pakistan time).
- **My Booking** (`/my-booking.html`): patient checks status or cancels using reference + phone number.
- **Staff panel** (`/admin.html`): password login; today's / pending / upcoming counts; filter appointments by date, doctor, status or search; change status (pending → confirmed → completed / cancelled / no-show); print the day's list; add or edit doctors, fees and weekly timings, or hide a doctor.

## Run it
Needs Node.js 22 or newer.

    npm install
    ADMIN_PASSWORD=choose-a-strong-password npm start

Open http://localhost:3000. Data is stored in `data/hospital.db` (SQLite). Back this file up regularly.

Settings (environment variables): `PORT` (default 3000), `ADMIN_PASSWORD` (default `admin123` — change it!), `DATA_DIR` (where the database lives).

## Going live
Any host that runs Node.js with a persistent disk works (a small VPS, Render, Railway, Hostinger VPS, etc.). Put it behind HTTPS and set a strong `ADMIN_PASSWORD`.

## Edit content
- Doctors, fees, timings: in the Staff panel → Doctors (no code needed).
- Hospital name, address, phone numbers: `public/common.js` (top of file) and `public/index.html`.
- Colours: `public/styles.css` (`:root` variables at the top).

## Deploy on Render
1. Sign in at https://render.com with GitHub.
2. New → Blueprint → choose this repository. Render reads `render.yaml`.
3. Enter an `ADMIN_PASSWORD` when asked, then Apply. You'll get a link like `https://ali-medical-complex.onrender.com`.

The blueprint uses the Starter plan (about $7/month) because bookings are saved on a disk, and Render's free plan has no permanent disk.
