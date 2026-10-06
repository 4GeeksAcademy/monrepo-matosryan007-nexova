# Nexova Public Website

A bilingual, responsive public website for Nexova Solutions. The English site is the default, with Spanish pages under `/es/`. The inquiry form validates data entirely in the browser and does not send or store submissions.

## Run locally

From this directory, use either option:

```bash
python server.py
```

or the Codespaces-compatible `npx` command:

```bash
npx serve . -l 8000
```

Then open `http://localhost:8000`.

The Python server listens on `0.0.0.0` and uses port `8000` by default. Set the `PORT` environment variable to use a different port. Tailwind is loaded through the Play CDN, so the preview needs internet access.

## Routes

- `/` or `/index.html` — English landing page
- `/application.html` — English service inquiry
- `/es/` or `/es/index.html` — Spanish landing page
- `/es/application.html` — Spanish service inquiry

## Codespaces preview and audit

1. Start either server on port `8000`.
2. Open the **Ports** panel in Codespaces.
3. Change port `8000` visibility to **Public**.
4. Open the forwarded URL and verify all four routes.
5. Replace the relative canonical and `hreflang` URLs with that final public origin before the final SEO audit.
6. Run PageSpeed Insights against the public URL. If it cannot reach the preview, run a mobile Lighthouse audit in Chrome DevTools against the same page.
7. Target a performance score above 90; 80 is the minimum acceptance score.
8. Save the final results screenshot as `evidence/lighthouse-mobile.png`.

## Accessibility and form checks

- Navigate every link, disclosure, input, and button using only the keyboard.
- Verify the skip link, visible focus states, heading order, and English/Spanish language links.
- Submit the form empty and confirm the localized error summary appears.
- Test malformed names, email, and phone values; fewer than 30 project-summary characters; no selected service; and missing consent.
- Select phone as the preferred contact method and confirm that a phone number becomes mandatory.
- Complete every field correctly and confirm that the success message appears without a network request.
- Use **Clear form** and confirm that values and validation states are removed.

## Implementation notes

- All visual styling uses Tailwind utility classes through the Play CDN; no custom stylesheet is required.
- Both form pages share `validation.js` and use identical field names and option values.
- Company facts come from the supplied project context. Internal financial, operational, and personnel details are intentionally not published.
