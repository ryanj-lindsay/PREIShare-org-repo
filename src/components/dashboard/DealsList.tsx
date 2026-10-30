import type { Deal } from '../../data/mock-dashboard'
import { formatUsd } from '../../lib/format'

export interface DealsListProps {
  deals: readonly Deal[]
}

/** Open deals as cards an investor can scan: name, place, minimum, target, and status at a glance. */
export default function DealsList({ deals }: DealsListProps) {
  if (deals.length === 0) {
    return (
      <section className="island-shell rounded-2xl p-5">
        <h2 className="mb-2 mt-0 text-lg font-semibold text-[var(--sea-ink)]">No open deals right now</h2>
        <p className="m-0 text-sm text-[var(--sea-ink-soft)]">New deals are added often. Check back soon.</p>
      </section>
    )
  }

  return (
    <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-3">
      {deals.map((deal) => (
        <li key={deal.id}>
          <article className="island-shell h-full rounded-2xl p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <h2 className="m-0 text-lg font-semibold text-[var(--sea-ink)]">{deal.name}</h2>
              <span className="shrink-0 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-semibold text-[var(--sea-ink)]">
                {deal.status}
              </span>
            </div>
            <p className="mb-3 mt-0 text-sm text-[var(--sea-ink-soft)]">
              {deal.propertyType} · {deal.location}
            </p>
            <dl className="m-0 grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-[var(--sea-ink-soft)]">Minimum investment</dt>
                <dd className="m-0 font-semibold text-[var(--sea-ink)]">{formatUsd(deal.minimumInvestment)}</dd>
              </div>
              <div>
                <dt className="text-[var(--sea-ink-soft)]">Target raise</dt>
                <dd className="m-0 font-semibold text-[var(--sea-ink)]">{formatUsd(deal.targetRaise)}</dd>
              </div>
            </dl>
          </article>
        </li>
      ))}
    </ul>
  )
}
