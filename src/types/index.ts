// Front door for the shared types: import from 'src/types' instead of individual files.
// Re-exports only — every type is defined in its own file.
export type { Address } from './address'
export type { FinancialSummary } from './financial-summary'
export type { ContactRole, InvestorContact } from './investor-contact'
export type {
  ClosedInvestorListing,
  InvestorListing,
  InvestorListingBase,
  OpenInvestorListing,
} from './investor-listing'
export type { ClosedListingStatus, ListingStatus, OpenListingStatus } from './listing-status'
export type { Owner, OwnerType, Ownership } from './ownership'
export type { PropertyType } from './property-type'
