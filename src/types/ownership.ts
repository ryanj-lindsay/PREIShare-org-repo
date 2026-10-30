/**
 * What kind of owner holds a share of the property. Exactly one of these values, spelled exactly as shown.
 *
 * Values follow docs/domain/listing-field-inventory.md §7.
 */
export type OwnerType =
  /** A single person. */
  | 'individual'
  /** Limited liability company. */
  | 'llc'
  /** Two or more people or firms in a partnership. */
  | 'partnership'
  /** Property held in a trust. */
  | 'trust'
  /** A corporation. */
  | 'corporation'

/** One current owner of the property and the share they hold. */
export interface Owner {
  /** Owner's legal name (person or entity). Must not be empty. Example: "Maple Street Holdings LLC". */
  name: string

  /** Kind of owner. Example: "llc". */
  ownerType: OwnerType

  /** Percent of the property this owner holds; greater than 0 and at most 100. Example: 100. */
  sharePercent: number
}

/**
 * Who owns the property today.
 *
 * Fields follow docs/domain/listing-field-inventory.md §7.
 */
export interface Ownership {
  /**
   * Each current owner and their share; at least one.
   * Shares must add up to exactly 100 — that needs a runtime check, since the compiler
   * cannot add up values (domain brief §6).
   */
  owners: Owner[]

  /** Date the current owners acquired the property, as an ISO 8601 date. Optional. Example: "2019-06-14". */
  acquiredDate?: string
}
