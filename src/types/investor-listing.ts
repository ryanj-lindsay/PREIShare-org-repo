/**
 * An investor listing: one property PREIshare shows to investors.
 *
 * Fields follow docs/domain/listing-field-inventory.md §1 (Core fields).
 * Deferred to later steps: status and propertyType (fixed-choice unions), and the
 * nested address, financials, contacts, and ownership types.
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

  /** When the listing was first created, as an ISO 8601 date-time. Example: "2026-10-01T09:00:00Z". */
  createdAt: string

  /** When the listing was last changed, as an ISO 8601 date-time; never before createdAt. */
  updatedAt: string
}
