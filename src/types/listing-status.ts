/**
 * Where a listing is in its lifecycle. Exactly one of these values, spelled exactly as shown.
 *
 * Values follow docs/domain/listing-field-inventory.md §2; allowed moves between them are in
 * docs/domain/investor-listing-domain-brief.md §4. Only "active" and "under_contract" are
 * visible to investors.
 */
export type ListingStatus =
  /** Being prepared by a listing manager; may be incomplete. */
  | 'draft'
  /** Submitted and waiting for a reviewer to approve it. */
  | 'in_review'
  /** Approved and open to investors. */
  | 'active'
  /** An offer has been accepted; investors can still view it. */
  | 'under_contract'
  /** The deal is complete; kept for history. */
  | 'closed'
  /** Taken off the market before closing; kept for history. */
  | 'withdrawn'
