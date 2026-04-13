# WEKAN KASARANI SCHOOL, MWIKI — Website Build Plan

---

## 1. Recommended Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Markup | Plain HTML5 | No build tools needed; easy to host on any server or GitHub Pages |
| Styling | CSS3 (custom + CSS Variables) | Full control over yellow/gold theme; no framework bloat |
| Interactivity | Vanilla JavaScript (ES6+) | Zero dependencies; handles nav, language switcher, and calendar |
| Multilingual | JSON language files + JS i18n module | Lightweight; no server needed; supports EN/SW toggle |
| Icons | Font Awesome 6 (CDN) | Free, comprehensive icon set for nav and contact details |
| Fonts | Google Fonts — "Poppins" + "Roboto" | Clean, modern, highly readable on mobile and desktop |
| Deployment | GitHub Pages / Netlify / Shared hosting | Static files deploy anywhere, free tier available |

**Why not Next.js or Astro?**
A static HTML/CSS/JS site is the most practical choice for a Kenyan school:
- No server or Node.js runtime required
- Works on cheap shared hosting (Safaricom WEB, Kenya Web Experts, etc.)
- Fast load times on slower connections
- Easy for school staff to update HTML directly

---

## 2. File Structure

```
project-website/
├── index.html              # Home page (hero, quick links, announcements)
├── news.html               # News & Calendar tab
├── admissions.html         # Admissions details tab
├── curriculum.html         # Curriculum tab
├── contact.html            # Contact tab
│
├── css/
│   ├── main.css            # Global styles, color variables, typography
│   ├── components.css      # Navbar, footer, cards, buttons
│   └── responsive.css      # Media queries for mobile/tablet
│
├── js/
│   ├── main.js             # Nav toggle (hamburger), scroll effects, active link
│   └── i18n.js             # Language switcher — loads en.json or sw.json
│
├── lang/
│   ├── en.json             # All English text strings (keyed by data-i18n)
│   └── sw.json             # All Kiswahili translations (same keys)
│
├── images/
│   ├── logo.png            # School crest/logo
│   ├── hero-bg.jpg         # Homepage hero background
│   ├── school-building.jpg # About section image
│   └── students/           # Gallery images
│
└── plan.md                 # This file
```

---

## 3. Design Considerations

### Color Palette
```
--primary:       #FFD700   /* Bright Yellow — buttons, highlights */
--primary-dark:  #C8A900   /* Dark Gold — hover states, borders */
--primary-deeper:#8B6914   /* Deep Gold — headings, accents */
--bg-dark:       #1A1200   /* Near-black warm — footer, hero overlay */
--bg-light:      #FFFBEA   /* Cream yellow — section backgrounds */
--text-main:     #1C1C1C   /* Almost black — body text */
--text-light:    #FFFFFF   /* White — text on dark backgrounds */
--accent:        #FFF3B0   /* Pale yellow — card backgrounds */
```

### Typography
- **Headings:** Poppins SemiBold/Bold — strong, modern
- **Body:** Roboto Regular — highly readable at small sizes
- Base font size: 16px; line height: 1.6

### Navigation
- **Desktop:** Horizontal sticky navbar — Logo left, links right, EN/SW toggle far right
- **Mobile:** Hamburger menu icon (☰) — slides down a full-width dropdown
- Active page link highlighted with gold underline
- Smooth scroll on anchor links

### Multilingual (EN / SW)
- Every text element gets a `data-i18n="key"` attribute
- `i18n.js` reads the selected language from `localStorage` on load
- Language toggle button in nav cycles between `en` and `sw`
- On toggle: all `[data-i18n]` elements are updated from the JSON file instantly
- Default language: English

### Mobile Friendliness
- CSS Grid and Flexbox layouts
- All tap targets minimum 44×44px
- Images use `max-width: 100%`
- Viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- Tested breakpoints: 320px, 480px, 768px, 1024px, 1280px

---

## 4. Step-by-Step Implementation Plan

### Step 1 — Project Scaffold
- [ ] Create all folders: `css/`, `js/`, `lang/`, `images/`
- [ ] Create empty files for each HTML page
- [ ] Set up `css/main.css` with CSS variables (color palette above)
- [ ] Set up `css/components.css` and `css/responsive.css`
- [ ] Create `js/main.js` and `js/i18n.js`
- [ ] Create `lang/en.json` and `lang/sw.json` with placeholder keys

### Step 2 — Global Components (shared across all pages)
- [ ] **Navbar:** Logo + school name, nav links (Home, News, Admissions, Curriculum, Contact), EN/SW toggle button
- [ ] **Footer:** School address (Mwiki, Kasarani, Nairobi), phone, email, social links, copyright
- [ ] **Hamburger menu:** JS toggle for mobile nav
- [ ] **Language switcher:** `i18n.js` module — fetch JSON, populate `data-i18n` elements, persist to localStorage

### Step 3 — Home Page (`index.html`)
- [ ] Hero section: full-width banner with school name, tagline, "Apply Now" CTA button
- [ ] Quick stats bar: No. of students, teachers, years established
- [ ] Welcome message from Head Teacher (placeholder text)
- [ ] Latest news preview (3 cards linking to news.html)
- [ ] School values / mission strip (icons + short text)
- [ ] Photo gallery strip (3-4 images)

### Step 4 — News & Calendar Page (`news.html`)
- [ ] Page header with breadcrumb
- [ ] News articles section: cards with date, title, short excerpt, "Read more" link
- [ ] School calendar section: term dates table (Term 1 / Term 2 / Term 3)
- [ ] Upcoming events list (date badges + event name)

### Step 5 — Admissions Page (`admissions.html`)
- [ ] Admission requirements (age, documents needed — birth cert, passport photos, etc.)
- [ ] How to apply — numbered step-by-step process
- [ ] Fee structure table (optional, can say "contact school for current fees")
- [ ] FAQ accordion (JS toggle)
- [ ] "Enquire Now" button linking to contact.html

### Step 6 — Curriculum Page (`curriculum.html`)
- [ ] Overview paragraph (CBC — Competency Based Curriculum, Kenya)
- [ ] Learning levels: Pre-Primary (PP1, PP2), Lower Primary (Grades 1-3), Upper Primary (Grades 4-6), Junior Secondary (Grades 7-9)
- [ ] Subject cards for each level
- [ ] Co-curricular activities section (sports, clubs, arts)
- [ ] CBC explanation section (brief, parent-friendly)

### Step 7 — Contact Page (`contact.html`)
- [ ] Contact info cards: address, phone, email, opening hours
- [ ] Embedded Google Map (iframe for Mwiki, Kasarani area)
- [ ] Contact form: Name, Email, Phone, Subject, Message, Send button
- [ ] Form validation in JS (no server needed — can use Formspree for free email delivery)

### Step 8 — Multilingual Content (EN/SW)
- [ ] Populate all keys in `lang/en.json` with final English text
- [ ] Translate all keys to Kiswahili in `lang/sw.json`
- [ ] Test language toggle on every page
- [ ] Ensure language preference persists across page navigation (localStorage)

### Step 9 — Responsive Polish
- [ ] Test all pages at 320px, 480px, 768px, 1024px
- [ ] Fix any overflow or stacking issues
- [ ] Ensure images are compressed and load fast
- [ ] Add `loading="lazy"` to all `<img>` tags

### Step 10 — Final Checks & Deployment
- [ ] Validate HTML (W3C validator)
- [ ] Check all internal links work
- [ ] Add meta tags: description, Open Graph (for sharing)
- [ ] Add `favicon.ico` (school crest)
- [ ] Deploy to GitHub Pages or Netlify (drag-and-drop folder)

---

## Page-by-Page Content Outline (EN / SW keys)

### Key i18n identifiers (sample)
```json
// en.json (sample)
{
  "nav.home": "Home",
  "nav.news": "News & Calendar",
  "nav.admissions": "Admissions",
  "nav.curriculum": "Curriculum",
  "nav.contact": "Contact",
  "hero.title": "WEKAN KASARANI SCHOOL, MWIKI",
  "hero.subtitle": "Nurturing Excellence, Building Character",
  "hero.cta": "Apply Now",
  "admissions.title": "Admissions",
  "admissions.intro": "We welcome applications for all levels...",
  ...
}

// sw.json (sample)
{
  "nav.home": "Nyumbani",
  "nav.news": "Habari na Kalenda",
  "nav.admissions": "Usajili",
  "nav.curriculum": "Mtaala",
  "nav.contact": "Mawasiliano",
  "hero.title": "WEKAN KASARANI SCHOOL, MWIKI",
  "hero.subtitle": "Kukuza Ubora, Kujenga Tabia",
  "hero.cta": "Omba Sasa",
  "admissions.title": "Usajili",
  "admissions.intro": "Tunakaribisha maombi kwa ngazi zote...",
  ...
}
```

---

## Estimated Deliverables Summary

| File | Description |
|---|---|
| `index.html` | Home page |
| `news.html` | News & Calendar |
| `admissions.html` | Admissions info |
| `curriculum.html` | Curriculum (CBC) |
| `contact.html` | Contact + map + form |
| `css/main.css` | Theme variables + base styles |
| `css/components.css` | Nav, footer, cards, buttons |
| `css/responsive.css` | Mobile breakpoints |
| `js/main.js` | Nav toggle + scroll behavior |
| `js/i18n.js` | Language switcher module |
| `lang/en.json` | English strings |
| `lang/sw.json` | Kiswahili strings |

**Total: ~12 files, fully static, no server or build tools required.**
