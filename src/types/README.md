# `src/types/` — shared PREIshare types

PREIshare shows investors property listings so they can make smart real-estate decisions, and investors can only trust those decisions if every listing they see is complete and correct.

Today listing data moves around as loose objects and ad-hoc JSON, so mistakes reach users: a listing with no asking price, a status spelled three different ways (`Active`, `active`, `ACTIVE`), or an address that shows on one screen and is missing on another. This folder holds the TypeScript types that rule those mistakes out.

## What a type does here

A **type** describes the shape data must have — which fields exist, which are required, and what kind of value each one holds. The project runs TypeScript in **strict mode**, so the compiler rejects code that breaks a type. That means mistakes are caught at **compile time** (when the code is checked), not at run time (when an investor is looking at the screen).

## Where the rules come from

These types are written from the domain docs, not invented in code:

- `docs/domain/investor-listing-domain-brief.md` — who uses listings, the listing lifecycle statuses, and what makes a listing valid
- `docs/domain/listing-field-inventory.md` — every field, its shape, whether it is required, and example values

If a type and the docs disagree, fix the docs first, then the type.

## Conventions

- One domain concept per file, named in kebab-case (for example `investor-listing.ts`).
- Fixed choices such as listing status and property type are string unions, never free text.
- Types only — no runtime logic, API calls, or real customer data in this folder. Example data in fixtures is made up.
- Data that arrives at run time (API responses, form input) must be checked before it is treated as one of these types; a type alone does not check incoming data.

## Typecheck

From the project root:

```sh
npm run typecheck
```

**Success** looks like the command finishing with no `error TS…` lines (exit code 0). Run it before you ask for a review; if it fails, fix the type or fixture it names before doing anything else.

It checks every TypeScript file in the project, including the valid samples in `src/fixtures/sample-investor-listings.ts`, except one file:

- `src/fixtures/invalid-listings.errors.ts` is **supposed to fail**. Each listing in it breaks one rule on purpose, to prove the types catch that mistake. It is left out of the clean check by `tsconfig.typecheck.json`.
- To see those intended errors, run `npm run typecheck:errors`. It should report exactly the 16 errors listed in `docs/type-safety/expected-type-errors.md`, all in that one file. Fewer means a type got looser; errors in any other file are real bugs.

Before handing off a change to these types, walk through `docs/type-safety/verification-checklist.md`.
