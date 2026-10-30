# Expected type errors

Sprint 2, Topic 1 — proving the investor listing types reject bad data

`src/fixtures/invalid-listings.errors.ts` holds made-up listings that are wrong on purpose. Each one starts from a valid sample in `src/fixtures/sample-investor-listings.ts` and breaks one rule from `docs/domain/listing-field-inventory.md`. TypeScript should reject every one of them at **compile time** — when the code is checked, before any investor sees the data.

That file is supposed to fail the typecheck. If any case below stops producing an error, the types have gotten looser and something is wrong.

## How to read the table

- **ID** matches the comment above the export in the fixtures file.
- **Error kind** is the kind of message TypeScript prints:
  - *wrong fixed choice* — a string that is not one of the allowed values
  - *wrong data shape* — for example text where a number belongs
  - *missing field* — a required field is left out
  - *empty list* — a list that must have at least one item is empty
  - *wrong status branch* — a field that the listing's status requires or forbids
  - *read-only* — changing a field that must never change

## Cases

| ID | Export | What is wrong, in business terms | Rule that catches it | Error kind | TypeScript code |
| --- | --- | --- | --- | --- | --- |
| INV-01 | `invalidStatusSpelling` | Status written `"Active"`, so screens filtering on `active` would miss it | `status` is a `ListingStatus` union of lowercase values | wrong fixed choice | TS2820 |
| INV-02 | `invalidPropertyType` | Property type `"duplex"` is not a PREIshare category | `propertyType` is the `PropertyType` union | wrong fixed choice | TS2322 |
| INV-03 | `invalidPriceAsText` | Asking price `"$425,000"` can't be sorted or compared | `askingPrice: number` | wrong data shape | TS2322 |
| INV-04 | `invalidPartialAddress` | Address with only a street; investors can't tell where the property is | `Address` requires city, state, postal code, and country | missing field | TS2739 |
| INV-05 | `invalidPostalCodeAsNumber` | Postal code `2134` loses the leading zero of `02134` | `Address.postalCode: string` | wrong data shape | TS2322 |
| INV-06 | `invalidCountry` | Country `"USA"` instead of the supported `"US"` | `Address.country: 'US'` | wrong fixed choice | TS2322 |
| INV-07 | `invalidRentAsText` | Monthly rent `"3,400"` can't be used in calculations | `FinancialSummary.estimatedMonthlyRent?: number` | wrong data shape | TS2322 |
| INV-08 | `invalidContactsAsString` | Contacts as one loose string; no role, email, or id | `contacts` is a list of `InvestorContact` objects | wrong data shape | TS2322 |
| INV-09 | `invalidEmptyContacts` | No one for investors to call | `contacts` must hold at least one `InvestorContact` | empty list | TS2322 |
| INV-10 | `invalidContactMissingEmail` | Contact with no email address | `InvestorContact.email` is required | missing field | TS2741 |
| INV-11 | `invalidContactRole` | Contact role `"broker"` is not a PREIshare role | `role` is the `ContactRole` union | wrong fixed choice | TS2322 |
| INV-12 | `invalidEmptyOwners` | Ownership that names no actual owners | `ownership.owners` must hold at least one `Owner` | empty list | TS2322 |
| INV-13 | `invalidSharePercentAsText` | Owner share `"100%"` can't be added up | `Owner.sharePercent: number` | wrong data shape | TS2322 |
| INV-14 | `invalidClosedWithoutDate` | Closed deal with no record of when it closed | `ClosedInvestorListing` requires `closedAt` | wrong status branch | TS2322 |
| INV-15 | `invalidOpenWithClosedAt` | Active listing that claims a closing date | `OpenInvestorListing` forbids `closedAt` | wrong status branch | TS2322 |
| INV-16 | `invalidRenameListing` | Code changing a listing's id after it exists | `InvestorListingBase.id` is `readonly` | read-only | TS2540 |

## Hole hunt

We reviewed the types against the inventory, the domain brief, and the valid fixtures, asking which bad values would still typecheck.

**Fixed in this step**

- **Empty contacts and owners lists.** The inventory says `contacts` and `ownership.owners` need at least one item, but both were typed as plain lists, so `[]` passed. Both are now typed as "one item, then any number more", and INV-09 and INV-12 prove it.

**Still not caught by types (needs a runtime check)**

These rules are in the domain brief §6, but they compare, count, or check the format of values, which the compiler cannot do. A small check that runs when data arrives (from a form or an API) has to cover them:

| Rule | Example that still typechecks |
| --- | --- |
| Asking price greater than 0 | `askingPrice: -5` |
| Money values are whole dollars | `askingPrice: 425000.5` |
| `minimumInvestment` not more than `askingPrice` | `minimumInvestment: 900000` on a $425,000 listing |
| Owner shares greater than 0, at most 100, adding up to exactly 100 | shares of 60 and 30 |
| `primaryContactId` matches a contact in the list | `primaryContactId: "ct_unknown"` |
| Contact ids unique within a listing | two contacts with `id: "ct_jrivera"` |
| Text fields not empty | `title: ""` |
| `state` is two uppercase letters; `postalCode` is `12345` or `12345-6789` | `state: "Illinois"` |
| `email` looks like an email | `email: "jordan"` |
| Dates are ISO 8601; `updatedAt` and `closedAt` are not before `createdAt` | `updatedAt: "yesterday"` |

**Left as is on purpose**

- **Drafts must be complete.** The brief says a `draft` may be incomplete, but the types require every field on every status. Loosening drafts would be a new design decision, so it is left for the stakeholder decision record rather than changed here.

## Check your work

From the project root:

```sh
npx tsc --noEmit
```

Every row above should appear as an error in `src/fixtures/invalid-listings.errors.ts` — 16 in total — and no other file should report an error.
