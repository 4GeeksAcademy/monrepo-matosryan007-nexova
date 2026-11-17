---
scope: always-active
---

# Rule: Delivery workflow

**Scope:** always active, every session and every file.

- Work on a `feature/<short-name>` branch. Never commit or push directly to `main`.
- Follow the 5-step pre-commit workflow in the root `AGENTS.md`; do not commit without developer confirmation.
- Commit messages: imperative, one logical change per commit (e.g. `feat: add backoffice shell`).
- Open a pull request into `main`; merge only after the developer approves.
- Never stage `.env*`, `node_modules/`, `dist/` or `.gitignore` changes unless the developer asked for them.
- Product code lives only in `uis/website`, `uis/backoffice`, `services/` (see `memory-bank/techContext.md`).
