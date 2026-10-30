/**
 * Money facts that support a listing's asking price. All money values are whole US dollars
 * with no "$", commas, or cents.
 *
 * Fields follow docs/domain/listing-field-inventory.md §5. The inventory marks every metric
 * optional (it may be unknown while a deal is underwritten); only the currency is required.
 */
export interface FinancialSummary {
  /** Currency for every money field. Only USD is supported for now. */
  currency: 'USD'

  /** Smallest amount one investor can put in; greater than 0 and not more than askingPrice. Example: 25000. */
  minimumInvestment?: number

  /** Expected total rent per month across all units; 0 or more. Example: 3400. */
  estimatedMonthlyRent?: number

  /** Property tax per year; 0 or more. Example: 7800. */
  annualPropertyTax?: number

  /** Homeowners' association fee per month; 0 or more. Example: 0. */
  monthlyHoaFee?: number
}
