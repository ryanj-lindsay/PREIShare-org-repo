# PREIShare AI tooling verification

**Author:** Ryan
**Date:** 2026-09-25
**Branch:** `docs/agent-rules`
**Ground truth:** `docs/onboarding/repo-map.md` and the working tree

## 1. Environment notes

| Item | Value |
| --- | --- |
| OS | Windows + WSL2 (Linux 6.6.87.2) |
| Agent | Claude Code (CLI), started in the repo root |
| Context files | `.cursor/rules/preishare.mdc` (`alwaysApply: true`), `AGENTS.md`, `docs/onboarding/repo-map.md` |
| Context check | Agent read all three files from disk before testing; answers cite repo paths, not generic web advice |

**Method limitation:** the same agent session that drafted the rules files ran the tests, so it had already read `repo-map.md`. To reduce that bias, each answer was built only from what `AGENTS.md` and `preishare.mdc` state, then scored against `repo-map.md` and the real tree. A fresh session is still the stronger test (see §5).

## 2. Smoke tests

| # | Test | Agent answer (short) | Result | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Structure | Routes in `src/routes/`, router in `src/router.tsx`, components in `src/components/`. Single npm package, not a monorepo, so no packages/apps split. | **Vague** | Paths and single-package role match repo-map §2–3, but `src/routes/__root.tsx` (the document shell and main UI entry) was not named in either rules file. |
| 2 | Safety | Never commit, paste, or log `.env`, credentials, tokens, or customer data; secrets only via server-side `process.env`. | **Vague** | Named `.env`, but did not point at `.gitignore`, did not mention `*.local`, and did not say what to do when asked to put a secret in source. |
| 3 | Scope | Start in `src/routes`, `src/components`, `src/styles.css`, `docs/**`, or `README.md`. Touch only the files needed; one concern per PR; no "while I was here" edits; no build-config or dependency changes. | **Pass** | Matches repo-map §6 "safe first-touch" list and the orientation notes' first-PR definition of done. |
| 4 | Stack | TanStack Start, React 19, TanStack Router, Vite 8, Tailwind CSS v4, strict TypeScript, npm. Config in `vite.config.ts`, `tsconfig.json`, `tsr.config.json`, `package.json`, `src/styles.css`. Supabase planned, not built. | **Pass** | Matches repo-map §1, §2, §4, §5. No invented frameworks. |

## 3. Rule and memory edits

| File | Edit | Closes |
| --- | --- | --- |
| `AGENTS.md` | Added a "Where things live" row: `src/routes/__root.tsx`, the root route and document shell (main UI entry) | Test 1 |
| `AGENTS.md` | Added `*.local` to the never-commit secrets list | Test 2 |
| `.cursor/rules/preishare.mdc` §5 | Secrets bullet now names `*.local` and points at `.gitignore` | Test 2 |
| `.cursor/rules/preishare.mdc` §5 | New bullet: if asked to put a secret in source, refuse and use server-side `process.env` loaded from an untracked `.env` | Test 2 |
| `.cursor/rules/preishare.mdc` §2 | New line: "Database: none in use. Do not assume PostgreSQL, pgvector, or any schema; data-layer choices need team approval." | Test 4 follow-up: stops agents from filling in an unused database stack |

## 4. Re-test outcomes

| # | Test | Re-test answer (short) | Result |
| --- | --- | --- | --- |
| 1 | Structure | Adds `src/routes/__root.tsx` as the document shell and main UI entry, alongside the paths above. | **Pass** |
| 2 | Safety | Names `.env` and `*.local` as gitignored (`.gitignore`); refuses to put secrets in source and redirects to server-side `process.env` from an untracked `.env`; never `VITE_*` for secrets. | **Pass** |

Tests 3 and 4 were not re-run (they already passed). After the §2 database line was added, a rules-only answer to "what database does this repo use?" is: none; do not assume PostgreSQL or pgvector; ask the team. **Pass.**

## 5. Known limitations

- **Self-graded session:** the tests were run by the agent that wrote the rules. Re-run all four prompts in a fresh agent session before relying on these results.
- **Pointer drift:** `AGENTS.md` and the `preishare.mdc` sources comment hard-code `docs/onboarding/` paths. If those docs move, update the pointers in the same PR (`grep -rn "docs/onboarding" AGENTS.md .cursor/`).
- **`.cursorrules` conflict:** it still says to use `lib/supabase.ts`, which does not exist. Left unchanged here, since shared agent config needs team approval.

## 6. Go / no-go

**Go**, for a first contribution limited to the newcomer edit surfaces (`src/routes/*.tsx`, `src/components/*.tsx`, `src/styles.css`, `docs/**`, `README.md`). All four smoke tests pass after one refinement cycle. The rules correctly describe structure, secrets handling, scope, and stack.

**Not in scope** for a first contribution: data-layer work. No database exists yet, and the rules now tell agents not to assume one; that work needs a team decision first.
