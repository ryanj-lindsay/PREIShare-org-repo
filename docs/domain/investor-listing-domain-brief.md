# Investor listing domain brief

Author: Ryan Lindsay
Date: 2026-10-20
Sprint 2, Topic 1 — TypeScript foundations

## 1. Why this brief exists

PREIshare shows investors property listings so they can make smart real-estate decisions. Today listing data travels as loose objects and ad-hoc JSON, so bugs reach users: a listing with no price, a status spelled three different ways (`Active`, `active`, `ACTIVE`), or an address field that shows on one screen and is missing on another.

This brief describes what an investor listing *is* in plain language, before anyone writes code. The field-by-field detail lives in `docs/domain/listing-field-inventory.md`. Together they are the source for the TypeScript types we write next. A **type** is a description of the shape data must have; with **strict TypeScript**, the compiler rejects code that breaks that shape, so mistakes are caught at **compile time** (when the code is checked) instead of at run time (when a user is looking at the screen).

All names, addresses, and contacts in these docs are made up. Never put real customer data in docs, fixtures, or prompts.

## 2. Actors

An **actor** is anyone (or anything) that creates, changes, or reads a listing.

| Actor | Who they are | What they do with a listing |
| --- | --- | --- |
| **Investor** | A person deciding whether to put money into a property | Browses and compares listings; reads price, address, financials, and who to contact. Never edits. |
| **Listing manager** | A PREIshare team member or partner who prepares listings | Creates drafts, fills in fields, and submits listings for review. |
| **Reviewer** | A PREIshare team member who approves listings | Checks a listing is complete and accurate before investors can see it; can send it back to draft. |
| **Property owner** | The person or entity that owns the property | Supplies ownership and property facts; is recorded on the listing but does not log in to edit it. |
| **Investor contact** | The agent, sponsor, or property manager investors reach out to | Named on the listing so investors know who to ask; does not edit the listing. |
| **PREIshare app (system)** | The web app and, later, its data layer | Stores listings, enforces status rules, and decides which listings investors may see. |

## 3. Goals

1. **Investors only see safe listings.** A listing is shown to investors only when it is complete and in an investor-visible status (see §4 and §6).
2. **One spelling for every fixed choice.** Status and property type come from closed lists; free text is not allowed for them.
3. **The same shape on every screen.** A listing has one agreed structure, so a nested field such as `address.city` is present everywhere or nowhere — never on one screen only.
4. **Mistakes fail early.** Missing required fields, misspelled statuses, and wrong data shapes are caught by the TypeScript compiler, not by users.
5. **Stakeholders can read the rules.** Non-developers can read these two docs and understand what a valid listing is.

## 4. Listing lifecycle statuses

**Status** is a fixed choice — exactly one of the values below, written exactly as shown (lowercase, underscores). No other spellings are valid.

| Status | Meaning | Visible to investors? |
| --- | --- | --- |
| `draft` | Being prepared by a listing manager; may be incomplete. | No |
| `in_review` | Submitted and waiting for a reviewer to approve it. | No |
| `active` | Approved and open to investors. | **Yes** |
| `under_contract` | An offer has been accepted; investors can still view it but it is no longer open. | **Yes** (marked as under contract) |
| `closed` | The deal is complete. Kept for history. | No |
| `withdrawn` | Taken off the market before closing. Kept for history. | No |

Allowed moves between statuses:

```text
draft ──► in_review ──► active ──► under_contract ──► closed
  ▲            │           │              │
  └────────────┘           ▼              ▼
  (sent back)          withdrawn ◄────────┘
```

- `draft → in_review` — listing manager submits it.
- `in_review → draft` — reviewer sends it back with changes needed.
- `in_review → active` — reviewer approves it.
- `active → under_contract` — an offer is accepted.
- `under_contract → active` — the deal falls through.
- `active → withdrawn` and `under_contract → withdrawn` — taken off the market.
- `under_contract → closed` — the deal completes.
- `closed` and `withdrawn` are final; nothing moves out of them.

## 5. Nested data groups

A listing is one object made of smaller groups. A **nested object** is a group of related fields kept together under one name (for example, every address part lives inside `address`). A **list** is zero or more items of the same shape (for example, several contacts).

| Group | Shape | What it holds |
| --- | --- | --- |
| **Core fields** | Top-level single values | ID, title, description, asking price, created and updated dates |
| **Status** | Fixed choice | Where the listing is in its lifecycle (§4) |
| **Property type** | Fixed choice | What kind of property it is (single-family, condo, and so on) |
| **Address** | Nested object | Street, unit, city, state, ZIP code, country |
| **Financial summary** | Nested object | Currency, minimum investment, rent, taxes, HOA fees |
| **Investor contacts** | List of nested objects | Who investors contact, their role, email, phone, and which one is primary |
| **Ownership** | Nested object with a list of owners | Ownership structure and each owner's share |

Field-level detail (names, shapes, required vs. optional, examples) is in `docs/domain/listing-field-inventory.md`.

## 6. Success criteria for a valid listing

A listing is **valid** (safe to show investors) only when every item below is true. A `draft` may break these rules while it is being written; every other status must pass all of them.

1. **Identity is set.** `id` and `title` are present and not empty; `createdAt` and `updatedAt` are valid dates, and `updatedAt` is not before `createdAt`. `description` is optional: a listing may be shown to investors without one, because the title, price, and address carry the facts they need.
2. **Status is known.** `status` is exactly one of the six values in §4 — no other spelling or casing.
3. **Property type is known.** `propertyType` is exactly one of the values in the field inventory.
4. **Address is complete.** `street`, `city`, `state`, `postalCode`, and `country` are all present and not empty; `state` is a two-letter code and `postalCode` is a 5-digit ZIP or ZIP+4.
5. **Price is present and sensible.** `askingPrice` is a whole number of US dollars greater than 0, and `financials.currency` is `USD`. Optional money fields, when present, are 0 or more.
6. **Minimum investment fits the price.** If `financials.minimumInvestment` is present, it is greater than 0 and not more than `askingPrice`.
7. **Investors have someone to call.** `contacts` has at least one contact; exactly one contact has `isPrimary: true`; every contact has a name, a known role, and an email address.
8. **Ownership adds up.** `ownership.owners` has at least one owner, every `sharePercent` is greater than 0, and the shares add up to exactly 100.
9. **Investor visibility follows status.** Only `active` and `under_contract` listings are shown to investors.

If any item fails, the listing must not be shown to investors.

TypeScript types alone can guarantee that required fields exist, that each field has the right shape, and that status, property type, and contact role are spelled exactly right. Rules that compare or count values — price greater than 0, shares adding up to 100, exactly one primary contact, `updatedAt` not before `createdAt` — also need a small runtime check, because the compiler cannot see the actual numbers in data that arrives while the app is running.

## 7. Out of scope (for now)

- Photos, documents, and floor plans.
- Non-US addresses and currencies other than USD.
- Investor accounts, saved listings, and offers.
- How listings are stored (the Supabase data layer is planned but not built; schema choices need team approval).

## 8. Open questions for stakeholders

1. Should `under_contract` listings stay visible to investors, or be hidden like `closed`?
2. Is a minimum investment always required, or only for fractional (shared) investments?
3. Do we need to support non-US properties or currencies in the next two sprints?
4. Who may move a listing to `withdrawn` — only reviewers, or listing managers too?
