import type { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

interface AppShellProps {
  /** The current dashboard page, rendered in the main content area. */
  children: ReactNode
}

/** Page frame for every /dashboard page: sidebar, header, and the main content area. */
export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="page-wrap px-4 pb-10 pt-6 lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-6">
      <Sidebar />
      <div className="min-w-0">
        <Header />
        <main id="dashboard-main" className="mt-6">
          {children}
        </main>
      </div>
    </div>
  )
}
