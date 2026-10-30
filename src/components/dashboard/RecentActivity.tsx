import type { ActivityItem } from '../../data/mock-dashboard'
import { formatDate, formatUsd } from '../../lib/format'

export interface RecentActivityProps {
  items: readonly ActivityItem[]
}

/** The investor's latest events, newest first, with money in or out when there is any. */
export default function RecentActivity({ items }: RecentActivityProps) {
  return (
    <section className="island-shell rounded-2xl p-5" aria-labelledby="recent-activity-heading">
      <h2 id="recent-activity-heading" className="mb-3 mt-0 text-lg font-semibold text-[var(--sea-ink)]">
        Recent activity
      </h2>
      {items.length === 0 ? (
        <p className="m-0 text-sm text-[var(--sea-ink-soft)]">No activity yet. Investments and payouts will show up here.</p>
      ) : (
        <ul className="m-0 list-none space-y-3 p-0">
          {items.map((item) => (
            <li key={item.id} className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-sm">
              <span>
                <span className="block text-[var(--sea-ink)]">{item.description}</span>
                <time dateTime={item.date} className="text-xs text-[var(--sea-ink-soft)]">
                  {formatDate(item.date)}
                </time>
              </span>
              {item.amount !== undefined ? (
                <span className="font-semibold text-[var(--sea-ink)]">
                  {item.amount > 0 ? '+' : '−'}
                  {formatUsd(Math.abs(item.amount))}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
