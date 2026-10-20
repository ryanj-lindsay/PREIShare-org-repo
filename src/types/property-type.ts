/**
 * What kind of property a listing describes. Exactly one of these values, spelled exactly as shown.
 *
 * Values follow docs/domain/listing-field-inventory.md §3.
 */
export type PropertyType =
  /** One detached home for one household. */
  | 'single_family'
  /** One building with 2 or more separate units (duplex, triplex, apartment building). */
  | 'multi_family'
  /** A single unit in a building where common areas are shared. */
  | 'condo'
  /** An attached home sharing one or more walls with neighbors. */
  | 'townhouse'
  /** Office, retail, or industrial property. */
  | 'commercial'
  /** Combines residential and commercial space. */
  | 'mixed_use'
  /** Vacant land with no building. */
  | 'land'
