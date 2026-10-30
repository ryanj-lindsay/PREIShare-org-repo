interface HeaderProps {
  /** Heading for the current page, from navConfig. */
  title: string
  /** Whether the collapsed sidebar is open (narrow screens only). */
  menuOpen: boolean
  /** Id of the sidebar the Menu button shows and hides. */
  menuControls: string
  onMenuToggle: () => void
}

/**
 * Dashboard top bar: the current page's heading, a reminder that every figure is mock data,
 * and on narrow screens a Menu button that opens the collapsed sidebar.
 */
export default function Header({ title, menuOpen, menuControls, onMenuToggle }: HeaderProps) {
  return (
    <header className="island-shell flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4">
      <div className="min-w-0">
        <p className="island-kicker m-0">PREIshare investor dashboard</p>
        <h1 className="m-0 text-2xl font-bold text-[var(--sea-ink)]">{title}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs font-semibold text-[var(--sea-ink-soft)]">
          Mock data — not live
        </span>
        <button
          type="button"
          className="dashboard-menu-button inline-flex items-center gap-2 rounded-xl border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-2 text-sm font-semibold text-[var(--sea-ink)]"
          aria-expanded={menuOpen}
          aria-controls={menuControls}
          onClick={onMenuToggle}
        >
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M3 5h14v2H3zm0 4h14v2H3zm0 4h14v2H3z" />
          </svg>
          {menuOpen ? 'Close menu' : 'Menu'}
        </button>
      </div>
    </header>
  )
}
