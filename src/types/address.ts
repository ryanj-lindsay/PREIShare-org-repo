/**
 * Where a listing's property is. Every required part must be present and not empty;
 * a listing with a partial address is not valid.
 *
 * Fields follow docs/domain/listing-field-inventory.md §4.
 */
export interface Address {
  /** House number and street name. Must not be empty. Example: "1420 Maple Street". */
  street: string

  /** Apartment, suite, or unit number. Optional: many properties have no unit. Example: "Unit B". */
  unit?: string

  /** City or town. Must not be empty. Example: "Springfield". */
  city: string

  /** Two-letter US state code, uppercase. Example: "IL". */
  state: string

  /**
   * US ZIP code, 5 digits or ZIP+4. Example: "62704".
   * Text, not a number, so leading zeros ("02134") are kept.
   */
  postalCode: string

  /** Country. Only the US is supported for now. */
  country: 'US'
}
