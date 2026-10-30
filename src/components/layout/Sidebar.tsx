import NavItems from './NavItems'

/** PREIshare branding and the dashboard navigation region. */
export default function Sidebar() {
  return (
    <aside className="island-shell mb-6 rounded-2xl p-4 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
      <p className="island-kicker mb-1">PREIshare</p>
      <p className="mb-4 text-sm font-semibold text-[var(--sea-ink)]">Investor dashboard</p>
      <nav aria-label="Dashboard">
        <NavItems />
      </nav>
    </aside>
  )
}
