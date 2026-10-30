# PREIshare Investor Dashboard — Component Inventory

Sprint 3, Topic 1 — sources: `docs/investor-dashboard-brief.md`, `docs/dashboard-ia.md`

## Scope

The reusable UI pieces for a responsive dashboard shell with **mock data only**. Components show structure and placeholder content; none of them call an API. Each one takes its data as typed props, so live data can replace the mock constants later without rewriting the component.

## Layout components (shared chrome) — `src/components/layout/`

| Component | File | Responsibility | Used on | Must NOT do |
| --- | --- | --- | --- | --- |
| `AppShell` | `AppShell.tsx` | Page frame: places `Sidebar`, `Header`, and the main content area; owns the mobile menu open/closed state | Parent route `dashboard.tsx` (all `/dashboard/*` pages) | Render page widgets or hold mock data |
| `Sidebar` | `Sidebar.tsx` | PREIshare branding and the nav region; collapses on narrow screens | `AppShell` | Define its own list of links, or show the page title |
| `Header` | `Header.tsx` | Dashboard top bar: current page title, "Mock data" badge, and the Menu button on narrow screens | `AppShell` | Define the nav list or render links |
| `NavItems` | `NavItems.tsx` | Renders the links from `navConfig` with the active-link style | `Sidebar` | Hard-code labels or paths |
| `navConfig` | `navConfig.ts` | The single list of nav labels, paths, and page titles, plus a helper to look up the title for a path | `NavItems`, `Header` | Render anything |

The existing `src/components/Header.tsx` is the **site** header from the scaffold and stays unchanged; the dashboard `Header` lives in `src/components/layout/` so the two never get confused.

## Dashboard home widgets — `src/components/dashboard/`

| Component | File | Responsibility | Used on | Must NOT do |
| --- | --- | --- | --- | --- |
| `StatsCard` | `StatsCard.tsx` | One labeled figure (for example "Current value · $512,400") with an optional short note | Home (×4) | Calculate figures or fetch data |
| `PortfolioSummary` | `PortfolioSummary.tsx` | Short snapshot of the portfolio (holdings count, split by property type) with a link to Portfolio | Home | Render the full holdings table |
| `RecentActivity` | `RecentActivity.tsx` | List of the latest mock events (investment made, distribution paid, deal opened), with an empty state | Home | Show holdings or deals in detail |

## Page shell components — `src/components/dashboard/`

| Component | File | Responsibility | Used on | Must NOT do |
| --- | --- | --- | --- | --- |
| `PortfolioTable` | `PortfolioTable.tsx` | Table of holdings: property, type, invested, current value, status; scrolls inside its panel on narrow screens; friendly empty state | Portfolio page | Fetch data or calculate totals for Home |
| `DealsList` | `DealsList.tsx` | List of deals: name, location, minimum investment, target raise, status ("Open", "Closing soon"); friendly empty state | Deals page | Offer an "Invest" action (out of scope) |
| `ProfileCard` | `ProfileCard.tsx` | Read-only card: name, email, membership tier, contact preference, notes | Profile page | Act as an edit form |

## Mock data and helpers

| Piece | File | Responsibility |
| --- | --- | --- |
| Mock data | `src/data/mock-dashboard.ts` | Typed mock constants for stats, holdings, activity, deals, and the investor profile — the only place mock values live |
| Money formatting | `src/lib/format.ts` | Formats whole-dollar numbers for people (`50000` → `$50,000`) |
| Dashboard styles | `src/styles/dashboard.css` | Responsive layout and focus styles for the shell, loaded by the existing `src/styles.css` |

## Page → component map

| Page | Components |
| --- | --- |
| All `/dashboard/*` pages | `AppShell` → `Sidebar` (→ `NavItems`), `Header` |
| `/dashboard` | `StatsCard` ×4, `PortfolioSummary`, `RecentActivity` |
| `/dashboard/portfolio` | `PortfolioTable` |
| `/dashboard/deals` | `DealsList` |
| `/dashboard/profile` | `ProfileCard` |

Every component above is used by at least one page, and every page has at least one component.

## Rules for every component

- Default-export a function component, matching the existing `src/components/` pattern.
- Props are typed in TypeScript; mock data comes in through props or typed defaults, never inline magic values.
- Style with Tailwind utilities and the existing CSS variables; dashboard-only layout rules go in `src/styles/dashboard.css`.
- Money shows as currency; anything that is mock says so on screen.
- No new dependencies without team approval.
