interface StatsCardProps {
  /** What the figure is, for example "Current value". */
  label: string
  /** The figure, already formatted for people, for example "$203,000". */
  value: string
  /** Optional short context under the figure. */
  note?: string
}

/** One labeled figure on the dashboard. Reusable on any page; it only displays what it is given. */
export default function StatsCard({ label, value, note }: StatsCardProps) {
  return (
    <article className="island-shell rounded-2xl p-5">
      <h2 className="m-0 text-sm font-semibold text-[var(--sea-ink-soft)]">{label}</h2>
      <p className="mb-0 mt-2 text-2xl font-bold text-[var(--sea-ink)]">{value}</p>
      {note ? <p className="mb-0 mt-1 text-xs text-[var(--sea-ink-soft)]">{note}</p> : null}
    </article>
  )
}
