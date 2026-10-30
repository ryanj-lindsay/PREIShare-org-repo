# Architecture decisions — investor dashboard shell (Sprint 3)

Why the dashboard shell is built the way it is, so the next person knows what each piece is for and what not to rip out. Each decision lists the context, what was decided, and the consequences.

Related: [`docs/investor-dashboard-brief.md`](investor-dashboard-brief.md) (requirements), [`docs/dashboard-ia.md`](dashboard-ia.md) (routes), [`docs/component-plan.md`](component-plan.md) (components), [`docs/verification-checklist.md`](verification-checklist.md) (what was checked), [`docs/decisions/ADR-001-investor-listing-types.md`](decisions/ADR-001-investor-listing-types.md) (Sprint 2 types).

## AD-1: File-based routes, nested under `/dashboard`

**Context.** The brief has exactly four investor areas, and the project already uses TanStack Start with TanStack Router's file-based routing (`src/routes/`).

**Decision.** Each area is one file in `src/routes/dashboard/` (`index`, `portfolio`, `deals`, `profile`), all children of a parent route `src/routes/dashboard.tsx`. The site pages `/` and `/about` stay separate.

**Consequences.**
- A URL maps to one obvious file, and route paths are type-checked: a link to a page that doesn't exist fails the typecheck.
- New dashboard pages go in `src/routes/dashboard/`; `src/routeTree.gen.ts` is regenerated (`npm run generate-routes` or the dev server), never hand-edited.
- Everything under `/dashboard` can later be protected by sign-in in one place, the parent route.

## AD-2: One AppShell, rendered once by the parent route

**Context.** All four pages need the same sidebar, header, and content area, and it has to collapse on phones.

**Decision.** `src/routes/dashboard.tsx` renders `AppShell` around an `<Outlet />`. `AppShell` composes `Sidebar` and `Header` and owns the mobile-menu state; child pages render only their own content.

**Consequences.**
- Layout changes happen in one file and apply to every dashboard page.
- Pages stay small and can't drift into different layouts.
- Don't move the shell into individual pages — that brings back duplicated layout and per-page differences.

## AD-3: One `navConfig` for labels, paths, and titles

**Context.** The sidebar links, the header's page title, and the browser tab title all describe the same four pages, and keeping three lists in sync by hand breaks quickly.

**Decision.** `src/components/layout/navConfig.ts` is the single typed list of `{ label, path, title }`. `NavItems` builds the links from it, `AppShell` looks up the current page's title in it, and each route's tab title uses `documentTitle()` from it. Active links use exact matching, so Home isn't highlighted on child pages.

**Consequences.**
- Renaming or adding a page is one edit, and paths are limited to the `DashboardPath` type.
- Anything that shows navigation (for example a future mobile bottom bar) should read `navConfig`, not keep its own list.

## AD-4: A hard boundary around mock data

**Context.** This sprint is shell-only — no backend — but the next sprint will connect live data, and stakeholders must never mistake sample numbers for real balances.

**Decision.** All sample values live in `src/data/mock-dashboard.ts` as typed `MOCK_*` constants. Route files pass them into components as props; components never import mock data themselves and never fetch. Every page shows a visible "sample data" note, and the header carries a "Mock data — not live" badge.

**Consequences.**
- Going live means replacing the `MOCK_*` constants at the route level (for example with a server function), without touching the components.
- The types in `mock-dashboard.ts` (`Holding`, `Deal`, `ActivityItem`, `InvestorProfile`) are the first draft of the data contract the backend must provide.
- When real data arrives, remove the mock badges and notes in the same change, so the labels never lie in either direction.

## AD-5: A responsive and accessibility baseline in `dashboard.css`

**Context.** The brief requires the shell to work on a phone, and investors must be able to use it with a keyboard.

**Decision.** `src/styles/dashboard.css`, loaded through `src/styles.css`, holds the shell's layout rules: below 1024 px the sidebar collapses behind a Menu button (`aria-expanded`, `aria-controls`); wide tables scroll inside their panel; every link and button has a visible focus outline; a skip link jumps to the main content. Components use Tailwind utilities and the existing CSS variables for everything else.

**Consequences.**
- New dashboard UI should reuse these rules (for example wrap wide content in `dashboard-scroll`) instead of adding one-off fixes.
- Don't remove focus outlines without replacing them; that breaks keyboard use.

## AD-6: Deploy on Vercel through the Nitro adapter, with pinned versions

**Context.** Vercel served nothing for TanStack Start without a server adapter, and it blocked a TanStack Start version with a known XSS vulnerability (CVE-2026-102989).

**Decision.** `vite.config.ts` adds the `nitro()` plugin after `tanstackStart()`. `nitro` is pinned to an exact version, `@tanstack/react-start` is `^1.168.61`, and `@tanstack/router-cli` was raised to match, so every TanStack package shares one `router-core` version. `app.config.ts` is a stub that nothing loads; it only points to `vite.config.ts`.

**Consequences.**
- Removing the Nitro plugin breaks the Vercel deployment even though the build still succeeds.
- Upgrade TanStack packages together; mismatched `router-core` versions fail the build.

## Next sprint foundations

| Foundation | What to build | How it fits the shell |
| --- | --- | --- |
| **Supabase auth** | Sign-in and sign-out with Supabase Auth; only signed-in investors can open `/dashboard`. | Guard the parent route `src/routes/dashboard.tsx` (AD-1), so all four pages are protected at once. Keep Supabase keys in server-side `process.env` and create `src/lib/supabase.ts` only with team approval (`.cursor/rules/preishare.mdc`). |
| **Live portfolio data** | Supabase/PostgreSQL tables for holdings, deals, activity, and profiles; server functions that load the signed-in investor's rows. | Replace each `MOCK_*` constant at the route level (AD-4); start the schema from the types in `src/data/mock-dashboard.ts` and the Sprint 2 listing types in `src/types/`. |
| **pgvector-powered search** | Embeddings for deal descriptions stored with pgvector, and a "deals like this" search on the Deals page. | Comes after live deals data exists; results render through the existing `DealsList`. |
| **GitHub Actions CI** | A workflow that runs `npm ci`, `npm run typecheck`, and `npm run build` on every pull request. | Gives the team the automated checks the definition of done expects; today these run only by hand. |
