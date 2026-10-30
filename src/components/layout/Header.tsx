interface HeaderProps {
  /** Heading for the current page, from navConfig. */
  title: string
}

/** Dashboard top bar: the current page's heading and a reminder that every figure is mock data. */
export default function Header({ title }: HeaderProps) {
  return (
    <header className="island-shell flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4">
      <div>
        <p className="island-kicker m-0">PREIshare investor dashboard</p>
        <h1 className="m-0 text-2xl font-bold text-[var(--sea-ink)]">{title}</h1>
      </div>
      <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-semibold text-[var(--sea-ink-soft)]">
        Mock data — not live
      </span>
    </header>
  )
}
