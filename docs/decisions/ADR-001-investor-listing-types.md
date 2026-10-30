# ADR-001: Investor listing TypeScript types

- **Status:** Accepted (Sprint 2, Topic 1)
- **Date:** 2026-10-30
- **Author:** Ryan Lindsay
- **Related code:** `src/types/index.ts` — the one import path for every listing type

## Context

PREIshare shows investors property listings so they can make smart real-estate decisions. Until now, listing data moved around as loose objects and ad-hoc JSON, and that let bugs reach users: a listing with no asking price, a status spelled three ways (`Active`, `active`, `ACTIVE`), an address that showed on one screen and vanished on another.

This sprint topic describes a listing as a set of TypeScript **types**: a written-down shape the data must have. The project runs TypeScript in strict mode, so code that breaks a shape is rejected at **compile time**, when the code is checked, instead of when an investor is looking at the screen.

The types were written from, and must stay in step with:

- `docs/domain/investor-listing-domain-brief.md` — who uses listings, the status lifecycle, what makes a listing valid
- `docs/domain/listing-field-inventory.md` — every field, its shape, and whether it is required
- `docs/type-safety/expected-type-errors.md` — 16 deliberately broken listings the types must reject
- `docs/type-safety/verification-checklist.md` — the yes/no checks run before any change is handed off

When the docs and the types disagree, the docs are fixed first, then the types.

## Decision

A listing is modeled as one main type, `InvestorListing`, built from smaller named pieces, each in its own file under `src/types/`:

| Type | What it describes | File |
| --- | --- | --- |
| `InvestorListing` | A whole listing: either an `OpenInvestorListing` or a `ClosedInvestorListing`, both built on `InvestorListingBase` | `investor-listing.ts` |
| `ListingStatus` | The 6 allowed statuses | `listing-status.ts` |
| `PropertyType` | The 7 allowed property kinds | `property-type.ts` |
| `Address` | Where the property is | `address.ts` |
| `FinancialSummary` | Money facts behind the asking price | `financial-summary.ts` |
| `InvestorContact`, `ContactRole` | People investors can reach, and what each one does | `investor-contact.ts` |
| `Ownership`, `Owner`, `OwnerType` | Who owns the property and each owner's share | `ownership.ts` |

Other code imports these from `src/types/index.ts`, never from individual files, so files can be reorganized without breaking callers.

### The three biggest decisions

1. **Fixed choices are closed lists, not free text.** Status, property type, contact role, owner type, country, and currency can each only be one of a known set of exact spellings. `"Active"` or `"duplex"` is rejected before the app runs.
2. **A listing's shape depends on its status.** A closed listing *must* say when it closed (`closedAt`); a listing that has not closed *must not* carry a closing date. TypeScript enforces both by treating open and closed listings as two related shapes, told apart by `status`.
3. **Related facts travel together in named groups.** Address parts, money facts, contacts, and owners each live in their own nested group with their own rules, instead of dozens of loose fields on the listing. A partial address or a contact with no email is rejected.

## Type choices mapped to business rules

| Business rule (plain language) | Type choice | Why this shape |
| --- | --- | --- |
| Every listing has an id, title, asking price, property type, address, financial summary, contacts, ownership, and created/updated times | Required properties (no `?`) on `InvestorListingBase` | Optional core fields bring back the "listing with no price" bug |
| Description is nice to have | `description?: string` | The brief lets a listing be shown without one |
| Status is one of `draft`, `in_review`, `active`, `under_contract`, `closed`, `withdrawn` | `ListingStatus` string union | A plain `string` allows typos and three spellings of one status |
| Property type is one of `single_family`, `multi_family`, `condo`, `townhouse`, `commercial`, `mixed_use`, `land` | `PropertyType` string union | Same reason: a closed vocabulary |
| Prices and money facts are whole US dollars | `number` for `askingPrice` and every `FinancialSummary` metric; `currency: 'USD'` | `"$425,000"` as text can't be sorted, summed, or compared |
| A full address is required; only the unit is optional | `address: Address`, with every part required except `unit?` | Prevents half-present addresses |
| ZIP codes keep leading zeros | `postalCode: string` | As a number, `02134` would become `2134` |
| Only US properties for now | `country: 'US'` | The brief puts non-US addresses out of scope |
| Money facts may be unknown early in a deal | `financials: FinancialSummary` is required, but its four metrics are optional | The group always exists, so code never guesses; unknown numbers stay missing instead of being faked as `0` |
| Investors always have someone to call | `contacts: [InvestorContact, ...InvestorContact[]]` — at least one | An empty contact list is rejected |
| Each contact has a name, role, and email; phone is optional | `InvestorContact` with `id`, `fullName`, `role: ContactRole`, `email`, `phone?` | Stops "contact" from being a loose string |
| One contact is the main one | `primaryContactId: string` on the listing, naming a contact's `id` | One field means there is always exactly one primary contact; a second copy of the contact could drift out of date |
| Ownership names an owner of record and at least one owner with a share | `Ownership` with `ownerName`, `owners: [Owner, ...Owner[]]`, `acquiredDate?` | An ownership with no owners is rejected |
| Owner kinds are a closed list | `OwnerType` string union (`individual`, `llc`, `partnership`, `trust`, `corporation`) | Same reason as status |
| Only closed listings have a closing date | `OpenInvestorListing` has `closedAt?: never`; `ClosedInvestorListing` has `closedAt: string` | TypeScript requires or forbids the field based on `status` |
| A listing's id and timestamps are never edited by hand | `readonly id`, `readonly createdAt`, `readonly updatedAt` | Code that tries to change them does not compile |

`docs/type-safety/expected-type-errors.md` lists one deliberately broken listing for each kind of rule above, and `npm run typecheck:errors` shows TypeScript rejecting all 16.

## Alternatives considered

1. **Keep listings as loose JSON or `any`.** Rejected: quickest today, but every mistake shows up in production instead of during review.
2. **One flat listing with every field optional.** Rejected: "optional everything" is how listings lost their prices, and a flat shape hides which fields belong together.
3. **`enum` for each fixed choice.** Rejected for now: string unions read the same in data, fixtures, and error messages (`'active'`), and need no extra runtime code. Revisit only if code needs to loop over the allowed values.
4. **An `isPrimary` flag on every contact.** This was the first design. Replaced by `primaryContactId`, because flags let a listing end up with zero or two primary contacts, and TypeScript cannot count flags.
5. **A single listing type with an optional `closedAt`.** Rejected: TypeScript then can't stop a closed listing from missing its date, or an active listing from having one.
6. **A runtime validation library (such as Zod) as the source of truth.** Deferred: compile-time types and fixtures come first; runtime checks can be built from the same decisions later.

## Consequences

**Positive**

- Misspelled statuses, text where numbers belong, partial addresses, empty contact or owner lists, and wrong closing-date use are caught before code is merged.
- `npm run typecheck` is one repeatable gate for every change; `src/fixtures/sample-investor-listings.ts` proves a realistic listing for each status fits the model.
- Product and engineering share one vocabulary: the inventory field names are the type field names.

**Trade-offs and limits**

- **Types only check shape, not values.** These still typecheck and need a runtime check (full list in `expected-type-errors.md`): a price of 0 or below, owner shares that don't add up to 100, a `primaryContactId` that matches no contact, an empty title, a badly formatted state, ZIP code, email, or date.
- **Types do not check incoming data.** Data from a form or API must be validated before code treats it as an `InvestorListing`.
- **Drafts must be complete too.** The brief says a `draft` may be incomplete, but the types currently require every field on every status. Listing managers can't save a half-finished draft as an `InvestorListing` yet.
- Adding a status, property type, or role now means updating the docs and a union together; that's deliberate, but it's one more step.

## Out of scope for Sprint 2, Topic 1

- Runtime validation of incoming data (no validation library or check functions yet)
- Database schema or migrations (the Supabase data layer is planned but not built)
- API routes or server functions that load or save listings
- UI forms and listing screens
- Authentication and who may change a listing's status
- From the brief §7: photos and documents, non-US addresses and non-USD currencies, investor accounts and offers

## Follow-ups

1. **Build on the types package.** New code imports from `src/types/index.ts` and uses `src/fixtures/sample-investor-listings.ts` as test data.
2. **Keep the gate green.** Run `npm run typecheck` and walk `docs/type-safety/verification-checklist.md` before handing off any change to the types.
3. **Add runtime checks** for the rules in the "Still not caught by types" table of `docs/type-safety/expected-type-errors.md`, starting where data enters the app.
4. **Decide how drafts work.** Either loosen required fields for `draft` listings with their own shape, or keep drafts outside `InvestorListing` until they are submitted. Needs product input.
5. **Answer the brief's open questions (§8)**, especially whether `under_contract` stays visible to investors and whether `minimumInvestment` should be required for some listings; either answer may change a type.
