# Nexova public website (React)

React + Tailwind version of the M1 site; it replaces the former static `Nexova_Public_Website/` (still available in git history). Bilingual EN/ES, landing page plus talent-pool registration form. Copy follows `BRIEFING.md` (Marketing: Carmen Ruiz).

## Stack
Vite, React 19, TypeScript, React Router, Tailwind CSS 4 (`@tailwindcss/vite`, no CDN).

## Run
```
cd uis/website
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
```

## Routes
| EN | ES |
| --- | --- |
| `/` | `/es` |
| `/application` | `/es/application` |

## Structure
- `src/content/` — all EN/ES copy, paths and contact data (edit copy here).
- `src/components/` — Header, Hero, ServicesSection, WhySection, ContactSection, Footer, Layout, Seo.
- `src/components/form/` — TalentForm and field components.
- `src/pages/` — HomePage, TalentPage.
- `src/legacy/` — the original JS, logic unchanged, wired in from React:
  - `validation.js` → `initTalentForm(form)`, called from `TalentForm` in an effect.
  - `navigation.js` → `initMobileMenus()`, called from `Header` (mobile menu).
  Both return a cleanup function. The form components are intentionally uncontrolled because `validation.js` owns error/aria state directly in the DOM.

The form simulates submission: no data is sent or stored.
