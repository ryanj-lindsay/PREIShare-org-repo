const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/** A whole-dollar amount the way an investor reads it: 50000 → "$50,000". */
export function formatUsd(amount: number): string {
  return usd.format(amount)
}

// Dates are formatted in UTC so the server and the browser always print the same day.
const shortDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

/** An ISO 8601 date as a short readable date: "2026-10-18" → "Oct 18, 2026". */
export function formatDate(isoDate: string): string {
  return shortDate.format(new Date(isoDate))
}
