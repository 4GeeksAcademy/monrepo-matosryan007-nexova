# AGENTS.md — How agents work in this repo

This repo is the Nexova Solutions monorepo (HR consulting and talent acquisition, Valencia + Miami). Any coding agent must follow this file. No code is written outside the delivery process below.

## 1. Read first (every session)
Before any change, read in this order:
1. `memory-bank/projectbrief.md` — business context (derived from `BRIEFING.md`).
2. `memory-bank/techContext.md` — stack, folder map, constraints.
3. `memory-bank/progress.md` — current state and next steps.
4. The `README.md` of the folder you will touch, and any matching file in `.agents/rules/`.

For deep business questions, `BRIEFING.md` is the source of truth.

## 2. Where code goes
Public site → `uis/website`; internal app → `uis/backoffice`; APIs → `services/`. Never create a parallel frontend or API tree. `.agents/` is dev tooling, not the product `agents/` or `skills/` folders. Details in `memory-bank/techContext.md`.

## 3. Mandatory workflow before every commit
Follow these steps in order. Do not skip or reorder.
1. **Re-read context:** confirm the change matches `memory-bank/` and the applicable `.agents/rules/` files, and traces to a department need in `BRIEFING.md`.
2. **Run checks for the touched area:** root `src/` → `npm run typecheck` and `npm run build`; `uis/talent-pipeline-tracker` → `npm run lint` and `npm run build` inside that folder. Fix failures; never commit red.
3. **Verify acceptance criteria:** check the work against the task's checklist and the `pre-commit-check` skill (`.agents/skills/pre-commit-check/SKILL.md`).
4. **Update `memory-bank/progress.md`** if state or next steps changed.
5. **Show the diff and wait:** present `git status` and the diff summary to the developer and get explicit confirmation before `git commit` or `git push`.

Work happens on a `feature/*` branch and reaches `main` only through a reviewed pull request.

## 4. Do not modify without explicit developer confirmation
- `BRIEFING.md` and `CONTEXT.md` (company source of truth)
- `.gitignore` and any `.env*` file (never commit secrets)
- Generated blocks in `uis/talent-pipeline-tracker/AGENTS.md`
- `package-lock.json` / lockfiles (except via a deliberate dependency change)
- `dist/`, `node_modules/` (generated)

## 5. Rules and skills
- Rules: `.agents/rules/` (each states its scope: always active, file-pattern, or agent-requested).
- Skills: `.agents/skills/` (each has one objective, inputs and verifiable acceptance criteria).
