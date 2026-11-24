# Tech Context

## Monorepo layout and where product code goes
One company, one repo. Each top-level folder has a single responsibility; read that folder's `README.md` before adding to it. **Never create a second frontend or API tree elsewhere.**

| Path | What goes here |
| --- | --- |
| `/uis` | All frontend projects |
| `./uis/website` | Public corporate website. Home route `/`, brand and copy aligned with `BRIEFING.md` (Marketing: Carmen Ruiz) |
| `./uis/backoffice` | Internal company app. Own layout, separate from the public site, entry view on `/` (HR portal, dashboards, operations) |
| `/services` | Backend APIs and services (the template specifies a single centralised FastAPI app) |
| `/data` | Datasets, schemas, pipelines |
| `/agents`, `/skills`, `/mcps` | **Product** AI agents, skills and MCP servers that Nexova ships |
| `/.agents` | **Developer tooling** for coding agents (rules, skills). Not product code, not the same as `/agents` or `/skills` |
| `/workflows`, `/infra`, `/docs`, `/packages`, `/shared` | Automation, infrastructure, documentation, shared libraries |
| `/memory-bank` | Persistent context for coding agents (this folder) |

## Existing code and known exceptions
- `uis/website` — public site (Vite + React 19 + TypeScript + Tailwind 4, EN/ES). It replaced the Milestone 1 static site `Nexova_Public_Website/`, removed at developer request (recoverable from git history). The M1 form logic lives on in `uis/website/src/legacy/`.
- `src/` — Milestone 2 TypeScript domain models and utils (`types/`, `utils/`, `milestone2_context/`). Built with `npm run typecheck` / `npm run build` at the repo root (TypeScript ^7). `dist/` is build output and is git-ignored.
- `uis/talent-pipeline-tracker/` — Milestone 3 candidate pipeline UI. It predates the convention, so it stays where it is. New UIs go in `uis/website` or `uis/backoffice`.

## Tracker stack (uis/talent-pipeline-tracker)
Next.js 16.4.6, React 19.3.0, Tailwind CSS 4.3.3 (`@tailwindcss/turbopack`), TypeScript ^5, ESLint ^9. Scripts: `dev`, `build`, `start`, `lint`. Its own `AGENTS.md` carries a generated Next.js block that must stay untouched; read the guides in its `node_modules/next/dist/docs/` before using Next APIs, because they differ from older versions.

- API base URL from `NEXT_PUBLIC_API_URL` (default `https://playground.4geeks.com/tracker/api/v1`), configured in `.env.local` (git-ignored, never commit).
- All requests go through the shared `request()` helper in `lib/api.ts` (async, typed `ApiError`, AbortSignal support).
- Endpoints: `GET/POST /records`, `GET/PUT/PATCH /records/{id}`, `GET/POST /records/{id}/notes`, `DELETE /records/{id}/notes/{noteId}`.
- Candidate status: `received`, `in_progress`, `selected`, `discarded`. Stages: `pending`, `review`, `personal_interview`, `technical_interview`, `offer_presented`. Labels live in `lib/types.ts` (`STATUS_LABELS`, `STAGE_LABELS`).

## Architectural decisions and constraints
- **Human-readable UI:** raw API values (status/stage codes) are never shown to users; always map through the label tables.
- **Async everywhere:** every request handled asynchronously with visible loading and error states.
- **Explainable AI:** any CV scoring or ranking feature must return the reasons behind the score (briefing requirement).
- **SLA awareness:** support automation is designed against the 24h committed SLA (currently 48h average).
- **Integration reality:** Nexova runs HubSpot, legacy Zendesk, Google Workspace and a 2010s home-built ATS; new services should integrate with, not assume replacement of, these.
- **Observability:** the company has no telemetry today; new services must log centrally and expose metrics hooks from day one.
- **Secrets:** `.env*` files are never committed. `node_modules/` and `dist/` are never committed.
- **Delivery:** feature branches + pull requests into `main`; see `AGENTS.md` and `.agents/rules/`.
