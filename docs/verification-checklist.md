# PREIshare Investor Dashboard Shell — Verification Checklist

- **Sprint:** 3, Topic 1 (TanStack Start dashboard shell)
- **Verifier:** Ryan Lindsay (walkthrough run with an AI coding agent)
- **Date:** 2026-10-30
- **Builds tested:** dev server (`npm run dev`, http://localhost:3000) and the production build (`npm run build`, then `npx vite preview`) on branch `sprint-3`
- **Sources of truth:** `docs/investor-dashboard-brief.md` (what the client asked for), `docs/dashboard-ia.md` (routes and navigation), `docs/component-plan.md` (UI pieces)

## How to use this checklist

- **Pass** — requirement met; the evidence says what was seen and how.
- **Fail** — an in-scope shell problem; it needs a fix and a re-check, or it stays listed as a blocker with a severity.
- **Deferred** — out of scope for this sprint on purpose; the reason is given.

**How evidence was gathered.** Pages were loaded on both builds and their rendered HTML checked for titles, headings, landmarks, and the active link. Layout was checked with headless-browser screenshots: each page inside a frame exactly 375 px wide (phone), and at 600 px and 1280 px window widths. Items marked *code review* were checked by reading the component, not by clicking in a real browser.

---

## 1. Routing and information architecture

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| R1 | `/dashboard` loads the dashboard home inside AppShell | Pass | HTTP 200; header heading "Your dashboard"; sidebar, header, and `main` landmark present; four stat cards, Portfolio snapshot, and Recent activity visible |
| R2 | `/dashboard/portfolio` loads the portfolio page | Pass | HTTP 200; heading "Your portfolio"; Holdings table with 4 mock rows |
| R3 | `/dashboard/deals` loads the deals page | Pass | HTTP 200; heading "Open deals"; 3 deal cards with status badges |
| R4 | `/dashboard/profile` loads the profile page | Pass | HTTP 200; heading "Your profile"; read-only card for "Sam Taylor" |
| R5 | Unknown paths don't break the app | Pass | `/dashboard/nope` returns HTTP 404 with TanStack Router's default "Not Found"; the rest of the app keeps working. A friendlier not-found page is a nice-to-have, not required |
| R6 | No pages under `/dashboard` beyond the four in the brief | Pass | `src/routes/dashboard/` holds only `index`, `portfolio`, `deals`, `profile` |

**IA notes:** routes, nav labels, and page titles match `docs/dashboard-ia.md`. The existing site pages `/` and `/about` stay outside the dashboard, as the IA says; the home page links to `/dashboard`.

---

## 2. Navigation labels and active states

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| N1 | Nav labels match the brief and IA (Home, Portfolio, Deals, Profile) | Pass | Sidebar shows exactly those four, all from `src/components/layout/navConfig.ts` |
| N2 | The active nav item marks the current page | Pass | On each of the four pages exactly one link has `aria-current="page"` and the active style; Home is active only on `/dashboard`, not on child pages (also true with a trailing slash, `/dashboard/deals/`) |
| N3 | The header title changes with the page | Pass | Header `h1` and browser tab read "Your dashboard", "Your portfolio", "Open deals", "Your profile" (tab: "… · PREIshare") |
| N4 | Nav links use client-side routing | Pass (code review) | `NavItems` uses TanStack Router `Link`, which navigates without a full page reload |

---

## 3. Layout shell and responsiveness

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| L1 | AppShell shows sidebar, header, and main content on desktop | Pass | 1280 px screenshot: sidebar left with Home highlighted, header with title and "Mock data — not live", content to the right |
| L2 | Narrow screens keep navigation usable | Pass (markup + code review) | Below 1024 px the sidebar collapses and the header shows a "Menu" button with `aria-expanded="false"` and `aria-controls="dashboard-sidebar"`; clicking it toggles the sidebar and changing page closes it. The click itself was not tested in a real browser — worth trying on a phone before the demo |
| L3 | No sideways page scroll at about 375 px on all four pages | Pass | 375 px frames of the production build: nothing extends past the right edge on Home, Portfolio, Deals, or Profile |
| L4 | Content stays readable; cards and tables stack or scroll on purpose | Pass | At 375 px the stat cards and deal cards stack in one column; at 1280 px stats sit four across and the home sections two across. The holdings table scrolls inside its own panel (scrollbar visible within the panel) |
| L5 | Basic accessibility: keyboard focus and accessible names | Pass (code review) | Every link and button in the shell gets a 3 px focus outline (`src/styles/dashboard.css`); a "Skip to content" link appears on first Tab; the Menu button has visible text; decorative icons are `aria-hidden`; landmarks: `aside` + `nav` (labeled "Dashboard"), `header`, `main`. Tabbing was not tested by hand |

---

## 4. Mock content clarity (demo readiness)

| ID | Check | Status | Evidence |
| --- | --- | --- | --- |
| M1 | Home stat cards show labeled mock metrics | Pass | "Total invested $185,000", "Current value $203,000", "Active investments 3", "Open deals 3", under "Sample figures for a mock investor — not a live balance" |
| M2 | Portfolio shows clear placeholder holdings | Pass | 4 rows (property and city, type, invested, current value, status); note "Sample data — not your live portfolio" |
| M3 | Deals shows open-deal placeholders | Pass | 3 cards with "Open" / "Closing soon", minimum investment, and target raise; note "Sample deals — not live offerings" |
| M4 | Profile shows member-style placeholder fields | Pass | Name, email, membership, contact preference, member since, notes; note "Sample profile — not a real account" |
| M5 | No raw "TODO", "undefined", or empty broken panels | Pass | None seen on the four pages; Portfolio, Deals, Portfolio snapshot, and Recent activity each have a friendly message for an empty list (code review) |
| M6 | Money reads like money | Pass | Every amount is formatted as `$50,000` by `src/lib/format.ts` |

---

## 5. Out-of-scope boundaries (stay deferred)

| ID | Check | Status | Reason |
| --- | --- | --- | --- |
| O1 | Real sign-in / login gate | Deferred | Shell only; the brief puts authentication in a later sprint |
| O2 | Live Supabase/PostgreSQL data | Deferred | All values come from `MOCK_*` constants in `src/data/mock-dashboard.ts`; nothing fetches data |
| O3 | pgvector search | Deferred | Not in this sprint's brief |
| O4 | Investing, payments, profile editing, admin tools | Deferred | Explicitly out of scope in the brief; Deals has no "Invest" action and Profile is read-only |
| O5 | Automated tests and GitHub Actions CI | Deferred | Not set up in the repo yet; listed for a later sprint |

---

## 6. Remaining issues

| ID | Issue | Severity | Status |
| --- | --- | --- | --- |
| I1 | The site's top bar (from the starter, `src/components/Header.tsx`) still says "TanStack Start" with TanStack's X and GitHub links above the dashboard | Low — cosmetic, outside the dashboard shell | Open; rebrand or hide the site header on dashboard pages next sprint (also an open question in `docs/dashboard-ia.md`) |
| I2 | The Menu button and keyboard focus were checked in code, not by hand | Low | Open; click through on a phone and Tab through once before the stakeholder demo |

No in-scope item failed.

## 7. Sign-off

**Ready for stakeholder handoff: Yes.** All four dashboard areas load inside one shell, navigation and titles stay in step, the layout works at phone and desktop widths, and every figure is clearly labeled mock data. The two open items are low severity and don't block the handoff.
