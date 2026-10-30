# Sprint 3 handoff — PREIshare investor dashboard shell

- **Audience:** PREIshare stakeholders, and the teammates who pick up the next sprint
- **Date:** 2026-10-30
- **Author:** Ryan Lindsay
- **Branch:** `sprint-3` (merged to `main` when Sprint 3 ships)

## Summary for stakeholders

PREIshare now has the frame of its investor dashboard: one place where an investor can see a snapshot of their portfolio, browse open deals, and check their profile, on a phone or a laptop. Every page, link, and layout is real. **The numbers and names on it are not** — they are sample data, and each page says so. Connecting real accounts and real portfolio figures is the next sprint's work; this sprint gives that work a tested shell to plug into.

What the client asked for is in [`docs/investor-dashboard-brief.md`](investor-dashboard-brief.md). What we checked, and how, is in [`docs/verification-checklist.md`](verification-checklist.md) — every in-scope item passed.

## What shipped

**Pages** (planned in [`docs/dashboard-ia.md`](dashboard-ia.md)):

| Page | URL | What it shows (sample data) |
| --- | --- | --- |
| Home | `/dashboard` | Total invested, current value, active investments, open deals; portfolio snapshot by property type; recent activity |
| Portfolio | `/dashboard/portfolio` | Table of holdings: property, type, invested, current value, status |
| Deals | `/dashboard/deals` | Cards for each open deal with status ("Open", "Closing soon"), minimum investment, and target raise |
| Profile | `/dashboard/profile` | Read-only member details |

The site home page (`/`) now says PREIshare and links to the dashboard.

**Building blocks** (planned in [`docs/component-plan.md`](component-plan.md)):

- **Layout** — `src/components/layout/`: `AppShell` (the frame), `Sidebar`, `Header` (page title, "Mock data — not live" badge, Menu button on small screens), `NavItems`, and `navConfig.ts`, the one list of pages, labels, and titles.
- **Widgets** — `src/components/dashboard/`: `StatsCard`, `PortfolioSummary`, `RecentActivity`, `PortfolioTable`, `DealsList`, `ProfileCard`. Each takes typed props and shows a friendly message when it has nothing to show.
- **Sample data** — `src/data/mock-dashboard.ts`, the only place mock values live (`MOCK_HOLDINGS`, `MOCK_DEALS`, `MOCK_ACTIVITY`, `MOCK_PROFILE`).
- **Helpers and styles** — `src/lib/format.ts` (money and dates for people) and `src/styles/dashboard.css` (responsive layout, focus outlines, collapsing sidebar).
- **Routes** — `src/routes/dashboard.tsx` (the shared layout) and `src/routes/dashboard/{index,portfolio,deals,profile}.tsx`.

## How to run it locally

You need Node.js 20 or newer (it includes `npm`). From the project folder:

```sh
npm install        # once, and whenever package.json changes
npm run dev        # starts the app at http://localhost:3000
```

Then open <http://localhost:3000/dashboard>. Other useful commands, all defined in `package.json`:

- `npm run typecheck` — checks every TypeScript file; should finish with no errors
- `npm run build` then `npm run preview` — builds and serves the production version locally

## Demo script (about 3 minutes)

1. Open `/` and click **Open investor dashboard**.
2. On **Home**, point out the four figures at the top and the "Sample figures… not a live balance" note, then the portfolio snapshot and recent activity.
3. Click **Portfolio** in the sidebar: the link highlights and the header changes to "Your portfolio". Walk the holdings table.
4. Click **Deals**: show the status badges, and that "Harbor Point Condos" is closing soon.
5. Click **Profile**: read-only member details.
6. Narrow the browser (or open it on a phone): the sidebar folds behind the **Menu** button; open it and pick a page.
7. Close with: *"The shell is done and checked; next sprint connects real accounts and real portfolio data."*

## Known limitations

- **Everything is sample data.** No figure, holding, deal, or profile is real, and every page says so on screen.
- **Not built yet:** sign-in and accounts (authentication), live portfolio and deals data from Supabase/PostgreSQL, pgvector-powered search, investing or payments, profile editing, and automated tests or GitHub Actions CI.
- The starter site's top bar above the dashboard still says "TanStack Start" (checklist item I1, low severity).
- The Menu button and keyboard focus were checked in code, not by hand; try both on a real phone before a live demo (checklist item I2).

## Recommended next-sprint work

In rough order (details and reasoning in [`docs/architecture-decisions.md`](architecture-decisions.md#next-sprint-foundations)):

1. **Supabase auth** — sign-in, and a `/dashboard` that only signed-in investors can open.
2. **Live portfolio data** — replace each `MOCK_*` constant with a server function that loads the signed-in investor's data; the components already take props, so they don't change.
3. **GitHub Actions CI** — run `npm run typecheck` and `npm run build` on every pull request.
4. **pgvector-powered search** — "find deals like this one" on the Deals page, once deals live in the database.
5. Small polish: rebrand or hide the starter site header on dashboard pages.
