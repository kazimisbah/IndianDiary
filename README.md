# IndiaDiarie — Diary Manufacturer Website

A single-page marketing site for a Kolkata diary manufacturer. It's built with Vite, React and Tailwind CSS and compiles to **one self-contained HTML file**.

## Quick start

```bash
npm install
npm run dev      # live preview at http://localhost:5173
npm run build    # creates dist/index.html (a single file, upload it anywhere)
```

## What to edit

| What | Where |
| --- | --- |
| Company name, phone, email, address, hours | `src/config.js` → `SITE` |
| Google Sheets form URL | `src/config.js` → `GOOGLE_SCRIPT_URL` |
| Stats (years, diaries, clients, countries) | `src/config.js` → `STATS` |
| Products, gallery, testimonials, FAQ, export MOQ/lead times | `src/config.js` |
| Hero video | `src/config.js` → `HERO_VIDEO_URL` |
| Company story and founder note | `src/components/TrustAbout.jsx` |
| Colours | `src/index.css` → `@theme` block |
| SEO title, description, Open Graph, schema.org | `index.html` |

Search the project for `[PLACEHOLDER]`, `[confirm` and `SWAP` to find everything that still needs real content or photos.

## Connecting the form to Google Sheets

Follow the steps at the top of [`google-apps-script/Code.gs`](google-apps-script/Code.gs). In short: create a Sheet, paste the script under **Extensions → Apps Script**, deploy it as a **Web app** with access set to **Anyone**, then paste the URL into `GOOGLE_SCRIPT_URL` and rebuild.

Until the URL is set, the form still validates and shows the success screen, but it shows a note that nothing was saved.

## Swapping photos

Put your photos in `public/photos/` and replace the `img('…')` calls in `src/config.js` with paths like `'/photos/leather-diary.jpg'`. After building, upload the whole `dist/` folder (`index.html` plus `photos/`).
