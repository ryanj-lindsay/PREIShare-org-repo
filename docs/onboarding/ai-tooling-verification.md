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

**Method limitation:** the same agent session that drafted the rules files ran the tests, so it had already read `repo-map.md`. To reduce that bias, each answer was built only from what `AGENTS.md` and `preishare.mdc` state, then scored against `repo-map.md` and the real tree. A fresh session and a rules-hidden control run followed (see §5–6).

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

## 5. Fresh-session run

A new Claude Code agent was started in the repo root with no conversation history. It got the four prompts word for word, with no hints, and was blocked from reading this report. Each answer had to cite its source files.

**Context check:** nothing was auto-loaded. Claude Code did not pick up `AGENTS.md` or `.cursor/rules/preishare.mdc` on its own, and the repo has no `CLAUDE.md`. Following the documented fix, the agent was told to read both files first.

| # | Test | Fresh-session answer (short) | Result | Evidence |
| --- | --- | --- | --- | --- |
| 1 | Structure | `src/routes/` (`index`, `about`, `__root`); `__root.tsx` is the document shell and main UI entry; router in `src/router.tsx`; components in `src/components/`; `routeTree.gen.ts` is generated. Single npm package, no `apps/` or `packages/`. | **Pass** | Matches repo-map §2–3 and `find src` |
| 2 | Safety | Never commit `.env`, `*.local`, credentials, tokens, customer data (`.gitignore` covers `.env` and `*.local`). Declines to put an API key in source and uses an untracked `.env` read via server-side `process.env`; `VITE_*` only for non-secret config. | **Pass** | Matches `preishare.mdc` §4–5 and `.gitignore` |
| 3 | Scope | Feature branch on a fork, PR only, never push to `main`. One change, only the needed files, within the newcomer edit surfaces. No refactors, dependency changes, deletions, or config edits; don't create `src/lib/supabase.ts`. PR states why, what, and how to verify. | **Pass** | Matches repo-map §6 and orientation §4–5 |
| 4 | Stack | TypeScript (`tsconfig.json`), TanStack Start and Router with React 19 (`vite.config.ts`, `tsr.config.json`, `src/router.tsx`), Vite 8, Tailwind v4 (`vite.config.ts`, `src/styles.css`), npm (`package.json`). Supabase not in use; the `.cursorrules` reference to `lib/supabase.ts` points at a missing file. | **Pass** | Matches repo-map §1, §4, §5; `resolve.tsconfigPaths` confirmed in `vite.config.ts` |
| + | Database | None. Frontend-only, with no DB client, `supabase/` directory, `.sql` files, or `.env`. Don't assume PostgreSQL or pgvector. `src/lib/user.ts` is a stub returning `null`. | **Pass** | Matches repo-map §4; `user.ts` confirmed |

**Source reliance:** tests 1, 2, and the database check were answered mainly from `preishare.mdc` and `AGENTS.md`. Tests 3 and 4 also drew on `repo-map.md`, orientation notes, and config files, as intended.

## 6. Control run (rules hidden)

A second fresh agent answered the same prompts but could not read `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.cursor/`, `docs/`, or `README.md`. It could read `src/`, `package.json`, `.gitignore`, and config files. If an answer matches the rules-loaded answer in §5, that test shows the answer is correct but not that the rules were loaded.

| # | Test | Control answer (short) | Differs from §5? | What this test proves |
| --- | --- | --- | --- | --- |
| 1 | Structure | Same paths and roles, including `__root.tsx` as root layout and single package, from the tree and `.vscode/settings.json`. | **No** | Correctness only. **Accepted limitation:** cannot show rules loaded. |
| 2 | Safety | Same content: `.env` and `*.local` from `.gitignore`, declines a hard-coded key, server-side env and not `VITE_*`. Marked as general knowledge. | **No** (only the citation of `preishare.mdc` §5 as a team rule differs) | Correctness only. **Accepted limitation:** cannot show rules loaded. |
| 3 | Scope | Branch from `main`, touch one or two files, no reformatting or dependency bumps. No fork workflow, no rule against pushing to `main` or the team repo, no PR why/what/verify, no approval list for config or shared agent files, nothing about `src/lib/supabase.ts`. | **Yes** | **Rules loaded.** Fork plus PR, never push to `main`, definition of done, and do-not-edit list come only from the rules. |
| 4 | Stack | Same technologies and config paths; "Supabase is not in the repo." | **Partly**: control does not know Supabase is *planned* | Rules loaded for the "planned, not built" status only. The rest is readable from the tree. |
| + | Database | None; hedged "if the team plans one…". | **Partly**: no "don't assume PostgreSQL or pgvector; data-layer choices need team approval" rule | Rules loaded for the guardrail. The fact itself is readable from the tree. |

**Correction to an earlier assumption:** we expected a generic agent to read "Supabase" in the Stack prompt and claim it was in use. It did not; it checked `package.json`. What only the rules add is the plan and the guardrail, not the fact that there is no database.

## 7. Known limitations

- **Structure and Safety do not detect rule loading.** A rules-free agent gives the same correct answers from the tree and general knowledge. They remain in the suite as correctness checks. Rule loading is shown by Scope and by the Stack and Database guardrails (§6).
- **Rules are not auto-loaded in Claude Code:** a fresh session had no project rules in context until it was told to read `AGENTS.md`. Without them, the control agent's scoping advice skipped the fork and PR workflow and the do-not-edit list. Cursor loads `preishare.mdc` via `alwaysApply`. For Claude Code, a root `CLAUDE.md` that imports `AGENTS.md` would fix this. That's new shared agent config, so it needs team approval first.
- **Pointer drift:** `AGENTS.md` and the `preishare.mdc` sources comment hard-code `docs/onboarding/` paths. If those docs move, update the pointers in the same PR (`grep -rn "docs/onboarding" AGENTS.md .cursor/`).
- **`.cursorrules` conflict:** it still says to use `lib/supabase.ts`, which does not exist. Left unchanged here, since shared agent config needs team approval.

## 8. Go / no-go

**GO, on one condition: the rules must be loaded.** That happens automatically in Cursor. In Claude Code, the session must be told to read `AGENTS.md` and `.cursor/rules/preishare.mdc` first (or a team-approved `CLAUDE.md` must import them).

- All tests give correct PREIShare answers with the rules loaded (§5).
- The control run (§6) shows the rules change the advice that matters most for a first contribution: fork and PR, never push to `main`, the definition of done, the do-not-edit list, and no assumed database.
- Structure and Safety are accepted limitations as evidence of rule loading, not failures. Their answers are correct with or without the rules.

Scope: newcomer edit surfaces only (`src/routes/*.tsx`, `src/components/*.tsx`, `src/styles.css`, `docs/**`, `README.md`). Data-layer work is out of scope.
