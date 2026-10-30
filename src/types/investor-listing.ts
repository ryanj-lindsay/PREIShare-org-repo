import type { Address } from './address'
import type { FinancialSummary } from './financial-summary'
import type { InvestorContact } from './investor-contact'
import type { ClosedListingStatus, OpenListingStatus } from './listing-status'
import type { Ownership } from './ownership'
import type { PropertyType } from './property-type'

/**
 * Fields every investor listing has, whatever its status.
 *
 * Fields follow docs/domain/listing-field-inventory.md §1–7.
 */
export interface InvestorListingBase {
  /** Unique ID for this listing; never changes or gets reused. Example: "lst_8f3k2m". */
  readonly id: string

  /** Short headline investors see first. Must not be empty. Example: "Maple Street Duplex". */
  title: string

  /** Longer plain-language summary of the property. Optional: the domain brief (§6) lets a listing be shown without one. */
  description?: string

  /** Price the seller is asking, in whole US dollars with no "$", commas, or cents; greater than 0. Example: 425000. */
  askingPrice: number

  /** What kind of property this is. Example: "multi_family". */
  propertyType: PropertyType

  /** Where the property is. Required: a listing without a full location is not valid. */
  address: Address

  /**
   * Money facts that support the asking price. The inventory marks this group required;
   * the individual metrics inside it are optional until they are known.
   */
  financials: FinancialSummary

  /** People investors can reach about this listing; at least one. */
  contacts: InvestorContact[]

  /**
   * The id of the main contact, shown first. Must match the id of one entry in contacts.
   * A plain id (not a second copy of the contact) keeps one source of truth; checking that
   * the id really exists in contacts needs a runtime check, since the compiler cannot see
   * which ids the list holds (domain brief §6).
   */
  primaryContactId: string

  /** Who owns the property today. */
  ownership: Ownership

  /** When the listing was first created, as an ISO 8601 date-time; set once. Example: "2026-10-01T09:00:00Z". */
  readonly createdAt: string

  /** When the listing was last changed, as an ISO 8601 date-time; never before createdAt. Set by the system on save. */
  readonly updatedAt: string
}

/** A listing that has not closed: any status except "closed". It has no closing date. */
export interface OpenInvestorListing extends InvestorListingBase {
  /** Where the listing is in its lifecycle; only "active" and "under_contract" are shown to investors. */
  status: OpenListingStatus

  /** Not allowed: only a closed listing has a closing date. */
  closedAt?: never
}

/** A listing whose deal is complete. It must say when it closed. */
export interface ClosedInvestorListing extends InvestorListingBase {
  /** The deal is complete; kept for history. */
  status: ClosedListingStatus

  /** When the deal completed, as an ISO 8601 date-time; not before createdAt. Example: "2026-12-02T17:00:00Z". */
  closedAt: string
}

/**
 * An investor listing: one property PREIshare shows to investors.
 *
 * `status` is the discriminant: checking it tells TypeScript which branch you have, so
 * closedAt is required on a closed listing and rejected on every other one.
 */
export type InvestorListing = OpenInvestorListing | ClosedInvestorListing
