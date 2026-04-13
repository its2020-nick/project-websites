# Wekan Kasarani School Website

Static website for **Wekan Kasarani School, Mwiki** — built with plain HTML5, CSS3, and vanilla JavaScript. No build tools or server required.

---

## Requirements

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local static file server (required for the language switcher — `fetch()` is blocked by browsers on bare `file://` URLs)

---

## Running Locally

Pick any one of the options below.

### Option 1 — Python (no install needed, comes with macOS/Linux)

```bash
cd /Users/mac/project-website
python3 -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

---

### Option 2 — Node.js `npx serve`

```bash
cd /Users/mac/project-website
npx serve .
```

Open the URL printed in the terminal (default: [http://localhost:3000](http://localhost:3000)).

---

### Option 3 — VS Code Live Server extension

1. Open the project folder in VS Code.
2. Install the **Live Server** extension (Ritwick Dey).
3. Right-click `index.html` → **Open with Live Server**.

The browser opens automatically and reloads on file save.

---

### Option 4 — PHP (available on most shared hosting environments)

```bash
cd /Users/mac/project-website
php -S localhost:8080
```

Open [http://localhost:8080](http://localhost:8080).

---

## Project Structure

```
project-website/
├── index.html          # Home page
├── news.html           # News & Calendar
├── admissions.html     # Admissions
├── curriculum.html     # Curriculum (CBC)
├── contact.html        # Contact + map + form
│
├── css/
│   ├── main.css        # CSS variables, typography, base styles
│   ├── components.css  # Navbar, footer, cards, forms, etc.
│   └── responsive.css  # Mobile/tablet breakpoints
│
├── js/
│   ├── main.js         # Nav toggle, accordion, form validation, tabs
│   └── i18n.js         # EN/SW language switcher
│
├── lang/
│   ├── en.json         # English strings
│   └── sw.json         # Kiswahili strings
│
└── images/
    └── logo.png        # School logo (used in navbar)
```

---

## Language Switcher

The **EN / SW** toggle in the navbar switches all page text between English and Kiswahili. The selection is saved in `localStorage` and persists across pages.

> The switcher uses `fetch()` to load `lang/en.json` or `lang/sw.json`, so the site **must be served over HTTP** (any option above). It will not work when opened directly as a `file://` URL.

---

## Deployment

The site is fully static — drop the folder on any host:

| Platform | How |
|---|---|
| **GitHub Pages** | Push to a repo → Settings → Pages → Deploy from `main` branch root |
| **Netlify** | Drag and drop the project folder at [app.netlify.com/drop](https://app.netlify.com/drop) |
| **Shared hosting** | Upload all files via FTP/cPanel File Manager to `public_html/` |

No build step, no `npm install`, no configuration needed.

---

## Adding Real Images

Replace the placeholder icons in these locations with actual photos:

| Placeholder | File to add |
|---|---|
| Hero background | `images/hero-bg.jpg` — reference in `index.html` hero CSS |
| School building (Welcome section) | `images/school-building.jpg` |
| Gallery images | `images/students/photo1.jpg`, `photo2.jpg`, etc. |

Use `loading="lazy"` on all `<img>` tags (already set where applicable).

---

## Contact Form

The form validates client-side. To receive submissions by email, sign up at [formspree.io](https://formspree.io) (free tier) and update the `<form>` tag in `contact.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR_ID" method="POST">
```
# project-websites
# project-websites
