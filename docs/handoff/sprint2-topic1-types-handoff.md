# Sprint 2, Topic 1 — Types handoff: PREIshare investor listings

- **Audience:** owners of the next sprint topics, PREIshare engineering, and product partners who did not watch the types being built
- **Status:** TypeScript model and proof fixtures done; no product features built on them yet
- **Date:** 2026-10-30
- **Author:** Ryan Lindsay

## 1. Client story recap

PREIshare listing data used to move around as loose objects and ad-hoc JSON, and bad data reached investors: listings with no asking price, a status spelled `Active`, `active`, and `ACTIVE`, and address fields that showed on one screen and vanished on another.

This topic wrote down what a valid listing looks like as strict TypeScript types, so those mistakes now fail at **compile time** — while code is being checked — instead of in front of an investor. The reasoning behind each type is in [ADR-001](../decisions/ADR-001-investor-listing-types.md); this handoff only points at what exists and what comes next.

## 2. What shipped

| Deliverable                      | Path                                                                                                  | Problem it solves                                                                  |
| -------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Domain brief and field inventory | `docs/domain/investor-listing-domain-brief.md`, `docs/domain/listing-field-inventory.md`              | One agreed list of fields and business rules, written before any code              |
| Types package                    | `src/types/index.ts` (re-exports everything in `src/types/`)                                          | One import path for `InvestorListing` and its parts, so no one redefines a listing |
| Valid sample listings            | `src/fixtures/sample-investor-listings.ts`                                                            | One realistic made-up listing per status, proving good data fits the model         |
| Deliberately broken listings     | `src/fixtures/invalid-listings.errors.ts`, `docs/type-safety/expected-type-errors.md`                 | 16 cases proving bad data is rejected, plus the list of rules types can't catch    |
| Typecheck gate                   | `npm run typecheck` and `npm run typecheck:errors` in `package.json`, using `tsconfig.typecheck.json` | One repeatable check before any review                                             |
| Verification checklist           | `docs/type-safety/verification-checklist.md`                                                          | Yes/no checks that the types still match the docs                                  |
| Decision record                  | `docs/decisions/ADR-001-investor-listing-types.md`                                                    | Plain-language record of the type decisions for partners                           |

**To verify:** run `npm run typecheck` (should finish with no errors), run `npm run typecheck:errors` (should show exactly 16 errors, all in the invalid fixtures file), then walk the verification checklist.

## 3. What we must not claim is done

- **No UI.** No listing screens or create/edit forms use these types yet.
- **No database.** No Supabase/PostgreSQL tables, migrations, or pgvector work. The data layer is still only planned.
- **No API.** No routes or server functions load or save listings.
- **No runtime validation.** Types check code, not incoming data. Rules like owner shares adding up to 100, prices above 0, or a valid email are documented but not enforced anywhere yet.
- **No auth or permissions.** Nothing decides who may move a listing between statuses.
- **Drafts can't be half-finished yet.** The types require every field on every status, even though the brief allows incomplete drafts (ADR-001, Follow-up 4).

If you demo this work, say: **"The listing data model is typed and verified; the product features that use it are next."**

## 4. Next sprint pickups

Each track builds on `src/types/index.ts`. None of them should redefine the listing shape or copy status, property-type, or role strings by hand.

### A. TanStack Start forms (UI)

- Build listing create/edit forms whose fields and dropdown options come from `InvestorListing`, `ListingStatus`, `PropertyType`, `ContactRole`, and `OwnerType`, imported from `src/types/index.ts`.
- Use `src/fixtures/sample-investor-listings.ts` as example data for screens during development.
- Form input is runtime data: validate it before treating it as an `InvestorListing` (see the "Still not caught by types" table in `docs/type-safety/expected-type-errors.md`).
- Settle the draft question first (ADR-001, Follow-up 4), since a form saves drafts long before they are complete.

### B. Supabase / PostgreSQL schema alignment (data)

- Design tables whose columns and constraints mirror the inventory: required fields as `NOT NULL`, the fixed choices as constrained values, address and financials as columns or related tables, contacts and owners as related tables.
- Database checks are a natural home for rules types can't enforce (shares adding up to 100, price above 0, `primaryContactId` pointing at a real contact).
- Rows read from the database should be returned as `InvestorListing` from `src/types/index.ts`. Record any intentional difference between TypeScript optional fields and database `NULL` rules in a new ADR rather than letting them drift.
- Schema choices need team approval before work starts (`.cursor/rules/preishare.mdc` §5).

### C. API boundaries

- Server functions or routes that read or write listings take and return types from `src/types/index.ts`, never their own copies.
- Validate every request body at the boundary before it becomes an `InvestorListing`; that is where the runtime checks belong.
- Status changes should follow the allowed moves in the domain brief §4, which the types do not enforce.

## 5. Prompting and review self-assessment

- A prompting habit that helped: I like prompting with a "Write and then explain this as a senior software developer" so that I can get some "realworld" experience from the agent
- A second prompting habit that helped: I would sometimes prompt with a "... I am having trouble understanding this part will you explain it further." To help with areas where I felt I was lacking.
- A review habit I'll keep: Is checking even when a commit comes up green in paul. I like double checking that my code looks solid and does what it is intended to do.
- What I would do differently next time: Review with short intervals. After prompting, sometimes the agent would go down a rabbit hole, without me realizing, which would then cause my reviews to take longer because there is so much more for me to go through and check.
