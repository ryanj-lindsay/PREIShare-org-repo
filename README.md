# PREIshare — investor dashboard shell

PREIshare is a real-estate intelligence web app that helps investors make smart real-estate decisions. This repo is the front end: a TanStack Start app written in strict TypeScript.

Right now it holds the starter site plus the shared investor listing types from Sprint 2. Sprint 3 adds an **investor dashboard shell** — layout, navigation, and pages with mock data only. The dashboard area routes (`/dashboard`, `/dashboard/portfolio`, `/dashboard/deals`, `/dashboard/profile`) are added in a later step; see `docs/investor-dashboard-brief.md` and `docs/dashboard-ia.md` for the plan.

## Before you start

You need [Node.js](https://nodejs.org/) LTS (version 20 or newer), which includes `npm`. Check with:

```sh
node --version
npm --version
```

## Install

From the project folder (the one with `package.json`):

```sh
npm install
```

This downloads every library the app needs into `node_modules/`. Run it again whenever `package.json` changes.

## Run the dev server

```sh
npm run dev
```

Then open <http://localhost:3000>. The page reloads by itself when you save a file. Press `Ctrl+C` in the terminal to stop the server.

## Other commands

| Command | What it does |
| --- | --- |
| `npm run build` | Builds the app for production (Vercel runs this on every push to `main`) |
| `npm run preview` | Serves the production build locally so you can check it |
| `npm run typecheck` | Checks every TypeScript file for type errors — run it before asking for review |
| `npm run typecheck:errors` | Shows the 16 intentional errors in the invalid listing fixtures (see `src/types/README.md`) |
| `npm run generate-routes` | Regenerates `src/routeTree.gen.ts` after adding or renaming a route file |

## Where things live

| Path | What it is |
| --- | --- |
| `package.json` | The app's name, scripts (`dev`, `build`, …), and the libraries it depends on |
| `vite.config.ts` | App configuration: the TanStack Start, Nitro (Vercel server adapter), React, and Tailwind plugins |
| `app.config.ts` | Not used — the config file name from older TanStack Start versions; points to `vite.config.ts` |
| `tsconfig.json` | Turns on strict TypeScript checking |
| `src/routes/` | File-based routes: each file is a page, and its path becomes the URL |
| `src/routes/__root.tsx` | The root layout that wraps every page (HTML document, site header and footer) |
| `src/routes/index.tsx` | The home page at `/` |
| `src/routeTree.gen.ts` | Generated from `src/routes/` — never edit it by hand |
| `src/components/` | Reusable UI pieces |
| `src/types/` | Shared TypeScript types for investor listings (Sprint 2) |
| `src/styles.css` | Tailwind entry point and the design's CSS variables |
| `docs/` | Planning docs, decision records, and onboarding notes |

## Contributing

Read `AGENTS.md` and `.cursor/rules/preishare.mdc` before changing anything, whether you're a person or an AI agent. They list the team's conventions and the files you shouldn't edit without approval.
