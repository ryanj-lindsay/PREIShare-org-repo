<!-- intent-skills:start -->
## Skill Loading

Before editing files for a substantial task:
- Run `npx @tanstack/intent@latest list` from the workspace root to see available local skills.
- If a listed skill matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` before changing files.
- Use the loaded `SKILL.md` guidance while making the change.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->

# PREIShare — agent & onboarding guide

Shared memory for humans and AI agents. Read this first, then `.cursor/rules/preishare.mdc`.

## What PREIShare is

- A real-estate intelligence web app for making smart real-estate decisions.
- Today it is a **frontend-only scaffold**: TanStack Start (React 19) + TanStack Router, Vite, Tailwind CSS v4, strict TypeScript, npm.
- **Not built yet:** backend/Supabase data layer, lint/format tooling, tests, CI.
- Team repo: `github.com/EdTechForLearning/PREIShare-org-repo` — contribute from a fork via pull requests.

## Rules for agents

All AI coding tools follow **`.cursor/rules/preishare.mdc`** — stack, newcomer edit surfaces, conventions, definition of done, and do-not rules.

## Where things live

| Path | What |
| --- | --- |
| `src/routes/` | File-based page routes |
| `src/routes/__root.tsx` | Root route / document shell (`<html>`, header, footer) — main UI entry |
| `src/components/` | UI components |
| `src/styles.css` | Tailwind entry and CSS variables |
| `src/router.tsx` | Router factory |
| `src/routeTree.gen.ts` | Generated — do not hand-edit |
| `docs/onboarding/` | Onboarding docs (below) |

## Onboarding docs

- `docs/onboarding/team-orientation-notes.md` — mission, PR workflow, first-PR definition of done
- `docs/onboarding/repo-map.md` — verified repo structure, tooling gaps, safe vs. do-not-edit paths, open questions
- `docs/onboarding/setup-log.md` — clone and remote setup record

## Scripts

- `npm run generate-routes` — regenerate `src/routeTree.gen.ts` (never hand-edit it)
- All other scripts: see the `scripts` block in `package.json`.

## How agents work here

1. **Plan** — read the relevant files and state the intended change before editing. Load matching TanStack Intent skills (above) for Start/Router/Devtools work.
2. **Small diff** — change only what the task needs; one concern per PR; no unrelated edits.
3. **Verify** — re-read the full diff, confirm it does what was asked, and report what was and wasn't checked.
4. **Ask first** — before deleting files, adding or upgrading dependencies, editing build config, changing database schemas, or making architectural decisions (e.g. creating `src/lib/supabase.ts`).
5. **Never** commit, paste, or log secrets (`.env`, `*.local`, credentials, tokens, real customer data), and never push directly to the team repo or `main`.

Full do-not list: `.cursor/rules/preishare.mdc` §5.
