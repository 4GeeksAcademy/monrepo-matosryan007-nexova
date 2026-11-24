# Progress

_Last updated: 2026-11-17. Update this file as step 4 of the pre-commit workflow in `AGENTS.md`._

## Done
- **M1 — Public website:** originally static HTML/CSS/JS in `Nexova_Public_Website/` (EN + ES, talent registration page); now replaced by the React version in `uis/website`.
- **M2 — Domain models:** `src/` TypeScript types and utils (PR #1).
- **M3 — Talent Pipeline Tracker:** `uis/talent-pipeline-tracker/` Next.js app with list, filters, search, detail view, notes and registration form against the 4Geeks tracker API (PR #3).
- **Company briefing:** full `BRIEFING.md` at repo root.
- **Agent infrastructure (this task):** `memory-bank/`, root `AGENTS.md`, `.agents/rules/`, `.agents/skills/pre-commit-check/`.

- **React public website:** `uis/website` (Vite + React 19 + Tailwind 4, EN/ES, talent form). Reuses legacy `validation.js` / `navigation.js` via init functions. Replaces `Nexova_Public_Website/` (removed). Not yet visually verified in a browser.

## Not started
- `uis/backoffice` (internal app: HR portal, dashboards).
- `services/` (single FastAPI backend).
- Product AI: CV scoring/ranking, RAG over candidates, support chatbot, communication agent, recommendations.
- Telemetry/logging foundation.

## Next steps
1. Merge the agent-infrastructure PR after review.
2. Decide how to migrate or reference the M1 site in `uis/website`.
3. Scaffold `uis/backoffice` with its own README (objective, tech, how to run).
4. Stand up `services/` with centralised logging, then the first AI feature: explainable CV scoring for Talent Selection (the core business line).

## Open questions
- Which department's dashboard ships first in the backoffice.
- Whether the tracker moves under `uis/backoffice` later.
