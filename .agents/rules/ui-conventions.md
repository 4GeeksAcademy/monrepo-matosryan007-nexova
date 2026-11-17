---
scope: file-pattern
globs: ["uis/**"]
---

# Rule: UI conventions

**Scope:** file-pattern — applies when editing anything under `uis/**`.

- **Human labels only:** never render raw API values (e.g. `in_progress`, `technical_interview`). Map through label tables such as `STATUS_LABELS` / `STAGE_LABELS` in `uis/talent-pipeline-tracker/lib/types.ts`.
- **Async with feedback:** every request is asynchronous and shows loading and error states; support cancellation (AbortSignal) for search-as-you-type.
- **Single API layer:** call the backend through one typed helper per app (see `lib/api.ts` in the tracker); read the base URL from `NEXT_PUBLIC_API_URL`, never hard-code it elsewhere.
- **Public vs internal:** the public site (`uis/website`, home `/`) and the backoffice (`uis/backoffice`, entry view `/`) have separate layouts; do not share page shells between them.
- **Brand and copy:** public copy must align with `BRIEFING.md`; use the domain vocabulary in `memory-bank/projectbrief.md`.
- **Document each app:** add or update the app's `README.md` (objective, tech, how to run).
- **Next.js:** read the guides in the app's `node_modules/next/dist/docs/` before using Next APIs; do not edit the generated block in `uis/talent-pipeline-tracker/AGENTS.md`.
