/**
 * What a contact does for a listing. Exactly one of these values, spelled exactly as shown.
 *
 * Values follow docs/domain/listing-field-inventory.md §6.
 */
export type ContactRole =
  /** Licensed agent representing the seller. */
  | 'listing_agent'
  /** Person or firm organizing the investment. */
  | 'sponsor'
  /** Person or firm managing day-to-day operations. */
  | 'property_manager'

/**
 * A person investors can reach about a listing.
 *
 * Fields follow docs/domain/listing-field-inventory.md §6.
 */
export interface InvestorContact {
  /** Contact's full name. Must not be empty. Example: "Jordan Rivera". */
  name: string

  /** What the contact does for this listing. Example: "listing_agent". */
  role: ContactRole

  /** Email address investors can write to. Example: "jordan.rivera@example.com". */
  email: string

  /** Phone number including area code. Optional: not every contact shares a phone. Example: "555-0142". */
  phone?: string

  /**
   * Whether this is the main contact shown first. The inventory marks the primary contact on
   * the contact itself rather than with a separate id on the listing, so the flag can never
   * point at a contact that is missing from the list.
   */
  isPrimary: boolean
}
