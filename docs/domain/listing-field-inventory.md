# Listing field inventory

Author: Ryan Lindsay
Date: 2026-10-20
Sprint 2, Topic 1 — TypeScript foundations

Every field on an investor listing, grouped the same way as `docs/domain/investor-listing-domain-brief.md` §5. This inventory is the input for the TypeScript types; when the two disagree, fix the docs first, then the types.

## How to read this inventory

**Data shape** uses these words only:

| Shape | Meaning | Example |
| --- | --- | --- |
| text | Any string of characters | `"Maple Street Duplex"` |
| number | A numeric value | `425000` |
| yes/no | `true` or `false` | `true` |
| fixed choice | Exactly one value from a closed list; no other spelling allowed | `"active"` |
| nested object | A named group of fields | `address` |
| list | Zero or more items of the same shape | `contacts` |

**Required** means the field must be present on every listing that is not a `draft` (see the brief, §6). **Optional** means it may be left out; when it is present it must still have the right shape.

Field names use `camelCase`. A dotted name such as `address.city` means the `city` field inside the `address` nested object. Dates are text in ISO 8601 format (for example `2026-10-20T14:30:00Z`). Money is a whole number of US dollars — no cents, no `$` sign, no commas.

All example values are made up.

## 1. Identity

| Field | Meaning | Shape | Required | Example |
| --- | --- | --- | --- | --- |
| `id` | Unique ID for this listing; never changes or gets reused | text | Required | `"lst_8f3k2m"` |
| `title` | Short headline investors see first | text (not empty) | Required | `"Maple Street Duplex"` |
| `description` | Longer plain-language summary of the property | text | Optional | `"Two-unit duplex near the university, both units leased."` |
| `createdAt` | When the listing was first created | text (ISO 8601 date-time) | Required | `"2026-10-01T09:00:00Z"` |
| `updatedAt` | When the listing was last changed; not before `createdAt` | text (ISO 8601 date-time) | Required | `"2026-10-18T16:45:00Z"` |

## 2. Status

| Field | Meaning | Shape | Required | Example |
| --- | --- | --- | --- | --- |
| `status` | Where the listing is in its lifecycle | fixed choice (below) | Required | `"active"` |

Allowed values — exactly these, lowercase:

| Value | Meaning | Visible to investors? |
| --- | --- | --- |
| `draft` | Being prepared; may be incomplete | No |
| `in_review` | Waiting for reviewer approval | No |
| `active` | Approved and open to investors | Yes |
| `under_contract` | Offer accepted; still viewable | Yes |
| `closed` | Deal complete; kept for history | No |
| `withdrawn` | Taken off the market; kept for history | No |

Allowed moves between statuses are in the brief, §4.

## 3. Property type

| Field | Meaning | Shape | Required | Example |
| --- | --- | --- | --- | --- |
| `propertyType` | What kind of property this is | fixed choice (below) | Required | `"multi_family"` |

Allowed values — exactly these, lowercase:

| Value | Meaning |
| --- | --- |
| `single_family` | One detached home for one household |
| `multi_family` | One building with 2 or more separate units (duplex, triplex, apartment building) |
| `condo` | A single unit in a building where common areas are shared |
| `townhouse` | An attached home sharing one or more walls with neighbors |
| `commercial` | Office, retail, or industrial property |
| `mixed_use` | Combines residential and commercial space |
| `land` | Vacant land with no building |

## 4. Address

`address` is a nested object. Every required part must be present and not empty — a listing with a partial address is not valid.

| Field | Meaning | Shape | Required | Example |
| --- | --- | --- | --- | --- |
| `address` | Where the property is | nested object | Required | — |
| `address.street` | House number and street name | text (not empty) | Required | `"1420 Maple Street"` |
| `address.unit` | Apartment, suite, or unit number | text | Optional | `"Unit B"` |
| `address.city` | City or town | text (not empty) | Required | `"Springfield"` |
| `address.state` | Two-letter US state code, uppercase | text (2 letters) | Required | `"IL"` |
| `address.postalCode` | US ZIP code, 5 digits or ZIP+4 | text (`12345` or `12345-6789`) | Required | `"62704"` |
| `address.country` | Country; only the US is supported for now | fixed choice: `US` | Required | `"US"` |

`postalCode` is text, not a number, so leading zeros (`"02134"`) are kept.

## 5. Financial summary

`financials` is a nested object. All money values are whole US dollars.

| Field | Meaning | Shape | Required | Example |
| --- | --- | --- | --- | --- |
| `financials` | Key money facts investors compare | nested object | Required | — |
| `financials.askingPrice` | Price the seller is asking, in dollars; greater than 0 | number (whole) | Required | `425000` |
| `financials.currency` | Currency for every money field; only USD for now | fixed choice: `USD` | Required | `"USD"` |
| `financials.minimumInvestment` | Smallest amount one investor can put in; greater than 0 and not more than `askingPrice` | number (whole) | Optional | `25000` |
| `financials.estimatedMonthlyRent` | Expected total rent per month across all units; 0 or more | number (whole) | Optional | `3400` |
| `financials.annualPropertyTax` | Property tax per year; 0 or more | number (whole) | Optional | `7800` |
| `financials.monthlyHoaFee` | Homeowners' association fee per month; 0 or more | number (whole) | Optional | `0` |

## 6. Investor contacts

`contacts` is a list. It must have at least one contact, and exactly one contact must have `isPrimary: true`.

| Field | Meaning | Shape | Required | Example |
| --- | --- | --- | --- | --- |
| `contacts` | People investors can reach about this listing | list of nested objects | Required (1 or more) | — |
| `contacts[].name` | Contact's full name | text (not empty) | Required | `"Jordan Rivera"` |
| `contacts[].role` | What the contact does for this listing | fixed choice (below) | Required | `"listing_agent"` |
| `contacts[].email` | Email address investors can write to | text (email format) | Required | `"jordan.rivera@example.com"` |
| `contacts[].phone` | Phone number including area code | text | Optional | `"555-0142"` |
| `contacts[].isPrimary` | Whether this is the main contact shown first | yes/no | Required | `true` |

`contacts[].role` allowed values:

| Value | Meaning |
| --- | --- |
| `listing_agent` | Licensed agent representing the seller |
| `sponsor` | Person or firm organizing the investment |
| `property_manager` | Person or firm managing day-to-day operations |

## 7. Ownership

`ownership` is a nested object holding a list of owners. Shares must add up to exactly 100.

| Field | Meaning | Shape | Required | Example |
| --- | --- | --- | --- | --- |
| `ownership` | Who owns the property today | nested object | Required | — |
| `ownership.owners` | Each current owner and their share | list of nested objects | Required (1 or more) | — |
| `ownership.owners[].name` | Owner's legal name (person or entity) | text (not empty) | Required | `"Maple Street Holdings LLC"` |
| `ownership.owners[].ownerType` | Kind of owner | fixed choice (below) | Required | `"llc"` |
| `ownership.owners[].sharePercent` | Percent of the property this owner holds; greater than 0 and at most 100 | number | Required | `100` |
| `ownership.acquiredDate` | Date the current owners acquired the property | text (ISO 8601 date) | Optional | `"2019-06-14"` |

`ownership.owners[].ownerType` allowed values:

| Value | Meaning |
| --- | --- |
| `individual` | A single person |
| `llc` | Limited liability company |
| `partnership` | Two or more people or firms in a partnership |
| `trust` | Property held in a trust |
| `corporation` | A corporation |

## 8. Complete example

A valid `active` listing using every group above (all data made up):

```json
{
  "id": "lst_8f3k2m",
  "title": "Maple Street Duplex",
  "description": "Two-unit duplex near the university, both units leased.",
  "createdAt": "2026-10-01T09:00:00Z",
  "updatedAt": "2026-10-18T16:45:00Z",
  "status": "active",
  "propertyType": "multi_family",
  "address": {
    "street": "1420 Maple Street",
    "city": "Springfield",
    "state": "IL",
    "postalCode": "62704",
    "country": "US"
  },
  "financials": {
    "askingPrice": 425000,
    "currency": "USD",
    "minimumInvestment": 25000,
    "estimatedMonthlyRent": 3400,
    "annualPropertyTax": 7800,
    "monthlyHoaFee": 0
  },
  "contacts": [
    {
      "name": "Jordan Rivera",
      "role": "listing_agent",
      "email": "jordan.rivera@example.com",
      "phone": "555-0142",
      "isPrimary": true
    },
    {
      "name": "Casey Morgan",
      "role": "property_manager",
      "email": "casey.morgan@example.com",
      "isPrimary": false
    }
  ],
  "ownership": {
    "owners": [
      { "name": "Maple Street Holdings LLC", "ownerType": "llc", "sharePercent": 100 }
    ],
    "acquiredDate": "2019-06-14"
  }
}
```

## 9. Common mistakes this inventory rules out

| Mistake | Why it is invalid |
| --- | --- |
| `"status": "Active"` | Status values are lowercase fixed choices; `Active` is not in the list |
| `"askingPrice": "$425,000"` | Price is a whole number, not text |
| Missing `financials.askingPrice` | Asking price is required |
| `"address": { "street": "1420 Maple Street" }` | City, state, postal code, and country are required |
| `"postalCode": 2134` | Postal code is text, so leading zeros are kept (`"02134"`) |
| Two contacts with `isPrimary: true` | Exactly one contact must be primary |
| Owners with shares 60 and 30 | Shares must add up to exactly 100 |
