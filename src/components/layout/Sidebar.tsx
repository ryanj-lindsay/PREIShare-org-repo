import NavItems from './NavItems'

interface SidebarProps {
  /** Element id, so the header's Menu button can point at it with aria-controls. */
  id: string
  /** Whether the collapsed sidebar is open on narrow screens. Always shown on desktop. */
  open: boolean
}

/** PREIshare branding and the dashboard navigation region. */
export default function Sidebar({ id, open }: SidebarProps) {
  return (
    <aside
      id={id}
      data-open={open}
      className="dashboard-sidebar island-shell mb-6 rounded-2xl p-4 lg:sticky lg:top-24 lg:mb-0 lg:self-start"
    >
      <p className="island-kicker mb-1">PREIshare</p>
      <p className="mb-4 text-sm font-semibold text-[var(--sea-ink)]">Investor dashboard</p>
      <nav aria-label="Dashboard" className="dashboard-nav">
        <NavItems />
      </nav>
    </aside>
  )
}
