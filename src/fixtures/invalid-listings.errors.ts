// INTENTIONAL TYPE ERRORS — this file should NOT typecheck cleanly.
// Each export breaks exactly one rule from docs/domain/listing-field-inventory.md, starting
// from a valid sample and changing one field. The red errors are the proof that the types
// catch the mistake. Every case is listed in docs/type-safety/expected-type-errors.md.
// No `any`, `as`, or @ts-ignore: hiding an error here would prove nothing.

import type { InvestorListing } from '../types'
import { sampleActiveListing, sampleClosedListing } from './sample-investor-listings'

// INV-01: status capitalized; status values are lowercase fixed choices.
export const invalidStatusSpelling: InvestorListing = {
  ...sampleActiveListing,
  status: 'Active',
}

// INV-02: property type that is not on the fixed list.
export const invalidPropertyType: InvestorListing = {
  ...sampleActiveListing,
  propertyType: 'duplex',
}

// INV-03: asking price written as formatted text instead of a whole number.
export const invalidPriceAsText: InvestorListing = {
  ...sampleActiveListing,
  askingPrice: '$425,000',
}

// INV-04: partial address; city, state, postal code, and country are required.
export const invalidPartialAddress: InvestorListing = {
  ...sampleActiveListing,
  address: { street: '1420 Maple Street' },
}

// INV-05: postal code as a number, which would drop the leading zero of "02134".
export const invalidPostalCodeAsNumber: InvestorListing = {
  ...sampleActiveListing,
  address: { ...sampleActiveListing.address, postalCode: 2134 },
}

// INV-06: country spelled out; only the fixed choice "US" is supported.
export const invalidCountry: InvestorListing = {
  ...sampleActiveListing,
  address: { ...sampleActiveListing.address, country: 'USA' },
}

// INV-07: financial metric as text instead of a whole number of dollars.
export const invalidRentAsText: InvestorListing = {
  ...sampleActiveListing,
  financials: { ...sampleActiveListing.financials, estimatedMonthlyRent: '3,400' },
}

// INV-08: contacts as one loose string instead of a list of structured contacts.
export const invalidContactsAsString: InvestorListing = {
  ...sampleActiveListing,
  contacts: 'Jordan Rivera, 555-0142',
}

// INV-09: no contacts at all; investors need at least one person to call.
export const invalidEmptyContacts: InvestorListing = {
  ...sampleActiveListing,
  contacts: [],
}

// INV-10: contact missing its required email.
export const invalidContactMissingEmail: InvestorListing = {
  ...sampleActiveListing,
  contacts: [{ id: 'ct_jrivera', fullName: 'Jordan Rivera', role: 'listing_agent' }],
}

// INV-11: contact role that is not on the fixed list.
export const invalidContactRole: InvestorListing = {
  ...sampleActiveListing,
  contacts: [
    {
      id: 'ct_jrivera',
      fullName: 'Jordan Rivera',
      role: 'broker',
      email: 'jordan.rivera@example.com',
    },
  ],
}

// INV-12: ownership with no owners; at least one owner is required.
export const invalidEmptyOwners: InvestorListing = {
  ...sampleActiveListing,
  ownership: { ownerName: 'Maple Street Holdings LLC', owners: [] },
}

// INV-13: owner share written as text instead of a number.
export const invalidSharePercentAsText: InvestorListing = {
  ...sampleActiveListing,
  ownership: {
    ownerName: 'Maple Street Holdings LLC',
    owners: [{ name: 'Maple Street Holdings LLC', ownerType: 'llc', sharePercent: '100%' }],
  },
}

// INV-14: closed listing with no closing date.
export const invalidClosedWithoutDate: InvestorListing = {
  ...sampleActiveListing,
  status: 'closed',
}

// INV-15: listing that has not closed but carries a closing date.
export const invalidOpenWithClosedAt: InvestorListing = {
  ...sampleClosedListing,
  status: 'active',
}

// INV-16: changing a listing's id after it exists; id is read-only.
export function invalidRenameListing(listing: InvestorListing): void {
  listing.id = 'lst_new_id'
}
