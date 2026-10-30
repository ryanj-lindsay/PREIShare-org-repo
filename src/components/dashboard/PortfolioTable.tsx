import type { Holding } from '../../data/mock-dashboard'
import { formatUsd } from '../../lib/format'

export interface PortfolioTableProps {
  holdings: readonly Holding[]
}

/** Every holding in one scannable table. On narrow screens the table scrolls inside its panel. */
export default function PortfolioTable({ holdings }: PortfolioTableProps) {
  return (
    <section className="island-shell rounded-2xl p-5" aria-labelledby="portfolio-table-heading">
      <h2 id="portfolio-table-heading" className="mb-3 mt-0 text-lg font-semibold text-[var(--sea-ink)]">
        Holdings
      </h2>
      {holdings.length === 0 ? (
        <p className="m-0 text-sm text-[var(--sea-ink-soft)]">
          You don't hold any properties yet. When you invest in a deal, it will be listed here.
        </p>
      ) : (
        <div className="dashboard-scroll overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <caption className="sr-only">Your holdings (sample data)</caption>
            <thead>
              <tr className="border-b border-[var(--line)] text-[var(--sea-ink-soft)]">
                <th scope="col" className="py-2 pr-4 font-semibold">Property</th>
                <th scope="col" className="py-2 pr-4 font-semibold">Type</th>
                <th scope="col" className="py-2 pr-4 text-right font-semibold">Invested</th>
                <th scope="col" className="py-2 pr-4 text-right font-semibold">Current value</th>
                <th scope="col" className="py-2 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((holding) => (
                <tr key={holding.id} className="border-b border-[var(--line)] last:border-b-0">
                  <th scope="row" className="py-3 pr-4 font-semibold text-[var(--sea-ink)]">
                    {holding.property}
                    <span className="block text-xs font-normal text-[var(--sea-ink-soft)]">{holding.location}</span>
                  </th>
                  <td className="py-3 pr-4 text-[var(--sea-ink)]">{holding.propertyType}</td>
                  <td className="py-3 pr-4 text-right text-[var(--sea-ink)]">{formatUsd(holding.invested)}</td>
                  <td className="py-3 pr-4 text-right font-semibold text-[var(--sea-ink)]">{formatUsd(holding.currentValue)}</td>
                  <td className="py-3 text-[var(--sea-ink)]">{holding.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
