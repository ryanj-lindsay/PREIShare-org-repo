# PREIShare repo map

**Author:** Ryan
**Date:** 2026-09-17
**Based on:** `docs/onboarding/setup-log.md` (verified clone/remote setup) plus direct spot-checks of the working tree (`ls`, `find`, `grep`, and file reads) run in this session.

## 1. Overview

PREIShare is currently a **frontend-only scaffold**: a TanStack Start app (React 19 + TanStack Router, SSR-capable) bundled with Vite, styled with Tailwind CSS v4, generated via `create-tsrouter-app`. There is no backend/data layer wired up yet, no lint/format tooling, and no CI. Conventions for a future Supabase integration exist in `.cursorrules`, but the code referenced there hasn't been written.

## 2. Top-level map

| Path | Purpose (verified) |
| --- | --- |
| `src/` | The entire web app — components, routes, router, styles. |
| `docs/` | Project documentation; currently onboarding guides only. |
| `.vscode/` | Shared VS Code workspace settings. |
| `package.json` | Node manifest — scripts, dependencies (React 19, TanStack Router/Start, Tailwind v4, Vite). |
| `package-lock.json` | Locked npm dependency tree. Only manifest pair in the repo — single package, not a monorepo. |
| `tsconfig.json` | TypeScript compiler config (strict mode, bundler resolution, `#/*` and `@/*` → `src/*`). |
| `tsr.config.json` | Config for the TanStack Router CLI (drives `routeTree.gen.ts` generation). |
| `vite.config.ts` | Vite config; wires up `tanstackStart()`, `viteReact()`, `tailwindcss()`, and devtools plugins. |
| `README.md` | Top-level intro / getting-started instructions. |
| `AGENTS.md` | Instructions for AI coding agents working in this repo. |
| `.cursorrules` | Cursor AI-assistant rules: import conventions, styling, Supabase client convention, testing expectation. |
| `.cta.json` | Leftover scaffolding-tool config from `create-tsrouter-app`. |
| `.gitignore` | Ignores `node_modules`, `dist`, `.env`, `*.local`, framework build caches (`.nitro`, `.tanstack`, `.output`, etc.). |

## 3. Frontend

- **App root:** `src/`
- **Router entry:** `src/router.tsx` — `getRouter()` builds the TanStack Router instance from the generated route tree.
- **Generated route tree:** `src/routeTree.gen.ts` — auto-produced by `tsr generate`; not hand-written.
- **Document shell:** `src/routes/__root.tsx` — root route; renders `<html>/<head>/<body>`, injects global CSS, header/footer, theme-init script, and devtools panel.
- **Page routes:** `src/routes/index.tsx` (`/`), `src/routes/about.tsx` (`/about`).
- **Components:** `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/ThemeToggle.tsx`.
- **Styles:** `src/styles.css` — global Tailwind entry, imported into `__root.tsx` via `?url`.
- **Shared helper:** `src/lib/user.ts` — the only file in `src/lib/` today; not Supabase-related despite the folder's future intended use (see below).

## 4. Backend / data layer

**Status: not built yet.** Verified by direct search — no matches for Supabase/Postgres in code, no `.env*` files, no `supabase/` directory, no `*.sql` files, no DB client dependency in `package.json`.

- `.cursorrules:11` states *"Use the Supabase client from `lib/supabase.ts`"* — this file **does not exist**. It's a forward-looking convention, not a working integration.
- `.gitignore` already ignores `.env` and `*.local`, so the secrets-handling convention is in place even though no env file exists yet.
- No `.env.example` documenting expected variables.
- No `@supabase/supabase-js` (or any DB client) in `package.json` dependencies.
- No migrations, seed scripts, or SQL anywhere in the tree.

Whoever picks up the data layer will be starting from zero: adding the Supabase SDK dependency, creating `src/lib/supabase.ts`, adding an `.env.example`, and likely running `supabase init` for local migrations.

## 5. Tooling

| Category | Status | Location |
| --- | --- | --- |
| Lint / format | **Missing** — no ESLint, Prettier, Biome, or `.editorconfig`. TypeScript strict-mode flags (`noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`) are the only compile-time checks. | — |
| TypeScript config | Present | `tsconfig.json` |
| CI / GitHub Actions | **Missing** — no `.github/workflows/` directory; nothing runs automatically on push/PR. | — |
| Editor config | Present, minimal (only hides/protects `routeTree.gen.ts`) | `.vscode/settings.json` |
| Agent config | Present | `AGENTS.md`, `.cursorrules` |
| Scaffold leftover | Present | `.cta.json` (from `create-tsrouter-app`) |

## 6. Safe first-touch vs. do-not-edit-yet

**Safe to touch as a first PR:**
- `src/routes/*.tsx` — add or edit a page route.
- `src/components/*.tsx` — add or edit a UI component, following existing patterns per `.cursorrules`.
- `src/styles.css` — add Tailwind tokens/utilities.
- `docs/**` — documentation is low-risk and explicitly part of onboarding.
- `README.md` — safe to improve, keep in sync with reality.

**Do not edit yet (or edit with caution):**
- `src/routeTree.gen.ts` — auto-generated; `.vscode/settings.json` already marks it read-only/watch-excluded. Regenerate via `npm run generate-routes` instead of hand-editing.
- `tsr.config.json`, `vite.config.ts`, `tsconfig.json` — build/tooling config; changes here affect the whole app and have no CI safety net to catch breakage.
- `.cta.json` — scaffold-tool metadata; no reason to touch it.
- Anything claiming to be `src/lib/supabase.ts` — doesn't exist yet; creating it means making real architectural decisions (env var names, client init pattern) that should probably be discussed first, not improvised solo.
- `package.json` / `package-lock.json` — dependency changes should be deliberate given there's no CI to catch a broken install/build.

## 7. Open questions

1. Who owns standing up the Supabase integration referenced in `.cursorrules`, and is there an existing Supabase project/credentials to point `src/lib/supabase.ts` at?
2. What environment variables will the app need (`VITE_*` public config vs. server-only secrets), and can we get an `.env.example` committed early so onboarding doesn't require guessing?
3. Is there an intended lint/format tool (ESLint flat config? Biome?) the team wants, or is TypeScript strict-mode considered sufficient for now?
4. Is CI (GitHub Actions) planned before more contributors start merging to `main`, given there's currently no automated build/lint/test gate?
5. `.cursorrules:11` says "Follow existing component patterns in `src/components`" and "Write tests for new features" — but there's no test runner/config anywhere in the repo. What's the intended test setup?
