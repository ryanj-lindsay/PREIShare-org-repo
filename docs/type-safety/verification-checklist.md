# Investor listing types — verification checklist

Sprint 2, Topic 1

Walk this list top to bottom before handing off a change to `src/types/` or `src/fixtures/`. Each item is a yes/no check against the docs; if one fails, fix the docs or the types so they agree (docs first), then start the list again.

Sources: `docs/domain/investor-listing-domain-brief.md`, `docs/domain/listing-field-inventory.md`, `docs/type-safety/expected-type-errors.md`.

## 1. Domain coverage

- [ ] Every field in the inventory §1–7 has a matching property in `src/types/`, with the same `camelCase` name.
- [ ] No type has a field the inventory does not list.
- [ ] Required and optional (`?`) match the inventory for every field, including inside `address`, `financials`, `contacts`, and `ownership`.
- [ ] `closedAt` is required on `closed` listings and not allowed on any other status (inventory §2, brief §4).
- [ ] Every fixed choice matches the inventory value for value, lowercase: 6 statuses, 7 property types, 3 contact roles, 5 owner types, country `US`, currency `USD`.

## 2. Type-safety shape

- [ ] Fixed choices are string unions (`ListingStatus`, `PropertyType`, `ContactRole`, `OwnerType`), never plain `string`.
- [ ] Money, rent, tax, fees, and share percents are `number`; `postalCode` is `string` (keeps leading zeros).
- [ ] `address` uses `Address` and `financials` uses `FinancialSummary`; no address or money fields are left flat on the listing.
- [ ] `contacts` is a list of `InvestorContact` and `ownership.owners` is a list of `Owner`, each requiring at least one item.
- [ ] `primaryContactId` is a plain id, not a second copy of a contact.
- [ ] `InvestorListing` is a union on `status` (`OpenInvestorListing | ClosedInvestorListing`) built on `InvestorListingBase`.
- [ ] `id`, `createdAt`, and `updatedAt` are `readonly`.
- [ ] No `any`, no `as` casts, and no `@ts-ignore` anywhere in `src/types/` or `src/fixtures/`.
- [ ] `src/types/index.ts` re-exports every public type and defines none itself.

## 3. Fixtures

- [ ] `src/fixtures/sample-investor-listings.ts` has at least one listing for each of the 6 statuses, each annotated `: InvestorListing`.
- [ ] The valid samples follow the rules the types cannot check (brief §6): shares add up to 100, `primaryContactId` matches a contact, `minimumInvestment` is not above `askingPrice`, dates are in order.
- [ ] All sample data is made up (`example.com` emails, `555` phone numbers).
- [ ] `src/fixtures/invalid-listings.errors.ts` has one export for every row in `docs/type-safety/expected-type-errors.md`, and every export has a row.

## 4. Typecheck gate

- [ ] `npm run typecheck` finishes with no errors.
- [ ] `npm run typecheck:errors` reports exactly 16 errors, all in `src/fixtures/invalid-listings.errors.ts`, one per INV case.
- [ ] The rules in the "Still not caught by types" table of `expected-type-errors.md` are still listed for a future runtime check.

## 5. Sign-off

- [ ] Docs and types agree; any doc change was made before the matching type change.
- [ ] The full diff has been read before asking for review.

Checked by: ______________________  Date: ____________
