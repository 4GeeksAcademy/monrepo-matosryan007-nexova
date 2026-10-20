# Nexova public website — M1 implementation context

## Source of truth

Read ../CONTEXT.md for the company background and BRIEFING.md for Carmen Ruiz’s exact milestone requirements. BRIEFING.md is the supplied teacher briefing, copied without changing its content. When general context and the milestone differ, use the specific M1 instructions for this deliverable.

The audience for application.html is professionals seeking current or future employment, including passive candidates. It is a talent registration form. Companies seeking services are directed to contacto@nexova.com.

## Project structure

- index.html — English landing page (base language).
- application.html — English candidate registration.
- es/index.html and es/application.html — complete Spanish enhancement.
- validation.js — shared, localized client-side validation and simulated submission.
- server.py — requested Python HTTP server.
- server.cjs — optional Node HTTP preview when Python is unavailable.
- build-pages.cjs — regenerates all four static HTML pages; edit this source before regenerating.
- validation.test.cjs — dependency-free tests of actual validation event handlers and generated page structure.
- BRIEFING.md — original supplied milestone brief.
- CHECK_YOURSLEF.md — requirements review and verification limits.

There is no handwritten stylesheet: all page styling uses Tailwind utilities. Tailwind currently loads from its CDN, so the preview requires an internet connection for styling. navigation.js is a legacy file and is not loaded: all four required navigation links are visible and wrap on small screens.

## Landing-page contract

Header: Nexova; Home, Services, Talent, Contact; EN/ES switch.
Hero: exact English headline, subheadline, and Join our talent pool CTA from the briefing.
Services: executive headhunting, customer support outsourcing, corporate training, with both prescribed benefits for each.
Why Nexova: the four prescribed claims in two columns at medium/large sizes. The historical 12-year claim and © 2025 are deliberately preserved as supplied for this milestone.
Contact: contacto@nexova.com, Valencia +34 960 123 456, Miami +1 305 555 0191.
Footer: prescribed copyright and LinkedIn/Instagram links.
Organization JSON-LD: required name, description, founding date, both postal addresses, contact point, languages, and social URLs. Angle brackets in the pasted Markdown examples are formatting, not part of the URLs.
SEO/GEO: semantic headings, factual crawlable company/service/location text, descriptions, canonical and language alternates, and Organization structured data. https://nexova.com is the briefing’s intended production domain; change canonical/alternate URLs if deployment uses another domain.

## Registration contract

Required: full name (at least two words), email, international phone, country, years of experience 0–50, sector, English level, availability, checked data policy.
Optional: valid http(s) LinkedIn/profile URL; comments up to 500 characters, with visible live counter.
Country: Spain / United States / Other.
Sector: Technology / Retail / Financial Services / Consulting / Other.
English: Basic / Intermediate / Advanced / Native.
Availability radios: Immediate / 1 month / 2-3 months / Just exploring.
English field errors and success text follow BRIEFING.md; Spanish equivalents provide the same behavior.

All fields are checked on submit, including optional fields when populated. Errors appear adjacent to controls and in a linked summary; aria-describedby and aria-invalid connect feedback. Submission focuses the first invalid control. Valid submission clears personal data and focuses the success message. Clear form removes values/errors/success and resets the counter. No network request or browser storage is used. The visible policy and simulation notice explain the demo accurately.

## Run and verify

From Nexova_Public_Website:

    python server.py

If Python is unavailable:

    node server.cjs

Open http://localhost:8000. Use node build-pages.cjs after editing page content and node validation.test.cjs to run checks. See CHECK_YOURSLEF.md for exactly what has and has not been verified.
