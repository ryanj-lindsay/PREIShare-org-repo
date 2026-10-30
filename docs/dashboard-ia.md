# PREIshare Investor Dashboard — Information Architecture

Sprint 3, Topic 1 — source: `docs/investor-dashboard-brief.md`

## Purpose

The map of investor-facing pages in the dashboard shell: which URLs exist, what each page is for, and how an investor moves between them. Everything shown is mock data. No sign-in, admin tools, or live data in this sprint.

## URL map and page purposes

| URL path | Route file | Route name | Nav label | Page title | Page purpose | Primary content |
| --- | --- | --- | --- | --- | --- | --- |
| `/dashboard` | `src/routes/dashboard/index.tsx` | Dashboard home | Home | Dashboard | Quick scan of portfolio value and recent activity | Stats row (`StatsCard` ×4), `PortfolioSummary`, `RecentActivity` |
| `/dashboard/portfolio` | `src/routes/dashboard/portfolio.tsx` | Portfolio | Portfolio | Portfolio | Review every holding at a glance | `PortfolioTable` (mock holdings) |
| `/dashboard/deals` | `src/routes/dashboard/deals.tsx` | Deals | Deals | Deals | See open deals and how close they are to closing | `DealsList` (mock deals) |
| `/dashboard/profile` | `src/routes/dashboard/profile.tsx` | Profile | Profile | Profile | View the investor's own member details | `ProfileCard` (read-only mock member) |

These four are the only pages under `/dashboard`. The existing site pages `/` and `/about` stay as they are and are not part of the dashboard navigation.

## Route structure

```text
src/routes/
├── __root.tsx            existing root document (site Header + Footer) — wraps every page
├── index.tsx             /            existing home page — unchanged
├── about.tsx             /about       existing — unchanged
├── dashboard.tsx         /dashboard   parent layout route: renders AppShell around <Outlet />
└── dashboard/
    ├── index.tsx         /dashboard
    ├── portfolio.tsx     /dashboard/portfolio
    ├── deals.tsx         /dashboard/deals
    └── profile.tsx       /dashboard/profile
```

Nesting every page under one `dashboard` parent route means the shell (sidebar, header, main area) is written once and wraps all four pages. Child pages only render their own content.

## Navigation rules

- **Shared chrome:** a left sidebar with the four links on desktop, a dashboard header showing the current page title, and the main content area beside or below them.
- **One nav list:** labels and paths are defined once in `navConfig` and used everywhere navigation appears.
- **Active state:** the link for the current URL is highlighted. Home is active only on `/dashboard` itself, not on every child page.
- **Page title:** the header title matches the nav label's page ("Dashboard" on Home, the label otherwise), and the browser tab title follows the pattern `<Page> · PREIshare`.
- **Labels:** short and investor-friendly: Home, Portfolio, Deals, Profile.
- **Phone width:** the sidebar collapses behind a labeled "Menu" button in the dashboard header (with `aria-expanded`); choosing a link closes it.
- **Mock data label:** every page with numbers or names shows a visible "Mock data" note.

## Out of scope for this shell

- Sign-in, sign-up, and account pages
- Live Supabase/PostgreSQL queries and pgvector search
- Admin, sponsor, or listing-manager tools
- Investing, payments, or document vaults
- Settings or notifications pages

## Notes for later route files

- Parent layout route: `src/routes/dashboard.tsx` (path `/dashboard`) renders `AppShell` with an `<Outlet />`.
- Child routes: `index` (home), `portfolio`, `deals`, `profile` in `src/routes/dashboard/`.
- Regenerate `src/routeTree.gen.ts` with `npm run generate-routes` (or let the dev server do it); never hand-edit it.
- The site `Header`/`Footer` in `__root.tsx` keep wrapping the dashboard for now. Whether the dashboard should hide the marketing header is an open question, not a change for this sprint.
