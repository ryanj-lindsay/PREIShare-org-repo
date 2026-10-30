/** Dashboard top bar: product label and a reminder that every figure is mock data. */
export default function Header() {
  return (
    <header className="island-shell flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4">
      <div>
        <p className="island-kicker m-0">PREIshare</p>
        <p className="m-0 text-lg font-semibold text-[var(--sea-ink)]">Investor dashboard</p>
      </div>
      <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-semibold text-[var(--sea-ink-soft)]">
        Mock data — not live
      </span>
    </header>
  )
}
