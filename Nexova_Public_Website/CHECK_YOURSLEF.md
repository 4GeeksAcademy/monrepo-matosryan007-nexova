# M1 self-check against BRIEFING.md

This review applies to the rebuilt candidate website, not the earlier service-inquiry form. English is the full base language; Spanish is a complete enhancement.

## Implemented requirements

- [x] Header with Nexova and Home / Services / Talent / Contact navigation.
- [x] Exact English hero headline and subheadline; Join our talent pool links to application.html.
- [x] Services in three desktop columns with all six required service descriptions/benefits.
- [x] Why Nexova in two responsive columns, including the four prescribed claims.
- [x] Contact email and clickable Valencia/Miami phone numbers.
- [x] © 2025 Nexova and LinkedIn / Instagram footer links.
- [x] Separate candidate form, with a visible message directing companies to contacto@nexova.com.
- [x] All eleven specified fields, requiredness, exact select/radio choices, and validation rules.
- [x] Exact English error messages, including the data-policy error and dynamic comments remaining count.
- [x] Visible 500-character comments counter and maxlength; JavaScript also rejects values over the limit.
- [x] Prescribed success heading and both paragraphs, plus a LinkedIn link.
- [x] Simulated submission only; no request, logging of entered data, or persistent storage.
- [x] Clear button resets controls, errors, success, and counter.
- [x] Semantic headings, main/header/nav/section/article/footer, labels, fieldsets and legends.
- [x] Skip link; native keyboard controls; error descriptions and invalid states; focus on first error/success.
- [x] Tailwind utility styling; no custom stylesheet. No image elements requiring alt text.
- [x] Responsive wrapping navigation, stacked mobile form, two-column tablet inputs, three-column desktop services.
- [x] SEO descriptions, canonical/language alternates, crawlable factual content, Organization JSON-LD with all required information.
- [x] Python HTTP server retained; Node alternative added for this environment.
- [x] WEBSITE_CONTEXT.md reflects the actual candidate-registration implementation and project structure.

## Executed verification

`node --check validation.js` and `node --check build-pages.cjs` pass.

HTTP smoke checks against the running Node preview return 200 for all four pages and validation.js, and 404 for a missing page. `node --check server.cjs` also passes.

`node validation.test.cjs`: **181 passing checks**, covering both locales. The dependency-free DOM harness parses controls from the generated HTML and executes the actual validation.js event handlers. It checks empty submission (all nine required field groups), first-invalid focus, each invalid field, optional blank fields, experience 0/50 and a fractional value within range, 500/501-character comments, valid/invalid URLs, every select/radio option, policy consent, live counter, reset, success focus/data clearing, schema, section order, contact phones, and local navigation targets.

The harness is not a browser engine. It does not prove rendering, native browser validation behavior, screen-reader output, contrast, or responsive layout quality.

## Before resubmission: browser QA still required

Browser automation was unavailable in this session (no connected browser surfaces). No new Lighthouse or visual results are claimed. Existing evidence/ Lighthouse files belong to the earlier implementation and are not evidence for this rebuild.

- [ ] Inspect both pages in English and Spanish at mobile (375 px), tablet (768 px), and desktop (1440 px); check overflow, navigation, spacing, and readable content.
- [ ] Tab through the site and form; test Shift+Tab, radio arrows, policy disclosure, summary links, reset, and success focus in a real browser.
- [ ] Submit an empty form, correct errors, test valid submission and clear; inspect console for errors.
- [ ] Run fresh Lighthouse/accessibility checks and replace old evidence before citing scores.
- [ ] Confirm the deployed canonical domain and working Tailwind CDN access.

Python is not installed in this execution environment, so server.py could not be executed here. The optional Node preview serves the same static pages.
