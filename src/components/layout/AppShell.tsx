import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import Header from './Header'
import Sidebar from './Sidebar'
import { findNavItem } from './navConfig'

interface AppShellProps {
  /** The current dashboard page, rendered in the main content area. */
  children: ReactNode
}

/**
 * Page frame for every /dashboard page: sidebar, header, and the main content area.
 * On narrow screens the sidebar is collapsed behind the header's Menu button; AppShell
 * owns that open/closed state and closes the menu whenever the page changes.
 */
export default function AppShell({ children }: AppShellProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const title = findNavItem(pathname)?.title ?? 'Investor dashboard'
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="dashboard-shell page-wrap px-4 pb-10 pt-6 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-6">
      <a href="#dashboard-main" className="dashboard-skip-link">
        Skip to content
      </a>
      <Sidebar id="dashboard-sidebar" open={menuOpen} />
      <div className="min-w-0">
        <Header
          title={title}
          menuOpen={menuOpen}
          menuControls="dashboard-sidebar"
          onMenuToggle={() => setMenuOpen((open) => !open)}
        />
        <main id="dashboard-main" tabIndex={-1} className="mt-6 focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  )
}
