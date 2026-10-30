import { Link } from '@tanstack/react-router'

/** PREIshare branding and the dashboard navigation region. */
export default function Sidebar() {
  return (
    <aside className="island-shell mb-6 rounded-2xl p-4 lg:sticky lg:top-24 lg:mb-0 lg:self-start">
      <p className="island-kicker mb-1">PREIshare</p>
      <p className="mb-4 text-sm font-semibold text-[var(--sea-ink)]">Investor dashboard</p>
      <nav aria-label="Dashboard">
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0 lg:flex-col">
          <li><Link to="/dashboard" className="nav-link">Home</Link></li>
          <li><Link to="/dashboard/portfolio" className="nav-link">Portfolio</Link></li>
          <li><Link to="/dashboard/deals" className="nav-link">Deals</Link></li>
          <li><Link to="/dashboard/profile" className="nav-link">Profile</Link></li>
        </ul>
      </nav>
    </aside>
  )
}
