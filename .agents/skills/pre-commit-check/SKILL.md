---
name: pre-commit-check
description: Verify that a pending change is ready to commit in the Nexova monorepo, following the pre-commit workflow in AGENTS.md.
---

# Skill: pre-commit-check

## Objective
Decide whether the current working-tree change may be committed, and report PASS or FAIL with evidence. This skill checks only; it never commits or pushes.

## Inputs
| Input | Required | Description |
| --- | --- | --- |
| `touched_paths` | yes | Files changed (default: output of `git status --porcelain`) |
| `target_area` | yes | One of: `src` (root TypeScript), `uis/talent-pipeline-tracker`, `uis/website`, `uis/backoffice`, `services`, `docs-only` |
| `briefing_need` | no | The `BRIEFING.md` department need the change serves |

## Steps
1. Run `git status --porcelain` and list the changed files.
2. Run the area checks: `src` → `npm run typecheck` and `npm run build` (repo root); `uis/talent-pipeline-tracker` → `npm run lint` and `npm run build` in that folder; `docs-only` → skip.
3. Check changed paths against the protected list in `AGENTS.md` section 4.
4. Check that no secret or generated file is staged.
5. Check `memory-bank/progress.md` was updated when state changed.
6. Output the report.

## Acceptance criteria (each must be verifiable)
- [ ] Area checks exit with code 0 (or area is `docs-only`).
- [ ] `git diff --name-only` and `git diff --cached --name-only` contain no protected path (`BRIEFING.md`, `.gitignore`, `.env*`, lockfiles) unless the developer confirmed it in this session.
- [ ] `git ls-files --cached` shows no `.env*`, `node_modules/` or `dist/` entries.
- [ ] If `briefing_need` is given, it quotes text that exists in `BRIEFING.md` (`grep -F` succeeds).
- [ ] `memory-bank/progress.md` appears in the diff when feature state changed.
- [ ] The report lists each criterion with PASS/FAIL and the command output that proves it; any FAIL makes the overall result FAIL.

## Output
A short table of criteria with PASS/FAIL and evidence, then an overall verdict.
