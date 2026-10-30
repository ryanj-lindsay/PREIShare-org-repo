import { Link } from '@tanstack/react-router'
import type { Holding } from '../../data/mock-dashboard'
import { formatUsd } from '../../lib/format'

export interface PortfolioSummaryProps {
  holdings: readonly Holding[]
}

/** A short snapshot of the portfolio: how much is held in each property type, with a link to the full list. */
export default function PortfolioSummary({ holdings }: PortfolioSummaryProps) {
  const byType = new Map<string, number>()
  for (const holding of holdings) {
    byType.set(holding.propertyType, (byType.get(holding.propertyType) ?? 0) + holding.currentValue)
  }

  return (
    <section className="island-shell rounded-2xl p-5" aria-labelledby="portfolio-summary-heading">
      <h2 id="portfolio-summary-heading" className="mb-3 mt-0 text-lg font-semibold text-[var(--sea-ink)]">
        Portfolio snapshot
      </h2>
      {holdings.length === 0 ? (
        <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
          You don't hold any properties yet. Open deals are a good place to start.
        </p>
      ) : (
        <>
          <p className="mb-3 mt-0 text-sm text-[var(--sea-ink-soft)]">
            {holdings.length} {holdings.length === 1 ? 'property' : 'properties'}, current value by type:
          </p>
          <ul className="m-0 list-none space-y-2 p-0">
            {[...byType].map(([type, value]) => (
              <li key={type} className="flex justify-between gap-4 text-sm">
                <span className="text-[var(--sea-ink)]">{type}</span>
                <span className="font-semibold text-[var(--sea-ink)]">{formatUsd(value)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
      <Link to="/dashboard/portfolio" className="mt-4 inline-block text-sm font-semibold">
        See every holding
      </Link>
    </section>
  )
}
