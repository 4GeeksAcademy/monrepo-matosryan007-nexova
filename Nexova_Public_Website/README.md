# Nexova — public website (M1)

Carmen Ruiz’s corporate landing page and candidate talent-pool registration, with complete English and Spanish experiences. The form follows BRIEFING.md and simulates submission without transmitting or storing personal data.

## Preview

From this directory, run `python server.py`, then open http://localhost:8000.

If Python is unavailable, use `node server.cjs` instead. Tailwind loads from a CDN and needs internet access.

## Edit and check

Edit `build-pages.cjs` and run `node build-pages.cjs` to regenerate the four HTML pages. Shared form behavior is in `validation.js`. Run `node validation.test.cjs` for the validation and content checks.

Read `WEBSITE_CONTEXT.md` for implementation details and `CHECK_YOURSLEF.md` for the requirements review, test results, and browser checks still needed. Old Lighthouse artifacts in `evidence/` predate the rebuild and must not be submitted as current results.
