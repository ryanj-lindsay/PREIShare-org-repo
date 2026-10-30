import type { Address } from './address'
import type { FinancialSummary } from './financial-summary'
import type { InvestorContact } from './investor-contact'
import type { ListingStatus } from './listing-status'
import type { Ownership } from './ownership'
import type { PropertyType } from './property-type'

/**
 * An investor listing: one property PREIshare shows to investors.
 *
 * Fields follow docs/domain/listing-field-inventory.md §1–7.
 */
export interface InvestorListing {
  /** Unique ID for this listing; never changes or gets reused. Example: "lst_8f3k2m". */
  id: string

  /** Short headline investors see first. Must not be empty. Example: "Maple Street Duplex". */
  title: string

  /** Longer plain-language summary of the property. Optional: the domain brief (§6) lets a listing be shown without one. */
  description?: string

  /** Price the seller is asking, in whole US dollars with no "$", commas, or cents; greater than 0. Example: 425000. */
  askingPrice: number

  /** Where the listing is in its lifecycle; only "active" and "under_contract" are shown to investors. */
  status: ListingStatus

  /** What kind of property this is. Example: "multi_family". */
  propertyType: PropertyType

  /** Where the property is. Required: a listing without a full location is not valid. */
  address: Address

  /**
   * Money facts that support the asking price. The inventory marks this group required;
   * the individual metrics inside it are optional until they are known.
   */
  financials: FinancialSummary

  /**
   * People investors can reach about this listing; at least one.
   * Exactly one contact has isPrimary: true — that needs a runtime check, since the
   * compiler cannot count matching items (domain brief §6).
   */
  contacts: InvestorContact[]

  /** Who owns the property today. */
  ownership: Ownership

  /** When the listing was first created, as an ISO 8601 date-time. Example: "2026-10-01T09:00:00Z". */
  createdAt: string

  /** When the listing was last changed, as an ISO 8601 date-time; never before createdAt. */
  updatedAt: string
}
