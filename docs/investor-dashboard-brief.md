# PREIshare Investor Dashboard — Client Brief (Sprint 3 shell)

Author: Ryan Lindsay
Date: 2026-10-30
Sprint 3, Topic 1 — Investor dashboard shell

## Product summary

PREIshare investors need one clean, trustworthy place to scan what their portfolio is worth, browse open deals, and check their own profile, without hunting through cluttered pages. This sprint builds the **shell only**: the layout, the navigation, a page for each of four areas, and clearly labeled mock content. Nothing in it talks to a real backend. A later sprint swaps the mock content for live data without redesigning the pages.

## Primary actors

| Actor | Role in this sprint | Build it this sprint? |
| --- | --- | --- |
| Investor (PREIshare member) | Opens the dashboard to scan portfolio value, look at open deals, and review their profile | **Yes** — the only user we build for |
| Listing manager / reviewer (from the Sprint 2 domain brief) | Prepares and approves listings that may later appear as deals | No — mentioned for context only |
| Future admin | May manage investors and deals later | No — future actor, out of scope |

## Investor goals

1. Open the dashboard and see a home overview right away: a portfolio snapshot and recent activity.
2. Move between Home, Portfolio, Deals, and Profile without leaving the app shell or losing their place.
3. Know where they are at all times from the page title and the highlighted navigation link.
4. Use the dashboard on a phone as comfortably as on a laptop.

## Must-have dashboard areas

Exactly these four areas are in scope. Nothing else is presented as part of the product this sprint.

| Area | Route | What the investor sees (mock data) |
| --- | --- | --- |
| Home overview | `/dashboard` | Summary cards (total invested, current value, active investments, open deals) and a short recent-activity list |
| Portfolio | `/dashboard/portfolio` | A table of holdings: property, property type, amount invested, current value, status |
| Deals | `/dashboard/deals` | A list of open deals: name, location, minimum investment, target raise, status such as "Open" or "Closing soon" |
| Profile | `/dashboard/profile` | A read-only profile card: name, email, membership tier, contact preference, short notes |

The existing `/` and `/about` pages stay as they are; the dashboard lives under `/dashboard`.

## Success criteria

Each item is a yes/no check you can do in a demo, by looking at the running app:

- [ ] A persistent navigation (sidebar on desktop) links to Home, Portfolio, Deals, and Profile, and each link opens its own page under `/dashboard`.
- [ ] Every page shows a clear page title in the header that matches the navigation label (for example "Portfolio").
- [ ] The current page's navigation link is visibly highlighted.
- [ ] Every page has the same three regions: navigation, a header, and a main content area.
- [ ] At phone width (about 375 px), the navigation collapses behind a labeled menu button or stacks above the content; nothing overlaps and the page does not scroll sideways.
- [ ] Wide tables scroll inside their own panel instead of stretching the page.
- [ ] Every page that shows numbers or names says on screen that they are **mock data**, not live.
- [ ] Money is shown the way an investor reads it (for example `$50,000`), not as raw numbers.
- [ ] Portfolio and Deals show a friendly message when there is nothing to list, never a blank panel or "undefined".
- [ ] Navigation links and buttons can be reached with the Tab key and show a visible focus outline.
- [ ] No pages exist under `/dashboard` other than the four areas above.

## Out of scope

Not built this sprint, so a demo should not promise them:

- Sign-in, accounts, and permissions (authentication and authorization)
- Live portfolio or deals data from Supabase/PostgreSQL, and any pgvector search
- Investing, payments, subscriptions, or document signing
- Admin tools for managing investors, listings, or deals
- Editing the profile (the profile is read-only)
- Notifications, settings, or dark-mode preferences beyond what the existing scaffold already has
- Automated tests and GitHub Actions CI

## Prompting notes for later AI steps

When asking a coding agent to build any part of the shell:

- Give it this brief and `docs/onboarding/repo-map.md`, and have it read `AGENTS.md` and `.cursor/rules/preishare.mdc` first.
- Name the four areas and their routes exactly, and say "do not add any other pages or features."
- State the stack: TanStack Start with file-based routes in `src/routes/`, React 19, strict TypeScript, Tailwind CSS v4. No new dependencies without asking.
- Ask for small, typed, reusable components with props, so mock data can be replaced later.
- Require every mock number or name to be labeled as mock on screen.
- Never hand-edit `src/routeTree.gen.ts`; regenerate it with `npm run generate-routes`.
- End each prompt with acceptance checks from the Success criteria above, and verify them in the browser, not just by reading the code.

## Open questions / assumptions

- **Assumption:** one investor is "signed in" in the mock data; real sign-in comes in a later sprint.
- **Assumption:** the dashboard lives at `/dashboard`, and the existing home page (`/`) stays as is.
- **Question:** should Deals reuse the Sprint 2 `InvestorListing` types (an active listing is an open deal), or is a deal a separate concept? This sprint uses simple mock data and records the decision later.
- **Question:** which money figures matter most on the home overview — total invested, current value, or gain/loss? This sprint shows total invested and current value.
- **Question:** what membership tiers exist? The profile shows a mock tier until PREIshare confirms.
